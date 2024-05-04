import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { PrivateContent } from '../../components';
import { Search } from '../main/components';
import { selectUserRole } from '../../selectors';
import { checkAccess } from '../../utils';
import { debounce } from '../main/utils';
import { ROLE } from '../../constants';
import { request } from '../../utils/request';
import styles from './admin.module.css';

export const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [status, setStatus] = useState([]);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const userRole = useSelector(selectUserRole);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN, ROLE.MODERATOR], userRole)) {
			return;
		}

		Promise.all([
			request(`/orders?search=${searchPhrase}`),
			request('/orders/status'),
		]).then(([ordersRes, statusRes]) => {
			if (ordersRes.error || statusRes.error) {
				setErrorMessage(ordersRes.error || statusRes.error);
				return;
			}

			setOrders(ordersRes.data);
			setStatus(statusRes.data);
		});
	}, [userRole, searchPhrase, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	const updateOrderStatus = (orderId, newStatusId) => {
		request(`/orders/${orderId}`, 'PATCH', { statusId: newStatusId }).then(() => {
			setOrders((prevOrders) =>
				prevOrders.map((order) =>
					order.id === orderId ? { ...order, statusId: newStatusId } : order,
				),
			);
		});
	};

	const onStatusChange = (orderId, event) => {
		const newStatusId = Number(event.target.value);
		updateOrderStatus(orderId, newStatusId);
	};

	if (!checkAccess([ROLE.ADMIN, ROLE.MODERATOR], userRole)) {
		return null;
	}

	return (
		<PrivateContent access={[ROLE.ADMIN, ROLE.MODERATOR]} serverError={errorMessage}>
			<div className={styles.container}>
				<h2 className={styles.h2}>Заказы</h2>
				<div className={styles.search}>
					<Search searchPhrase={searchPhrase} onChange={onSearch} />
				</div>
				<div className={styles.tableContainer}>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>Имя</th>
								<th>Email</th>
								<th>Продукты</th>
								<th>Комментарий к заказу</th>
								<th>Статус</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order.id}>
									<td>{order.name}</td>
									<td>{order.email}</td>
									<td>
										<ul>
											{order.products &&
												order.products.map((product, index) => (
													<li key={index}>
														{product.productName} - Цена:{' '}
														{product.productPrice},
														Количество: {product.quantity}
													</li>
												))}
										</ul>
									</td>
									<td>{order.comment}</td>
									<td>
										<select
											value={order.statusId}
											onChange={(event) =>
												onStatusChange(order.id, event)
											}
											className={styles.statusSelect}
										>
											{status.map(
												({ id: statusId, name: statusName }) => (
													<option
														key={statusId}
														value={statusId}
													>
														{statusName}
													</option>
												),
											)}
										</select>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</PrivateContent>
	);
};
