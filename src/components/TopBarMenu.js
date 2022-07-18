/* (메인) 메뉴 클릭시 나타나는 탑 바 */

import styled from 'styled-components';
import TopBar from "./TopBar";

const TopFixedItem = styled.div`
  width: 360px;
  height: 56px;
  background: #fff;
  border-bottom: 2px solid #D7352A;
`;

const BackIcon = styled.img`
  position: absolute;
  top: 16px;
  left: 20px;
  cursor: pointer;
`;


const TopBarMenu = ({setMenuModal}) => {


  return (
    <TopFixedItem>
      <TopBar/>
      <BackIcon src={process.env.PUBLIC_URL + '/image/arrow_back.png'} onClick={() => { setMenuModal(false) }}/>
    </TopFixedItem>
  );

}

export default TopBarMenu;