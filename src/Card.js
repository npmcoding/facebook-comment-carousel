import React from 'react';
import './fb-comments.css';

export default function Card({ data }) {

  let commentTextSize = "";
  if (data.comment.length < 100) { commentTextSize = " short" }
  else if (data.comment.length > 400) { commentTextSize = " long" }

  return (
    <div className="fb-comment-card">
        <div className="fb-comment-logo"><a href="https://www.facebook.com/totallytrips/"><i className="fa fa-facebook-square"></i></a></div>
        <div className="fb-comment-monogram">{data.name[0]}</div>
        <div className="fb-comment-header">
          <span className="fb-comment-name"><a href={data.url}>{data.name}</a></span>

          {data.type === 'recommendation' ?
            <span className="fb-comment-recommendation">recommends Totally Trips</span>
            : <span className="fb-comment-rating">
              {
                [...Array(parseInt(data.rating, 10))].map((e, i) => <i className="fa fa-star" key={i} />)
              }
            </span>
          }
        <div className="fb-comment-date">{data.date}</div>
      </div>
      <div className={"fb-comment-text" + commentTextSize}>{data.comment}</div>
    </div>
  )
}