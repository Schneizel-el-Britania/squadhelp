import http from '../interceptor';

export const getCatalogList = (data) => http.get('getCatalogs', data);
export const createCatalog = (data) => http.post('createCatalog', data);
export const removeChatFromCatalog = (data) => http.post('removeChatFromCatalog', data);
export const deleteCatalog = (data) => http.post('deleteCatalog', data);
export const changeCatalogName = (data) => http.patch('updateNameCatalog', data);
export const addChatToCatalog = (data) => http.post('addNewChatToCatalog', data);