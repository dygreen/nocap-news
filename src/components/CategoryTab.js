/* (메인) 뉴스 카테고리 */

import React, { useState } from "react";
import styled from 'styled-components';

const categories = [ /* 카테고리 array */
  { 
    name : '', 
    text : 'world' 
  }, 
  {
    name: 'business',
    text: 'business'
  },
  {
    name: 'entertainment',
    text: 'entertainment'
  },
  {
    name: 'health',
    text: 'health'
  },
  {
    name: 'science',
    text: 'science'
  },
  {
    name: 'sports',
    text: 'sports'
  },
  {
    name: 'technology',
    text: 'tech'
  }
];

const TabContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const TabBox = styled.div`
  display: flex;
  width: 100%;
  height: 28px;
  margin-top: 8px;
  padding-left: 20px;
  border-bottom: 2px solid #D7352A;
  box-sizing: content-box;
`;

const TabItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px 10px 6px;
  font-weight: 400;
  font-size: 14px;
  color: #8C8C8C;
  cursor: pointer;
`;

const selectedTab = {
  background: '#D7352A',
  borderRadius: '10px 10px 0px 0px',
  fontWeight: '700',
  color: '#FFFFFF',
};


// localStorage
const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
  }
};


const CategoryTab = ({setCategory}) => {

  const [currentTab, setCurrentTab] = useState(jsonLocalStorage.getItem('num')); 

  const selectTabHandler = (index) => {
    setCurrentTab(index);
  };

  const settingLocal = (key, value) => {
    jsonLocalStorage.removeItem(key);
    jsonLocalStorage.setItem(key, value);
  };


  return(
    <TabContainer>
      <TabBox>
        {
          categories.map((tabs,i) => 
            <TabItem style={
              currentTab === i ? selectedTab : null
            }
            onClick={() => {
              window.scrollTo(0, 0); // 카테고리 탭을 누를 때마다 페이지 맨 위로
              // 선택한 카테고리 저장
              settingLocal('category', tabs.name);
              setCategory(jsonLocalStorage.getItem('category'));
              // 선택한 카테고리 index 저장(style)
              settingLocal('num', i);
              selectTabHandler(jsonLocalStorage.getItem('num'));
            }} 
            key={i}
            >{tabs.text}</TabItem>
          )
        }
      </TabBox>
    </TabContainer>
  );

}

export default CategoryTab;