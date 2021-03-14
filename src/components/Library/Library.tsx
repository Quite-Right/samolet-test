import { useState, useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import {
  Alert,
  Statistic,
  Card,
  PageHeader,
  Descriptions,
  Typography,
} from "antd";
import { ILibrary, LibrariesAPI } from "../../api/libraries";

const { Text } = Typography;

interface Props {}

interface ILibrariesRequestState {
  data: undefined | ILibrary;
  error: any;
  isLoading: boolean;
}

const Library = (props: Props) => {
  const [
    { data, error, isLoading },
    setRequest,
  ] = useState<ILibrariesRequestState>({
    data: undefined,
    error: null,

    isLoading: true,
  });

  const { id }: any = useParams();

  useEffect(() => {
    let isMounted = true;

    const effectBody = async () => {
      try {
        const data = await LibrariesAPI.getLibrary(+id);

        if (isMounted) {
          setRequest({ data: data, error: null, isLoading: false });
        }
      } catch (e) {
        if (isMounted)
          setRequest({ data: data, error: error, isLoading: false });
      }
    };

    effectBody();
    return () => {
      isMounted = false;
    };
  }, []);

  const history = useHistory();

  return (
    <>
      <PageHeader
        onBack={() => history.push("/libraries")}
        title="Библиотеки"
        subTitle={!isLoading && !error && data?.territory}
      />
      {error && (
        <Alert
          message="На странице произошла ошибка"
          description={error}
          type="error"
        />
      )}
      {!error && (
        <Card loading={isLoading} title={data?.fullname}>
          <Descriptions column={1}>
            <Descriptions.Item label="Адрес">{data?.address}</Descriptions.Item>
          </Descriptions>
          <Statistic
            title="Библиотек"
            value={data?.libraries}
            className="library__statistic"
          />
          <Statistic
            title="Уникальных пользователей"
            value={
              data?.["individual_subscribers_(information_services),_units"]
            }
            className="library__statistic"
          />
          <Statistic
            title="Посещений библиотек"
            value={data?.visits}
            className="library__statistic"
          />
          <Statistic
            title="Сайтов"
            value={data?.site}
            className="library__statistic"
          />
          <Statistic
            title="Посещений сайтов"
            value={data?.visits_sites}
            className="library__statistic"
          />
          <Statistic
            title="Персональных компьютеров"
            value={data?.["number_of_personal_computers_in_libraries,_units"]}
            className="library__statistic"
          />
          <Text type="secondary">
            {data && data.formname + " " + data.period}
          </Text>
        </Card>
      )}

      {!error && !isLoading && !data && <Redirect to="/404" />}
    </>
  );
};

export default Library;
