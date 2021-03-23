import React,{ useState, useEffect } from 'react';
import './index.css'
import Register from '@/views/Register'
import Login from '@/views/Login'
import { connect } from 'react-redux'
import { MASKTOGGLE, USERINFO } from '@/store/actions.js'
import { logout, getChatRooms, getMessages } from '@/http/Orther/'
import makeToast from '@/utils/Toaster.js';
const Chat = (props) => {
  const [loginType, setLoginType] = useState(null);
  const [menuToggle, setMenuToggle] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatrooms, setChatRooms] = useState([]);
  const [inputText, setInPuttext] = useState('');
  // const [curRoom, setCurRoom] = useState('互吹牛逼')
  let curRoom = '互吹牛逼'
  const handleChangeText = (ev) => {
    setInPuttext(ev.target.value)
  }
  useEffect(() => {
    if(props.user.socket) {
      props.user.socket.on('message_re', (success, userInfo) => {
        if(!success) {
          setMessages([...messages, userInfo]);
        }
      })
    }
  }, [messages])
  useEffect(() => {
    async function fetchData() {
      const datas = await getChatRooms();
      if(!datas.success) {
        setChatRooms([...datas.res])
      }
      const data = await getMessages(curRoom);
      if(data.success) {
        setMessages([...data.res]);
      }
    }
    fetchData();
    if(props.user.socket) {
      props.user.socket.on('joinroom_re',(success, message) => {
        if(!success) {
          setMessages([...message]);
        }
      })
      props.user.socket.emit('joinRoom', curRoom)
    }
    
    return () => {
      if(props.user.socket) {
        props.user.socket.emit('leaveRoom', 'danceli')
      }
    }
  },[]) 
  const joinRoom = (chatroom) => {
    props.user.socket.on('joinroom_re', (success, message) => {
      if(!success) {
        curRoom = chatroom;
        setMessages(message)
      }
    })
    props.user.socket && props.user.socket.emit('joinRoom', chatroom);
  }
  useEffect(() => {
    //绑定事件
    if(menuToggle  == true) {
      document.addEventListener('click', hiddenMenu)
      return () => {
        document.removeEventListener('click', hiddenMenu);
      }
    }
  }, [menuToggle]);

  const hiddenMenu = () => {
    setMenuToggle(false)
  }

  const changeMaskToggle = (isShow, type) => {
    props.setMaskToggle(isShow)
    setLoginType(type)
  }
  const logoutUser = async () => {
    const userId = props.user.userInfo.id
    const datas = await logout(userId);
    if(datas.success) {
      alert('logout失败，请假查网络')
    } else {
      localStorage.removeItem('danceliToken')
      props.removeUserInfo();
      props.history.push(props.location.pathname)
      hiddenMenu();
      alert(datas.msg)
    }

  }
  const isLogin = localStorage.getItem('danceliToken') ? true: false;
  const maskToggle = props.app.maskToggle
  const userInfos  = props.user.userInfo
  // console.log(userInfos)
  const handleSend = () => {
    if(props.user.socket) {
      const userInfo = {
        username: props.user.userInfo.username,
        avatar: props.user.userInfo.avatar,
        content: inputText,
        chatroom: curRoom
      }
      if(inputText == "") {
       makeToast('error', "发送文本不能为空");
      } else {
        props.user.socket && props.user.socket.emit('message', userInfo);
      }
    }
    
    setInPuttext('')
  }
  return (
    <div className="chat-container">
      { isLogin === false ? (
        <div className="tip-box">
          <p>使用聊天房功能需要先注册登录！</p>
          <div className="actions-box">
            <div><button className="register" onClick={ () => changeMaskToggle(1,'register') }>注册</button><button className="login" onClick={ () => changeMaskToggle(1,'login') }>登录</button></div>
            <div className={maskToggle === false ? 'actions-form' : 'actions-form actions-form-active'} >
              <div className="actions-inner">
                {(loginType != null) && (loginType === 'login') ? <Login /> : <Register /> }
              </div>
            </div>
          </div>
        </div>
      ) : <div className="chat-room">
        <div className="chat-header">
          <div className="chat-title">ChatRoom</div>
          <div className="chat-avatar">
            <a className="chat-avatar-btn" style={{ backgroundImage: `url('${userInfos.avatar}')` }} onClick={() => setMenuToggle(true)}></a>
            <div className="chat-user-menu" style={{ display: menuToggle === true ? 'block' : 'none' }}>
              <a onClick={ () => logoutUser() }>Logout</a>
            </div>
          </div>
        </div>
        <div className="chat-body">
          <div className="chat-box">
            <div className="chat-left-box">
              <div className="chat-cur-user">
                <div className="cur-user" style={{backgroundImage: `url('${userInfos.avatar}')`}}></div>
                  <div className="cur-username">{ userInfos.username }</div>
              </div>
              <div className="chatrooms">CHAT ROOM</div>
              <div className="chatroom">
                <ul>
                  { chatrooms.map((chatroom,index) => (<li style={{color : chatroom.chatroom === curRoom ? 'teal': 'white'}} key={index} onClick={() => joinRoom(chatroom.chatroom)}>{ chatroom.chatroom }</li>)) }
                </ul>
              </div>
            </div>
            <div className="chat-right-box">
              <ul>
                {messages.length != 0 ? (
                  messages.map((item,index) => (
                    item.username === props.user.userInfo.username ? (
                      <li key={index} className="list-cur-right">
                        <div className="list-right-users">
                          <div className="list-username">{ item.username }</div>
                          <div className="list-content">{item.content}</div>
                        </div>
                        <div className="list-avatar" style={{backgroundImage: `url('${item.avatar}')`}}></div>
                      </li> 
                    ) : (
                      <li key={index} className="list-cur-left">
                        <div className="list-avatar" style={{backgroundImage: `url('${item.avatar}')`}}></div>
                        <div className="list-left-users">
                          <div className="list-username">{ item.username }</div>
                          <div className="list-content">{item.content}</div>
                        </div>
                      </li> 
                    )
                  ))
                ) : null}
              </ul>
              <div className="send-box">
                <div className="send-content">
                  <textarea value={inputText} onChange={(ev) => handleChangeText(ev)} placeholder="please write something" rows="3" cols="5" />
                </div>
                <div className="send-btn">
                  <span>Press Ctrl+Enter to start a new line</span>
                  <button onClick={ () => handleSend() }>Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> }
      
    </div>
  )
}
export default connect((state,props) => state, {
  setMaskToggle(val) {
    return {
      type: MASKTOGGLE,
      mask: val === 1 ? true : false
    }
  },
  removeUserInfo() {
    return {
      type: USERINFO,
      userInfo: {  }
    }
  }
})(Chat)





