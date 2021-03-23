import React from 'react';
import './index.css';
import MediaIcons from '@/components/MediaIcons'
import SearchForm from '@/components/SearchForm'
import { connect } from 'react-redux'
import { OPEN_SEARCH } from '@/store/actions.js'
class Header extends React.Component {
  openSearchForm() {
    this.props.openSearchForm();
  }
  render() {
    const { searchToggle } = this.props.app;
    return (
      <div className="top-nav">
        <button className="search-toggle" onClick={ () => this.openSearchForm() }>
          <i className="iconfont icon-search1"></i>
          <span>SEARCH</span>
        </button>
        <div id="search-form" className={ searchToggle ? 'search-form search-form-active' : 'search-form' }>
          <SearchForm />
        </div>
        <MediaIcons />
      </div>
    )
  }
}
export default connect((state, props)=> state, {
  openSearchForm() {
    return { type: OPEN_SEARCH }
  }
})(Header);