export const request = (path, method, data) => {
	return fetch(path, {
		headers: {
			'content-type': 'application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
		credentials: 'include',
	}).then((res) => res.json());
};
