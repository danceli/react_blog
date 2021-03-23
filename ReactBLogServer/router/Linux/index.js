const Router = require('@koa/router');

const router = new Router();

router.post('/getLinuxArticle', async ctx => {
	ctx.set('Access-Control-Allow-Origin', "*")
	const page = ctx.request.body.page;
	const pageSize = 6;
	let res = await ctx.db.query(`SELECT * FROM article_table WHERE article_type = "linux" ORDER BY article_time DESC ;`)
	if(res.length > 0) {
		ctx.body = {
			success: 1,
			size: res.length,
			datas: res.slice(page, (page + 1) * pageSize)
		}
	} else {
		ctx.body = {
			success: 0,
			datas: null
		}
	}
})
router.post('/likeArticle', async ctx => {
	ctx.set("Access-Control-Allow-Origin", "*");
	const { id, zan, liked } = ctx.request.body;
	const res = await ctx.db.query(`UPDATE article_table SET article_zan=${zan},article_liked=${liked} WHERE id=${id};`);
	if(res) {
		ctx.body = {
			success: 1,
		}
	} else {
		 ctx.body = {
		 	success: 0
		 }
	}
	

})
module.exports = router.routes();