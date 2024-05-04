import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon, Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { saveProductAsync } from '../../../../actions';
import { sanizeContent } from './utils';
import styles from './product-form.module.css';
import { PROP_TYPE } from '../../../../constants';

export const ProductForm = ({
	className,
	product: { id, name, imageUrl, platform, genre, price, content, publishedAt },
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [nameValue, setNameValue] = useState(name);
	const contentRef = useRef(null);
	const [genreValue, setGenreValue] = useState(genre);
	const [priceValue, setPriceValue] = useState(price);
	const [platformValue, setPlatformValue] = useState(platform);

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setNameValue(name);
		setPlatformValue(platform);
		setGenreValue(genre);
		setPriceValue(price);
	}, [imageUrl, name, platform, genre, price]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSave = () => {
		const newContent = sanizeContent(contentRef.current.innerHTML);

		dispatch(
			saveProductAsync(id, {
				imageUrl: imageUrlValue,
				name: nameValue,
				genre: genreValue,
				price: priceValue,
				platform: platformValue,
				content: newContent,
			}),
		).then(({ id }) => navigate(`/product/${id}`));
	};

	const onImageChange = ({ target }) => setImageUrlValue(target.value);
	const onNameChange = ({ target }) => setNameValue(target.value);
	const onPlatformChange = ({ target }) => setPlatformValue(target.value);
	const onGenreChange = ({ target }) => setGenreValue(target.value);
	const onPriceChange = ({ target }) => setPriceValue(target.value);

	return (
		<div className={`${className} ${styles.productFormContainer}`}>
			<Input
				value={imageUrlValue}
				placeholder="Изображение..."
				onChange={onImageChange}
			/>
			<Input value={nameValue} placeholder="Заголовок..." onChange={onNameChange} />
			<Input
				value={platformValue}
				placeholder="Платформа..."
				onChange={onPlatformChange}
			/>
			<Input value={genreValue} placeholder="Жанр..." onChange={onGenreChange} />
			<Input value={priceValue} placeholder="Цена..." onChange={onPriceChange} />
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="20px 0"
				editButton={
					<Icon
						id="fa-floppy-o"
						size="21px"
						margin="0 10px 0 0"
						onClick={onSave}
					/>
				}
			/>
			<h2>Описание игры:</h2>
			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className={styles.productText}
			>
				{content}
			</div>
		</div>
	);
};

ProductForm.propTypes = {
	product: PROP_TYPE.PRODUCT.isRequired,
};
