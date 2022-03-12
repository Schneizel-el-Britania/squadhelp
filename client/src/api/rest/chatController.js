import http from '../interceptor';

export const getPreviewChat = () => http.get('getPreview');
export const getDialog = (data) => http.post('getChat', data);
export const changeChatFavorite = (data) => http.post('favorite', data);
export const changeChatBlock = (data) => http.post('blackList', data);
export const newMessage = (data) => http.post('newMessage', data);