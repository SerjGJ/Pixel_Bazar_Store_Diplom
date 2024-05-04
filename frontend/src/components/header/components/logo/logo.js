import { Link } from 'react-router-dom';
import { Icon } from '../../../../components';
import styles from './logo.module.css';

export const Logo = ({ className }) => (
	<Link className={`${className} ${styles.container}`} to="/">
		<Icon
			id="fa-american-sign-language-interpreting"
			size="70px"
			margin="0 10px 0 0"
		/>
		<div>
			<div className={styles.largeText}>Pixel</div>
			<div className={styles.smallText}>Bazaar</div>
		</div>
	</Link>
);
