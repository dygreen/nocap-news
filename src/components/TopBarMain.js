/* (메인) 탑 바 - 로고, 메뉴 아이콘 */

import styled from 'styled-components';
import TopBar from "./TopBar";

const MenuIcon = styled.img`
  position: absolute;
  top: 16px;
  left: 20px;
  cursor: pointer;
`;


const TopBarMain = () => {

  return (
    <>
      <TopBar/>
      <MenuIcon src={process.env.PUBLIC_URL + '/image/menu_icon.png'}/>
    </>
  );

}

export default TopBarMain;