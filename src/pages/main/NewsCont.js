/* (메인) 뉴스 컨텐츠 */
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import styled, {css} from 'styled-components';
import {ImgWrapper, Line} from "../../commonStyle";

const NewsCont = ({i}) => {
  let news = useSelector(state => state.news.data);
  let navigate = useNavigate();
  
  return (
    <>
      <NewsItem onClick={() => { navigate('/detail/'+news[i]?.source.id) }}>
        <ImgWrapper>
          <img src={
            news[i]?.image === null
            ? process.env.PUBLIC_URL + '/image/default_img.png'
            : news[i]?.image
          } alt={news[i]?.title}/>
        </ImgWrapper>
        <Title>{news[i]?.title}</Title>
        <Descript>{news[i]?.description}</Descript>
      </NewsItem>

      <Line />

      <RelatedNews>
        <RelatedTitle onClick={() => { navigate('/detail/'+news[i]?.source.id) }}>{news[i]?.title}</RelatedTitle>
      </RelatedNews>

      <Line />

      <RelatedNews lastItem={true}>
        <RelatedTitle onClick={() => { navigate('/detail/'+news[i]?.source.id) }}>{news[i]?.title}</RelatedTitle>
      </RelatedNews>
    </>
  );
}

const NewsItem = styled.div`
  width: 100%;
  cursor: pointer;
`;

const Title = styled.h4`
  margin: 16px 20px 8px;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const Descript = styled.p`
  margin: 8px 20px 16px;
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

const RelatedNews = styled.div`
  margin-top: 10px;
  cursor: pointer;
  ${props =>
  props.lastItem &&
  css`
      padding-bottom: 32px;
    `}
`;

const RelatedTitle = styled(Title)`
  margin: 11px 20px;
`;

export default NewsCont;
