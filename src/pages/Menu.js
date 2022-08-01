/* (메인) 왼쪽 상단 메뉴 아이콘 클릭시 나타나는 메뉴 */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const Logo = styled.img`
  position: absolute;
  top: 41px;
  left: 125px;
  cursor: pointer;
  z-index: 1000;
`;

const MenuBox = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  padding-top: 80px;
`;

const AuthorBox = styled.div`
  display: flex;
  margin: 0 20px;
  width: 100%;
  height: 80px;
  margin-top: 8px;
  img{
    width: 40px;
    height: 40px;
    margin: 20px 0 20px;
  }
`;

const AuthorInfo = styled.div`
  p {
    &:first-child {
      font-weight: 400;
      font-size: 12px;
      line-height: 17px;
      margin: 23px 0 0 8px;
    }
    &:last-child {
      font-weight: 400;
      font-size: 12px;
      line-height: 17px;
      color: #8C8C8C;
      margin: 0;
      margin-left: 8px;
    }
  }
`;

const MenuCategoryBox = styled.div`
  position: relative;
  width: 320px;
  height: 48px;
  margin: 0 20px;
  border-bottom: 1px solid #dfdfdf;
  box-sizing: border-box;
`;

const Icon = styled.img`
  position: absolute;
  top: 12px;
  left: 0px;
  cursor: pointer;
`;

const Text = styled.p`
  position: absolute;
  top: 15px;
  left: 32px;
  font-weight: 400;
  font-size: 12px;
  margin: 0;
  cursor: pointer;
`;

const CheckBox = styled.img`
  position: absolute;
  top: 12px;
  right: 0px;
  cursor: pointer;
`;

const LogoutBtn = styled.button`
  position: absolute;
  bottom: 40px;
  left: 20px;
  width: 320px;
  height: 37px;
  border: 1px solid #8C8C8C;
  color: #8C8C8C;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
`;


const Menu = () => {

  // 메뉴 모달창이 뜨면 뒤에 콘텐츠가 움직이지 않도록 함
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

  let navigate = useNavigate();


  return(
    <>
      <Logo src={process.env.PUBLIC_URL + '/image/logo.png'} onClick={() => { navigate('/') }}/>

      <MenuBox>

        <AuthorBox>
          <img src={process.env.PUBLIC_URL + '/image/author.png'}/>
          <AuthorInfo>
            <p>Dr.Saul Morar</p>
            <p>Joan_Jacobi@gmail.com</p>
          </AuthorInfo>
        </AuthorBox>

        <MenuCategoryBox onClick={() => navigate('/m/my-news')}>
          <Icon src={process.env.PUBLIC_URL + '/image/bookmark.png'}/>
          <Text>즐겨찾기</Text>
        </MenuCategoryBox>

        <MenuCategoryBox onClick={() => navigate('/m/my-comment')}>
          <Icon src={process.env.PUBLIC_URL + '/image/comment_line.png'}/>
          <Text>내가 남긴 댓글</Text>
        </MenuCategoryBox>

        <MenuCategoryBox>
          <Icon src={process.env.PUBLIC_URL + '/image/darkmode.png'}/>
          <Text>다크모드</Text>
          <CheckBox src={process.env.PUBLIC_URL + '/image/check_blank.png'}/>
        </MenuCategoryBox>

        <LogoutBtn>로그아웃</LogoutBtn>

      </MenuBox>
    </>
  );

}

export default Menu;