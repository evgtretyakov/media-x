# Анимационные компоненты для React презентации

Этот модуль содержит адаптированные версии JavaScript анимаций из оригинальной презентации, преобразованные в React компоненты с использованием Framer Motion.

## 📦 Установленные компоненты

### 1. `TechAnimations`
Адаптация `tech-animations.js` - анимации для слайда технологического стека.

**Использование:**
```tsx
import { TechAnimations, TechCategoryCard, TechParticles } from '../animations';

<TechAnimations isActive={isActive}>
  <TechCategoryCard
    icon="⚛️"
    title="Frontend"
    description="React 18 + TypeScript"
    technologies={['React', 'TypeScript']}
    color="#61DAFB"
    delay={0.8}
  />
  <TechParticles count={20} />
</TechAnimations>
```

### 2. `MetricsAnimations` 
Адаптация `metrics-animations.js` - анимации для слайда метрик AI-эры.

**Использование:**
```tsx
import { MetricsAnimations, AnimatedProgressBar, StatBadge, AIRadar } from '../animations';

<MetricsAnimations isActive={isActive}>
  <AnimatedProgressBar value={85} max={100} color="linear-gradient(...)" />
  <StatBadge value="95%" label="Точность" icon="🎯" />
  <AIRadar value={78} size={200} />
</MetricsAnimations>
```

### 3. `VisionAnimations`
Адаптация `vision-animations.js` - анимации для слайда "Вижн".

**Использование:**
```tsx
import { VisionAnimations, VisionCard, VisionNotification } from '../animations';

<VisionAnimations isActive={isActive}>
  <VisionCard
    icon="🧠"
    title="AI-анализ"
    description="Глубокий анализ медиафайлов"
    index={0}
    color="#667eea"
  />
</VisionAnimations>
```

### 4. `ChallengeAnimations`
Адаптация `challenge-animations.js` - анимации для слайда вызовов (уже существовал).

## 🎯 Ключевые особенности

### Преобразования jQuery → Framer Motion:
- `$.animate()` → `motion` компоненты с `whileHover`, `whileTap`
- `setTimeout` анимации → `useEffect` с задержками
- CSS transitions → Framer Motion transitions
- jQuery events → React event handlers

### Улучшения:
- **TypeScript поддержка** - полная типизация всех компонентов
- **Хуки управления** - `useAnimations` для централизованного управления
- **Автоматическая очистка** - остановка анимаций при размонтировании
- **Оптимизация производительности** - использование `useCallback` и `useRef`

## 🔧 Интеграция с существующей системой

### 1. Обновление слайдов
Оберните контент слайда в соответствующий анимационный компонент:

```tsx
// TechModernSlide.tsx
<TechAnimations isActive={isActive}>
  {slideContent}
</TechAnimations>
```

### 2. Использование хуков
```tsx
import { useAnimations } from '../hooks/useAnimations';

const { useTechAnimations, useVisionAnimations } = useAnimations();
const { isActive } = useTechAnimations();
```

### 3. Кастомные анимации
Используйте готовые компоненты для построения сложных анимаций:

```tsx
<TechCategoryCard
  icon="⚛️"
  title="Frontend"
  description="Modern React stack"
  technologies={['React', 'TypeScript', 'Vite']}
  color="#61DAFB"
  delay={0.5}
/>
```

## 🚀 Доступные анимационные эффекты

### Для TechAnimations:
- **Появление карточек** с задержкой и 3D трансформациями
- **Hover эффекты** - масштабирование, вращение, свечение
- **Параллакс** - движение карточек при движении мыши
- **Частицы** - плавающие анимированные элементы

### Для MetricsAnimations:
- **Прогресс-бары** - анимированное заполнение
- **Статистические значки** - появление с bounce эффектом
- **Радар AI** - анимация значения и масштабирование
- **Циклические анимации** - пульсация иконок, свечение

### Для VisionAnimations:
- **Карточки видения** - hover эффекты, клик-анимации
- **Уведомления** - временные всплывающие сообщения
- **Параллакс скролл** - движение при прокрутке
- **Интерактивность** - показ деталей при клике

## 📝 Миграция с jQuery

### Было (jQuery):
```javascript
$(element).animate({
  opacity: 1,
  transform: 'translateY(0)'
}, 600);
```

### Стало (React + Framer Motion):
```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
/>
```

## 🎨 Кастомизация

Все компоненты поддерживают кастомизацию через props:
- `delay` - задержка перед началом анимации
- `color` - цветовая схема элемента
- `duration` - длительность анимации
- `isActive` - флаг активности для управления анимациями

## 🔮 Планы по развитию

- [ ] Добавить больше preset анимаций
- [ ] Оптимизировать производительность для мобильных устройств  
- [ ] Создать систему тематизации анимаций
- [ ] Добавить поддержку WebGL анимаций
- [ ] Интегрировать с системой управления состоянием презентации