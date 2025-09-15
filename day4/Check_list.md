## Чек-лист для финальной сборки API

### Фаза 1: Фундамент и настройка окружения

---

Инициализация проекта: npm init -y.

---

Зависимости: Установить express, mongoose, dotenv, bcryptjs, jsonwebtoken.

#### Структура папок:
```
/
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   └── postController.js
├── models/
│   ├── postModel.js
│   └── userModel.js
├── routes/
│   ├── postRoutes.js
│   └── userRoutes.js
├── utils/
│   ├── apiFeatures.js
│   ├── appError.js
│   └── catchAsync.js
├── .env
├── .gitignore
├── app.js
├── server.js
└── package.json
```
- .gitignore: node_modules/, .env.

- .env файл: Определить PORT, DB_URL, DB_USER, DB_PASSWORD, JWT_SECRET, JWT_EXPIRES_IN.

---

#### Разделение server.js и app.js:

- server.js: Точка входа. Загрузка dotenv, подключение к БД, запуск сервера (app.listen).

- app.js: Конфигурация Express. Middleware, подключение роутеров, экспорт app.

---

### Фаза 2: Модели и работа с данными

#### Модель Поста (postModel.js): 
- Схема с полями title, body, createdAt.

#### Модель Пользователя (userModel.js):

- Поля: name, email, password, passwordConfirm, role.

- Опции полей: required, unique, lowercase, select: false (для пароля).

- Валидация passwordConfirm: кастомный validate и условный required.

- Middleware в схеме (.pre('save')):

- Проверка isModified('password').

- Хэширование пароля (bcrypt.hash).

- Удаление passwordConfirm (= undefined).

---

### Фаза 3: Логика API (Контроллеры и Роуты)

#### Роутеры (...Routes.js):

- Использовать express.Router().

- Группировать маршруты с router.route('/path').

#### Контроллер Постов (postController.js):

- Реализовать полный CRUD: getAllPosts, getPostById, createPost, updatePost, deletePost.

- getAllPosts должен использовать класс APIFeatures.

#### Класс APIFeatures:

- Методы: filter(), sort(), limitFields(), paginate().

#### Контроллер Аутентификации (authController.js):

- signup: Создание пользователя, генерация токена.

- login: Поиск пользователя (.select('+password')), сравнение паролей (bcrypt.compare), генерация токена.

- protect: Middleware для защиты роутов.

- restrictTo: Middleware для авторизации по ролям.

### Фаза 4: Обработка ошибок и безопасность

#### Утилиты (utils/):

- catchAsync.js: Функция-обертка для устранения try/catch.

- appError.js: Класс для создания операционных ошибок.

#### Глобальный обработчик ошибок (в app.js):

- Middleware с 4-мя аргументами (err, req, res, next).

- Логика для development vs. production (process.env.NODE_ENV).

#### Security Middleware (в app.js):

- Установить и подключить: helmet, express-rate-limit, express-mongo-sanitize, xss-clean.
