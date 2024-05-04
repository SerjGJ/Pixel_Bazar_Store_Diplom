import { useEffect, useMemo, useState } from 'react';
import { Pagination, ProductCard, Search } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { debounce } from './utils';
import { Loader } from '../../loader/loader';
import styles from './main.module.css';
import { request } from '../../utils/request';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../selectors';
import { loadBasketAsync } from '../../actions';

export const Main = ({ className }) => {
	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [sortDirection, setSortDirection] = useState('asc');
	const [genres, setGenres] = useState([]);
	const [selectedGenre, setSelectedGenre] = useState('');
	const [platforms, setPlatforms] = useState([]);
	const [selectedPlatform, setSelectedPlatform] = useState('');
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);

	useEffect(() => {
		setIsLoading(true);
		request(
			`/products?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}&sortDirection=${sortDirection}&genre=${selectedGenre}&platform=${selectedPlatform}`,
		).then(({ data: { products, lastPage } }) => {
			let sortedProducts;
			if (sortDirection === 'asc') {
				sortedProducts = products
					.slice()
					.sort((a, b) => parseInt(a.price) - parseInt(b.price));
			} else {
				sortedProducts = products
					.slice()
					.sort((a, b) => parseInt(b.price) - parseInt(a.price));
			}

			setProducts(sortedProducts);
			setLastPage(lastPage);
			setIsLoading(false);
		});

		request('/genres').then(({ genres }) => {
			setGenres(genres || []);
		});

		request('/platforms').then(({ platforms }) => {
			setPlatforms(platforms || []);
		});
		if (userId) {
			dispatch(loadBasketAsync(userId));
		}
	}, [
		page,
		shouldSearch,
		searchPhrase,
		sortDirection,
		selectedGenre,
		selectedPlatform,
		userId,
		dispatch,
	]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	const toggleSortDirection = () => {
		const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		setSortDirection(newSortDirection);
	};

	const handleGenreChange = (event) => {
		setSelectedGenre(event.target.value);
	};

	const handlePlatformChange = (event) => {
		setSelectedPlatform(event.target.value);
	};

	return (
		<div className={`${className} ${styles.main}`}>
			<div className={styles.productAndSearch}>
				<div className={styles.searchContainer}>
					<Search searchPhrase={searchPhrase} onChange={onSearch} />
				</div>
				<div>
					<select
						className={styles.selectContainer}
						value={selectedGenre}
						onChange={handleGenreChange}
					>
						<option value="">Все жанры</option>
						{genres.map((genre, index) => (
							<option key={index} value={genre}>
								{genre}
							</option>
						))}
					</select>
					<select
						className={styles.selectContainer}
						value={selectedPlatform}
						onChange={handlePlatformChange}
					>
						<option value="">Все платформы</option>
						{platforms.map((platform, index) => (
							<option key={index} value={platform}>
								{platform}
							</option>
						))}
					</select>
				</div>
				<button onClick={toggleSortDirection} className={styles.sortButton}>
					Сортировать по цене (
					{sortDirection === 'asc' ? 'возрастанию' : 'убыванию'})
				</button>
			</div>
			{isLoading ? (
				<Loader />
			) : (
				<>
					{products.length > 0 ? (
						<div className={styles.productList}>
							{products.map(
								({ id, name, imageUrl, price, genre, platform }) => (
									<ProductCard
										key={id}
										id={id}
										name={name}
										imageUrl={imageUrl}
										price={price}
										genre={genre}
										platform={platform}
									/>
								),
							)}
						</div>
					) : (
						<div className={styles.noProductsFound}>Игры не найдены</div>
					)}
				</>
			)}
			{lastPage > 1 && products.length > 0 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};
