import React from 'react';
import './index.css'
import menuList from '@/config/menuList.js'
import { Link, withRouter } from 'react-router-dom'

class Nav extends React.Component {
  constructor(...args) {
    super(...args)
  }
  render() {
    const path = this.props.location.pathname;
    return (
      <div className="menu-primary">
        <nav className="menu">
          <ul className="menu-primary-items">
            { menuList.map(menu => (
              <li key={menu.path} className={ menu.path === path? 'active' : '' }><Link to={menu.path}>{ menu.title }</Link></li>
            )) }
          </ul>
        </nav>
      </div>
    )
  }
}

export default withRouter(Nav);