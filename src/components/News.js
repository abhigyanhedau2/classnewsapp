import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const defaultImage = "https://acadianakarate.com/wp-content/uploads/2017/04/default-image.jpg"

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalResults, setTotalResults] = useState(0);

  const capitalize = (str) => {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }

  document.title = `${capitalize(props.category)} - NewsMonkey`;

  useEffect(() => {
    updateNews();
  }, [])
  

  const getLoadingBarColor = () => {
    switch (props.category) {
      case "general":
        return "#107cfc";
      case "business":
        return "#70747c";
      case "entertainment":
        return "#ffc41c";
      case "health":
        return "#18a4b4";
      case "science":
        return "#000000";
      case "sports":
        return "#28a444";
      case "technology":
        return "#e03444";
      default:
        break;
    }
  }

  const updateNews = async () => {
    props.setLoadingBarColor(getLoadingBarColor());
    props.setProgress(10);

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

    setLoading(true);

    let data = await fetch(url);
    props.setProgress(30);

    let parsedData = await data.json();
    props.setProgress(60);

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    props.setProgress(100);
  }

  const componentDidMount = async () => {
    setPage(1);

    await updateNews();
  }

  const handlePreviousClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=aae0d9c248904c479273d48fa73cf68d&page=${page-1}&pageSize=${props.pageSize}`;

    // setState({loading: true});

    // let data = await fetch(url);

    // let parsedData = await data.json();

    // setState({
    //   articles: parsedData.articles,
    //   page: page - 1,
    //   loading: false
    // })

    setPage(page - 1);

    await updateNews();
  }

  const handleNextClick = async () => {
    // if(page+1 <= Math.ceil(totalResults/props.pageSize))
    // { 
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=aae0d9c248904c479273d48fa73cf68d&page=${page+1}&pageSize=${props.pageSize}`;

    // setState({loading: true});

    // let data = await fetch(url);

    // let parsedData = await data.json();

    // setState({
    //   articles: parsedData.articles,
    //   page: page + 1,
    //   loading: false
    // })
    // }
    setPage(page + 1);

    await updateNews();
  }

  const fetchMoreData = async () => {
    setPage(page + 1);

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

    let data = await fetch(url);

    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  return (
    <>
      <div className='container my-3'>

        <div className="headings text-center">
          <h1><b>NewsMonkey - Top Headlines </b> </h1>
          <h3 className='mt-3'>{capitalize(props.category)}</h3>
        </div>

        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((item) => {
                return <div className="col-md-4" key={item.url}>
                  <NewsItem title={item.title} description={item.description === null ? "" : item.description} imageURL={item.urlToImage === null ? defaultImage : item.urlToImage} newsURL={item.url} source={item.source.name} author={item.author} date={item.publishedAt} category={props.category} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </>
  )
}

News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "general"
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.string,
  category: PropTypes.string
}

export default News