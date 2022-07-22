/* (App) 최상단 상태 바 */

import styled from 'styled-components';

const StateBarBox = styled.div`
  position: fixed;
  top: 0;
  width: 360px;
  height: 24px;
  background: #fff;
  z-index: 9999;
`;

const State = styled.img`
  position: absolute;
  top: 7px;
  right: 8px;
`;


const StateBar = () => {

  return(
    <StateBarBox>
      <State src={process.env.PUBLIC_URL + '/image/state.png'}/>
    </StateBarBox>
  );
}

export default StateBar;