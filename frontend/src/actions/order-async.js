import { request } from '../utils/request';
import { setAllOrders, addOrder, updateOrderStatus } from './order-actions';

export const getAllOrdersAsync = () => (dispatch) =>
	request('/orders')
		.then((orders) => {
			dispatch(setAllOrders(orders.data));
			return orders.data;
		})
		.catch((error) => {
			console.error('Ошибка при загрузке всех заказов: ', error);
		});

export const createOrderAsync = (orderData) => (dispatch) =>
	request('/orders', 'POST', orderData)
		.then((newOrder) => {
			dispatch(addOrder(newOrder));
			return newOrder;
		})

		.catch((error) => {
			console.error('Ошибка при создании нового заказа: ', error);
		});

export const updateOrderStatusAsync = (orderId, newStatus) => (dispatch) =>
	request(`/orders/${orderId}`, 'PATCH', { status: newStatus })
		.then((updatedOrder) => {
			dispatch(updateOrderStatus(orderId, newStatus));
			return updatedOrder.data;
		})
		.catch((error) => {
			console.error('Ошибка при обновлении статуса заказа: ', error);
		});

export const getOrdersByUserIdAsync = (userId) => (dispatch) =>
	request(`/orders/users/${userId}`)
		.then((userOrders) => {
			dispatch(setAllOrders(userOrders.data));
			return userOrders;
		})
		.catch((error) => {
			console.error('Ошибка при получении заказов пользователя: ', error);
		});
