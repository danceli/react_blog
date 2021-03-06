import React from 'react';
import Typing from '@/utils/typing.js'
class TypingCard extends React.Component {
  static defaultProps = {
    title: 'ๆ็ไป็ป',
    source: '',
    height: 126
  }
  componentDidMount() {
    const typing = new Typing({
      source: this.source,
      output: this.output,
      delay: 30
    })
    typing.start();
  }
  render() {
    return (
      <div>
        <div
          style={{ display: "none" }}
          ref={(el) => (this.source = el)}
          dangerouslySetInnerHTML={{ __html: this.props.source }}
        />
        <div ref={(el) => (this.output = el)} />
      </div>
    )
  }
}
export default TypingCard;