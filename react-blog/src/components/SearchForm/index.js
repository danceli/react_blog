import React, { useState, useEffect }  from 'react';
import './index.css';
import { connect } from 'react-redux';
import { CLOSE_SEARCH } from '@/store/actions.js'
import { searchArticle } from '@/http/Orther/'
import { withRouter } from 'react-router-dom'
const SearchForm = (props) => {
  const [searchContent, setSearchContent] = useState('');
  const [searchList, setSearchList] = useState([]);
  const handleChangeSearchContent = (value) => {
    setSearchContent(value)
  }
  useEffect(() => {
    if(searchContent === '') {
      setSearchList([]);
    }
  }, [searchContent])
  const handleSubmit = async () => {
    if(searchContent != '') {
      const { success, res } = await searchArticle(searchContent)
      if(!success) {
        setSearchList([...res]);
      }
    }
  }
  const goArticle = (articleId) => {
    props.closeSearchForm();
    props.history.push(`/article/${articleId}`)
  }
  return (
    <div className="inner">
        <i className="iconfont icon--close close" onClick={ () => props.closeSearchForm() }></i>
        <div className="search-title">Search Huahua's Learn Road</div>
        <div className="search-form-container">
          <input type="search" className="search-field" placeholder="Search for ..." onChange={(ev) => handleChangeSearchContent(ev.target.value)}></input>
          <button className="search-submit" onClick={ () => handleSubmit() }>SEARCH</button>
        </div>
        <div className="search-list">
            <ul className="list-item">
              { searchList.map(item => (
                <li key={item.id}>
                  <div onClick={ () => goArticle(item.id) }>
                    <span className="item-title">{ item.article_title }</span>
                    <span className="item-type">type: { item.article_type }</span>
                  </div>
              </li>
              )) }
            </ul>
        </div>
    </div>
  )
  
}
export default connect((state,props) => state, {
  closeSearchForm() {
    return {
      type: CLOSE_SEARCH
    }
  }
})(withRouter(SearchForm));