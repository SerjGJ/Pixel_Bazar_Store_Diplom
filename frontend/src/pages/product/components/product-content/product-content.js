import { useNavigate } from 'react-router-dom';
import { H2, Icon } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import styles from './product-content.module.css';
import { PROP_TYPE, ROLE } from '../../../../constants';
import { addToBasketAsync } from '../../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectBasketId, selectUserRole } from '../../../../selectors';

export const ProductContent = ({
	className,
	product: { id, name, imageUrl, genre, price, platform, content, publishedAt },
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const basketId = useSelector(selectBasketId);

	const userRole = useSelector(selectUserRole);
	const isUser = [ROLE.USER].includes(userRole);

	const addToBasket = () => {
		const newBasketData = {
			productId: id,
			productName: name,
			productPrice: price,
			quantity: 1,
		};
		dispatch(addToBasketAsync(basketId, newBasketData));
	};

	return (
		<div className={`${className} ${styles.productContent}`}>
			<img className={styles.productImage} src={imageUrl} alt={name} />
			<H2>{name}</H2>
			{isUser && (
				<div>
					<button className={styles.buttonPay} onClick={addToBasket}>
						Купить
					</button>
				</div>
			)}
			<h4>Платформа: {platform}</h4>
			<h4>Жанр: {genre}</h4>
			<h4>Цена: {price} ₽</h4>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="-10px 0 20px"
				editButton={
					<Icon
						id="fa-pencil-square-o"
						size="21px"
						margin="0 10px 0 0"
						onClick={() => navigate(`/product/${id}/edit`)}
					/>
				}
			/>
			<div className={styles.productText}>{content}</div>
		</div>
	);
};

ProductContent.propTypes = {
	product: PROP_TYPE.PRODUCT.isRequired,
};
