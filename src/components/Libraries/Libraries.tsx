import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LibrariesAPI, ILibrary } from "../../api/libraries";
import { Table, Input, Empty, Alert, PageHeader } from "antd";

const { Search } = Input;

interface ILibrariesRequestState {
  data: undefined | Array<ILibrary>;
  error: any;
  isLoading: boolean;
}

interface IDataSeachedLibrary extends ILibrary {
  key: string;
}

const Libraries = () => {
  const [
    { data, error, isLoading },
    setRequest,
  ] = useState<ILibrariesRequestState>({
    data: undefined,
    error: null,

    isLoading: true,
  });

  const [dataSearched, setDataSearched] = useState<
    Array<IDataSeachedLibrary> | undefined
  >(undefined);

  useEffect(() => {
    let isMounted = true;

    const effectBody = async () => {
      try {
        const data = await LibrariesAPI.getAllLibraries();

        if (isMounted) {
          setRequest({ data: data, error: null, isLoading: false });
          setDataSearched(
            data.map((library) => {
              return { ...library, key: JSON.stringify(library) };
            })
          );
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

  const columns = [
    {
      title: "Область",
      dataIndex: "territory",
      key: "territory",
      width: "30%",
    },
    {
      title: "Количество библиотек",
      dataIndex: "libraries",
      key: "libraries",
      sorter: (a: ILibrary, b: ILibrary) => a.libraries - b.libraries,
    },
  ];

  const onSearch = (value: string) => {
    setDataSearched(
      data
        ?.map((library) => {
          return { ...library, key: JSON.stringify(library) };
        })
        .filter((library) =>
          library.territory.toLowerCase().startsWith(value.toLowerCase())
        )
    );
  };

  return (
    <>
      {error && (
        <Alert
          message="На странице произошла ошибка"
          description={error}
          type="error"
        />
      )}

      <PageHeader
        title="Библиотеки"
      />

      <Search
        disabled={error || isLoading}
        onSearch={onSearch}
        enterButton
        placeholder="Введите регион"
        className="libraries__search"
      />

      {!error && (
        <Table
          dataSource={dataSearched}
          columns={columns}
          loading={isLoading}
          onRow={({ order }: ILibrary) => {
            return {
              onClick: () => {
                history.push(`/library/${order}`);
              },
            };
          }}
        />
      )}

      {!isLoading && (!data || data.length === 0) && (
        <Empty description={<span>По вашему запросу нет данных</span>} />
      )}
    </>
  );
};

export default Libraries;
