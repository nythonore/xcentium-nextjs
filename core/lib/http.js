import axios from 'axios';

export const http = axios.create({
	baseURL: 'http://localhost:3000/api',
	withCredentials: true,
});

http.interceptors.request.use(config => {
	return config;
});

http.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		return Promise.reject(error.response.data);
	}
);
