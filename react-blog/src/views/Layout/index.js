import React from 'react';
import './index.css';
import Header from '@/components/Header'
import Content from '@/components/Content'
import AsideLeft from '@/components/Aside/left.js'
import AsideRight from '@/components/Aside/right.js'
class Layout extends React.Component {
  render() {
    return (
      <div className="layout" style={{height: 'auto !important'}}>
        <Header />
        <div id="content-container">
          <AsideLeft />
          <Content />
          <AsideRight />
        </div>
      </div>
    )
  }
}
export default Layout;