import PropTypes from 'prop-types';
import { useState } from 'react';
import { Icon, Input } from '../../../../components';

import styled from 'styled-components';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				padding="10px 35px 10px 10px"
				placeholder="Поиск по заголовку"
				onChange={onChange}
			/>
			<Icon inactive={true} id="fa-search" size="22px" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	width: 340px;
	margin: 30px auto 0;

	& > div {
		position: absolute;
		top: 2px;
		right: 9px;
	}
`;

Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
