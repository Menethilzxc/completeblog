export const sanitazeContent = (content) =>
	content
		.replace(/ +/, ' ')
		.replaceAll('&nbsp;', ' ')
		.replaceAll('<div><br></div>', '\n')
		.replaceAll('<div>', '\n')
		.replaceAll('</div>', '');
