import PropTypes from 'prop-types';
import styles from './button.module.css';

export const Button = ({ children, className, width = '100%', ...props }) => (
	<button
		className={`${styles.buttonContainer} ${className}`}
		style={{ width }}
		{...props}
	>
		{children}
	</button>
);

Button.propTypes = {
	children: PropTypes.node.isRequired,
	width: PropTypes.string,
};
