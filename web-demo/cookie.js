// document.cookie
// "_octo=GH1.1.379500116.1598757244; _ga=GA1.2.1126933989.1598757280; tz=Asia%2FShanghai"
function parseCookie(cookie) {
	const cookies = {};
	// 检测cookie是否存在
	if (!cookie) return cookies;
	const list = cookie.split(';');
	for (let i = 0; i < list.length; i++) {
		const pair = list[i].split('=');
		cookies[pair[0].trim()] = pair[1];
	}
	return cookies;
}

const serialize = function(name, val, opt) {
	const pairs = [name + '=' + encode(val)];
	const opt = opt || {};
	// cookie API
	if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge);
	if (opt.domain) pairs.push('Domain=' + opt.domain);
	if (opt.path) pairs.push('Path=' + opt.path);
	if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString());
	if (opt.httpOnly) pairs.push('HttpOnly');
	if (opt.secure) pairs.push('Secure');
	return pairs.join(';');
};

const hande = function(req, res) {
	req.cookies = parseCookie(req.header.cookie);
	handle(req, res);
};

const handle = function(req, res) {
	if (!req.cookies.isVisit) {
		res.setHeader('Set-Cookie', serialize('isVisit', '1'));
		res.writeHead(200);
		res.end('第一次访问！');
	} else {
		res.writeHead(200);
		res.end('再次访问');
	}
};
