import React, { lazy, Suspense } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import StateBar from './components/StateBar.js';
import MainNews from './pages/MainNews.js';
import CommentAll from './pages/CommentAll.js';
import Menu from './pages/Menu.js';
import TopBarDetail from './components/TopBarDetail.js';
import TopBarMenu from './components/TopBarMenu.js';

const DetailNews = lazy(() => import('./pages/DetailNews.js'));
const MyNews = lazy(() => import('./pages/MyNews.js'));
const MyComment = lazy(() => import('./pages/MyComment.js'));


const App = () => {
  return (
    <div className="App">
      <StateBar/> 

      <Suspense fallback={ <p className='loading'>Loading.. please wait for a moment!</p> }>
        <Routes>
          <Route path="/" element={<MainNews/>} />
  
          <Route path="/m" element={<TopBarMenu/>}>
            <Route path="menu" element={<Menu/>} />
            <Route path="my-news" element={<MyNews/>} />
            <Route path="my-comment" element={<MyComment/>} />
          </Route>
  
          <Route path="/detail" element={<TopBarDetail/>}>
            <Route path=":id" element={<DetailNews/>} />
            <Route path=":id/comment" element={<CommentAll/>} />
          </Route>
          
          <Route path="*" element={ <p className='loading'>Page Not Found.</p> } />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
