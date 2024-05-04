import { ACTION_TYPE } from './action-type';

export const addProductToBasket = (id, data) => ({
	type: ACTION_TYPE.ADD_PRODUCT_TO_BASKET,
	payload: {
		id,
		data,
	},
});

export const removeProductFromBasket = (productId) => ({
	type: ACTION_TYPE.REMOVE_PRODUCT_FROM_BASKET,
	payload: productId,
});

export const updateProductQuantityInBasket = (productId, quantity) => ({
	type: ACTION_TYPE.UPDATE_PRODUCT_QUANTITY_IN_BASKET,
	payload: { productId, quantity },
});

export const createBasket = () => ({
	type: ACTION_TYPE.CREATE_BASKET,
});

export const resetBasket = () => ({
	type: ACTION_TYPE.RESET_BASKET,
});

export const setBasketData = (basketData) => ({
	type: ACTION_TYPE.SET_BASKET_DATA,
	payload: basketData,
});
