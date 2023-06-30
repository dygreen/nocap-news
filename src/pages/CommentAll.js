/* (Detail) 댓글 입력창  */

import React from "react";
import styled from 'styled-components';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import InputTemplate from "./detail/InputTemplate.js";
import CommentList from "./detail/CommentList.js";

const AllContainer = styled.div`
  margin-top: 80px;
  width: 360px;
  overflow: hidden;
  background: #fff;
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

const CommentCount = styled.div`
  width: 100%;
  margin: 0px 20px;
  font-weight: 700;
  font-size: 16px;
  span{
    color: #8C8C8C;
    letter-spacing: -0.1px;
    margin-right: 4px;
  }
`;

const UserBox = styled.div`
  display: flex;
  width: 100%;
  margin: 8px 20px 0px;
  img{
    width: 40px;
    height: 40px;
  }
  p{
    font-weight: 700;
    font-size: 14px;
    line-height: 40px;
    margin: 0px 8px;
  }
`;


const CommentAll = () => {

  let news = useSelector(state => state.news.data);
  let { id } = useParams();
  let clickedNews = news.find(data => data.source.id == id);
  let comment = useSelector(state => state.comment);


  return(
    <AllContainer>
      <Title>{clickedNews.title}</Title>
      <Published>{clickedNews.publishedAt}</Published>

      <CommentCount><span>{comment.length}</span>개의 댓글</CommentCount>

      <UserBox>
        <img src={process.env.PUBLIC_URL + '/image/author.png'}/>
        <p>Dr.Saul Morar</p>
      </UserBox>

      {/* 댓글 입력창을 누르면 큰 입력창 등장 */}
      <InputTemplate />

      {
        comment.map((a,i) => <CommentList i={i} key={i} />)
      }

    </AllContainer>
  );

}

export default CommentAll;
