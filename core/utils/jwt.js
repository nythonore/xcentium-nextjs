import jwt from 'jsonwebtoken';
import config from '@/config';

export const encodeJwt = sub => {
	return jwt.sign({ sub }, JWT_SECRET, { expiresIn: '1h' });
};

export const decodeJwt = token => {
	try {
		return jwt.verify(token, config.JWT_SECRET);
	} catch (error) {
		return null;
	}
};
