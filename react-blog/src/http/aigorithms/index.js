import Axios from '../request'

const baseUrl = 'http://localhost:8080'
async function getAigorithms(page) {
  let datas = null;
  let error = null;
  try {
    const { data } = await Axios({
      url: baseUrl + `/aigorithms/getAigorithms`,
      method: 'post',
      data: {
        page
      }
    })
    datas = data;
  } catch(e) {
    error = e;
    console.log(e)
  }
  if(error || !datas.success) {
    alert("please checked internet")
    return;
  }
  return datas;
}

export {
  getAigorithms
}