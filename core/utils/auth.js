import cookie from 'cookie';
import { readCsv } from './csv';
import { decodeJwt } from './jwt';

export const authenticate = async (req, res) => {
	const cookies = cookie.parse(req.headers.cookie ?? null);
	const token = decodeJwt(cookies.token ?? null);

	if (token) {
		const users = await readCsv('./public/data/users.csv');
		const user = users.filter(v => v.Id === token.sub);

		if (user) return user[0];
	}

	return res.status(400).json({ status: 'fail', message: 'Unauthorized' });
};
