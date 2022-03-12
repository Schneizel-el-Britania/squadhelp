import http from '../interceptor';

export const setNewOffer = (data) => http.post('setNewOffer', data);
export const cashOut = (data) => http.post('cashout', data);