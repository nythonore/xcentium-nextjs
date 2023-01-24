import clsx from 'clsx';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useApi } from '@/core/hooks/useApi';
import { authLogin } from '@/services/auth';
import { Alert } from './Alert';
import { AuthContext } from '@/core/providers/AuthProvider';

const schema = Yup.object().shape({
	username: Yup.string().required('Username is required'),
	password: Yup.string().required('Password is required'),
});

export const LoginForm = () => {
	const { setUser } = useContext(AuthContext);
	const router = useRouter();

	const { register, formState, handleSubmit } = useForm({
		resolver: yupResolver(schema),
	});

	const { loading, data, error, mutate } = useApi(authLogin);

	useEffect(() => {
		if (data) {
			setUser(data.data);
			router.push('/');
		}
	}, [data, router]);

	const onSubmit = async payload => {
		await mutate(payload);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-6'>
			<div className='space-y-4'>
				<div>
					<div
						className={clsx(
							'form-group-control',
							formState.errors.username && 'border-red-700'
						)}
					>
						<i className='bi bi-person text-lg text-primary'></i>

						<input
							type='text'
							placeholder='Enter your username'
							className='w-full'
							autoComplete='off'
							{...register('username')}
						/>
					</div>

					<span className='text-red-700 font-medium text-sm'>
						{formState.errors.username?.message}
					</span>
				</div>

				<div>
					<div
						className={clsx(
							'form-group-control',
							formState.errors.password && 'border-red-700'
						)}
					>
						<i className='bi bi-lock text-lg text-primary'></i>

						<input
							type='password'
							placeholder='Enter your password'
							className='w-full'
							autoComplete='off'
							{...register('password')}
						/>
					</div>

					<span className='text-red-700 font-medium text-sm'>
						{formState.errors.password?.message}
					</span>
				</div>
			</div>

			<div>
				<button
					type='submit'
					disabled={loading}
					className='btn w-full bg-primary text-white uppercase p-4 rounded-lg'
				>
					{!loading ? 'sign in' : 'Loading ..'}
				</button>

				{error && (
					<Alert variant='danger' message={error.message} className='mt-3' />
				)}
			</div>
		</form>
	);
};
