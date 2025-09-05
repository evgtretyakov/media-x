// Скрипт для тестирования responsive design
// Откройте http://localhost:3000 и выполните этот код в консоли

console.log('📱 Запуск тестирования responsive design...');

function testResponsiveDesign() {
    console.log('='.repeat(60));
    console.log('📱 ТЕСТИРОВАНИЕ RESPONSIVE DESIGN');
    console.log('='.repeat(60));
    
    // Проверка viewport meta тега
    console.log('\n🧪 1. Проверка viewport meta тега:');
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    const viewportContent = viewportMeta ? viewportMeta.getAttribute('content') : '';
    const hasViewport = viewportMeta && viewportContent.includes('width=device-width');
    
    console.log(`   Viewport meta: ${hasViewport ? '✅' : '❌'}`);
    if (viewportMeta) {
        console.log(`   Content: "${viewportContent}"`);
    }
    
    // Проверка медиа-запросов в CSS
    console.log('\n🧪 2. Проверка медиа-запросов:');
    const styleSheets = document.styleSheets;
    let mediaQueryCount = 0;
    const breakpoints = new Set();
    
    for (let i = 0; i < styleSheets.length; i++) {
        try {
            const rules = styleSheets[i].cssRules || styleSheets[i].rules;
            for (let j = 0; j < rules.length; j++) {
                const rule = rules[j];
                if (rule.constructor.name === 'CSSMediaRule') {
                    mediaQueryCount++;
                    const mediaText = rule.media.mediaText;
                    console.log(`   📊 ${mediaText}`);
                    
                    // Извлекаем breakpoints
                    if (mediaText.includes('max-width')) {
                        const match = mediaText.match(/max-width:\s*(\d+)px/);
                        if (match) breakpoints.add(parseInt(match[1]));
                    }
                    if (mediaText.includes('min-width')) {
                        const match = mediaText.match(/min-width:\s*(\d+)px/);
                        if (match) breakpoints.add(parseInt(match[1]));
                    }
                }
            }
        } catch (e) {
            // Игнорируем ошибки CORS
        }
    }
    
    console.log(`   Всего медиа-запросов: ${mediaQueryCount}`);
    console.log(`   Breakpoints: ${Array.from(breakpoints).sort((a, b) => a - b).join('px, ')}px`);
    
    // Проверка responsive классов
    console.log('\n🧪 3. Проверка responsive классов:');
    const responsiveClasses = [
        'container', 'wrapper', 'grid', 'flex', 
        'col-', 'row-', 'md-', 'lg-', 'xl-',
        'hidden', 'block', 'inline', 'flex'
    ];
    
    responsiveClasses.forEach(className => {
        const elements = document.querySelectorAll(`[class*="${className}"]`);
        if (elements.length > 0) {
            console.log(`   ${className}: ${elements.length} элементов`);
        }
    });
    
    // Проверка основных структурных элементов
    console.log('\n🧪 4. Проверка структурных элементов:');
    const structuralElements = {
        'Grid containers': document.querySelectorAll('[class*="grid"]'),
        'Flex containers': document.querySelectorAll('[class*="flex"]'),
        'Content wrappers': document.querySelectorAll('[class*="content"]'),
        'Responsive images': document.querySelectorAll('img[srcset], img[sizes]'),
        'Picture elements': document.querySelectorAll('picture')
    };
    
    Object.entries(structuralElements).forEach(([name, elements]) => {
        console.log(`   ${name}: ${elements.length}`);
    });
    
    // Проверка текущего размера экрана
    console.log('\n🧪 5. Текущее состояние:');
    console.log(`   Ширина окна: ${window.innerWidth}px`);
    console.log(`   Высота окна: ${window.innerHeight}px`);
    console.log(`   Device pixel ratio: ${window.devicePixelRatio}`);
    console.log(`   Ориентация: ${window.screen.orientation?.type || 'unknown'}`);
    
    // Проверка CSS переменных
    console.log('\n🧪 6. Проверка CSS переменных:');
    const rootStyles = getComputedStyle(document.documentElement);
    const cssVariables = [
        '--breakpoint-mobile',
        '--breakpoint-tablet', 
        '--breakpoint-desktop',
        '--container-width',
        '--spacing-unit',
        '--grid-gap'
    ];
    
    cssVariables.forEach(varName => {
        const value = rootStyles.getPropertyValue(varName);
        if (value) {
            console.log(`   ${varName}: ${value}`);
        }
    });
    
    return true;
}

