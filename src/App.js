import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import Coming from "./pages/ComingSoon/Coming";
import Discover from "./pages/Discover/Discover";
import Home from "./pages/Home/Home";
import Movie from "./pages/Movie";
import Sidebar from "./components/Sidebar";
import TV from "./pages/TV";

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

export default App;
