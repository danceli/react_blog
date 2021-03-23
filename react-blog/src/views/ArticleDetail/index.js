import React, { useState, useEffect } from 'react';
import marked from 'marked';
import hljs from 'highlight.js'
import 'highlight.js/styles/xcode.css'
import { getArticleDetail } from '@/http/Article/'
import './index.css';
import Comment from '@/components/Comment'
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: code => hljs.highlightAuto(code).value,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})
const ArticleDetail = (props) => {
  const [markedText,setMarkedText] = useState(null);
  const article_id = props.match.params.id;
  const [commentId, setCommentId] = useState(null);
  useEffect(() => {
    async function fetchData() {
      await getArticle(article_id);
    }
    fetchData()
  }, [article_id])
  const getArticle = async (id) => {
    const { success, datas, comment_id } = await getArticleDetail(id);
    if(success) {
      setCommentId(comment_id);
      setMarkedText(marked(datas));
    } else {
      alert('请检查网络！')
    }
  }
  return (
    <div>
      <div id="mark-container" style={{fontSize: '.9em', fontFamily: "Operator Mono, Consolas, Monaco, 宋体, monospace"}} dangerouslySetInnerHTML={{__html: markedText}}></div>
      { commentId != null ? <Comment comment_id={ commentId } /> : null }
    </div>
  )
  
}

export default ArticleDetail;