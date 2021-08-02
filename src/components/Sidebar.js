import React from "react";
import styled from "styled-components";
import { BiMovie } from "react-icons/bi";
import {
  AiFillHome,
  AiOutlineCompass,
  AiOutlineFieldTime,
} from "react-icons/ai";

const Sidebar = () => {
  return (
    <Content>
      <Header>
        <HeaderIcon />
        WatchMe
      </Header>
      <Menu>
        <MenuText>Menu</MenuText>
        <MenuItems>
          <MenuItem>
            <Icon>
              <AiFillHome />
            </Icon>
            Home
          </MenuItem>
          <MenuItem>
            <Icon>
              <AiOutlineCompass />
            </Icon>
            Discover
          </MenuItem>
          <MenuItem>
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
  width: 15em;
  display: flex;
  flex-direction: column;
  font-weight: 500;
  color: var(--main-dark-color);
  border-right: var(--main-verylight-color) 1px solid;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 2em 0em;
  font-size: 1.5em;
  color: var(--main-dark-color);
`;

const HeaderIcon = styled(BiMovie)`
  margin-right: 0.15em;
  color: var(--main-red-color);
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MenuText = styled.div`
  padding: 1.5em 0em;
  color: var(--main-verylight-color);
  padding-left: 2em;
`;

const MenuItems = styled.div``;

const MenuItem = styled.div`
  display: flex;
  height: 2.5em;
  align-items: center;
  padding-left: 2em;
  &:hover {
    cursor: pointer;
    background-color: var(--main-verylight-color);
  }
  &:focus-within {
    background-color: red;
  }
`;

const Icon = styled.div`
  display: flex;
  padding-right: 0.3em;
  font-size: 1.2em;
  color: var(--main-red-color);
`;

export default Sidebar;
