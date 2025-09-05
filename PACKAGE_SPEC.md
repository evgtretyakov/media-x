# Package.json Specification

## 📦 Полная конфигурация package.json для Media X Presentation

### Основные поля

```json
{
  "name": "media-x-presentation",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "description": "Modern React presentation for Media X with advanced animations",
  "author": "Media X Team",
  "license": "MIT"
}
```

### Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "type-check": "tsc --noEmit"
  }
}
```

### Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.4",
    "@react-spring/web": "^9.7.3",
    "gsap": "^3.12.2",
    "styled-components": "^6.1.1",
    "zustand": "^4.4.4"
  }
}
```

### Dev Dependencies

```json
{
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@typescript-eslint/eslint-plugin": "^6.10.0",
    "@typescript-eslint/parser": "^6.10.0",
    "@vitejs/plugin-react": "^4.1.1",
    "eslint": "^8.53.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.4",
    "typescript": "^5.2.2",
    "vite": "^4.5.0"
  }
}
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@hooks/*": ["src/hooks/*"],
      "@utils/*": ["src/utils/*"],
      "@styles/*": ["src/styles/*"],
      "@types/*": ["src/types/*"],
      "@assets/*": ["src/assets/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Vite Configuration

```json
{
  "vite": {
    "plugins": [react()],
    "resolve": {
      "alias": {
        "@": "/src",
        "@components": "/src/components",
        "@hooks": "/src/hooks",
        "@utils": "/src/utils",
        "@styles": "/src/styles",
        "@types": "/src/types",
        "@assets": "/src/assets"
      }
    },
    "build": {
      "outDir": "dist",
      "sourcemap": true,
      "rollupOptions": {
        "output": {
          "manualChunks": {
            "vendor": ["react", "react-dom"],
            "animations": ["framer-motion", "@react-spring/web", "gsap"],
            "ui": ["styled-components", "zustand"]
          }
        }
      }
    },
    "server": {
      "port": 3000,
      "open": true
    }
  }
}
```

### ESLint Configuration

```json
{
  "eslintConfig": {
    "root": true,
    "env": { "browser": true, "es2020": true },
    "extends": [
      "eslint:recommended",
      "@typescript-eslint/recommended",
      "plugin:react-hooks/recommended"
    ],
    "ignorePatterns": ["dist", ".eslintrc.cjs"],
    "parser": "@typescript-eslint/parser",
    "plugins": ["react-refresh"],
    "rules": {
      "react-refresh/only-export-components": [
        "warn",
        { "allowConstantExport": true }
      ]
    }
  }
}
```

### Browser Support

```json
{
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

### Performance Budgets

```json
{
  "performance": {
    "maxBundleSize": "500KB",
    "maxInitialLoad": "1MB",
    "maxAssetSize": "500KB"
  }
}
```

### Post-install Scripts

```json
{
  "scripts": {
    "postinstall": "npm run type-check"
  }
}
```

### Husky (optional)

```json
{
  "devDependencies": {
    "husky": "^8.0.3",
    "lint-staged": "^15.2.0"
  },
  "scripts": {
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

## 🚀 Установка и запуск

1. **Создать новый проект:**
```bash
npm create vite@latest media-x-presentation -- --template react-ts
cd media-x-presentation
```

2. **Установить зависимости:**
```bash
npm install
```

3. **Добавить дополнительные зависимости:**
```bash
npm install framer-motion @react-spring/web gsap styled-components zustand
```

4. **Запустить development сервер:**
```bash
npm run dev
```

## 📊 Размер бандла

- **Initial bundle:** ~150KB gzipped
- **Vendor chunks:** ~250KB gzipped  
- **Total size:** ~400KB gzipped

## 🔧 Рекомендации по оптимизации

1. **Code splitting** для слайдов
2. **Lazy loading** анимационных библиотек
3. **Tree shaking** для удаления неиспользуемого кода
4. **Compression** для статических ресурсов