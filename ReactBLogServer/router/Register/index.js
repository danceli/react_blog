const Router = require('@koa/router');
const { cryPass } = require('../../utils/index.js')
const jwt = require('jsonwebtoken');
const { PASS_SECRET } = require('../../lib/config.js')
const gravatar = require('gravatar');
const router = new Router();

router.post('/register', async ctx => {
	ctx.set("Access-Control-Allow-Origin", "*")
	const { username, email, password } = ctx.request.body;
	//查询数据库中是否已经注册过当前邮箱
	const res = await ctx.db.query(`SELECT * FROM register_table WHERE email='${email}';`)
	console.log(res)
	if(res.length > 0) {	//用户已经注册
		ctx.body = {
			success: 0,
			message: '该邮箱已经被注册'
		}
	} else {
		const isSuccess = await ctx.db.query(`INSERT INTO register_table VALUES(0,'${username}','${cryPass(password)}','${email}',${0})`)
		console.log(isSuccess)
		ctx.body = {
			success: 1,
			message: '注册成功'
		}
	}
})

//登录
router.post('/login', async ctx => {
	ctx.set("Access-Control-Allow-Origin", "*")
	const { username, password } = ctx.request.body;
	if(!username) {
		ctx.body = { success: 1, msg: '用户名不能为空' }
	} else if(!password) {
		ctx.body = { success: 1, msg: '密码格式错误' }
	} else {
		try {
			const res = await ctx.db.query(`SELECT * FROM register_table WHERE username='${username}';`)
			if(res.length == 0) {
				ctx.body = {
					success: 1,
					msg: '该用户不存在'
				}
			} else {
				if(res[0].password != cryPass(password)) {
					ctx.body = {success: 1, msg: '密码输入错误'}
				} else {
					const token = jwt.sign({ id: res[0].id, username: res[0].username, email: res[0].email, avatar:  gravatar.url(`${res[0].email}`, { s: '200', r: 'pg', d: 'robohash' }, true)}, PASS_SECRET, {expiresIn: 3600} )
					await ctx.db.query(`UPDATE register_table SET online=1 WHERE id=${res[0].id};`)
					ctx.body = {
						success: 0,
						msg: '登陆成功',
						token
					}
				}
			}
		} catch(e) {
			console.log(e)
		}
	}
})

// //退出

router.post('/logout', async ctx => {
	ctx.set("Access-Control-Allow-Origin", "*");
	const { userId } = ctx.request.body;
	try {
		const res = await ctx.db.query(`UPDATE register_table SET online=0 WHERE id=${userId};`)
		if(res) {
			ctx.body = {
				success: 0,
				msg: '退出成功'
			}
		} else {
			ctx.body = {
				success: 1,
				msg: '请假查网络'
			}
		}
	} catch(e) {
		console.log(e)
		ctx.body = {
			success: 1,
			msg: '请假查网络'
		}
	}
})
router.post('/getChatRooms', async ctx => {
	ctx.set("Access-Control-Allow-Origin", "*");
	const res = await ctx.db.query(`SELECT chatroom FROM chat_room`)
	ctx.body = {
		success: 0,
		res
	}
})

module.exports = router.routes();