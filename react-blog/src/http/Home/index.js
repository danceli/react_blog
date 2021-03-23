import Axios from '../request';
const baseUrl = 'http://localhost:8080'
async function getHomeArticle(page) {
  const { data }= await Axios({
    url: baseUrl + '/home/getHomeArticle',
    method: 'post',
    data: {
      page
    }
  })
  return data;
}

async function getMusic() {
  const { data } = await Axios({
    url: baseUrl + '/home/getMusic',
    method: 'post'
  }) 
  
  if(data.success) {
    return data.datas;
  } else {
    alert('请检查网络！')
  }
}
export {
  getHomeArticle, getMusic
}