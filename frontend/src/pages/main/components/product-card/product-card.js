import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from '../../../../components';
import styles from './product-card.module.css';

export const ProductCard = ({ className, id, name, imageUrl, genre, price }) => {
	return (
		<div className={`${styles.productCard} ${className}`}>
			<Link to={`/product/${id}`} className={styles.productCardLink}>
				<img src={imageUrl} alt={name} />
				<div className={styles.productCardFooter}>
					<h4>{name}</h4>
					<h4>Жанр: {genre}</h4>
					<div className={styles.productCardInfo}>
						<div className={styles.productPrice}>
							<Icon
								inactive={true}
								id="fa-calendar-o"
								margin="0 7px 0 0"
								size="18px"
							/>
							{price} ₽
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

ProductCard.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	genre: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
};
