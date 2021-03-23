import { USERINFO, SOCKET } from '../actions.js'

function reducer(state = { userInfo: {}, socket: null }, actions) {
  switch(actions.type) {
    case USERINFO:
      return {
        ...state,
        userInfo: { ...actions.userInfo } 
      }
    case SOCKET:
      return {
        ...state,
        socket: actions.socket
      }
    default:
      return state;
  }
}

export default reducer