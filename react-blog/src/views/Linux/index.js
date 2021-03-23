import React, { useState, useEffect } from 'react';
import './index.css';
import ArticleList from '@/components/ArticleList'
import { getArticle, addLike } from '@/http/Linux/'

const Linux = (props) => {
  const [page, setPage] = useState(0);
  const [articleList, setArticleList] = useState([]);
  const [articleSize, setArticleSize] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await getArticleList();
    }
    fetchData();
  },[])
  const getArticleList = async () => {
    const { data } = await getArticle(page);
    if(data.success) {
      setArticleList([...data.datas]);
      setArticleSize(data.size);
    }
  }
  const likeOne = async (id, zan, liked) => {
    const { success } = await addLike(id, zan, liked);
    if(success) {
      getArticleList();
    }
  }
  const loadMore = () => {
    setPage(page + 1);
    getArticleList();
  }
  return (
    <div className="linux-container">
      <ArticleList articleList={ articleList } likeOne={ likeOne } />
      { (articleSize != null) && (articleSize > 6) ? (
        <div className="load-more">
          <button onClick={ () => loadMore() }>加载更多</button>
        </div>
      ) : null } 
    </div>
  )
  
}
export default Linux


// async componentDidMount() {
//   await this.getArticleList();
// }


