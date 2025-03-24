import { useSelector } from 'react-redux';
import { Button } from '../Button/Button';
import {
	selectModalIsOpen,
	selectModalText,
	selectModalOnConfirm,
	selectModalOnCancel,
} from '../../selectors';

import styled from 'styled-components';

// eslint-disable-next-line react/prop-types
const ModalContainer = ({ className }) => {
	const isOpen = useSelector(selectModalIsOpen);
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				<h3>{text}</h3>
				<div className="buttons">
					<Button
						width="120px"
						margin="0 10px"
						color="#98f598"
						onClick={onConfirm}
					>
						Да
					</Button>
					<Button
						width="120px"
						margin="0 10px"
						color="#ff8c8c"
						onClick={onCancel}
					>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 20;

	& .overlay {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100%;
	}

	& .box {
		position: relative;
		top: 50%;
		transform: translate(0, -50%);
		width: 400px;
		margin: 0 auto;
		padding: 10px 20px 20px;
		background-color: #fff;
		border: 2px solid #000;
		border-radius: 10px;
		z-index: 30;
	}

	& h3 {
		margin: 0 0 20px 0;
		text-align: center;
		font-weight: bold;
		font-size: 18px;
	}

	& .buttons {
		display: flex;
		justify-content: center;
	}

	& .buttons button:hover {
		border: none;
	}
`;
