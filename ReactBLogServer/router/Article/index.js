const Router = require('@koa/router');
const fs = require('fs');
const router = new Router();

// ./static/markdown/aigorithms/希尔排序.md


router.post('/getArticleDetail', async ctx => {

	ctx.set("Access-Control-Allow-Origin", "*");
	const { article_id } = ctx.request.body;
	const res = await ctx.db.query(`SELECT article_static_src,comment_id FROM article_table WHERE id = '${article_id}'`);
	let str = ''

	try {
		if(res.length > 0) {
			str = fs.readFileSync(res[0].article_static_src)
		}
	}catch(e) {
		console.log(e)
		return;
	}
	ctx.body = {
		success: 1,
		comment_id: res[0].comment_id,
		datas: str.toString()
	}
	
})

router.get('/searchArticle', async ctx => {

	ctx.set("Access-Control-Allow-Origin", "*");
	const { searchContent } = ctx.request.query;

	const res = await ctx.db.query(`SELECT * FROM article_table WHERE article_title LIKE'%${searchContent}%' OR article_auth LIKE'%${searchContent}%';`)
	
	ctx.body = {
		success: 0,
		res
	}

})

module.exports = router.routes();
