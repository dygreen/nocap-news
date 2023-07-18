import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Router 페이지간 이동시 스크롤 맨 위로 올리기
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}
