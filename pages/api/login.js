import { readCsv } from '@/core/utils/csv';
import { encodeJwt } from '@/core/utils/jwt';
import * as yup from 'yup';

const schema = yup.object().shape({
	username: yup.string().required(),
	password: yup.string().required(),
});

const handler = async (req, res) => {
	try {
		switch (req.method) {
			case 'POST':
				const payload = await schema.validate(req.body, { abortEarly: true });

				const users = await readCsv('./public/data/users.csv');

				const user = users.filter(
					v =>
						v.Username.toLowerCase() === payload.username.toLowerCase() &&
						v.Password === payload.password
				);

				if (user.length > 0)
					return res
						.setHeader('Set-Cookie', `token=${encodeJwt(users[0].Id)}; path=/`)
						.status(200)
						.json({
							status: 'success',
							data: {
								id: user[0].Id,
								name: user[0].Name,
								username: user[0].Username,
							},
						});

				return res
					.status(400)
					.json({ status: 'fail', message: 'Invalid username and password' });

			default:
				return res
					.status(405)
					.json({ status: 'fail', message: 'Method not allowed' });
		}
	} catch (error) {
		if (error instanceof yup.ValidationError)
			return res
				.status(422)
				.json({ status: 'error', message: error.errors[0] });

		return res
			.status(500)
			.json({ status: 'fail', message: 'Internal server error!' });
	}
};

export default handler;
