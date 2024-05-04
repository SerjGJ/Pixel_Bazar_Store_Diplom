import { useEffect, useLayoutEffect, useState } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ProductContent, ProductForm } from './components';
import { Error, PrivateContent } from '../../components';
import { RESET_PRODUCT_DATA, loadProductAsync, loadBasketAsync } from '../../actions';
import { selectProduct, selectBasket, selectUserId } from '../../selectors';
import { Loader } from '../../loader/loader';
import { ROLE } from '../../constants';
import styles from './product.module.css';

export const Product = ({ className }) => {
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const params = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const isCreating = !!useMatch('/product');
	const isEditing = !!useMatch('/product/:id/edit');
	const product = useSelector(selectProduct);
	const basket = useSelector(selectBasket);
	const userId = useSelector(selectUserId);

	useLayoutEffect(() => {
		dispatch(RESET_PRODUCT_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}

		dispatch(loadProductAsync(params.id)).then((productData) => {
			if (userId) {
				dispatch(loadBasketAsync(userId));
			}
			setError(productData.error);
			setIsLoading(false);
		});
	}, [dispatch, params.id, isCreating, userId]);

	if (isLoading) {
		return <Loader />;
	}

	const SpecificProductPage =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
				<div className={`${className} ${styles.productContainer}`}>
					<ProductForm product={product} />
				</div>
			</PrivateContent>
		) : (
			<div className={`${className} ${styles.productContainer}`}>
				<ProductContent product={product} basket={basket} />
			</div>
		);

	return error ? <Error error={error} /> : SpecificProductPage;
};
