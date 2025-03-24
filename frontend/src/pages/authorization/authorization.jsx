import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Button, H2, AuthFormError } from '../../components';
import { useResetForm } from '../../hooks';
import { setUser } from '../../actions';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import styled from 'styled-components';
import { request } from '../../utils';

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните поле "логин"')
		.matches(
			/^\w+$/,
			'Некорректный логин. Допускаются только латинские буквы и цифры',
		)
		.min(3, 'Некорректный логин. Минимум 3 символа')
		.max(15, 'Некорректный логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните поле "пароль"')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнено поле "пароль". Допускаются: буквы, цифры и знаки: # %',
		)
		.min(6, 'Некорректный пароль. Минимум 6 символов')
		.max(20, 'Некорректный пароль. Максимум 20 символов'),
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 15px 0;
	font-size: 18px;
`;

// eslint-disable-next-line react/prop-types
const AuthorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/api/login', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;

	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2 className={className}>Авторизация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					className={className}
					type={'text'}
					placeholder={'Введите логин...'}
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					className={className}
					type={'password'}
					placeholder={'Введите пароль...'}
					{...register('password', {
						onChange: () => setServerError(null),
					})}
					style={{ marginBottom: '20px' }}
				/>

				<Button
					className={className}
					type="submit"
					disabled={!!formError}
					width={'150px'}
					margin={'auto'}
				>
					Авторизоваться
				</Button>

				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}

				<StyledLink to="/register" className="underline text-center my-4 text-lg">
					Регистрация
				</StyledLink>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
