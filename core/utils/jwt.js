import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret';

export const encodeJwt = sub => {
	return jwt.sign({ sub }, JWT_SECRET, { expiresIn: '1h' });
};

export const decodeJwt = token => {
	try {
		return jwt.verify(token, JWT_SECRET);
	} catch (error) {
		return null;
	}
};
