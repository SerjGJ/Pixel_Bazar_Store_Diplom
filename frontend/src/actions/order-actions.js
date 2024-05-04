import { ACTION_TYPE } from './action-type';

export const addOrder = (orderData) => ({
	type: ACTION_TYPE.ADD_ORDER,
	payload: orderData,
});

export const removeOrder = (orderId) => ({
	type: ACTION_TYPE.REMOVE_ORDER,
	payload: orderId,
});

export const updateOrderStatus = (orderId, newStatus) => ({
	type: ACTION_TYPE.UPDATE_ORDER_STATUS,
	payload: { orderId, newStatus },
});

export const setAllOrders = (orders) => ({
	type: ACTION_TYPE.SET_ALL_ORDERS,
	payload: orders,
});
