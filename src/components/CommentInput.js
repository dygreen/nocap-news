/* (Detail) 댓글 입력창  */

import styled from 'styled-components';

const UserBox = styled.div`
  display: flex;
  width: 100%;
  margin: 8px 20px;
  img{
    width: 40px;
    height: 40px;
    margin: 16px 0 8px;
  }
  p{
    font-weight: 700;
    font-size: 14px;
    // line-height: 17px;
  }
`;



const CommentInput = () => {

  return(
    <>
      <UserBox>
        <img src={process.env.PUBLIC_URL + '/image/author.png'}/>
        <p>Dr.Saul Morar</p>
      </UserBox>
    </>


  );

}

export default CommentInput;