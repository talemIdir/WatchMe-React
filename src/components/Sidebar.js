import React, { useState } from "react";
import styled from "styled-components";
import { BiMovie } from "react-icons/bi";
import {
  AiOutlineHome,
  AiOutlineCompass,
  AiOutlineFieldTime,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const Sidebar = () => {
  if (sessionStorage.getItem("selectedMenu") == null)
    sessionStorage.setItem("selectedMenu", "home");

  const [selected, setSelected] = useState(
    sessionStorage.getItem("selectedMenu")
  );

  return (
    <Content>
      <Header>
        <HeaderIcon />
        WatchMe
      </Header>
      <Menu>
        <MenuText>Menu</MenuText>
        <MenuItems>
          <MenuItem
            onClick={() => {
              setSelected("home");
              sessionStorage.setItem("selectedMenu", "home");
            }}
            focused={selected === "home" ? "true" : "false"}
            to="/"
          >
            <Icon>
              <AiOutlineHome />
            </Icon>
            Home
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSelected("discover");
              sessionStorage.setItem("selectedMenu", "discover");
            }}
            focused={selected === "discover" ? "true" : "false"}
            to="/discover"
          >
            <Icon>
              <AiOutlineCompass />
            </Icon>
            Discover
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSelected("coming");
              sessionStorage.setItem("selectedMenu", "coming");
            }}
            focused={selected === "coming" ? "true" : "false"}
            to="/coming"
          >
            <Icon>
              <AiOutlineFieldTime />
            </Icon>
            Coming soon
          </MenuItem>
        </MenuItems>
      </Menu>
    </Content>
  );
};

const Content = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: column;
  font-weight: 500;
  color: var(--main-light-color);
  border-right: var(--main-verylight-color) 1px solid;

  @media (max-width: 1100px) {
    min-width: 200px;
  }

  @media (max-width: 800px) {
    flex-direction: row;
    border-bottom: var(--main-verylight-color) 1px solid;
    border-right: none;
    justify-content: space-between;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2em 0em;
  font-size: 1.5em;
  color: var(--main-dark-color);

  @media (max-width: 800px) {
    margin: 0em 1em;
  }
`;

const HeaderIcon = styled(BiMovie)`
  margin-right: 0.15em;
  color: var(--main-red-color);
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 800px) {
    display: block;
  }
`;

const MenuText = styled.div`
  padding: 1.5em 0em;
  color: var(--main-verylight-color);
  padding-left: 2em;
  @media (max-width: 800px) {
    display: none;
  }
`;

const MenuItems = styled.div`
  @media (max-width: 800px) {
    display: flex;
    flex-direction: row;
  }
`;

const MenuItem = styled(Link)`
  text-decoration: none;
  box-sizing: border-box;
  display: flex;
  height: 2.5em;
  align-items: center;
  padding-left: 2em;
  border-right: ${(props) =>
    props.focused === "true" ? "var(--main-red-color) solid 5px" : ""};
  color: ${(props) =>
    props.focused === "true"
      ? "var(--main-dark-color)"
      : "var(--main-light-color)"};
  &:hover {
    cursor: pointer;
    background-color: #d7dbf0;
  }

  @media (max-width: 800px) {
    padding: 0em 0.5em;
    border-right: none;
    border-bottom: ${(props) =>
      props.focused === "true" ? "var(--main-red-color) solid 5px" : ""};
  }
`;

const Icon = styled.div`
  display: flex;
  padding-right: 0.3em;
  font-size: 1.2em;
  color: var(--main-red-color);
`;

export default Sidebar;
