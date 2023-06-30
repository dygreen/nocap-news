/* (Detail, Comment) 댓글 입력창 누르면 큰 입력창 등장 + 글자수 세기 + 댓글 등록(redux) */
import React, { useState, useDeferredValue } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContent } from "../store.js";
import styled from 'styled-components';

const InputWrap = styled.div`
  margin: 8px 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #dfdfdf;
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
  width: 100%;
  height: 197px;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  box-sizing: border-box;
  text-indent: 8px;
  padding: 5px;
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  div{
    &:first-child{
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #8C8C8C;
      margin-left: 10px;
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
    }
  }
`;

const InputTemplate = () => {
  let dispatch = useDispatch();
  let [inputChange, setInputChange] = useState(false);

  // 글자수 세기
  let [count, setCount] = useState('');
  // 성능개선: 글자수 세기의 실행시점을 뒤로 옮겨 반응속도 높이기
  let countResult = useDeferredValue(count);

  let comment = useSelector(state => state.comment);
  // 댓글 추가
  let [content, setContent] = useState('');

  // 현재 날짜 구하기
  let today = new Date();
  let todayFull = {
    year : today.getFullYear(),
    month : ("0" + (1 + today.getMonth())).slice(-2),
    date : ("0" + today.getDate()).slice(-2)
  };

  return(
    <InputWrap>
      {
        !inputChange
        ? <Input
            type={'text'}
            placeholder={'Please enter your comment.'}
            onClick={() => {setInputChange(!inputChange)}}
          />
        : ( /* 큰 입력창 + 글자수 세기 + 댓글 등록(redux) */
        <>
          <InputChange
            type={'text'}
            placeholder={'Please enter your comment.'}
            autoFocus
            maxLength={300}
            onChange={(e) => {
              setCount(e.target.value.length); // 글자수
              setContent(e.target.value); // 댓글내용
            }}
          />
          <InputBottom>
            <div>{ countResult === '' ? 0 : countResult }/300</div>
            <div
              onClick={() => dispatch(addContent({ // 댓글 데이터 redux로 전송
                id : comment.length + 1,
                user : 'Dr.Saul Morar',
                date : `${todayFull.year}-${todayFull.month}-${todayFull.date}`,
                content : content
              })
            )}>POST</div>
          </InputBottom>
        </>
        )
      }
    </InputWrap>
  );
};

export default InputTemplate;
