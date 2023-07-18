import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import CommentAll from './pages/CommentAll.js';
import './App.css';

const DetailNews = lazy(() => import('./pages/DetailNews.js'));
const MyNews = lazy(() => import('./pages/MyNews.js'));
const MyComment = lazy(() => import('./pages/MyComment.js'));

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={ <p className='loading'>Loading.. please wait for a moment!</p> }>
        <Routes>
          <Route path="/" element={<Home/>} />

          {/* 즐겨찾기 */}
          <Route path="my-news" element={<MyNews/>} />
          {/* 내가 남긴 댓글 */}
          <Route path="my-comment" element={<MyComment/>} />

          <Route path="/detail">
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
