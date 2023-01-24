const { useState, useCallback } = require('react');

export const useApi = (func, isLoading = false) => {
	const [loading, setLoading] = useState(isLoading);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	const mutate = useCallback(
		async (...args) => {
			setLoading(true);
			setError(null);

			try {
				const response = await func(...args);
				setData(response.data);
			} catch (error) {
				setError(error);
			}

			setLoading(false);
		},
		[func]
	);

	return { loading, data, error, mutate };
};
