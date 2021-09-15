import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import Coming from "./components/ComingSoon/Coming";
import Discover from "./components/Discover";
import Home from "./components/Home/Home";
import Movie from "./components/Movie";
import Sidebar from "./components/Sidebar";
import TV from "./components/TV";

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
        <Route path="/movie/:id">
          <Movie />
        </Route>
        <Route path="/tv/:id">
          <TV />
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
  flex-direction: row;

  overflow-y: hidden;

  background-color: var(--main-bg-color);
  height: 100vh;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 1;
`;

export default App;
