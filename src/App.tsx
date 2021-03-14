import { Layout, Row, Col, Typography } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.scss";

import Libraries from "./components/Libraries/Libraries";
import Library from "./components/Library/Library";

const { Header } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/404" exact>
          <Title>Page Not Found</Title>
        </Route>
        <Route>
          <Header className="header">
            <Title id="brand" level={2}>
              Тестовое задание Самолет
            </Title>
          </Header>
          <Row gutter={16} justify="center" className="main">
            <Col span={22}>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/libraries" />
                </Route>
                <Route path="/library/:id">
                  <Library />
                </Route>
                <Route exact path="/libraries">
                  <Libraries />
                </Route>
                <Route>
                  <Redirect to="/404" />
                </Route>
              </Switch>
            </Col>
          </Row>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
