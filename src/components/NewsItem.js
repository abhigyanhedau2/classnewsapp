import React, { Component } from 'react';

export class NewsItem extends Component {

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

  render() {

    const {title, description, imageURL, newsURL, source, author, date} = this.props;

    let extendedDescription = description.slice(0, 100)+"..."

    return (
      <div className='my-5'>
          <div className="card" style={{width: '20rem'}}>
          <img src={imageURL} className="card-img-top" width="286px" height="180px" />
          <div className="card-body">
            <h5 className="card-titlet">{title}</h5>
            <p className='mt-3'><b>Author:  </b>{author?author:source}</p>
            <p><b>Source:  </b>{source?source:author}</p>
            <p><b>Date:  </b>{new Date(date).toGMTString()}</p>
            <p className="card-text">{description.length <= 100 ? description : extendedDescription}</p>
            <a href={newsURL} target="_blank" className={`btn btn-sm btn-${this.buttonColor()}`}>Read More..</a>
          </div>
        </div>

      </div>
    )
  }
}

export default NewsItem