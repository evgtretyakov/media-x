// Node.js скрипт для проверки структуры слайдов
// Запуск: node test-content-node.js

console.log('🎨 Запуск тестирования структуры слайдов...');

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Функция для проверки CSS классов в файлах стилей
function testCssClasses() {
    console.log('\n📊 Проверка CSS классов слайдов:');
    
    const slideStyles = [
        'src/styles/slides/ChallengeSlide.module.css',
        'src/styles/slides/DepthModernSlide.module.css',
        'src/styles/slides/MetricsModernSlide.module.css'
    ];
    
    let allClassesFound = true;
    
    slideStyles.forEach(styleFile => {
        const filePath = path.join(__dirname, styleFile);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            const className = path.basename(styleFile, '.module.css');
            
            // Проверяем наличие основных классов (точное совпадение)
            const hasMainClass = content.includes(`.${className.toLowerCase()}`) ||
                               content.includes(`.${className}`) ||
                               content.includes(`.${className.charAt(0).toLowerCase() + className.slice(1)}`);
            const hasActiveClass = content.includes('.activeSlide') ||
                                 content.includes('.active');
            
            console.log(`   ${className}:`);
            console.log(`     Основной класс: ${hasMainClass ? '✅' : '❌'}`);
            console.log(`     Активный класс: ${hasActiveClass ? '✅' : '❌'}`);
            
            if (!hasMainClass || !hasActiveClass) {
                allClassesFound = false;
            }
        } else {
            console.log(`   ❌ Файл ${styleFile} не найден`);
            allClassesFound = false;
        }
    });
    
    return allClassesFound;
}

// Функция для проверки компонентов слайдов
function testSlideComponents() {
    console.log('\n🧩 Проверка компонентов слайдов:');
    
    const slideComponents = [
        'src/animations/AnimatedSlide.tsx',
        'src/components/Navigation.tsx',
        'src/components/Slide.tsx'
    ];
    
    let allComponentsFound = true;
    
    slideComponents.forEach(componentFile => {
        const filePath = path.join(__dirname, componentFile);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            const componentName = path.basename(componentFile, '.tsx');
            
            // Проверяем наличие экспорта компонента
            const hasExport = content.includes(`export function ${componentName}`) ||
                             content.includes(`export const ${componentName}`) ||
                             content.includes(`export class ${componentName}`);
            
            console.log(`   ${componentName}:`);
            console.log(`     Экспорт: ${hasExport ? '✅' : '❌'}`);
            
            if (!hasExport) {
                allComponentsFound = false;
            }
        } else {
            console.log(`   ❌ Файл ${componentFile} не найден`);
            allComponentsFound = false;
        }
    });
    
    return allComponentsFound;
}

// Функция для проверки App.tsx
function testAppStructure() {
    console.log('\n🏗️  Проверка структуры App.tsx:');
    
    const appFile = path.join(__dirname, 'src/App.tsx');
    if (fs.existsSync(appFile)) {
        const content = fs.readFileSync(appFile, 'utf8');
        
        // Проверяем наличие слайдов
        const hasSlidesArray = content.includes('const slides:');
        const hasAnimatedSlideImport = content.includes('AnimatedSlide');
        const hasAnimatedSlideUsage = content.includes('<AnimatedSlide');
        
        // Проверяем количество слайдов
        const slideCount = (content.match(/id: '/g) || []).length;
        
        console.log('   Структура App.tsx:');
        console.log(`     Массив слайдов: ${hasSlidesArray ? '✅' : '❌'}`);
        console.log(`     Импорт AnimatedSlide: ${hasAnimatedSlideImport ? '✅' : '❌'}`);
        console.log(`     Использование AnimatedSlide: ${hasAnimatedSlideUsage ? '✅' : '❌'}`);
        console.log(`     Количество слайдов: ${slideCount} ${slideCount === 3 ? '✅' : '❌'}`);
        
        return hasSlidesArray && hasAnimatedSlideImport && hasAnimatedSlideUsage && slideCount === 3;
    } else {
        console.log('   ❌ Файл App.tsx не найден');
        return false;
    }
}

// Функция для проверки глобальных стилей
function testGlobalStyles() {
    console.log('\n🎨 Проверка глобальных стилей:');
    
    const globalStyles = [
        'src/styles/global/variables.css',
        'src/styles/global/globals.css',
        'src/styles/global/animations.css'
    ];
    
    let allStylesFound = true;
    
    globalStyles.forEach(styleFile => {
        const filePath = path.join(__dirname, styleFile);
        if (fs.existsSync(filePath)) {
            console.log(`   ✅ ${styleFile}`);
        } else {
            console.log(`   ❌ ${styleFile} не найден`);
            allStylesFound = false;
        }
    });
    
    return allStylesFound;
}

// Основная функция тестирования
function runStructureTests() {
    console.log('='.repeat(60));
    console.log('🏗️  ТЕСТИРОВАНИЕ СТРУКТУРЫ СЛАЙДОВ');
    console.log('='.repeat(60));
    
    const cssValid = testCssClasses();
    const componentsValid = testSlideComponents();
    const appValid = testAppStructure();
    const stylesValid = testGlobalStyles();
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ:');
    console.log('='.repeat(60));
    
    console.log(`   CSS классы: ${cssValid ? '✅' : '❌'}`);
    console.log(`   Компоненты: ${componentsValid ? '✅' : '❌'}`);
    console.log(`   App структура: ${appValid ? '✅' : '❌'}`);
    console.log(`   Глобальные стили: ${stylesValid ? '✅' : '❌'}`);
    
    const overallSuccess = cssValid && componentsValid && appValid && stylesValid;
    
    if (overallSuccess) {
        console.log('\n🎉 Структура слайдов корректна!');
        console.log('✅ Все CSS классы присутствуют');
        console.log('✅ Все компоненты найдены и экспортируются');
        console.log('✅ App.tsx имеет правильную структуру');
        console.log('✅ Глобальные стили присутствуют');
    } else {
        console.log('\n❌ Обнаружены проблемы со структурой слайдов');
        console.log('⚠️  Проверьте наличие всех необходимых файлов и импортов');
    }
    
    return overallSuccess;
}

// Запуск тестов
try {
    const success = runStructureTests();
    process.exit(success ? 0 : 1);
} catch (error) {
    console.error('❌ Ошибка при выполнении тестов:', error.message);
    process.exit(1);
}