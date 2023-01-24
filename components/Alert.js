import clsx from 'clsx';

const VARIANTS = {
	danger: 'bg-danger-light text-danger border-[0.2px] border-danger',
};

export const Alert = ({ variant = 'danger', message, className }) => {
	return (
		<div
			className={clsx(
				'block text-center p-3 rounded-md w-full',
				VARIANTS[variant],
				className
			)}
		>
			<p className='text-[15px] font-medium'>{message}</p>
		</div>
	);
};
