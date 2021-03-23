import Axios from '../request';
const baseUrl = 'http://localhost:8080'

async function getArticleDetail(article_id) {
  let res = null
  try {
    const { data } = await Axios({
      url: baseUrl + '/article/getArticleDetail',
      method: 'post',
      data: {
        article_id
      }
    })
    res = data;
  }catch(e) {
    if(e) {
      return '请检查网络'
    }
  }
  return res;
}
async function getCommentList(comment_id) {
  let datas = null 
  let error = null;
  try {
    const { data } = await Axios({
      url: baseUrl + '/comment/getCommentList',
      method: 'post',
      data: {
        comment_id
      }
    })
    datas = data;
  } catch(e) {
    error = e;
  }
  if(!datas.success || error) {
    alert('please checked internet')
  }
  return datas;
}
async function addCommtent(comment_id, commentDatas) {
  let datas = null;
  let error = null
  try {
    const { data } = await Axios({
      url: baseUrl + `/comment/addComment`,
      method: 'post',
      data: {
        comment_id,commentDatas
      }
    })
    datas = data;
  } catch(e) {
    error = e;
  }
  if(!datas.success || error) {
    alert('please checked internet')
  }
  return datas
}
export  {
  getArticleDetail, getCommentList, addCommtent
}