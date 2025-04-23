Фронтенд на React, бэкенд на Express. Фронт запрашивает данные с API, отображает список с фильтрацией, выбором и drag-n-drop сортировкой. Все работает в Docker.

Структура:

client — фронтенд

server — бэкенд

docker-compose.yml — сборка и запуск проекта

Инструкция по запуску:

# 1. Клонировать репозиторий
git clone https://github.com/cursed404/react-express-list-app.git
cd react-express-list-app

# 2. Собрать и запустить проект
docker-compose up --build

# 3. Открыть в браузере
# Клиент: http://localhost:3000
# Сервер: http://localhost:4000

Дополнительно:
Клиент собирается и раздается через Nginx. Сервер запускается с TypeScript через ts-node.
=======
