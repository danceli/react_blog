import Axios from '../request';
const baseUrl = 'http://localhost:8080'

async function registerUser(userinfo) {
  let datas = null;
  const error = null;
  try {
    const { data } = await Axios({
      url: baseUrl + '/user/register',
      method: 'post',
      data: {
        ...userinfo
      }
    })
    datas = data;
    // console.log(datas)
  } catch(e) {
    console.log(e)
    error = e
  }
  return datas
}
async function login(userinfo) {
  let datas = null;
  let error = null;
  try {
    const { data } = await Axios({
      url: baseUrl + '/user/login',
      method: 'post',
      data: {
        ...userinfo
      }
    })
    datas = data;
  } catch(e) {
    error = e;
    console.log(e)
  }
  if(!error) {
    return datas
  } else {
    alert('please checked internet')
  }
}
async function logout(userId) {
  let datas = null;
  let error = null;
  try {
    const { data } = await Axios({
      url: baseUrl + '/user/logout',
      method: 'post',
      data: { userId }
    })
    datas = data;
  } catch(e) {
    error = e;
    alert('请假查网络');
  }
  if(error == null) {
    return datas
  }
}
async function getChatRooms() {
  let datas = null;
  let error = null
  try {
    const { data } = await Axios({
      url: baseUrl + '/user/getChatRooms',
      method: 'post',
    })
    datas = data;
  } catch(e) {
    error = e;
  }
  if(!error) {
    return datas
  }
}
async function searchArticle(searchContent) {
  let datas = null;
  let error = null;
  try {
    const { data } = await Axios({
      url: baseUrl + "/article/searchArticle",
      method: 'get',
      params: {
        searchContent
      }
    })  
    datas = data;
  } catch(e) {
    error = e;
  }
  if(error) {
    alert('please checked internet!')
  } else {
    return datas;
  }

}
async function getMessages(curRoom) {
  let datas = null;
  try {
    const { data } = await Axios({
      url: baseUrl + '/home/getMessages',
      method: 'post',
      data: {
        curRoom
      }
    })
    datas = data;
  } catch(e) {
    alert('please checked internet')
  }
  if(datas.success) {
    return datas;
  }
}
export {
  registerUser, login, logout, getChatRooms, searchArticle, getMessages
}