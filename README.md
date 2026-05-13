# Шахматы Online | КТ №4

## Технологии
- БЭМ (методология вёрстки)
- ООП + SOLID (архитектура JS)
- HTML5, CSS3, Vanilla JS

## Применение принципов

### БЭМ
- Блоки: .header, .game-board, .cell, .info-block
- Элементы: .header__title, .game-board__grid, .cell--black
- Модификаторы: .cell--selected, .game-board__button--reset

### SOLID / ООП
- **SRP**: Piece хранит данные фигуры, Board управляет доской и DOM
- **OCP**: Правила ходов в isValidMove, легко расширять
- **Инкапсуляция**: boardState приватен, доступ через методы класса

## Запуск
1. Установить зависимости: npm install
2. Запустить сервер: npx live-server
3. Открыть: http://127.0.0.1:8080

## Ссылки
- Репозиторий: https://github.com/Rustam150/-chess-bem-site.git
- Демо: https://rustam150.github.io/-chess-bem-site/