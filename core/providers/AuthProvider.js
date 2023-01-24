import { createContext, useEffect, useState } from 'react';
import { useApi } from '@/core/hooks/useApi';
import { authWhoiam } from '@/services/auth';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const { loading, data, error, mutate } = useApi(authWhoiam, true);

	useEffect(() => {
		mutate();
	}, []);

	useEffect(() => {
		if (data) setUser(data.data);
	}, [data]);

	useEffect(() => {
		setUser(null);
	}, [error]);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{loading ? null : children}
		</AuthContext.Provider>
	);
};
