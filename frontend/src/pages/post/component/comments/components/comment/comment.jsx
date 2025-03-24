import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../../../components';
import { removeCommentAsync, openModal, CLOSE_MODAL } from '../../../../../../actions';
import { selectUserRole } from '../../../../../../selectors';
import { checkAccess } from '../../../../../../utils';
import { ROLE } from '../../../../../../constants';

import styled from 'styled-components';

// eslint-disable-next-line react/prop-types
const CommentContainer = ({ className, postId, id, author, content, publishedAt }) => {
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(postId, id));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdminOrModerator = checkAccess([ROLE.ADMIN, ROLE.MODERATOR], roleId);

	return (
		<div className={className}>
			<div className="comment">
				<div className="information-panel">
					<div className="author">
						<Icon
							inactive={true}
							id="fa-user-circle-o"
							margin="0 10px 0 0 "
							size="18px"
						/>
						{author}
					</div>
					<div className="publised-at">
						<Icon
							inactive={true}
							id="fa-calendar-o"
							margin="0 10px 0 10px "
							size="17px"
						/>
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			{isAdminOrModerator && (
				<Icon
					id="fa-trash-o"
					margin="0 0 0 10px "
					size="19px"
					onClick={() => onCommentRemove(id)}
				/>
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	margin-top: 10px;

	& .comment {
		border: 1px solid #000;
		padding: 5px 10px;
		border-radius: 5px;
		width: 550px;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}

	& .author {
		display: flex;
	}

	& .publised-at {
		display: flex;
	}
`;

Comment.propTypes = {
	postId: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
};
