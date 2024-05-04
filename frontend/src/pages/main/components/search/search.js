import PropTypes from 'prop-types';
import { Icon, Input } from '../../../../components';
import styles from './search.module.css';

export const Search = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={`${styles.searchContainer} ${className}`}>
			<Input
				value={searchPhrase}
				placeholder="Поиск по названиям..."
				onChange={onChange}
			/>
			<Icon inactive={true} id="fa-search" size="21px" />
		</div>
	);
};

Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
