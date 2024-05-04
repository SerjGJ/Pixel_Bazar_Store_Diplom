import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './input.module.css'; // Импорт стилей

export const Input = forwardRef(({ className, width, ...props }, ref) => {
	return <input className={`${className} ${styles.container}`} {...props} ref={ref} />;
});

Input.propTypes = {
	width: PropTypes.string,
};
