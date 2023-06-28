import StateBar from "./TopBar/StateBar";
import {useLocation} from "react-router-dom";
import TopBarMain from "./TopBar/TopBarMain";
import TopBarDetail from "./TopBar/TopBarDetail";
import TopBarMenu from "./TopBar/TopBarMenu";
import styled from "styled-components";

const HeaderWrap = styled.div`
  width: 100%;
  background: #fff;
`;

const Header = () => {
  const location = useLocation();

  return (
    <HeaderWrap>
      <StateBar/>

      {/* pathname으로 메인/상세/메뉴 탑 바 구분 */}
      {
        location.pathname === '/'
        ? <TopBarMain/>
        : location.pathname.startsWith('/detail')
          ? <TopBarDetail/>
          : <TopBarMenu/>
      }
    </HeaderWrap>
  );
}

export default Header