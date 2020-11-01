const sessions = {};
const key = 'session_id';
const EXPIRES = 20 * 60 * 1000;

const generate = function() {
	const session = {};
	session.id = new Date().getTime() + Math.random();
	session.cookie = { expire: new Date().getTime() + EXPIRES };
	sessions[session.id] = session;
	return session;
};

const hande = function(req, res) {
	const id = req.cookies[key];
	if (!id) {
		req.session = generate();
	} else {
		const session = sessions[id];
		if (session) {
			if (session.cookie.expire > new Date().getTime) {
				session.cookie.expire = new Date().getTime() + EXPIRES;
				req.session = session;
			} else {
				delete sessions[id];
				req.session = generate();
			}
		} else {
			req.session = generate();
		}
	}
	handle(req, res);
	const writeHead = res.writeHead;
	res.writeHead = function() {
		const cookies = res.getHeader('Set-Cookie');
		const session = serialize(key, req.session.id);
		cookies = Array.isArray(cookies)
			? cookies.concat(session)
			: [cookies, session];
		res.setHeader('Set-Cookie', cookies);
		return writeHead.apply(this, arguments);
	};
};
