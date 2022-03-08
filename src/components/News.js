import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = 
  {
    country: "in",
    pageSize: 9,
    category: "general"
  }

  static propTypes = 
  {
    country: PropTypes.string,
    pageSize: PropTypes.string,
    category: PropTypes.string
  }

  defaultImage = "https://acadianakarate.com/wp-content/uploads/2017/04/default-image.jpg"

  constructor()
  {
    super();
    
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      pageSize: 12,
      totalResults: 0
    }
  }

  getLoadingBarColor = () => 
  {
    switch (this.props.category) 
    {
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

  async updateNews()
  {
    this.props.setLoadingBarColor(this.getLoadingBarColor());
    this.props.setProgress(10);
    
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    this.setState({loading: true});
    
    let data = await fetch(url);
    this.props.setProgress(30);
    
    let parsedData = await data.json();
    this.props.setProgress(60);
    
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    
    this.props.setProgress(100);
  }

  async componentDidMount()
  {
    await this.setState({
      page: 1
    })

    await this.updateNews();
  }

  handlePreviousClick = async () => 
  {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aae0d9c248904c479273d48fa73cf68d&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;

    // this.setState({loading: true});

    // let data = await fetch(url);

    // let parsedData = await data.json();

    // this.setState({
    //   articles: parsedData.articles,
    //   page: this.state.page - 1,
    //   loading: false
    // })

    await this.setState({
      page: this.state.page-1
    })

    await this.updateNews();
  }
  
  handleNextClick = async () => 
  {
    // if(this.state.page+1 <= Math.ceil(this.state.totalResults/this.props.pageSize))
    // { 
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aae0d9c248904c479273d48fa73cf68d&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      
      // this.setState({loading: true});
      
      // let data = await fetch(url);
      
      // let parsedData = await data.json();
      
      // this.setState({
        //   articles: parsedData.articles,
        //   page: this.state.page + 1,
        //   loading: false
        // })
      // }
      await this.setState({
        page: this.state.page+1
      })

      await this.updateNews();
    }
    
  buttonColor = () => 
  {
    switch (this.props.category) 
    {
      case "general":
        return "primary";
      case "business":
        return "secondary";
      case "entertainment":
        return "warning";
      case "health":
        return "info";
      case "science":
        return "dark";
      case "sports":
        return "success";
      case "technology":
        return "danger";    
      default:
        break;
    }
  }

  capitalize = (str) => 
  {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }

  fetchMoreData = async () => 
  {
    this.setState({
      page: this.state.page+1
    })

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);

    let parsedData = await data.json();

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
    })
  };

  render() {
    return (
      <>
      <div className='container my-3'>
          
          <div className="headings text-center">
            <h1><b>NewsMonkey - Top Headlines </b> </h1>
            <h3 className='mt-3'>{this.capitalize(this.props.category)}</h3>
          </div>

          {this.state.loading && <Spinner />}

            <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner/>}
            >
            <div className="container">
              <div className="row">
                {this.state.articles.map((item) => {
                  return <div className="col-md-4" key={item.url}>
                          <NewsItem title={item.title} description={item.description === null ? "" : item.description} imageURL={item.urlToImage === null ? this.defaultImage : item.urlToImage} newsURL={item.url} source={item.source.name} author={item.author} date={item.publishedAt} category={this.props.category} />
                        </div> 
                })}      
              </div>
            </div>
            </InfiniteScroll>             
      </div>
      </>
    )
  }
}

export default News