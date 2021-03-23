import { use } from 'marked';
import React, { useState, useEffect } from 'react';
import './index.css';
import { getAigorithms } from '@/http/aigorithms'
import { addLike } from '@/http/Linux/'
import articleList from '@/components/ArticleList'
import ArticleList from '../../components/ArticleList';
const Aigorithms = (props) => {
  const [page, setPage] = useState(0);
  const [articleList, setArticleList] = useState([]);
  const [articleSize, setArticleSize] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await getArticleList()
    }
    fetchData();
  },[page])
  const getArticleList = async () => {
    const { success, datas, size } = await getAigorithms(page);
    if(success) {
      setArticleSize(size);
      setArticleList([...datas]);
    }
  }
  const loadMore = async () => {
    setPage(page + 1);
    console.log(page)
    await getArticleList();
  }
  const likeOne = async (id, zan, liked) => {
    const { success } = await addLike(id, zan, liked);
    if(success) {
      getArticleList();
    }
  }
  return (
    <div className="aigorithms-container">
      <ArticleList articleList={articleList} likeOne={ likeOne } />
      { (articleSize != null) && (articleSize % 6 != 0) ? (
        <div className="load-more">
          <button onClick={ () => loadMore() }>加载更多</button>
        </div>
      ) : null }
    </div>
  )
}
export default Aigorithms