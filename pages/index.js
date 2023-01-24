import { useContext, useEffect } from 'react';
import Image from 'next/image';
import { AuthContext } from '@/core/providers/AuthProvider';

import AvatarImg from '@/public/images/avatar.png';
import BannerImg from '@/public/images/banner.jpeg';
import { useApi } from '@/core/hooks/useApi';
import { authLogout } from '@/services/auth';
import { useRouter } from 'next/router';

const Home = () => {
	const { user, setUser } = useContext(AuthContext);
	const router = useRouter();

	const { mutate } = useApi(authLogout);

	useEffect(() => {
		if (!user) router.push('/login');
	}, [user, router]);

	const handleLogout = async () => {
		await mutate();
		setUser(null);

		router.push('/login');
	};

	return (
		<div className='bg-light w-full min-h-screen'>
			<div className='container py-8'>
				<div className='flex flex-wrap gap-4 items-center justify-between'>
					<div className='flex items-center gap-2'>
						<Image
							alt='user-name'
							src={AvatarImg}
							className='w-10 h-10 rounded-full'
						/>

						<div>
							<p className='text-base font-semibold'>{user?.name}</p>
							<p className='text-sm font-medium'>{`@${user?.username}`}</p>
						</div>
					</div>

					<button
						onClick={handleLogout}
						className='btn bg-primary text-white rounded-md capitalize'
					>
						Log out
					</button>
				</div>

				<div className='w-full h-80'>
					<Image
						alt='xcentium'
						src={BannerImg}
						className='w-full h-full rounded-md mt-6 object-cover'
					/>
				</div>
			</div>
		</div>
	);
};

export default Home;
