import { AuthProvider } from '@/core/providers/AuthProvider';
import '@/styles/globals.css';

const App = ({ Component, pageProps }) => {
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
};

export default App;
