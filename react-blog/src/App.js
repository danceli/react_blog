import React, { useEffect, useState } from 'react';
import Router from './router/'
import jw_decode from 'jwt-decode'
import { connect } from 'react-redux'
import { USERINFO, SOCKET_SETUP, SOCKET } from '@/store/actions.js'
import io from 'socket.io-client';
import makeToast from '@/utils/Toaster.js';
function App(props) {
  const [socket, setSocket] = useState(null);
  const setupSocket = () => {
    const token = localStorage.getItem('danceliToken');

    if(token && !socket) {
      const decoded = jw_decode(token);
      props.setUserInfo({ id: decoded.id, username: decoded.username, email: decoded.email, avatar: decoded.avatar });
      const newSocket = io('http://localhost:8080/', {
        query: {
          token
        }
      });
      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast("error", "Socket Disconnected!");
      });
      newSocket.on('connect', () => {
        makeToast("success", "Chat connected!");
      })
      setSocket(newSocket);
      props.initSocket(newSocket);
    }
  }
  useEffect(() => {
    setupSocket();
  }, [])
  return (
    <div>
    	<Router />
    </div>
  );
}

// export default App
export default connect((state,props) => state, {
  setUserInfo(users) {
    return {
      type: USERINFO,
      userInfo: { ...users }
    }
  },
  initSocket(socket) {
    return {
      type: SOCKET,
      socket
    }
  }
})(App);
