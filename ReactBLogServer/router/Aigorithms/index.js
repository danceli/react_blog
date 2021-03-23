const Router = require('@koa/router');
let router = new Router();

router.post('/getAigorithms', async ctx => {
	ctx.set('Access-Control-Allow-Origin', '*');
	const curSize = ctx.request.body.page;
	const pageSize = 6;

	const res = await ctx.db.query(`SELECT * FROM article_table WHERE article_type = "aigorithms" ORDER BY article_time DESC`)
	if(res.length > 0) {
		ctx.body = {
			success: 1,
			datas: res.slice(0, (parseInt(curSize) + 1) * pageSize),
			size: res.length
		}
	}	else {
		ctx.body = {
			success: 0,
		}
	}
})

module.exports = router.routes();
