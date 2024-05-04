import PropTypes from 'prop-types';
import styles from './h2.module.css';

export const H2 = ({ children, className }) => (
	<h2 className={`${styles.h2Container} ${className}`}>{children}</h2>
);

H2.propTypes = {
	children: PropTypes.node.isRequired,
};
