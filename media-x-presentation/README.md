# Media X Presentation

Современное React приложение для создания интерактивных презентаций с анимациями и профессиональным дизайном.

## 🚀 Технологический стек

- **React 18** + TypeScript
- **Vite** для быстрой сборки
- **Framer Motion** для плавных анимаций
- **Zustand** для управления состоянием
- **Styled Components** для стилизации
- **GSAP** для продвинутых анимаций
- **React Spring** для физических анимаций

## 📦 Установка и запуск

1. **Установите зависимости:**
```bash
npm install
```

2. **Запустите development сервер:**
```bash
npm run dev
```

3. **Откройте браузер:**
Приложение будет доступно по адресу: http://localhost:3000

## 🛠️ Доступные команды

- `npm run dev` - запуск development сервера
- `npm run build` - сборка проекта для production
- `npm run preview` - предпросмотр собранного проекта
- `npm run lint` - проверка кода линтером
- `npm run lint:fix` - автоматическое исправление ошибок линтера
- `npm run type-check` - проверка типов TypeScript

## 📁 Структура проекта

```
src/
├── components/     # React компоненты
│   ├── Slide.tsx   # Компонент слайда
│   └── Navigation.tsx # Навигация презентации
├── store/          # Управление состоянием
│   └── usePresentationStore.ts # Zustand хранилище
├── types/          # TypeScript типы
│   └── index.ts    # Основные типы приложения
├── hooks/          # Пользовательские хуки
├── utils/          # Вспомогательные функции
├── styles/         # Стили и темы
├── assets/         # Статические ресурсы
└── App.tsx         # Главный компонент приложения
```

## 🎯 Основные возможности

### Управление презентацией
- Переход между слайдами (вперед/назад)
- Автоматическое воспроизведение
- Индикатор прогресса
- Текущий слайд / Общее количество слайдов

### Анимации
- Плавные переходы между слайдами
- Анимации появления элементов
- Parallax эффекты
- Настраиваемые timing функции

### Кастомизация
- Настраиваемые фоны для слайдов
- Гибкая система анимаций
- Адаптивный дизайн
- Поддержка тем

## 🔧 Конфигурация

### Vite
- Aliases для удобного импорта
- Code splitting для оптимизации
- Source maps для отладки

### TypeScript
- Строгая типизация
- Path mapping
- Современные настройки компиляции

## 📊 Производительность

- **Initial bundle:** ~150KB gzipped
- **Vendor chunks:** ~250KB gzipped  
- **Total size:** ~400KB gzipped

## 🎨 Создание слайдов

Добавьте новые слайды в массив `slides` в файле `App.tsx`:

```typescript
{
  id: 'unique-id',
  title: 'Заголовок слайда',
  content: <div>Содержимое слайда</div>,
  background: 'linear-gradient(...)',
  animation: 'custom-animation'
}
```

## 📝 Лицензия

MIT License - смотрите файл [LICENSE](LICENSE) для подробностей.

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте feature ветку: `git checkout -b feature/amazing-feature`
3. Закоммитьте изменения: `git commit -m 'Add amazing feature'`
4. Запушьте ветку: `git push origin feature/amazing-feature`
5. Создайте Pull Request

---

Разработано командой Media X 🚀
