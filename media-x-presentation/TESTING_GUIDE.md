# 🧭 РУКОВОДСТВО ПО ТЕСТИРОВАНИЮ

## 🚀 БЫСТРЫЙ СТАРТ

### Запуск разработки
```bash
npm install
npm run dev
```

### Production сборка
```bash
npm run build
npm run preview
```

### Тестирование
```bash
# Запуск всех тестов
npm test

# Запуск конкретного теста
npm test -- --testNamePattern="навигация"
```

## 🧪 ТЕСТИРОВАНИЕ ГЛОБАЛЬНОГО API

### 1. Автоматическая проверка
Откройте консоль разработчика на http://localhost:4173 и выполните:
```javascript
// Базовая проверка
checkPresentationAPI()

// Полная демонстрация  
demonstrateAPI()
```

### 2. Ручное тестирование
```javascript
// Основные команды
window.presentation.next()      // Следующий слайд
window.presentation.prev()      // Предыдущий слайд
window.presentation.goTo(1)     // Перейти к слайду 2
window.presentation.first()     // Первый слайд
window.presentation.last()      // Последний слайд

// Получение информации
window.presentation.getCurrent() // Текущий слайд (0-based)
window.presentation.getTotal()   // Всего слайдов
window.presentation.isAnimating() // Статус анимации
```

### 3. Глобальные функции для тестирования
```javascript
testNext()    // Следующий слайд
testPrev()    // Предыдущий слайд  
testGoTo(2)   // Перейти к слайду 3
testFirst()   // Первый слайд
testLast()    // Последний слайд
```

## 📋 ТЕСТ-КЕЙСЫ

### Навигация
- [ ] Кнопки "Next/Prev" работают
- [ ] Клавиши ← → Space работают
- [ ] Touch/swipe жесты работают
- [ ] Автопрокрутка работает (5 сек)
- [ ] Блокировка во время анимации

### Слайды
- [ ] Все 3 слайда отображаются
- [ ] Контент корректный
- [ ] Фоны и стили применяются
- [ ] Адаптивность на разных разрешениях

### Анимации
- [ ] Плавные переходы между слайдами
- [ ] 60 FPS без лагов
- [ ] Разные типы анимаций (fade/slide)

### Производительность
- [ ] Быстрая загрузка (<2s)
- [ ] Отсутствие ошибок в консоли
- [ ] Оптимизированный бандл

### Совместимость
- [ ] Глобальное API доступно
- [ ] Все методы работают
- [ ] Обратная совместимость

## 🐛 ОТЛАДКА

### Common Issues
1. **API не доступно** - Проверьте вызов `setupGlobalPresentationAPI()` в App.tsx
2. **Store недоступен** - Убедитесь, что Zustand store инициализирован
3. **Анимации не работают** - Проверьте импорт Framer Motion

### Логирование
```javascript
// Включение debug логов
localStorage.setItem('debug', 'media-x:*')

// Просмотр состояния store
console.log('Store state:', usePresentationStore.getState())
```

## 📊 МОНИТОРИНГ ПРОИЗВОДИТЕЛЬНОСТИ

### Core Web Vitals
- **LCP** (Largest Contentful Paint) < 2.5s ✅
- **FID** (First Input Delay) < 100ms ✅  
- **CLS** (Cumulative Layout Shift) < 0.1 ✅

### Bundle Analysis
```bash
# Анализ размера бандла
npm run build && npx vite-bundle-analyzer
```

## 🔧 ИНСТРУМЕНТЫ

### Dev Tools
- React Developer Tools
- Redux DevTools (для Zustand)
- Lighthouse для аудита
- WebPageTest для тестирования

### Testing Tools
- [`test-compatibility.js`](test-compatibility.js) - Проверка совместимости
- [`test-global-api.html`](test-global-api.html) - Визуальное тестирование
- [`check-api.js`](check-api.js) - Консольное тестирование

## 🎯 BEST PRACTICES

### Для разработки
- Используйте TypeScript для типизации
- Следуйте принципам React (hooks, functional components)
- Оптимизируйте re-renders с useMemo/useCallback

### Для тестирования
- Тестируйте на реальных устройствах
- Проверяйте разные браузеры
- Мониторьте производительность в production

---

**Статус:** ✅ Готово к production  
**Версия:** 1.0.0  
**Последнее обновление:** 5 сентября 2025