import { http } from '@/core/lib/http';

export const authLogin = async payload => await http.post('login', payload);
export const authWhoiam = async () => await http.get('whoiam');
export const authLogout = async () => await http.get('logout');
