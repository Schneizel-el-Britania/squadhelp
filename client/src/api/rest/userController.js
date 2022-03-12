import http from '../interceptor';

export const getUser = () => http.get('getUser');
export const updateUser = (data) => http.patch('updateUser', data);
