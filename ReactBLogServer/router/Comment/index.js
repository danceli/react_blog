const Router = require('@koa/router');
const gravatar = require('gravatar');

const router = new Router();

router.post('/getCommentList', async ctx => {
	ctx.set('Access-Control-Allow-Origin', "*");
	const { comment_id } = ctx.request.body;
	const res = await ctx.db.query(`SELECT * FROM comments WHERE comment_id=${comment_id};`);

	Array.from(res).forEach(item => {
		item.avatar = gravatar.url(`${item.avatar}`, {s: '200', r: 'pg', d: 'mm'})
	})
	ctx.body = {
		success: 1,
		res
	}
})

router.post('/addComment', async ctx => {
	ctx.set('Access-Control-Allow-Origin', "*");		
	const { comment_id, commentDatas } = ctx.request.body;
	if(comment_id != null) {
		const res = await ctx.db.query(`INSERT INTO comments VALUES (0, '${comment_id}', '${commentDatas.content}', '${commentDatas.email}', '${comment_id}', '${Date.now()}', '${commentDatas.username}');`);
		if(res) {
			ctx.body = {
				success: 1,
				res
			}
		} else {
			ctx.body = {
				success: 0
			}
		}
	} else {
		ctx.body = {
			success: 0,
			message: '缺少comment_id,'
		}
	}
	
})
module.exports = router.routes();