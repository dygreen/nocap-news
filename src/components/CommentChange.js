/* (Detail, Comment) 댓글 입력창 누르면 큰 입력창 등장 + 글자수 세기 + 댓글 등록(redux) */

import React, { useState, useDeferredValue } from "react";
import styled from 'styled-components';


const Input = styled.input`
  width: 310px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #dfdfdf;
  margin: 8px 20px;
  box-sizing: border-box;
  text-indent: 8px;
  ::placeholder{
    font-weight: 400;
    font-size: 14px;
    padding: 11px 0px;
    color: #8C8C8C;
  }
  :focus{
    outline: 1px solid #D7352A;
  }
`;

const InputChange = styled.textarea`
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

const InputBottom = styled.div`
  width: 360px;
  display: flex;
  justify-content: space-between;
  div{
    &:first-child{
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #8C8C8C;
      margin-left: 20px;
    }
    &:last-child{
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
      margin-right: 20px;
    }
  }
`;



const CommentChange = () => {
  let [inputChange, setInputChange] = useState(false);
  let [count, setCount] = useState(''); // 글자수 세기
  let countResult = useDeferredValue(count); // 성능개선: 글자수 세기의 실행시점을 뒤로 옮겨 반응속도 높이기


  return(
    <>
      {
        inputChange === false
        ? <Input type={'text'} placeholder={'댓글을 입력해주세요.'} onClick={() => {setInputChange(!inputChange)}}/>

        : (
        <>
          {/* 큰 입력창 + 글자수 세기 + 댓글 등록(redux) */}
          <InputChange type={'text'} placeholder={'댓글을 입력해주세요.'} autoFocus maxLength={300} onChange={(e) => {setCount(e.target.value.length)} }/>
          <InputBottom>
            <div>{
            countResult === ''
            ? 0
            : countResult}/300
            </div>
            <div>완료</div>
          </InputBottom>
        </>
        )
      }
    </>
  );

};

export default CommentChange;