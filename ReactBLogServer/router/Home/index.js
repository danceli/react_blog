const Router = require('@koa/router');
let router = new Router();

router.post('/getHomeArticle', async ctx => {
	ctx.set('Access-Control-Allow-Origin', '*');

	const res = await ctx.db.query(`SELECT * FROM  article_table ORDER BY article_time desc limit 30 `);
	const curPage = ctx.request.body.page;
	const page_size = 6;
	if(res.length > 0) {
		ctx.body = {
			success: 1,
			datas: res.slice(0, (parseInt(curPage) + 1) * page_size),
			size: res.length
		}
	} else {
		ctx.body = {
			success: 0,
			msg: '404 Not Found'
		}
	}

});

router.post('/getMusic', async ctx => {
	ctx.set('Access-Control-Allow-Origin', '*');
	const res = await ctx.db.query(`SELECT * FROM music`);
	if(res.length > 0) {
		ctx.body = {
			success: 1,
			datas: res
		}
	} else {
		ctx.body = {
			success: 0,
			msg: '404 Not Found'
		}
	}		
})

router.post('/getMessages', async ctx => {
	ctx.set('Access-Control-Allow-Origin', "*");	
	const { curRoom } = ctx.request.body;
	try {
		const datas = await ctx.db.query(`SELECT * FROM chat_table WHERE chatroom='${curRoom}';`);
		ctx.body = {
			success: 1,
			res: datas
		}
	} catch(e) {
		console.log(e);
		ctx.body = {
			success: 0
		}
	}
})
module.exports = router.routes(); 

//0 == false
//1 == true;

// select   *   from   表名   order   by   列名 desc （降序）   limit    显示的条数