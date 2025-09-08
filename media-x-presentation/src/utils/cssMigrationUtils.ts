// Утилиты для миграции CSS из оригинального проекта в CSS Modules

/**
 * Конвертирует CSS классы в camelCase для CSS Modules
 */
export function convertToCamelCase(className: string): string {
  return className
    .replace(/\./g, '')
    .replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    .replace(/^[^a-zA-Z_$]/, '_');
}

/**
 * Извлекает все уникальные классы из CSS контента
 */
export function extractClassNames(cssContent: string): string[] {
  const classRegex = /\.([a-zA-Z0-9_-]+)/g;
  const matches = cssContent.match(classRegex) || [];
  return [...new Set(matches.map(match => match.slice(1)))];
}

/**
 * Создает маппинг оригинальных классов в camelCase версии
 */
export function createClassMapping(cssContent: string): Record<string, string> {
  const classNames = extractClassNames(cssContent);
  const mapping: Record<string, string> = {};
  
  classNames.forEach(className => {
    mapping[className] = convertToCamelCase(className);
  });
  
  return mapping;
}

/**
 * Конвертирует CSS контент в CSS Modules формат
 */
export function convertToCSSModules(
  cssContent: string, 
  mapping: Record<string, string>
): string {
  let converted = cssContent;
  
  // Заменяем классы
  Object.entries(mapping).forEach(([original, convertedName]) => {
    const regex = new RegExp(`\\.${original}(?![a-zA-Z0-9_-])`, 'g');
    converted = converted.replace(regex, `.${convertedName}`);
  });
  
  // Убираем :global селекторы (они не нужны в CSS Modules)
  converted = converted.replace(/:global\(([^)]+)\)/g, '$1');
  
  return converted;
}

/**
 * Извлекает CSS переменные из контента
 */
export function extractCSSVariables(cssContent: string): string[] {
  const varRegex = /var\(--([a-zA-Z0-9_-]+)\)/g;
  const matches = cssContent.match(varRegex) || [];
  return [...new Set(matches.map(match => {
    const varName = match.match(/--([a-zA-Z0-9_-]+)/);
    return varName ? varName[1] : '';
  }))].filter(Boolean);
}

/**
 * Генерирует TypeScript интерфейс для CSS Modules
 */
export function generateTSInterface(mapping: Record<string, string>): string {
  const interfaceName = 'CSSModuleClasses';
  const properties = Object.values(mapping)
    .map(className => `  ${className}: string;`)
    .join('\n');
  
  return `export interface ${interfaceName} {\n${properties}\n}`;
}

/**
 * Создает полный CSS Modules файл с TypeScript типизацией
 */
export function createCSSModuleFile(
  cssContent: string,
  moduleName: string
): { css: string; ts: string } {
  const mapping = createClassMapping(cssContent);
  const convertedCSS = convertToCSSModules(cssContent, mapping);
  const tsInterface = generateTSInterface(mapping);
  
  const tsContent = `import styles from './${moduleName}.module.css';\n\n${tsInterface}\n\nexport default styles as ${moduleName}Classes;\n`;
  
  return {
    css: convertedCSS,
    ts: tsContent
  };
}

/**
 * Обрабатывает медиа-запросы для CSS Modules
 */
export function processMediaQueries(cssContent: string): string {
  // CSS Modules автоматически обрабатывают медиа-запросы
  // Просто убедимся, что они правильно форматированы
  return cssContent.replace(/@media\s+([^{]+)\{/g, '@media $1 {');
}

/**
 * Обрабатывает анимации для CSS Modules
 */
export function processAnimations(cssContent: string): string {
  // Анимации работают в CSS Modules так же, как в обычном CSS
  // Просто убедимся, что ключевые кадры правильно форматированы
  return cssContent.replace(/@keyframes\s+([^{]+)\{/g, '@keyframes $1 {');
}

/**
 * Создает утилитарные классы для сложных анимаций
 */
export function createAnimationUtilities(): string {
  return `
/* Utility classes for complex animations */
.slideInFromTop {
  animation: slide-in-from-top 0.8s ease-out both;
}

.slideInFromBottom {
  animation: slide-in-from-bottom 0.8s ease-out both;
}

.slideInFromLeft {
  animation: slide-in-from-left 0.8s ease-out both;
}

.slideInFromRight {
  animation: slide-in-from-right 0.8s ease-out both;
}

.fadeIn {
  animation: fade-in 0.8s ease-out both;
}

.scaleIn {
  animation: scale-in 0.8s ease-out both;
}

/* Common animations */
@keyframes slide-in-from-top {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in-from-bottom {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in-from-left {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-from-right {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .slideInFromTop,
  .slideInFromBottom,
  .slideInFromLeft,
  .slideInFromRight,
  .fadeIn,
  .scaleIn {
    animation: none !important;
    opacity: 1;
    transform: none;
  }
}
`;
}

/**
 * Создает базовые стили для слайдов
 */
export function createBaseSlideStyles(): string {
  return `
/* Base slide styles */
.slideBase {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  opacity: 0;
  transform: translateX(100%);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.slideBase.active {
  opacity: 1;
  transform: translateX(0);
}

.slideBase.prev {
  transform: translateX(-100%);
}

/* Content containers */
.contentWrapper {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.textContent {
  flex: 1;
}

.imageContent {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Responsive base styles */
@media (max-width: 1024px) {
  .slideBase {
    padding: 30px;
  }
}

@media (max-width: 768px) {
  .slideBase {
    padding: 20px;
  }
  
  .contentWrapper {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .slideBase {
    padding: 15px;
  }
}
`;
}

// Пример использования:
/*
const originalCSS = `
.tech-modern-slide {
  padding: 40px 30px !important;
  background: linear-gradient(135deg, ...);
}

.tech-modern-title {
  font-size: 3.2rem !important;
  background: linear-gradient(135deg, ...);
}
`;

const mapping = createClassMapping(originalCSS);
const converted = convertToCSSModules(originalCSS, mapping);
console.log(converted);
*/