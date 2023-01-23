import { authenticate } from '@/core/utils/auth';

export const handler = async (req, res) => {
	await authenticate(req, res);

	return res
		.setHeader(
			'Set-Cookie',
			`token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
		)
		.status(200)
		.json({ status: 'success', data: null });
};

export default handler;
