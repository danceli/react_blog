import React from 'react';
import './left.css';
import Donation from '@/components/Donation'
class Aside extends React.Component {

  render() {
    return (
      <aside id="aside-left" style={{ flex: 1 }}>
        <Donation />
      </aside>
    )
  }
}
export default Aside