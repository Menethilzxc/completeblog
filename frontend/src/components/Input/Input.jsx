import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import styled from 'styled-components';

// eslint-disable-next-line react/prop-types, react/display-name
const InputContainer = forwardRef(({ className, ...props }, ref) => {
	return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
	width: ${({ width = '100%' }) => width};
	font-size: 18px;
	height: 40px;
	padding: ${({ padding = '10px' }) => padding};
	margin: 0 0 10px;
	border: 1px solid #000;
	border-radius: 5px;

	&:focus {
		box-shadow: 0px 0px 5px blue;
		outline: none;
	}
`;

Input.propTypes = {
	width: PropTypes.string,
};
