/* 탑 바(기본틀) - 로고  */
import { useNavigate } from 'react-router-dom';
import styled, {css} from 'styled-components';
import {useDispatch} from "react-redux";
import {toggleMenu} from "../../../store";

const TopBar = ({ detail }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return(
    <TopBarBox detail={detail}>
      <Logo src={process.env.PUBLIC_URL + '/image/logo.png'} onClick={() => {
        navigate('/');
        dispatch(toggleMenu(true));
      }}/>
    </TopBarBox>
  );
}

const TopBarBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 56px;
  position: relative;
  background: #fff;
  ${props => 
    props.detail &&
    css`
      border-bottom: 2px solid #D7352A;
    `}
`;

const Logo = styled.img`
  cursor: pointer;
`;

export default TopBar;
