Область хранения данных:

- База данных на json-server
- BFF
- Redux store

Сущности приложения:

- Пользователь: БД (список пользователей), BFF (сессия текущего пользователя), Redux store (отображение в браузере)
- Роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), Redux store (использование на клиенте)
- Статья: БД (список статей), Redux store (отображение в браузере)
- Комментарии: БД (список комментариев), Redux store (отображение в браузере)

Таблицы БД:

- пользователи - users: id / login / password / registed_at / role_id
- роли - roles: id / name
- статьи - posts: id / title / image_url / content / published_at
- комментарии - comments: id / author_id / post_id / content / published_at

Схема состояния на BFF:

- сессия текущего пользователя: login / password / role

Схема для Redux store (на клиенте):

- user: id / login / role_id
- posts: array post: id / title / imageUrl / publishedAt / commentsCount
- post: id / title / imageUrl / content / publishedAt / comments: array comment: id / author / content / publishedAt
- users: array user: id / login / registeredAt / role
