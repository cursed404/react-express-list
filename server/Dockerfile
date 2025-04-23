# --- Stage 1: Сборка TypeScript ---
    FROM node:18-alpine AS builder
    WORKDIR /app
    
    # Копируем описания зависимостей и конфиг TS
    COPY package*.json tsconfig.json ./
    
    # Ставим и prod-, и dev-зависимости
    RUN npm install
    
    # Копируем исходники и компилируем
    COPY src ./src
    RUN npm run build   # соберёт .ts → .js в папку dist/
    
    # --- Stage 2: Финальный образ ---
    FROM node:18-alpine
    WORKDIR /app
    
    # Копируем только prod-зависимости
    COPY package*.json ./
    RUN npm install --production
    
    # Копируем скомпилированные JS-файлы
    COPY --from=builder /app/dist ./dist
    
    # Открываем порт и запускаем
    EXPOSE 4000
    CMD ["node", "dist/index.js"]
    