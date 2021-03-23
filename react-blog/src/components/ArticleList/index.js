import React from 'react';
import { filterTime } from '@/utils'
import { withRouter } from 'react-router-dom'
import './index.css'
const ArticleList = (props) => {
  const goArticleDetail = ({ id }) => {
    props.history.push(`/article/${id}`)
  }
  return (
    <ul className="list">
      {props.articleList.map(item => (
        <li key={item.id}>
          <div className="list-item">
            <div className="list-meta">
              <span className="auth item">{ item.article_auth }</span>
              <span className="time item">{ filterTime(item.article_time) }</span>
              <span className="list-type item">{ item.article_type }</span>
            </div>
            <div className="title-row" onClick={ () => goArticleDetail(item) }><span>{ item.article_title }</span></div>
            <div className="action-list">
              <span onClick={ () => props.likeOne(item.id, item.article_zan, item.article_liked) }><i className={item.article_liked ? 'iconfont icon-icon- like' : 'iconfont icon-icon-'}></i>{ item.article_zan }</span>
              <span><i className="iconfont icon-pinglun"></i>{ item.article_views }</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
export default withRouter(ArticleList)