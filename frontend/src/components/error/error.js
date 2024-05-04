import { H2 } from '../h2/h2';
import { PROP_TYPE } from '../../constants';
import styles from './error.module.css';

export const Error = ({ error }) =>
	error && (
		<div className={styles.errorContainer}>
			<H2>Ошибка</H2>
			<div>{error}</div>
		</div>
	);

Error.propTypes = {
	error: PROP_TYPE.ERROR,
};
