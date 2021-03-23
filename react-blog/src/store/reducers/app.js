import { OPEN_SEARCH, CLOSE_SEARCH, IS_LOGIN, MASKTOGGLE, CHATNAME, USERINFO } from '@/store/actions.js'
function reducer(state = { searchToggle: false, isLogin: false, maskToggle: false }, actions) {
  switch(actions.type) {
    case OPEN_SEARCH:
      return {
        ...state,
        searchToggle: true
      }
    case CLOSE_SEARCH:
      return {
        ...state,
        searchToggle: false
      }
    case IS_LOGIN: 
      return {
        ...state,
        isLogin: actions.status
      }
    case MASKTOGGLE:
      return {
        ...state,
        maskToggle: actions.mask
      }
    default: 
      return state;
  }
}

export default reducer;