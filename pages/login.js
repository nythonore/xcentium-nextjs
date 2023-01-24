import Image from 'next/image';
import { LoginForm } from '@/components/LoginForm';

import LogoSvg from '@/public/images/logo.svg';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/core/providers/AuthProvider';
import { useRouter } from 'next/router';

const Login = () => {
	const router = useRouter();
	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (user) router.push('/');
	}, [user, router]);

	return (
		<div className='bg-light w-full min-h-screen flex items-center'>
			<div className='container'>
				<div className='w-auto lg:w-[500px] mx-auto'>
					<Image alt='xcentium' src={LogoSvg} width={160} className='mx-auto' />

					<div className='bg-white mt-12 p-6 lg:p-12'>
						<div className='text-center'>
							<h2 className='text-3xl text-gray-600 font-medium capitalize'>
								Welcome back
							</h2>

							<p className='text-base mt-1 font-normal text-gray-400'>
								Please enter your credentials to access your account
							</p>
						</div>

						<LoginForm />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
