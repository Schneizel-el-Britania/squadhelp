import http from '../interceptor';

export const payment = (data) => http.post('pay', data.formData);
export const changeMark = (data) => http.post('changeMark', data);