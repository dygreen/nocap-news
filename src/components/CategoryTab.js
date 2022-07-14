/* (메인) 뉴스 카테고리 */

import React, { useState } from "react";
import styled from 'styled-components';

const categories = [ /* 카테고리 array */
  { 
    name : '', 
    text : '전체' 
  }, 
  {
    name: 'business',
    text: '비즈니스'
  },
  {
    name: 'entertainment',
    text: '엔터'
  },
  {
    name: 'health',
    text: '건강'
  },
  {
    name: 'science',
    text: '과학'
  },
  {
    name: 'sports',
    text: '스포츠'
  },
  {
    name: 'technology',
    text: '테크'
  }
];

const TabContainer = styled.div`
  width: 360px;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;


const TabBox = styled.div`
  display: flex;
  width: 381px;
  height: 34px;
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
  padding: 7px 10px 8px;
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


const CategoryTab = ({setCategory}) => {

  const [currentTab, setCurrentTab] = useState(0); 

  const selectTabHandler = (index) => {
    setCurrentTab(index);
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
              setCategory(tabs.name);
              selectTabHandler(i);
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