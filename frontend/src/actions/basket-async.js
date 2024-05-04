import { request } from '../utils/request';
import {
	setBasketData,
	removeProductFromBasket,
	updateProductQuantityInBasket,
} from './basket-actions';

export const loadBasketAsync = (userId) => (dispatch) =>
	request(`/baskets/${userId}`)
		.then((basketData) => {
			dispatch(setBasketData(basketData));
			return basketData;
		})
		.catch((error) => {
			console.error('Ошибка при загрузке корзины: ', error);
		});

export const removeBasketAsync = (basketId, productId) => (dispatch) => {
	request(`/baskets/${basketId}/products/${productId}`, 'DELETE')
		.then(() => {
			dispatch(removeProductFromBasket(productId));
		})
		.catch((error) => {
			console.error('Ошибка при удалении продукта из корзины: ', error);
		});
};

export const saveBasketAsync = (newBasketData) => (dispatch) =>
	request('/baskets', 'POST', newBasketData).then((response) => {
		dispatch(setBasketData(response.data));
		return response.data;
	});

export const addToBasketAsync = (id, newBasketData) => (dispatch) => {
	request(`/baskets/${id}`, 'PATCH', newBasketData)
		.then((updatedBasket) => {
			dispatch(setBasketData(updatedBasket.data));
			return updatedBasket;
		})
		.catch((error) => {
			console.error('Ошибка при добавлении товара в корзину: ', error);
		});
};

export const clearBasketAsync = (userId) => (dispatch) => {
	return request(`/baskets/${userId}/products`, 'DELETE')
		.then(() => {
			dispatch(setBasketData([]));
		})
		.catch((error) => {
			console.error('Ошибка при очистке корзины: ', error);
		});
};

export const updateQuantityAsync =
	(id, newBasketData, productId, quantity) => (dispatch) => {
		request(`/baskets/${id}`, 'PATCH', newBasketData).then(() => {
			dispatch(updateProductQuantityInBasket(productId, quantity));
		});
	};
