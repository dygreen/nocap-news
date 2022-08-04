/* detail 페이지 : 뉴스 기사 자세히 */

import React from "react";
import styled from 'styled-components';
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import TopBarDetail from "../components/TopBarDetail.js";
import CommentList from '../components/CommentList.js';
import InputTemplate from "../components/InputTemplate.js";

const DetailContainer = styled.div`
  width: 360px;
  overflow: hidden;
`;

const DetailCont = styled.div`
  margin-top: 80px;
`;

const Title = styled.div`
  margin: 0px 20px 8px;
  padding-top: 24px;
  font-size: 24px;
  font-weight: 900;
  line-height: 36px;
  letter-spacing: -0.3px;
`;

const Published = styled.div`
  margin: 0px 20px 24px;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: #8C8C8C;
`;

const Img = styled.img`
  width: 360px;
  height: 240px;
`;

const Url = styled(Published)`
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;

const Descript = styled.div`
  margin: 24px 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
`;

const AuthorBox = styled.div`
  display: flex;
  margin: 0 20px 24px;
  height: 40px;
`;

const AuthorInfo = styled.div`
  p {
    &:first-child {
      font-weight: 400;
      font-size: 12px;
      line-height: 17px;
      margin: 3px 0 0 8px;
    }
    &:last-child {
      font-weight: 400;
      font-size: 12px;
      line-height: 17px;
      color: #8C8C8C;
      margin: 0;
      margin-left: 8px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  }
`;

const Line = styled.div`
  width: 320px;
  height: 1px;
  margin-left: 20px;
  background: #d9d9d9;
`;

const RelatedTitle = styled.div`
  margin: 11px 20px;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const CommentCount = styled.div`
  width: 100%;
  margin: 35px 20px 0px;
  font-weight: 700;
  font-size: 16px;
  span{
    color: #8C8C8C;
    letter-spacing: -0.1px;
    margin-right: 4px;
  }
`;

const CommentDefault = styled.div`
  max-height: calc(131px*3);
  overflow-y: hidden;
`;

const ShowMoreBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  p{
    width: 43px;
    height: 17px;
    font-weight: 400;
    font-size: 12px;
    margin: 8px 20px 0px;
  }
`;

const RelatedImgTitleBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 20px;
  img{
    width: 84px;
    height: 56px;
    margin: 8px 0px;
  }
  p{
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    margin-left: 8px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
`;


const DetailNews = () => {

  let news = useSelector(state => state.news.data);
  let comment = useSelector(state => state.comment);
  let { id } = useParams(); // 현재 URL에 적힌 모든 파라미터를 object형식으로 저장해주는 함수
  let clickedNews = news.find(data => data.source.id == id); // 현재 URL의 /:id에 적힌 값과 데이터의 id 값이 같은지 비교, 참이면 변수에 저장함 -> html 표시
  let navigate = useNavigate();


  return(
    <DetailContainer>
      <TopBarDetail/>
      
      <DetailCont>
        <Title>{clickedNews.title}</Title>
        <Published>{clickedNews.publishedAt}</Published>
        <Img src={
          clickedNews.image == null
          ? process.env.PUBLIC_URL + '/image/default_img.png'
          : clickedNews.image
        }/>
        <Url>{clickedNews.url}</Url>
        <Descript>{clickedNews.description}</Descript>

        <AuthorBox>
          <img src={process.env.PUBLIC_URL + '/image/userface.png'}/>
          <AuthorInfo>
            <p>{clickedNews.source.name}</p>
            <p>{clickedNews.source.url}</p>
          </AuthorInfo>
        </AuthorBox>

        <Line />
        <RelatedTitle>{clickedNews.title}</RelatedTitle>
        <Line />
        <RelatedTitle>{clickedNews.title}</RelatedTitle>

        <CommentCount><span>{comment.length}</span>comments</CommentCount>
        <InputTemplate /> {/* 댓글 입력창을 누르면 큰 입력창 등장 */}
        
        <CommentDefault> {/* 댓글.... */}
          { 
            comment.map((a,i) => <CommentList i={i} key={i} />)
          }
        </CommentDefault>

        {/* 더보기를 누르면 댓글 페이지로 이동 */}
        <ShowMoreBtn>
          <p onClick={() => navigate(`/detail/${id}/comment`)}>MORE &gt;</p>
        </ShowMoreBtn>

        {/* 관련 뉴스 + 이미지 */}
        <Line style={{marginTop: "24px"}}/>
        <RelatedImgTitleBox>
          <img src={clickedNews.image} />
          <p>{clickedNews.title}</p>
        </RelatedImgTitleBox>
        <Line />
        <RelatedImgTitleBox>
          <img src={clickedNews.image} />
          <p>{clickedNews.title}</p>
        </RelatedImgTitleBox>

        <Line />
        <RelatedTitle>{clickedNews.title}</RelatedTitle>
        <Line />
        <RelatedTitle style={{marginBottom: "90px"}}>{clickedNews.title}</RelatedTitle>

      </DetailCont>
    </DetailContainer>
  );

}

export default DetailNews;