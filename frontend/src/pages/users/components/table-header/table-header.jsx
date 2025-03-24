import PropTypes from 'prop-types';
import styled from 'styled-components';

// eslint-disable-next-line react/prop-types
const TableHeaderContainer = ({ className, children }) => (
	<div className={className}>{children}</div>
);

export const TableHeader = styled(TableHeaderContainer)`
	display: flex;
	align-items: center;

	& > div {
		display: flex;
		padding: 0 10px;
	}

	& .login-column {
		width: 172px;
	}

	& .registered-at-column {
		width: 213px;
	}

	& .role-column {
		width: auto;
	}
`;

TableHeader.propTypes = {
	children: PropTypes.node.isRequired,
};
