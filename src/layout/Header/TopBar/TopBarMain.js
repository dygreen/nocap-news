/* (메인) 탑 바 - 로고, 메뉴 아이콘, 메뉴 모달창 */
import {useDispatch, useSelector} from "react-redux";
import {toggleMenu} from "../../../store";
import styled from 'styled-components';
import TopBar from "./TopBar.js";
import Menu from "../../../pages/main/Menu";

const TopBarMain = () => {
  const dispatch = useDispatch();
  const menuFlag = useSelector(state => state.menu.menuFlag);

  return (
    <>
      <TopBar/>
      {/* 메뉴 아이콘 클릭시 메뉴 페이지로 이동 */}
      {
        !menuFlag
        ? <MenuIcon
            src={process.env.PUBLIC_URL + '/image/menu_icon.png'}
            onClick={() => { dispatch(toggleMenu(menuFlag)) }}
          />
        : <MenuIcon
            src={process.env.PUBLIC_URL + '/image/arrow_back.png'}
            onClick={() => { dispatch(toggleMenu(menuFlag)) }}
          />
      }

      {/* Start : 메뉴 모달 */}
      {
        menuFlag
        ? <Menu/>
        : null
      }
      {/* End : 메뉴 모달 */}
    </>
  );
}

const MenuIcon = styled.img`
  position: absolute;
  top: 40px;
  left: 20px;
  cursor: pointer;
`;

export default TopBarMain;
