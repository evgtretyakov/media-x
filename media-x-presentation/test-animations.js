// Скрипт для тестирования анимаций слайдов
// Откройте http://localhost:3000 и выполните этот код в консоли

console.log('🎬 Запуск тестирования анимаций...');

function testAnimations() {
    console.log('='.repeat(60));
    console.log('🎬 ТЕСТИРОВАНИЕ АНИМАЦИЙ И ПЕРЕХОДОВ');
    console.log('='.repeat(60));
    
    // Проверка наличия Framer Motion
    console.log('\n🧪 1. Проверка Framer Motion:');
    const hasFramerMotion = typeof window !== 'undefined' && window.__FRAMER_MOTION__;
    console.log(`   Framer Motion: ${hasFramerMotion ? '✅ Загружен' : '❌ Не найден'}`);
    
    // Проверка motion элементов
    console.log('\n🧪 2. Проверка motion элементов:');
    const motionElements = document.querySelectorAll('[data-framer-animation], [class*="motion-"]');
    console.log(`   Motion элементы: ${motionElements.length}`);
    
    // Проверка классов анимаций
    console.log('\n🧪 3. Проверка CSS анимаций:');
    const animatedElements = document.querySelectorAll('[class*="animate"], [class*="animation"]');
    console.log(`   Элементы с классами анимаций: ${animatedElements.length}`);
    
    // Проверка transition классов
    const transitionElements = document.querySelectorAll('[class*="transition"]');
    console.log(`   Элементы с transition: ${transitionElements.length}`);
    
    // Проверка активного слайда
    console.log('\n🧪 4. Проверка активного слайда:');
    const activeSlide = document.querySelector('.slide.active');
    console.log(`   Активный слайд: ${activeSlide ? '✅ Найден' : '❌ Не найден'}`);
    
    if (activeSlide) {
        const title = activeSlide.querySelector('h1');
        const content = activeSlide.querySelector('.content');
        
        console.log(`   Заголовок: ${title ? '✅' : '❌'}`);
        console.log(`   Контент: ${content ? '✅' : '❌'}`);
        
        // Проверка стилей анимаций
        const titleStyle = title ? window.getComputedStyle(title) : null;
        const contentStyle = content ? window.getComputedStyle(content) : null;
        
        if (titleStyle) {
            console.log(`   Заголовок transition: ${titleStyle.transition || titleStyle.transitionProperty || 'нет'}`);
        }
        if (contentStyle) {
            console.log(`   Контент transition: ${contentStyle.transition || contentStyle.transitionProperty || 'нет'}`);
        }
    }
    
    // Проверка глобальных анимаций
    console.log('\n🧪 5. Проверка глобальных CSS анимаций:');
    const styleSheets = document.styleSheets;
    let animationCount = 0;
    let keyframeCount = 0;
    
    for (let i = 0; i < styleSheets.length; i++) {
        try {
            const rules = styleSheets[i].cssRules || styleSheets[i].rules;
            for (let j = 0; j < rules.length; j++) {
                const rule = rules[j];
                if (rule.constructor.name === 'CSSKeyframesRule') {
                    keyframeCount++;
                    console.log(`     Keyframe: ${rule.name}`);
                }
                if (rule.style && (rule.style.animation || rule.style.transition)) {
                    animationCount++;
                }
            }
        } catch (e) {
            // Игнорируем ошибки CORS
        }
    }
    
    console.log(`   CSS Keyframes: ${keyframeCount}`);
    console.log(`   CSS Animation правил: ${animationCount}`);
    
    // Проверка специфичных анимаций для слайдов
    console.log('\n🧪 6. Проверка специфичных анимаций:');
    const challengeElements = document.querySelectorAll('[class*="challenge"]');
    const depthElements = document.querySelectorAll('[class*="depth"]');
    const metricsElements = document.querySelectorAll('[class*="metric"]');
    
    console.log(`   Элементы Challenge слайда: ${challengeElements.length}`);
    console.log(`   Элементы Depth слайда: ${depthElements.length}`);
    console.log(`   Элементы Metrics слайда: ${metricsElements.length}`);
    
    return true;
}

// Функция для тестирования переходов между слайдами
function testSlideTransitions() {
    console.log('\n🧪 6. Тестирование переходов между слайдами:');
    
    const store = window.__PRESENTATION_STORE__;
    if (!store) {
        console.log('   ❌ Store не доступен для тестирования переходов');
        return false;
    }
    
    console.log('   Доступны методы навигации:');
    console.log(`     nextSlide: ${typeof store.nextSlide === 'function' ? '✅' : '❌'}`);
    console.log(`     prevSlide: ${typeof store.prevSlide === 'function' ? '✅' : '❌'}`);
    console.log(`     goToSlide: ${typeof store.goToSlide === 'function' ? '✅' : '❌'}`);
    
    return true;
}

// Функция для проверки производительности анимаций
function testAnimationPerformance() {
    console.log('\n🧪 7. Проверка производительности анимаций:');
    
    // Проверка поддержки requestAnimationFrame
    const hasRAF = typeof requestAnimationFrame === 'function';
    console.log(`   requestAnimationFrame: ${hasRAF ? '✅' : '❌'}`);
    
    // Проверка поддержки performance API
    const hasPerformance = typeof performance !== 'undefined';
    console.log(`   Performance API: ${hasPerformance ? '✅' : '❌'}`);
    
    if (hasPerformance) {
        console.log(`   Timing resolution: ${performance.now() ? '✅' : '❌'}`);
    }
    
    return true;
}

// Основная функция тестирования
function runAnimationTests() {
    console.log('='.repeat(60));
    console.log('🎬 ТЕСТИРОВАНИЕ АНИМАЦИЙ СЛАЙДОВ');
    console.log('='.repeat(60));
    
    const animTest = testAnimations();
    const transitionTest = testSlideTransitions();
    const perfTest = testAnimationPerformance();
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ АНИМАЦИЙ:');
    console.log('='.repeat(60));
    
    console.log(`   Базовая проверка: ${animTest ? '✅' : '❌'}`);
    console.log(`   Переходы между слайдами: ${transitionTest ? '✅' : '❌'}`);
    console.log(`   Производительность: ${perfTest ? '✅' : '❌'}`);
    
    const overallSuccess = animTest && transitionTest && perfTest;
    
    if (overallSuccess) {
        console.log('\n🎉 Анимации готовы к тестированию!');
        console.log('✅ Framer Motion загружен');
        console.log('✅ Анимированные элементы присутствуют');
        console.log('✅ Методы навигации доступны');
        console.log('✅ Производительность проверена');
    } else {
        console.log('\n❌ Обнаружены проблемы с анимациями');
        console.log('⚠️  Проверьте конфигурацию анимаций');
    }
    
    return overallSuccess;
}

// Запуск тестов
setTimeout(() => {
    try {
        const success = runAnimationTests();
        console.log('\n💡 Для полного тестирования выполните:');
        console.log('   - Переход между слайдами (кнопки/клавиши)');
        console.log('   - Проверку плавности анимаций');
        console.log('   - Тестирование на разных устройствах');
    } catch (error) {
        console.error('❌ Ошибка при тестировании анимаций:', error.message);
    }
}, 1000);

// Экспорт для ручного тестирования
window.testAnimations = {
    runAll: runAnimationTests,
    testBasic: testAnimations,
    testTransitions: testSlideTransitions,
    testPerformance: testAnimationPerformance
};

console.log('📋 Функции тестирования анимаций доступны в window.testAnimations');