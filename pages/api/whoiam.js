import { authenticate } from '@/core/utils/auth';

export const handler = async (req, res) => {
	const user = await authenticate(req, res);
	return res.status(200).json({ status: 'success', data: user });
};

export default handler;
