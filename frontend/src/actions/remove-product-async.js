import { request } from '../utils/request';

export const removeProductAsync = (id) => () => request(`/products/${id}`, 'DELETE');
