import { Link } from 'react-router-dom';
import styles from './order-confirmation.module.css';

export const OrderConfirmation = () => {
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Ваш заказ оформлен</h2>
			<p className={styles.message}>
				Можете посмотреть его статус в{' '}
				<Link to="/user" className={styles.link}>
					Личном кабинете.
				</Link>
			</p>
		</div>
	);
};
