import {useLocation} from "react-router-dom";
import styled from "styled-components";
import StateBar from "./TopBar/StateBar";
import TopBarMain from "./TopBar/TopBarMain";
import TopBarDetail from "./TopBar/TopBarDetail";

const Header = () => {
  const location = useLocation();

  return (
    <HeaderWrap>
      <StateBar/>

      {/* pathname으로 메인/상세 탑 바 구분 */}
      {
        location.pathname === '/'
        ? <TopBarMain/>
        : location.pathname.startsWith('/detail')
          ? <TopBarDetail/>
          : null
      }
    </HeaderWrap>
  );
}

const HeaderWrap = styled.div`
  width: 100%;
  background: #fff;
`;

export default Header
