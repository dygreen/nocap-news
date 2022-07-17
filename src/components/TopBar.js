/* 탑 바(기본틀) - 로고  */

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TopBarBox = styled.div`
  width: 100%;
  height: 56px;
  position: relative;
  background: #fff;
`;

const Logo = styled.img`
  position: absolute;
  top: 17px;
  left: 125px;
  cursor: pointer;
`;

const TopBar = () => {

  let navigate = useNavigate();

  return(
    <TopBarBox>
      <Logo src={process.env.PUBLIC_URL + '/image/logo.png'} onClick={() => { navigate('/') }}/>
    </TopBarBox>
  );

}

export default TopBar;