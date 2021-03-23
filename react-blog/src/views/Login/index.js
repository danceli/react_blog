import React from 'react';
import './index.css'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { MASKTOGGLE, IS_LOGIN, USERINFO, SOCKET } from '@/store/actions.js'
import { useForm } from 'react-hook-form'
import { login, logout } from '@/http/Orther/'
import jw_decode from 'jwt-decode'
import io from 'socket.io-client'
import makeToast from '@/utils/Toaster.js';

const Login = (props) => {
  const { register, handleSubmit , errors, reset } = useForm();
  const loginForm = async (datas, ev) => {
    if(datas) {
      const { success, token, msg } = await login(datas);
      if(success) {
        makeToast('error', msg);
      } else {
          localStorage.setItem('danceliToken', token)       //存入localStorage中
          const decoded = jw_decode(token);
          props.setUserInfo({ id: decoded.id, username: decoded.username, email: decoded.email, avatar: decoded.avatar } )
          // 创建socekt对象存储到redux中
          const newSocket = io('http://112.124.200.69:8080/', {
            query: {
              token
            }
          });
          newSocket.on("disconnect", () => {
            makeToast("error", "Socket Disconnected!");
          });
          newSocket.on('connect', () => {
            makeToast("success", "Chat connected!");
          })
          props.setSocket(newSocket)
          props.setMaskToggle(1);
          makeToast('success',msg)
        }
    }
    reset();
    ev.preventDefault();
  }
  return (
    <div className="login-inner">
      <div className="close-icon"><i onClick={ () => props.setMaskToggle(0) } className="iconfont icon--close"></i></div>
      <div className="login-header">
        <span>Login</span>
      </div>
      <form className="login-form" onSubmit={ handleSubmit(loginForm) }>
        <div className="login-username">
          <input name="username" className="login-input" type="text" placeholder="username" ref={register({
            required: true,
            maxlength: 16,
            minLength: 2
          })}></input>
          <i>{ errors.username && 'username in 2-16 characters' }</i>
        </div>
        <div className="login-password">
          <input name="password" className="login-input" type="password" placeholder="password" ref={register({
            required: true,
            maxLength: 16,
            minLength: 6
          })}></input>
          <i>{ errors.password && 'Password is between 6-16 characters' }</i>
        </div>
        <div className="login-btn">
          <button>Login</button>
        </div>
      </form>
    </div>
  )
}

export default connect((state, props) => state, {
  setMaskToggle(val) {
    return {
      type: MASKTOGGLE,
      mask: val === 1 ? true : false
    }
  },
  setUserInfo(info) {
    return {
      type: USERINFO,
      userInfo: { ...info }
    }
  },
  setSocket(socket) {
    return {
      type: SOCKET,
      socket
    }
  }
})(withRouter(Login))