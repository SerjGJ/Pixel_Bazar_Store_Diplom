import PropTypes from 'prop-types';
import styles from './icon.module.css';

export const Icon = ({
	className,
	id,
	inactive,
	disabled,
	size = '24px',
	margin = '0',
	...props
}) => (
	<div
		className={`${styles.iconContainer} ${
			disabled ? styles.disabled : ''
		} ${className}`}
		style={{ fontSize: size, margin }}
		{...props}
	>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
);

Icon.propTypes = {
	id: PropTypes.string.isRequired,
	inactive: PropTypes.bool,
	disabled: PropTypes.bool,
	size: PropTypes.string,
	margin: PropTypes.string,
};
