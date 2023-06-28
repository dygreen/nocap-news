/* (App) 최상단 상태 바 */

import styled from 'styled-components';

const StateBarBox = styled.div`
  width: 100%;
  height: 24px;
  background: #fff;
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