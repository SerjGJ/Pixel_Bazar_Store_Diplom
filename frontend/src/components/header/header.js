import { ControlPanel, Logo } from './components';
import styles from './header.module.css';

export const Header = ({ className, userId }) => (
	<header className={`${className} ${styles.container}`}>
		<Logo />
		г. Луноград, ул. Кометная, д. 42/1
		<ControlPanel userId={userId} />
	</header>
);
