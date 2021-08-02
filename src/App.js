import styled from "styled-components";
import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Main>
      <Sidebar />
      <Content>Content</Content>
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
