import PropTypes from 'prop-types';
import styles from './auth-form-error.module.css';

export const AuthFormError = ({ children }) => (
	<div className={styles.authFormError}>{children}</div>
);

AuthFormError.propTypes = {
	children: PropTypes.node.isRequired,
};
