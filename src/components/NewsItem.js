import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {

    const {title, description, imageURL, newsURL} = this.props;

    return (
      <div className='my-5'>
          
          <div className="card" style={{width: '18rem'}}>
          <img src={imageURL} className="card-img-top" />
          <div className="card-body">
            <h5 className="card-titlet">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsURL} className="btn btn-sm btn-primary">Read More..</a>
          </div>
        </div>

      </div>
    )
  }
}

export default NewsItem