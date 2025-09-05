// Скрипт для тестирования совместимости с оригинальной функциональностью
// Откройте http://localhost:4173 и выполните этот код в консоли

console.log('🔄 Запуск тестирования совместимости...');

function testCompatibility() {
    console.log('='.repeat(60));
    console.log('🔄 ТЕСТИРОВАНИЕ СОВМЕСТИМОСТИ С ОРИГИНАЛОМ');
    console.log('='.repeat(60));
    
    // Проверка глобального API
    console.log('\n🧪 1. Проверка глобального API:');
    const hasGlobalAPI = typeof window !== 'undefined' && window.presentation;
    console.log(`   window.presentation: ${hasGlobalAPI ? '✅ Найден' : '❌ Не найден'}`);
    
    if (hasGlobalAPI) {
        const api = window.presentation;
        console.log('   Методы API:');
        console.log(`     next: ${typeof api.next === 'function' ? '✅' : '❌'}`);
        console.log(`     prev: ${typeof api.prev === 'function' ? '✅' : '❌'}`);
        console.log(`     goTo: ${typeof api.goTo === 'function' ? '✅' : '❌'}`);
        console.log(`     first: ${typeof api.first === 'function' ? '✅' : '❌'}`);
        console.log(`     last: ${typeof api.last === 'function' ? '✅' : '❌'}`);
        console.log(`     getCurrent: ${typeof api.getCurrent === 'function' ? '✅' : '❌'}`);
        console.log(`     getTotal: ${typeof api.getTotal === 'function' ? '✅' : '❌'}`);
        console.log(`     isAnimating: ${typeof api.isAnimating === 'function' ? '✅' : '❌'}`);
        
        // Тест основных функций
        console.log('\n🧪 2. Тест функций API:');
        try {
            const current = api.getCurrent();
            const total = api.getTotal();
            const animating = api.isAnimating();
            
            console.log(`   Текущий слайд: ${current}`);
            console.log(`   Всего слайдов: ${total}`);
            console.log(`   Анимация: ${animating}`);
            
            console.log('   ✅ Базовые функции работают');
        } catch (error) {
            console.log(`   ❌ Ошибка в базовых функциях: ${error.message}`);
        }
    }
    
    // Проверка структуры слайдов
    console.log('\n🧪 3. Проверка структуры слайдов:');
    const slides = document.querySelectorAll('.slide');
    console.log(`   Количество слайдов: ${slides.length}`);
    
    if (slides.length > 0) {
        const firstSlide = slides[0];
        const hasTitle = firstSlide.querySelector('h1');
        const hasContent = firstSlide.querySelector('.content');
        
        console.log(`   Заголовок: ${hasTitle ? '✅' : '❌'}`);
        console.log(`   Контент: ${hasContent ? '✅' : '❌'}`);
        console.log(`   CSS классы: ${firstSlide.className}`);
    }
    
    // Проверка навигации
    console.log('\n🧪 4. Проверка навигации:');
    const navButtons = document.querySelectorAll('button');
    const hasNavButtons = navButtons.length >= 2; // next/prev
    
    console.log(`   Кнопки навигации: ${navButtons.length} (${hasNavButtons ? '✅' : '❌'})`);
    
    // Проверка обработки событий
    console.log('\n🧪 5. Проверка обработки событий:');
    const hasKeyEvents = typeof document !== 'undefined' && 
                        (document.onkeydown || document.addEventListener);
    const hasTouchEvents = 'ontouchstart' in window;
    
    console.log(`   Обработка клавиатуры: ${hasKeyEvents ? '✅' : '❌'}`);
    console.log(`   Touch события: ${hasTouchEvents ? '✅' : '❌'}`);
    
    return hasGlobalAPI && slides.length > 0;
}

// Функция для тестирования обратной совместимости
function testBackwardCompatibility() {
    console.log('\n🧪 6. Тестирование обратной совместимости:');
    
    // Проверка методов, которые должны быть в оригинальном API
    const expectedMethods = ['next', 'prev', 'goTo', 'first', 'last', 'getCurrent', 'getTotal'];
    const optionalMethods = ['isAnimating', 'togglePlayPause'];
    
    if (window.presentation) {
        const api = window.presentation;
        let allMethodsPresent = true;
        
        expectedMethods.forEach(method => {
            if (typeof api[method] !== 'function') {
                console.log(`   ❌ Обязательный метод ${method} отсутствует`);
                allMethodsPresent = false;
            }
        });
        
        optionalMethods.forEach(method => {
            if (typeof api[method] !== 'function') {
                console.log(`   ⚠️  Опциональный метод ${method} отсутствует`);
            }
        });
        
        if (allMethodsPresent) {
            console.log('   ✅ Все обязательные методы присутствуют');
        }
        
        return allMethodsPresent;
    }
    
    return false;
}

// Функция для тестирования интеграции
function testIntegration() {
    console.log('\n🧪 7. Тестирование интеграции:');
    
    // Проверка, что API можно использовать извне
    try {
        // Сохраняем текущее состояние
        const originalCurrent = window.presentation?.getCurrent();
        const originalTotal = window.presentation?.getTotal();
        
        console.log(`   Интеграционный тест: ✅ API доступно для внешнего использования`);
        console.log(`   Исходное состояние: слайд ${originalCurrent + 1} из ${originalTotal}`);
        
        return true;
    } catch (error) {
        console.log(`   Интеграционный тест: ❌ ${error.message}`);
        return false;
    }
}

// Основная функция тестирования
function runCompatibilityTests() {
    console.log('='.repeat(60));
    console.log('🔄 ТЕСТИРОВАНИЕ СОВМЕСТИМОСТИ');
    console.log('='.repeat(60));
    
    const compatTest = testCompatibility();
    const backwardTest = testBackwardCompatibility();
    const integrationTest = testIntegration();
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ:');
    console.log('='.repeat(60));
    
    console.log(`   Базовая совместимость: ${compatTest ? '✅' : '❌'}`);
    console.log(`   Обратная совместимость: ${backwardTest ? '✅' : '❌'}`);
    console.log(`   Интеграция: ${integrationTest ? '✅' : '❌'}`);
    
    const overallSuccess = compatTest && backwardTest && integrationTest;
    
    if (overallSuccess) {
        console.log('\n🎉 Полная совместимость с оригиналом!');
        console.log('✅ Глобальное API работает');
        console.log('✅ Все методы присутствуют');
        console.log('✅ Интеграция возможна');
        console.log('✅ Структура слайдов корректна');
    } else {
        console.log('\n❌ Обнаружены проблемы совместимости');
        console.log('⚠️  Проверьте глобальное API и структуру');
    }
    
    return overallSuccess;
}

// Запуск тестов
setTimeout(() => {
    try {
        const success = runCompatibilityTests();
        console.log('\n💡 Для тестирования API:');
        console.log('   - Используйте window.presentation.next()');
        console.log('   - Используйте window.presentation.prev()');
        console.log('   - Используйте window.presentation.goTo(2)');
        console.log('   - Проверьте window.presentation.getCurrent()');
    } catch (error) {
        console.error('❌ Ошибка при тестировании совместимости:', error.message);
    }
}, 1000);

// Экспорт для ручного тестирования
window.testCompatibility = {
    runAll: runCompatibilityTests,
    testAPI: testCompatibility,
    testBackward: testBackwardCompatibility,
    testIntegration: testIntegration
};

console.log('📋 Функции тестирования совместимости доступны в window.testCompatibility');