import React, { useState } from 'react';
import './index.css';
import { connect } from 'react-redux'
import { MASKTOGGLE } from '@/store/actions.js'
import { registerUser } from '@/http/Orther/'
import { useForm } from 'react-hook-form'
import makeToast from '@/utils/Toaster.js';

const Register = (props) => {
  const {register,handleSubmit,errors,watch, reset} =  useForm();
  const submitRegisterForm = async (datas, ev) => {
    const { success, message } = await registerUser(datas)
    if(success) {   //注册成功关闭注册窗口
      props.setMaskToggle(0);
      makeToast('success', message);
    } else {
      makeToast('error', message);
    }
    reset()
    ev.preventDefault()
  }
  return (
    <div className="register-inner">
      <div className="close-icon"><i onClick={ () => props.setMaskToggle(0) } className="iconfont icon--close"></i></div>
      <div className="register-header">
        <span>Register</span>
      </div>
      <form className="register-form" onSubmit ={ handleSubmit(submitRegisterForm) }>
        <div className="register-username">
          <input name="username" autoComplete={"off"} className="register-input" type="text" placeholder="username" ref={register({
            required: true,
            maxlength: 16,
            minLength: 2
          })}></input>
          <i>{ errors.username && "username in 2-16 characters" }</i>
        </div>
        <div className="register-email">
          <input name="email" autoComplete="off" className="register-input" type="email" placeholder="email" ref={ register({
            required: true,
            pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          }) }></input>
          <i>{ errors.email && "Please enter the correct email format" }</i>
        </div>
        <div className="register-password">
          <input name="password" autoComplete="off" className="register-input" type="password" placeholder="password" ref={ register({
            required: true,
            maxLength: 16,
            minLength: 6
          }) }></input>
          <i>{ errors.password && "Password is between 6-16 characters" }</i>
        </div>
        <div className="register-btn">
          <button type="submit" >Register</button>
        </div>
      </form>
    </div>
  )
}

export default connect((state, props) => state, {
  setMaskToggle(val) {
    return {
      type:MASKTOGGLE,
      mask: val === 1 ? true : false
    }
  }
})(Register);