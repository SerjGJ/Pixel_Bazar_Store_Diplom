import PropTypes from 'prop-types';
import styles from '../../users.module.css';

export const TableRow = ({ className, children, border }) => (
	<div
		className={`${styles.tableRowContainer} ${
			border ? styles.border : ''
		} ${className}`}
	>
		{children}
	</div>
);

TableRow.propTypes = {
	children: PropTypes.node.isRequired,
	border: PropTypes.bool,
};
