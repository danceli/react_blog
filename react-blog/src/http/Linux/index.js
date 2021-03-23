import Axios from '../request.js';
const baseUrl = 'http://localhost:8080'

async function getArticle(page) {
  let datas = null;
  const error = null;
  try {
      datas = await Axios({
      url: baseUrl + `/linux/getLinuxArticle`,
      method: 'post',
      data: {page}
    })
  } catch(e) {
    error = e;
  }
  if(!datas.data.success || error) {
    return 'Please checked network'
  } else {
    return datas;
  }
}
async function addLike(id, zan, like) {
  let datas = null;
  let error = null
  try {
    datas = await Axios({
      method: 'post',
      url: baseUrl + `/linux/likeArticle`,
      data: {
        id,
        zan: !like ? parseInt(zan) + 1 : parseInt(zan) - 1,
        liked: !like 
      }
    })
  } catch(e) {
    error = e;
  }
  if(error || !datas.data.success) {
    alert('please checked your Internet');
  }
  return datas.data
}
export  {
  getArticle, addLike
}