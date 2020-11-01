import { get } from 'http';

export default function(req, res) {
	switch (req.method) {
		case 'POST':
			update(req, res);
			break;
		case 'PUT':
			create(req, res);
			break;
		case 'DELETE':
			remove(req, res);
			break;
		case 'GET':
		default:
			get(req, res);
	}
}
