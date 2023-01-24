import cookie from 'cookie';
import { http } from '../lib/http';
import { readCsv } from './csv';
import { decodeJwt } from './jwt';

export const authenticate = async req => {
	try {
		const cookies = cookie.parse(req.headers.cookie ?? null);
		const token = decodeJwt(cookies.token ?? null);

		if (token) {
			const users = await readCsv('./public/data/users.csv');
			const user = users.filter(v => v.Id === token.sub);

			if (user)
				return {
					id: user[0].Id,
					name: user[0].Name,
					username: user[0].Username,
				};
		}

		return null;
	} catch (error) {
		return null;
	}
};

export const getUser = async () => {
	try {
		const { data } = await http.get('whoiam');
		return data;
	} catch (error) {
		return null;
	}
};
