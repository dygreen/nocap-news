import styled from 'styled-components';

export const BackIcon = styled.img`
  position: absolute;
  top: 40px;
  left: 20px;
  cursor: pointer;
`;

// 즐겨찾기, 내가 남긴 댓글
export const MyContainer = styled.div`
  width: 100%;
`;

export const MyHeader = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  background: #fff;
  border-bottom: 2px solid #D7352A;
  z-index: 300;
`;

export const MyTitle = styled.div`
  height: 56px;
  line-height: 56px;
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
`;

export const MyContentsTitle = styled.div`
  width: 100%;
  font-weight: ${props => props.mynews ? 700 : 400};
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

export const MyDate = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: #8C8C8C;
`;