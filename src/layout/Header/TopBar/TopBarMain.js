/* (메인) 탑 바 - 로고, 메뉴 아이콘(+메뉴 아이콘 클릭시 메뉴 페이지로 이동) */

import { useNavigate } from 'react-router-dom';
import TopBar from "./TopBar.js";
import styled from 'styled-components';

const MenuIcon = styled.img`
  position: absolute;
  top: 40px;
  left: 20px;
  cursor: pointer;
`;


const TopBarMain = () => {
  let navigate = useNavigate();

  return (
    <>
      <TopBar/>
      {/* 메뉴 아이콘 클릭시 메뉴 페이지로 이동 */}
      <MenuIcon
        src={process.env.PUBLIC_URL + '/image/menu_icon.png'}
        onClick={() => { navigate('/m/menu') }}
      />
    </>
  );

}

export default TopBarMain;