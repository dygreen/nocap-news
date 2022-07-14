/* (메인) 탑 바 - 로고, 메뉴 아이콘 */

import styled from 'styled-components';

const TopBarBox = styled.div`
  width: 100%;
  height: 56px;
  position: relative;
`;

const MenuIcon = styled.img`
  position: absolute;
  top: 16px;
  left: 20px;
  cursor: pointer;
`;

const Logo = styled.img`
  position: absolute;
  top: 17px;
  left: 125px;
  cursor: pointer;
`;

const TopBars = () => {

  return(
    <TopBarBox>
      <Logo src={process.env.PUBLIC_URL + '/image/logo.png'}/>
      <MenuIcon src={process.env.PUBLIC_URL + '/image/menu_icon.png'}/>
    </TopBarBox>
  );

}

export default TopBars;