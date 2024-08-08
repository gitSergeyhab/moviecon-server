# MovieCon - Серверная Часть

Это серверная часть проекта MovieCon - игры, которая проверяет ваши знания о кино. Сервер обрабатывает запросы от клиентской части, управляет пользователями, предоставляет данные для викторин и обеспечивает безопасность.

## Описание

MovieCon - это сайт-игра по кино, где пользователи могут угадывать актеров по фильмам, фильмы по актерам, и т.д. Серверная часть отвечает за:

- Аутентификацию и авторизацию пользователей.
- Обработку запросов от клиента.
- Валидацию данных.
- Управление базой данных MongoDB.
- Логирование и мониторинг.

## Технологии

Проект построен на следующих технологиях:

- **Node.js**: серверное окружение для выполнения JavaScript-кода.
- **Express**: минималистичный веб-фреймворк для Node.js.
- **MongoDB**: NoSQL база данных для хранения информации о пользователях и викторинах.
- **TypeScript**: строгая типизация для повышения надежности кода.
- **JSON Web Token (JWT)**: для управления аутентификацией.
- **Mongoose**: ORM для взаимодействия с MongoDB.
- **bcryptjs**: для хэширования паролей.
- **Helmet**: для повышения безопасности приложения.
- **Winston**: для логирования событий и ошибок.

## Установка и запуск

### 1. Клонирование репозитория

```bash
git clone https://github.com/your-username/moviecon-server.git
cd moviecon-server
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Настройка переменных окружения

Создайте файл .env в корне проекта и добавьте туда необходимые переменные окружения:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/moviecon
JWT_SECRET=your_jwt_secret
```

### 4. Запуск в режиме разработки

Для запуска сервера в режиме разработки используйте команду:

```bash
npm run dev
```

### 5. Сборка проекта

Для сборки TypeScript-кода выполните команду:

```bash
npm run build
```

### 6. Запуск сервера

Для запуска сервера в production-режиме используйте команду:

```bash
npm start
```

### 7. Запуск сервера с профилированием памяти

Если необходимо запустить сервер с профилированием памяти, используйте:

```bash
npm run start:memory
```

### 8. Линтинг кода

Для проверки кода на соответствие стандартам выполните:

```bash
npm run lint
```
