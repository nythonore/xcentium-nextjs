import { authenticate } from '@/core/utils/auth';

export const handler = async (req, res) => {
	const user = await authenticate(req);

	if (!user)
		return res.status(400).json({ status: 'fail', message: 'Unauthorized' });

	return res
		.setHeader(
			'Set-Cookie',
			`token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
		)
		.status(200)
		.json({ status: 'success', data: null });
};

export default handler;
