/* (메인) 탑 바 - 로고, 메뉴 아이콘(+메뉴 아이콘 클릭시 메뉴 등장 기능 조절) */

import React, { useState } from "react";
import styled from 'styled-components';
import TopBar from "./TopBar.js";
import Menu from "./Menu.js";

const MenuIcon = styled.img`
  position: absolute;
  top: 16px;
  left: 20px;
  cursor: pointer;
`;


const TopBarMain = () => {

  let [menuModal, setMenuModal] = useState(false);

  return (
    <>
      <TopBar/>
      <MenuIcon src={process.env.PUBLIC_URL + '/image/menu_icon.png'} onClick={() => {
        setMenuModal(!menuModal); // 메뉴 아이콘 클릭시 메뉴 등장
      }}/>
      {
        menuModal === true ? <Menu setMenuModal={setMenuModal}/> : null
      }
    </>
  );

}

export default TopBarMain;