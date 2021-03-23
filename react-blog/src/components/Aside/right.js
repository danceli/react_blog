import React from 'react';
import Audio from '@/components/Audio'
class Aside extends React.Component {

  render() {
    return (
      <aside id="aside-right" style={{ flex: 1 , overflow: 'hidden', boxSizing: 'border-box'}}>
        <Audio />
      </aside>
    )
  }
}
export default Aside