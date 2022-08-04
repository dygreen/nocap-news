# No Cap News
: 영어버전 뉴스앱을 위한 브랜치(en-ver) <br>
[News API](https://newsapi.org/) 에서 가져온 API는 로컬에서만 끌어올 수 있고 배포는 되지 않는 문제가 발생하여,
[GNews](https://gnews.io/) 에서 영어 버전의 뉴스앱을 제작하여 배포하고자 했다(한국어는 지원하지 않음).

```javascript
// GNews 사용 : 영어버전
useEffect(() => {
  const fetchData = async () => {
    setLoading(true); // 기사를 받아오는 중

    try {
      const res = await axios.get(`https://gnews.io/api/v4/top-headlines?topic=${category}&country=us&token=b58e30ef6a2623ef1c207061888987d8`);
      const JsonData = res.data.articles;
      dispatch(newsData(JsonData)); // redux로 결과 전달
      dispatch(newsIdSet(JsonData)); // redux로 결과 전달
      console.log(news);
    }
    catch (err){
      console.log('오류가 발생했습니다.');
    }

    setLoading(false); // 받아오기 완료/실패
  }
  fetchData();
},[category]);
```