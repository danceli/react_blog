import React from 'react';
import './index.css';
const Donation = () => {
  return (
    <div className="donation-container">
      <div className="donation-title">DONATION</div>
      <div className="text-widget">
        <p>如果您喜欢我们的内容，欢迎捐赠<br/>If you like my blog, donations are welcome</p>
        <div className="donation-images">
          <div className="wechat-img">
            WeChat<br />
            <img src="http://112.124.200.69:8080/images/wechatpay.jpg"></img>
          </div>
          <div className="alipay-img">
            AliPay<br />
            <img src="http://112.124.200.69:8080/images/alipay.jpg"></img>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Donation