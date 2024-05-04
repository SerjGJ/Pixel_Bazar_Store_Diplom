import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PrivateContent, H2 } from '../../components';
import { TableRow, UserRow } from './components';
import { selectUserRole } from '../../selectors';
import { checkAccess } from '../../utils';
import { ROLE } from '../../constants';
import { Loader } from '../../loader/loader';
import { request } from '../../utils/request';
import styles from './users.module.css';

export const Users = () => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const userRole = useSelector(selectUserRole);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			setIsLoading(false);
			return;
		}

		Promise.all([request('/users'), request('/users/roles')])
			.then(([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}

				setUsers(usersRes.data);
				setRoles(rolesRes.data);
			})
			.catch((error) => {
				console.error('Ошибка при загрузке пользователей: ', error);
				setErrorMessage('Ошибка при загрузке пользователей');
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [shouldUpdateUserList, userRole]);

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		request(`/users/${userId}`, 'DELETE').then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
			<div className={styles.usersContainer}>
				<H2>Пользователи</H2>
				<div>
					<TableRow>
						<div className={styles.loginColumn}>Логин</div>
						<div className={styles.registredAdColumn}>Дата регистрации</div>
						<div className={styles.roleColumn}>Роль</div>
					</TableRow>
					{users.map(({ id, login, registeredAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registeredAt={registeredAt}
							roleId={roleId}
							roles={roles.filter(
								({ id: roleId }) => roleId !== ROLE.GUEST,
							)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</div>
		</PrivateContent>
	);
};
