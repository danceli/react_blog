import React,{ useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './index.css'
import { getCommentList, addCommtent } from '@/http/Article'
import { filterTime } from '@/utils/'
const Comment = (props) => {
  const [commentList,seCommentList] = useState(null);

  //需要添加评论的数据
  const [commentDatas, setCommentDatas] = useState({username: '', email: '', content: ''});

  useEffect(() => {
    async function fetchData() {
      await getComments()
    }
    fetchData();
  },[])
  const getComments = async () => {
    const { success, res } = await getCommentList(props.comment_id)
    if(success) {
      seCommentList(res);
    }
  }
  const handleChangeUsername = (user) => {
    setCommentDatas({
      ...commentDatas,
      username: user
    })
  }
  const handleChangePassword = (val) => {
    setCommentDatas({
      ...commentDatas,
      email: val
    })
  }
  const handleChangeContent = (val) => {
    setCommentDatas({
      ...commentDatas,
      content: val
    })
  }
  const handleComment = async () => { //提交评论  comment_id,user,email,content,
    if(props.comment_id != null) {
      if(/^([0-9A-z-\_])+\@([A-z0-9-\_\.]+\.([A-z]{2,4}))$/i.test(commentDatas.email) && commentDatas.username != '' && commentDatas.content != '') {  //匹配邮箱
        const datas = await addCommtent(props.comment_id, commentDatas);
        if(datas.success) {
          setCommentDatas( {username: '', email: '', content: ''} )
          await getComments();
        }
      } else {
        alert('用户名邮箱和评论内容不能为空');
      }
    }
  }
  return (
    <div className="comments-container">
      <div className="comments-form">
        <div className="input-header">
          <input name="username" className="username" type="text" placeholder="昵称" value={ commentDatas.username } onChange={ (ev) => handleChangeUsername(ev.target.value) } />
          <input name="email" className="email" type="email" placeholder="邮箱" value={ commentDatas.email } onChange={ (ev) => handleChangePassword(ev.target.value) } ></input>
        </div>
        <div className="comment-content">
          <textarea name="text" placeholder="请给文章加点评论吧!" value={ commentDatas.content } onChange={ (ev) => handleChangeContent(ev.target.value) }></textarea>
        </div>
        <div className="submit">
          <button onClick={ () => handleComment() }>评论</button>
        </div>
      </div>
      <div className="comment-list-container">
        { commentList != null ? (
          commentList.map(item => (
            <div className="comment-list-item" key={item.id}>
              <div className="comment-item-avatar" style={{ backgroundImage: `url(${item.avatar})` }}></div>
              <div className="comment-content">
                <div className="comment-title">{ item.comment_user }</div>
                <div className="comment-text">{ item.content }</div>
                <div className="comment-time">{ filterTime(item.comment_date) }</div>
              </div>
            </div>
          ))
        ) : null } 
      </div>
    </div>
  )
} 
export default withRouter(Comment)