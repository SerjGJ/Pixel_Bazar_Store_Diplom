import { ACTION_TYPE } from '../actions';

const initialOrderState = {
	orders: [],
};

export const orderReducer = (state = initialOrderState, action) => {
	switch (action.type) {
		case ACTION_TYPE.ADD_ORDER:
			return {
				...state,
				orders: [...state.orders, action.payload],
			};
		case ACTION_TYPE.REMOVE_ORDER:
			return {
				...state,
				orders: state.orders.filter((order) => order.id !== action.payload),
			};
		case ACTION_TYPE.UPDATE_ORDER_STATUS:
			return {
				...state,
				orders: state.orders.map((order) =>
					order.id === action.payload.orderId
						? { ...order, statusId: action.payload.newStatus }
						: order,
				),
			};
		case ACTION_TYPE.SET_ALL_ORDERS:
			return {
				...state,
				orders: action.payload.orders,
			};
		default:
			return state;
	}
};