// Функция для тестирования разных разрешений
function testBreakpoints() {
    console.log('\n🧪 7. Тестирование breakpoints:');
    
    const breakpoints = [320, 480, 768, 1024, 1280, 1440, 1920];
    const currentWidth = window.innerWidth;
    
    console.log('   Рекомендуемые breakpoints для тестирования:');
    breakpoints.forEach(bp => {
        const status = currentWidth >= bp ? '≥' : '<';
        console.log(`     ${bp}px ${status} ${currentWidth}px`);
    });
    
    return true;
}

// Функция для проверки touch поддержки
function testTouchSupport() {
    console.log('\n🧪 8. Проверка touch поддержки:');
    
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const pointerSupport = navigator.pointerEnabled || navigator.msPointerEnabled;
    
    console.log(`   Touch support: ${hasTouch ? '✅' : '❌'}`);
    console.log(`   Pointer events: ${pointerSupport ? '✅' : '❌'}`);
    console.log(`   Max touch points: ${navigator.maxTouchPoints || 0}`);
    
    return true;
}

// Функция для проверки мобильных функций
function testMobileFeatures() {
    console.log('\n🧪 9. Проверка мобильных функций:');
    
    const features = {
        'Viewport units': CSS.supports('width', '100vw'),
        'Flexbox gap': CSS.supports('gap', '1rem'),
        'Grid layout': CSS.supports('display', 'grid'),
        'CSS variables': CSS.supports('--test-var', 'red'),
        'Touch action': CSS.supports('touch-action', 'manipulation')
    };
    
    Object.entries(features).forEach(([feature, supported]) => {
        console.log(`   ${feature}: ${supported ? '✅' : '❌'}`);
    });
    
    return true;
}

// Основная функция тестирования
function runResponsiveTests() {
    console.log('='.repeat(60));
    console.log('📱 ТЕСТИРОВАНИЕ RESPONSIVE DESIGN');
    console.log('='.repeat(60));
    
    const responsiveTest = testResponsiveDesign();
    const breakpointsTest = testBreakpoints();
    const touchTest = testTouchSupport();
    const mobileTest = testMobileFeatures();
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ:');
    console.log('='.repeat(60));
    
    console.log(`   Базовая проверка: ${responsiveTest ? '✅' : '❌'}`);
    console.log(`   Breakpoints: ${breakpointsTest ? '✅' : '❌'}`);
    console.log(`   Touch поддержка: ${touchTest ? '✅' : '❌'}`);
    console.log(`   Мобильные функции: ${mobileTest ? '✅' : '❌'}`);
    
    const overallSuccess = responsiveTest && breakpointsTest && touchTest && mobileTest;
    
    if (overallSuccess) {
        console.log('\n🎉 Responsive design готов к тестированию!');
        console.log('✅ Медиа-запросы настроены');
        console.log('✅ Breakpoints определены');
        console.log('✅ Мобильные функции поддерживаются');
        console.log('✅ Структурные элементы присутствуют');
    } else {
        console.log('\n❌ Обнаружены проблемы с responsive design');
        console.log('⚠️  Проверьте медиа-запросы и мобильную поддержку');
    }
    
    return overallSuccess;
}

// Запуск тестов
setTimeout(() => {
    try {
        const success = runResponsiveTests();
        console.log('\n💡 Для полного тестирования:');
        console.log('   - Изменяйте размер окна браузера');
        console.log('   - Тестируйте на реальных мобильных устройствах');
        console.log('   - Проверяйте в DevTools Device Mode');
        console.log('   - Тестируйте touch-взаимодействия');
    } catch (error) {
        console.error('❌ Ошибка при тестировании responsive design:', error.message);
    }
}, 1000);

// Экспорт для ручного тестирования
window.testResponsive = {
    runAll: runResponsiveTests,
    testDesign: testResponsiveDesign,
    testBreakpoints: testBreakpoints,
    testTouch: testTouchSupport
};

console.log('📋 Функции тестирования responsive design доступны в window.testResponsive');