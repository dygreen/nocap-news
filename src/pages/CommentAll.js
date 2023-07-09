/* (Detail) 댓글 입력창  */
import React from "react";
import styled from 'styled-components';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import InputTemplate from "./detail/InputTemplate.js";
import CommentList from "./detail/CommentList.js";
import Header from "../layout/Header/Header";
import {HeaderWrapper, ContentsWrapper, DetailTitle, Published} from "../commonStyle";

const CommentAll = () => {
  let news = useSelector(state => state.news.data);
  let comment = useSelector(state => state.comment);
  let { id } = useParams();
  let clickedNews = news.find(data => data.source.id === Number(id));

  return (
    <>
      <HeaderWrapper>
        <Header/>
      </HeaderWrapper>

      <ContentsWrapper>
        <DetailTitle>{clickedNews.title}</DetailTitle>
        <Published>{clickedNews.publishedAt}</Published>

        <CommentCount><span>{comment.length}</span>개의 댓글</CommentCount>

        <UserBox>
          <img src={process.env.PUBLIC_URL + '/image/author.png'} alt={clickedNews.title}/>
          <p>Dr.Saul Morar</p>
        </UserBox>

        {/* 댓글 입력창을 누르면 큰 입력창 등장 */}
        <InputTemplate/>

        {/* Start : 댓글 리스트 */}
        {
          comment.map((a, i) => <CommentList i={i} key={i}/>)
        }
        {/* End : 댓글 리스트 */}
      </ContentsWrapper>
    </>
  );
}

const CommentCount = styled.div`
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

export default CommentAll;
