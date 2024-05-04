import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectBasketProducts, selectUserId, selectBasketId } from '../../selectors';
import {
	loadBasketAsync,
	addToBasketAsync,
	removeBasketAsync,
	clearBasketAsync,
} from '../../actions';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from '../../loader/loader';
import styles from './basket.module.css';

export const Basket = () => {
	const dispatch = useDispatch();
	const basketProduct = useSelector(selectBasketProducts);
	const userId = useSelector(selectUserId);
	const basketId = useSelector(selectBasketId);
	const [totalCost, setTotalCost] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		let cost = 0;
		basketProduct.forEach((item) => {
			cost += item.productPrice * item.quantity;
		});
		setTotalCost(cost);
	}, [dispatch, basketProduct]);

	useEffect(() => {
		if (userId) {
			dispatch(loadBasketAsync(userId))
				.then(() => {
					setIsLoading(false);
				})
				.catch((error) => {
					console.error('Ошибка при загрузке корзины: ', error);
					setIsLoading(false);
				});
		}
	}, [dispatch, userId]);

	const handleRemoveProduct = (productId) => {
		dispatch(removeBasketAsync(basketId, productId));
	};

	const handleUpdateQuantity = (event, productId) => {
		const productToUpdate = basketProduct.find(
			(item) => item.productId === productId,
		);
		if (productToUpdate) {
			const newBasketData = {
				productId: productId,
				quantity: parseInt(event.target.value),
			};
			dispatch(addToBasketAsync(basketId, newBasketData));
		}
	};

	const handleClearBasket = () => {
		dispatch(clearBasketAsync(userId))
			.then(() => {
				dispatch(loadBasketAsync(userId));
			})
			.catch((error) => {
				console.error('Ошибка при очистке корзины: ', error);
			});
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={styles['basket-page']}>
			<h1>Корзина</h1>
			{!userId ? (
				<p>
					Для того чтобы продолжить,{' '}
					<span>
						<Link to="/login">Авторизуйтесь</Link>
					</span>{' '}
					или{' '}
					<span>
						<Link to="/register">Зарегистрируйтесь</Link>
					</span>
					.
				</p>
			) : basketProduct.length === 0 ? (
				<p>Ваша корзина пуста.</p>
			) : (
				<>
					<table className={styles['basket-table']}>
						<thead>
							<tr>
								<th>Название</th>
								<th>Цена</th>
								<th>Количество</th>
								<th>Действия</th>
							</tr>
						</thead>
						<tbody>
							{basketProduct.map((item) => (
								<tr key={item.productId}>
									<td className={styles['product-name']}>
										{item.productName}
									</td>
									<td>{item.productPrice} ₽</td>
									<td>
										<input
											type="number"
											min="1"
											value={item.quantity}
											onChange={(e) =>
												handleUpdateQuantity(e, item.productId)
											}
										/>
									</td>
									<td className={styles['product-actions']}>
										<button
											onClick={() =>
												handleRemoveProduct(item.productId)
											}
										>
											Удалить
										</button>
									</td>
								</tr>
							))}
						</tbody>
						<tfoot>
							<tr>
								<td colSpan="3" className={styles['total-cost']}>
									Общая стоимость:
								</td>
								<td>{totalCost} ₽</td>
							</tr>
						</tfoot>
					</table>
					<button
						className={styles['clear-button']}
						onClick={handleClearBasket}
					>
						Очистить корзину
					</button>
					<button
						className={styles['checkout-button']}
						onClick={() => {
							navigate('/order');
						}}
					>
						Перейти к оформлению заказа
					</button>
				</>
			)}
		</div>
	);
};
