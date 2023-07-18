import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 300;
`;

export const ContentsWrapper = styled.div`
  position: relative;
  z-index: 100;
`;

export const Line = styled.div`
  height: 1px;
  margin: 0 20px;
  background: #d9d9d9;
`;

export const BackIcon = styled.img`
  position: absolute;
  top: 40px;
  left: 20px;
  cursor: pointer;
`;

export const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  
  > img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

export const MoreBtn = styled.img`
  position: absolute;
  right: 10px;
  cursor: pointer;
`;

// 상세 페이지
export const DetailTitle = styled.div`
  margin: 0px 20px 8px;
  padding-top: 24px;
  font-size: 24px;
  font-weight: 900;
  line-height: 36px;
  letter-spacing: -0.3px;
`;

export const Published = styled.div`
  margin: 0px 20px 24px;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: #8C8C8C;
`;

// 즐겨찾기, 내가 남긴 댓글
export const MyContainer = styled.div`
  width: 100%;
`;

export const MyContents = styled.div`
  margin: 104px 20px 24px;
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