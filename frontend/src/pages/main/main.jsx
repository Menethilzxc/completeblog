import { useEffect, useMemo, useState } from 'react';
import { Pagination, PostCard, Search } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { debounce } from './utils';

import styled from 'styled-components';
import { request } from '../../utils';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

	useEffect(() => {
		request(
			`/api/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
		).then(({ data: { posts, lastPage } }) => {
			setPosts(posts);
			setLastPage(lastPage);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [, page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<div className="posts-and-search">
				<Search onChange={onSearch} searchPhrase={searchPhrase} />
				{posts.length ? (
					<div className="post-list">
						{posts.map(({ id, title, publishedAt, comments, imageUrl }) => (
							<PostCard
								key={id}
								id={id}
								title={title}
								imageUrl={imageUrl}
								publishedAt={new Date(publishedAt).toLocaleString(
									'ru-RU',
								)}
								commentsCount={comments.length}
							/>
						))}
					</div>
				) : (
					<div className="no-posts-found">Статьи не найдены</div>
				)}
			</div>

			{lastPage > 1 && posts.length ? (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			) : (
				''
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 921px;

	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px 20px 80px;
	}

	& .no-posts-found {
		display: flex;
		flex-direction: column;
		font-size: 30px;
		text-align: center;
		margin: 30px 0 0 0;
	}
`;
