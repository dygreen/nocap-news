/* (메인) 왼쪽 상단 메뉴 아이콘 클릭시 나타나는 메뉴 */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const MenuWrap = styled.div`
  position: fixed;
  top: 80px;
  width: 100%;
  height: 100%;
  background: #fff;
  border-top: 2px solid #D7352A;
`;

const AuthorBox = styled.div`
  display: flex;
  margin: 8px 20px 0;
  width: 100%;
  height: 80px;
  img {
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
      margin: 0 0 0 8px;
    }
  }
`;

const MenuCategoryBox = styled.div`
  position: relative;
  height: 48px;
  margin: 0 20px;
  border-bottom: 1px solid #dfdfdf;
  box-sizing: border-box;
  cursor: pointer;
`;

const Icon = styled.img`
  position: absolute;
  top: 12px;
  left: 0px;
`;

const Text = styled.p`
  position: absolute;
  top: 15px;
  left: 32px;
  font-weight: 400;
  font-size: 12px;
  margin: 0;
`;

const Menu = () => {
  let navigate = useNavigate();

  // 메뉴 모달창이 뜨면 뒤에 콘텐츠가 움직이지 않도록 함
  useEffect(() => {
    // 스크롤 막음
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: hidden;
      width: 100%;`;

    // 스크롤 다시 돌려놓기(clean up function)
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return(
    <MenuWrap>
      <AuthorBox>
        <img src={process.env.PUBLIC_URL + '/image/author.png'}/>
        <AuthorInfo>
          <p>Dr.Saul Morar</p>
          <p>Joan_Jacobi@gmail.com</p>
        </AuthorInfo>
      </AuthorBox>

      <MenuCategoryBox onClick={() => navigate('/my-news')}>
        <Icon src={process.env.PUBLIC_URL + '/image/bookmark.png'}/>
        <Text>Favorites</Text>
      </MenuCategoryBox>

      <MenuCategoryBox onClick={() => navigate('/my-comment')}>
        <Icon src={process.env.PUBLIC_URL + '/image/comment_line.png'}/>
        <Text>My Comments</Text>
      </MenuCategoryBox>
    </MenuWrap>
  );
}

export default Menu;
