import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import Coming from "./components/Coming";
import Discover from "./components/Discover";
import Home from "./components/Home/Home";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Main>
      <Sidebar />
      <Switch>
        <Route path="/discover">
          <Discover />
        </Route>
        <Route path="/coming">
          <Coming />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  background-color: var(--main-bg-color);
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
`;

export default App;
