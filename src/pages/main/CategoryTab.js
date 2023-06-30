/* (메인) 뉴스 카테고리 */
import {useDispatch, useSelector} from "react-redux";
import {settingCategory} from "../../store";
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

const CategoryTab = () => {
  const dispatch = useDispatch();
  const category = useSelector(state => state.menu.category);

  return (
    <TabContainer>
      <TabBox>
        {
          categories.map(tabs =>
            <TabItem
              key={tabs.name}
              style={category === tabs.name ? selectedTab : null}
              onClick={() => { dispatch(settingCategory(tabs.name)) }}
            >
              {tabs.text}
            </TabItem>
          )
        }
      </TabBox>
    </TabContainer>
  );
}

export default CategoryTab;
