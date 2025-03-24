import { useNavigate } from 'react-router-dom';
import { H2, Icon } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';

import styled from 'styled-components';
import { PROP_TYPE } from '../../../../constants';

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	// const { id, title, imageUrl, content, publishedAt } = post;

	const navigate = useNavigate();

	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2 size="24px">{title}</H2>
			<SpecialPanel
				id={id}
				publishedAt={new Date(publishedAt).toLocaleString('ru-RU')}
				margin="-20px 0 20px"
				editButton={
					<Icon
						id="fa-pencil-square-o"
						size="23px"
						onClick={() => navigate(`/post/${id}/edit`)}
					/>
				}
			/>
			<div className="post-text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
		width: 280px;
		height: 150px;
		object-fit: cover;
		border-radius: 10px;
		box-shadow: 5px 5px 10px;
	}

	& .post-text {
		font-size: 18px;
		min-height: 400px;
		margin: 0 0 50px 0;
	}
`;

PostContent.propTypes = {
	post: PROP_TYPE.POST,
};
