/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { selectUserRole } from '../../../../selectors';
import { addCommentAsync } from '../../../../actions';
import { PROP_TYPE, ROLE } from '../../../../constants';
import { checkAccess } from '../../../../utils';

import styled from 'styled-components';

// eslint-disable-next-line react/prop-types
const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const onNewCommentAdd = (postId, content) => {
		dispatch(addCommentAsync(postId, content));
		setNewComment('');
	};

	const isGuest = checkAccess([ROLE.GUEST], userRole);

	return (
		<div className={className}>
			{!isGuest && (
				<div className="new-comment">
					<textarea
						name="comment"
						value={newComment}
						placeholder="Комментарий..."
						onChange={({ target }) => {
							setNewComment(target.value);
						}}
					></textarea>
					<Icon
						id="fa-paper-plane-o"
						margin="0 0 0 10px "
						size="18px"
						onClick={() => onNewCommentAdd(postId, newComment.trim())}
					/>
				</div>
			)}

			<div className="comments">
				{comments.map(({ _id, author, content, publishedAt }) => (
					<Comment
						key={_id}
						postId={postId}
						id={_id}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	width: 580px;
	margin: 20px auto;

	& .new-comment {
		display: flex;
		width: 100%;
		margin: 20px 0 0;
	}

	& .new-comment textarea {
		width: 550px;
		height: 120px;
		border: 1px solid black;
		border-radius: 7px;
		resize: none;
		font-size: 20px;
		padding: 5px 0 0 10px;
	}

	& ::placeholder {
		font-size: 20px;
		padding: 5px 0 0 10px;
	}
`;

Comments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
	postId: PropTypes.string.isRequired,
};
