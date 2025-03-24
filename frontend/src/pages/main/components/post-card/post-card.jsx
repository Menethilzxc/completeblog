import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from '../../../../components';

import styled from 'styled-components';
const PostCardContainer = ({
	className,
	id,
	title,
	imageUrl,
	publishedAt,
	commentsCount,
}) => {
	return (
		<div className={className}>
			<Link to={`/post/${id}`}>
				<div className="card">
					<img src={imageUrl} alt={title} />
					<div className="card-footer">
						<div className="card-title">
							<h4>{title}</h4>
						</div>
						<div className="card-info">
							<div className="card-info_published-at">
								<Icon
									inactive={true}
									id="fa-calendar-o"
									margin="0 7px 0 0"
								/>
								{publishedAt}
							</div>
							<div className="card-info_comments-count">
								<Icon id="fa-comment-o" margin="0 7px 0 0" />
								{commentsCount}
							</div>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	display: flex;
	flex-direction: column;
	width: 280px;
	margin: 20px;
	border-radius: 10px;
	box-shadow: 3px 3px 15px;

	& img {
		display: block;
		width: 280px;
		height: 150px;
		border-radius: 10px 10px 0 0;

		object-fit: cover;
	}

	& .card-footer {
		border-top: 1px solid #000;
		padding: 5px;
	}

	& .card-title {
		width: 260px;
		height: 55px;
		margin: 5px;
		font-weight: bold;
		font-size: 18px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	& .card-info {
		display: flex;
		justify-content: space-between;
		padding: 0 5px 5px 5px;
	}

	& .card-info_published-at {
		display: flex;
		align-items: center;
	}

	& .card-info_comments-count {
		display: flex;
		align-items: center;
	}
`;

PostCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	commentsCount: PropTypes.number.isRequired,
};
