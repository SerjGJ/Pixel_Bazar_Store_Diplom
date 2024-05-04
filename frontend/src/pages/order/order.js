import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createOrderAsync, loadBasketAsync, clearBasketAsync } from '../../actions';
import { selectUserId, selectBasket } from '../../selectors';
import * as yup from 'yup';
import styles from './order.module.css';

export const Order = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [comment, setComment] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const basket = useSelector(selectBasket);
	const userId = useSelector(selectUserId);
	const [errors, setErrors] = useState({});

	const validationSchema = yup.object().shape({
		name: yup.string().required('Имя обязательно для заполнения'),
		email: yup
			.string()
			.email('Введите корректный email')
			.required('Email обязателен для заполнения'),
	});

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			await validationSchema.validate({ name, email }, { abortEarly: false });

			const orderData = {
				name,
				email,
				userId: userId,
				comment,
				products: basket.products,
			};

			dispatch(createOrderAsync(orderData));
			setName('');
			setEmail('');
			setComment('');
			dispatch(clearBasketAsync(userId));
			navigate('/order-confirmation');
		} catch (error) {
			if (error instanceof yup.ValidationError) {
				const newErrors = {};
				error.inner.forEach((e) => {
					newErrors[e.path] = e.message;
				});
				setErrors(newErrors);
			} else {
				console.error('Ошибка при оформлении заказа:', error);
			}
		}
	};

	useEffect(() => {
		if (userId) {
			dispatch(loadBasketAsync(userId));
		}
	});

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Оформление заказа</h2>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.inputBlock}>
					<label>Имя:</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
					{errors.name && <div className={styles.error}>{errors.name}</div>}
				</div>
				<div className={styles.inputBlock}>
					<label>Email:</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					{errors.email && <div className={styles.error}>{errors.email}</div>}
				</div>
				<div className={styles.inputBlock}>
					<label>Комментарий к заказу:</label>
					<textarea
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						rows={5}
						className={styles.commentInput}
					/>
				</div>
				<button className={styles.buttonOrder} type="submit">
					Оформить заказ
				</button>
			</form>
		</div>
	);
};
