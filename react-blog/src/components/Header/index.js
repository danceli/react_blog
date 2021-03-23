import React from 'react';
import TopNav from '@/components/TopNav';
import './index.css';
import Nav from '@/components/Nav/'
import { getFormatTime } from '@/utils/'
class Header extends React.Component {
  render() {
    return (
      <header id="header" className="header">
        <TopNav />
        <div className="site-title"> Huahua's Learn Road </div>
        <span className="site-time">{getFormatTime()}</span>
        <hr />
        <Nav />
      </header>
    )
  }
}
export default Header;