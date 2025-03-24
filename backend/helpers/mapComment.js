module.exports = function (comment) {
  return {
    content: comment.content,
    author: comment.author ? comment.author.login : "Пользователь удалён",
    _id: comment._id,
    publishedAt: comment.createdAt,
  };
};
