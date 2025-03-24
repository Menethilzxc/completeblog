import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonContainer = ({ className, children, disabled, ...props }) => {
	return (
		<button className={className} {...props} disabled={disabled}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${({ width = '100%' }) => width};
	margin: ${({ margin = '' }) => margin};
	font-size: 18px;
	height: 36px;
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
	border: 1px solid black;
	border-radius: 5px;
	opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
	&:hover {
		background-color: ${({ disabled, color }) => (
			disabled ? '' : '#ddd', disabled ? '#fff' : color
		)};
	}
`;

Button.propTypes = {
	children: PropTypes.node.isRequired,
	width: PropTypes.string,
};
