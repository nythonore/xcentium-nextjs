import { authenticate } from '@/core/utils/auth';

export const handler = async (req, res) => {
	const user = await authenticate(req);

	if (!user)
		return res.status(400).json({ status: 'fail', message: 'Unauthorized' });

	return res.status(200).json({ status: 'success', data: user });
};

export default handler;
