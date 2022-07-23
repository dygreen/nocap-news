/* (메인) 메뉴 클릭시 나타나는 탑 바 */

import { useNavigate, Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import styled from 'styled-components';

const TopFixedItem = styled.div`
  position: fixed;
  top: 24px;
  width: 360px;
  height: 56px;
  background: #fff;
  border-bottom: 2px solid #D7352A;
  z-index: 999;
`;

const BackIcon = styled.img`
  position: absolute;
  top: 16px;
  left: 20px;
  cursor: pointer;
`;


const TopBarMenu = () => {

  let navigate = useNavigate();

  return (
    <>
      <TopFixedItem>
        <TopBar/>
        <BackIcon src={process.env.PUBLIC_URL + '/image/arrow_back.png'} onClick={() => { navigate(-1) }}/>
      </TopFixedItem>

      <Outlet/> {/* 서브 컴포넌트 표기할 곳 */}
    </>
  );

}

export default TopBarMenu;