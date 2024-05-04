import { ACTION_TYPE } from './action-type';

export const setProductData = (productData) => ({
	type: ACTION_TYPE.SET_PRODUCT_DATA,
	payload: productData,
});
