import { ACTION_TYPE } from '../actions';

const initialBasketState = {
	id: '',
	userId: '',
	productName: '',
	productPrice: '',
	products: [],
};

export const basketReducer = (state = initialBasketState, action) => {
	switch (action.type) {
		case ACTION_TYPE.ADD_PRODUCT_TO_BASKET:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.REMOVE_PRODUCT_FROM_BASKET:
			return {
				...state,
				products: state.products.filter(
					(product) => product.productId !== action.payload,
				),
			};
		case ACTION_TYPE.UPDATE_PRODUCT_QUANTITY_IN_BASKET:
			return {
				...state,
				products: state.products.map((product) =>
					product.productId === action.payload.productId
						? { ...product, quantity: action.payload.quantity }
						: product,
				),
			};
		case ACTION_TYPE.CREATE_BASKET:
			return initialBasketState;
		case ACTION_TYPE.RESET_BASKET:
			return initialBasketState;
		case ACTION_TYPE.SET_BASKET_DATA:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};
