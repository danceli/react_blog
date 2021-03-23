import React from 'react';
import './index.css'
import { getHomeArticle } from '@/http/Home/index.js'
import { filterTime } from '@/utils/'
class Home extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      page: 0,
      articleList:[],
      articleSize: null
    }
  }
  async componentDidMount() {
    await this.getArticle();
  }
  async loadMore() {
    this.setState({ page: this.state.page + 1 }, () => {
      this.getArticle();
    });
  }
  async getArticle() {
    const res = await getHomeArticle(this.state.page);
    if(!res.success) {
      alert('Place check your internet')
    } else {
      this.setState({ articleList: res.datas, articleSize: res.size })
    }
  }
  goArticleDetail(article) {
    this.props.history.push(`/article/${article.id}`)
  }
  render() {
    return (
      <div className="home-container">
        <div className="grid-container">
          { this.state.articleList.map(item => (
            <div className="grid-item" key={item.id} onClick={ () => this.goArticleDetail(item) }>
              <div className="top-img"><img src={item.article_img} /></div>
              <div className="bottom-container">
              <div className="title">{ item.article_title }</div>
              <div className="auth">{ item.article_auth }</div>
                <div className="grid-footer">
                  <span className="time" style={{flex: 1}}>{ filterTime(item.article_time) }</span>
                  <span style={{flex: 0.5}}><i className="iconfont icon-view-svg"></i>{ item.article_views }</span>
                  <span style={{flex: 0.5}}><i className="iconfont icon-icon-"></i>{ item.article_zan }</span>
                </div>
              </div>
            </div>
          )) }
        </div>
        { (this.state.articleSize != null) && (this.state.articleSize.length / 6 != 0) ? (
          <div className="load-more">
            <button onClick={() => this.loadMore()}>加载更多文章</button>
          </div>
        ) : null }
      </div>
    )
  }
}
export default Home