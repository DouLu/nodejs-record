const url = require('url');
const fs = require('fs');

// good http://0.0.0.0:8080/http?a=1&b=2
// error http://0.0.0.0:8080/http#test?a=1&b=2
// hash部分不会被解析，直接丢弃

// 静态文件服务器
export default function(req, res) {
	const pathname = url.parse(req.url).pathname;
	fs.readFile(path.join(ROOT, pathname), (err, file) => {
		if (err) {
			res.writeHead(404);
			res.end('not found file');
			return;
		}
		res.writeHead(200);
		res.end(file);
	});
}

// 预设路径 根据路径选择控制器
// controller/action/a/b/c
export default function(req, res) {
	const pathname = url.parse(req.url).pathname;
	const paths = pathname.split('/');
	const controller = paths[1] || 'index';
	const action = paths[2] || 'index';
	const arg = paths.slice(3);
	if (handles[controller] && handles[controller][action]) {
		handles[controller][action].apply(null, [req, res].concat(arg));
	} else {
		res.writeHead(500);
		res.end('not found server');
	}
}
