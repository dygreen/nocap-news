/* (메인) 뉴스 컨텐츠 html */

import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';

const NewsItem = styled.div`
  width: 100%;
  cursor: pointer;
`;

const Img = styled.img`
  width: inherit;
  height: 240px;
`;

const Title = styled.h4`
  width: 320px;
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
  width: 320px;
  margin: 8px 20px 16px;
  font-weigth: 500;
  font-size: 12px;
  line-height: 17px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

const Line = styled.div`
  width: 320px;
  height: 1px;
  margin-left: 20px;
  background: #d9d9d9;
`;

const RelatedNews = styled.div`
  width: 320px;
  margin: 10px 0;
  cursor: pointer;
`;

const RelatedTitle = styled(Title)`
  margin: 11px 20px;
`;



const NewsCont = ({news, i, newsIdSet}) => {

  let navigate = useNavigate();

  newsIdSet();
  
  return(
    <>
      <NewsItem onClick={() => { navigate('/detail/'+news.source.id) }}>
        <Img src={
          news.urlToImage == null
          ? process.env.PUBLIC_URL + '/image/default_img.png'
          : news.urlToImage
        }/>
        <Title>{news.title}</Title>
        <Descript>{news.description}</Descript>
      </NewsItem>
      <Line />
      <RelatedNews>
        <RelatedTitle>{news.title}</RelatedTitle>
      </RelatedNews>
      <Line />
      <RelatedNews style={{marginBottom: '32px'}}>
        <RelatedTitle>{news.title}</RelatedTitle>
      </RelatedNews>
    </>
  );
}

export default NewsCont;