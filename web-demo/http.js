const http = require('http');
const url = require('url');
const querystring = require('querystring');

const headersApi = {
	cacheControl: 'cache-control',
	userAgent: 'user-agent',
	accept: 'accept',
	host: 'host',
	acceptEncoding: 'accept-encoding',
	contentType: 'content-type',
	connection: 'connection'
};
http
	.createServer((req, res) => {
		// 查询字符串的解析
		const query = querystring.parse(url.parse(req.url).query);
		const query_simple = url.parse(req.url, true).query;
		console.log('query----', query);
		console.log('query_simplet----', query_simple);
		const { method, httpVersion, headers } = req;
		console.log(method, req.url, httpVersion, headers);
		const buffers = [];
		req
			.on('data', trunk => {
				buffers.push(trunk);
			})
			.on('end', () => {
				const buffer = Buffer.concat(buffers);

				console.log('buffer-----', buffer.toString(), JSON.stringify(buffer));
			});
		res.writeHead(200, { 'Content-Type': 'text-plain' });
		res.end('hello world \n');
	})
	.listen(8080, '0.0.0.0');
console.log('server start http://0.0.0.0:8080');
