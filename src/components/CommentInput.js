/* (Detail) 댓글 입력창  */

import React, { useEffect } from "react";
import styled from 'styled-components';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const InputContainer = styled.div`
  position: fixed;
  top: 82px;
  width: 360px;
  height: 100%;
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

const Input = styled.textarea`
  width: 320px;
  height: 197px;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  margin: 8px 20px;
  box-sizing: border-box;
  text-indent: 8px;
  ::placeholder{
    font-weight: 400;
    font-size: 14px;
    color: #8C8C8C;
  }
  :focus{
    outline: 1px solid #D7352A;
  }
`;

const Button = styled.div`
  width: 54px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  color: #fff;
  background: #d7352a;
  border-radius: 4px;
  font-weight: 400;
  font-size: 14px;
  cursor: pointer;
  margin-left: 285px;
`;



const CommentInput = () => {

  let news = useSelector(state => state.news.data);
  let { id } = useParams();
  let clickedNews = news.find(data => data.source.id == id);
  let comment = useSelector(state => state.comment);

  // input 모달창이 뜨면 콘텐츠가 움직이지 않도록 함
  useEffect(() => {
    // 스크롤 막음
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
      
    // 스크롤 다시 돌려놓기(clean up function)
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);


  return(
    <InputContainer>
      <Title>{clickedNews.title}</Title>
      <Published>{clickedNews.publishedAt}</Published>
      <CommentCount><span>{comment.length}</span>개의 댓글</CommentCount>
      <UserBox>
        <img src={process.env.PUBLIC_URL + '/image/author.png'}/>
        <p>Dr.Saul Morar</p>
      </UserBox>
      <Input type={'text'} placeholder={'댓글을 입력해주세요.'} autoFocus maxLength={300}/>
      <Button>완료</Button>
    </InputContainer>


  );

}

export default CommentInput;