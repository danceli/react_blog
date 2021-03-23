const koa = require('koa');
const Router = require('@koa/router');
const koaBody = require('koa-body');
const db = require('./database/index.js');
const static = require('./router/static.js');
const path = require('path');
const server = new koa();
const jwt = require('jsonwebtoken');
const { PASS_SECRET } = require('./lib/config.js')
const httpServer = require('http').createServer(server.callback());
const io = require('socket.io')(httpServer, {});
//数据库
server.context.db = db;

// 数据文件上传
server.use(koaBody({
	multipart: true,
	uploadDir: path.resolve(__dirname,'upload'),
  formidable: {
  	keepExtensions: true,
    maxFileSize: 200*1024*1024
	}
}))

const router = new Router();

// //静态文件
static(router);

// router.all('*', async (ctx,next) => {//错误处理
//   ctx.set('Access-Control-Allow-Origin', '*');
//   try{
//     await next();
//   }catch(e){
//     ctx.status = 500;
//     ctx.body = {
//       error: 1,
//       msg: 'server internet error'
//     }
//     console.log(e);
//   }
// })

router.use('/home', require('./router/Home/index.js'))
router.use('/linux', require('./router/Linux/index.js'))
router.use('/article', require('./router/Article/index.js'))
router.use('/comment', require('./router/Comment/index.js'))
router.use('/aigorithms', require('./router/Aigorithms/index.js'))
router.use('/user', require('./router/Register/index.js'))
server.use(router.routes());

io.use(async (socket, next) => {
	try {
		const token = socket.handshake.query.token;
		const payload =await jwt.decode(token, PASS_SECRET);
		socket.userId = payload.id;
		next();
	}catch(e) {
			console.log(e)
	}
})

io.on('connection', socket => {
		console.log('connection', socket.userId);
	
	socket.on('joinRoom', async room => {
		socket.join(room);
		console.log("已加入",room)
		const messages = await db.query(`SELECT * FROM chat_table WHERE chatroom='${room}'`);
		io.to(room).emit('joinroom_re', 0, messages);
	})
	socket.on('message', async userInfo => {
		const res = await db.query(`INSERT INTO chat_table VALUES(0,'${userInfo.username}','${userInfo.avatar}','${userInfo.content}','${userInfo.chatroom}')`);
		if(res) {
			io.to(userInfo.chatroom).emit('message_re', 0, userInfo);
		}
	})
	socket.on('disconnect', () => {
		console.log('disconnected', socket.userId)
	})
})
httpServer.listen(8080, () => {
  console.log('server in listening in 8080')
})
