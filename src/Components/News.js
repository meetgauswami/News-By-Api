import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) =>  {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

useEffect(() => {
  document.title = "NewsMonkey - " +props.category;
  updateNews();
  // eslint-disable-next-line
}, [])

const  updateNews = async  () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    setLoading(true)
    let data =await fetch(url);
   props.setProgress(30);
    let parseData = await data.json();
   props.setProgress(50);
   setArticles(parseData.articles);
   setTotalResults(parseData.totalResults);
   setLoading(false)
   props.setProgress(100);
   return () => {};
  }

 const handlePrevClick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country
      }&category=${props.category
      }&apiKey=${props.apiKey}&page=${page - 1
      }&pageSize=${props.pageSize}`;
      setLoading(true)
    let data = await fetch(url);
    let parseData = await data.json();
    setPage(page - 1)
    setArticles(parseData.articles)
    setLoading(false)
  };

 const handleNextClick = async () => {
    console.log("Next");
    if (
      !(
        page + 1 >
        Math.ceil(totalResults /props.pageSize)
      )
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country
        }&category=${props.category
        }&apiKey=${props.apiKey}&page=${page + 1
        }&pageSize=${props.pageSize}`;
        setLoading(true)
      let data = await fetch(url);
      let parseData = await data.json();
      setPage(page+1)
      setArticles(parseData.articles)
      setLoading(false)
    }
  };

  const fetchMoreData = async () => {
    setPage(page + 1)
    if (
      !(page + 1 > Math.ceil(totalResults /props.pageSize)
      )
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country
        }&category=${props.category
        }&apiKey=${props.apiKey}&page=${page + 1
        }&pageSize=${props.pageSize}`;
        setPage(page+1)
      let data = await fetch(url);
      let parseData = await data.json();
      setArticles( articles.concat(parseData.articles))
      setTotalResults(parseData.totalResults)
    }
  };

    return (
      <>
        <h1 className="text-center" style={{marginTop: '6pc'}}>NewsMonkey - Top Headlines</h1>
        <h2 className="text-center" style={{marginBottom:'3pc'}}>
          Total Results : "{totalResults} {props.categoryh2}"
        </h2>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >

          <div className="container">
            <div className="row">
              {articles?.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={element.description ? element.description : ""}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author ? element.author : "Unknown"}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

      </>
    );
  
}


News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
