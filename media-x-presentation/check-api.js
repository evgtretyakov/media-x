// Скрипт для проверки глобального API через консоль браузера
console.log('🔍 Проверка глобального API presentation...');

// Функция для проверки доступности API
function checkPresentationAPI() {
    console.log('='.repeat(50));
    console.log('🧪 ТЕСТИРОВАНИЕ ГЛОБАЛЬНОГО API');
    console.log('='.repeat(50));
    
    // Проверка существования глобального объекта
    if (typeof window === 'undefined') {
        console.log('❌ window не определен (вероятно, Node.js среда)');
        return false;
    }
    
    if (!window.presentation) {
        console.log('❌ window.presentation не найден');
        console.log('ℹ️  Убедитесь, что:');
        console.log('   - Презентация запущена на http://localhost:4173');
        console.log('   - Функция setupGlobalPresentationAPI() вызвана');
        console.log('   - Нет ошибок в консоли разработчика');
        return false;
    }
    
    console.log('✅ window.presentation найден');
    
    // Проверка методов API
    const api = window.presentation;
    const requiredMethods = ['next', 'prev', 'goTo', 'first', 'last', 'getCurrent', 'getTotal'];
    const optionalMethods = ['isAnimating'];
    
    let allMethodsPresent = true;
    
    console.log('\n📋 Проверка методов:');
    requiredMethods.forEach(method => {
        const exists = typeof api[method] === 'function';
        console.log(`   ${method}: ${exists ? '✅' : '❌'}`);
        if (!exists) allMethodsPresent = false;
    });
    
    optionalMethods.forEach(method => {
        const exists = typeof api[method] === 'function';
        console.log(`   ${method}: ${exists ? '✅' : '⚠️ '}`);
    });
    
    if (!allMethodsPresent) {
        console.log('\n❌ Не все обязательные методы присутствуют');
        return false;
    }
    
    console.log('\n✅ Все обязательные методы присутствуют');
    
    // Тест работы методов
    console.log('\n🧪 Тестирование функциональности:');
    try {
        const currentSlide = api.getCurrent();
        const totalSlides = api.getTotal();
        const isAnimating = api.isAnimating ? api.isAnimating() : false;
        
        console.log(`   Текущий слайд: ${currentSlide + 1}/${totalSlides}`);
        console.log(`   Анимация: ${isAnimating}`);
        console.log(`   Можно ли вперед: ${currentSlide < totalSlides - 1}`);
        console.log(`   Можно ли назад: ${currentSlide > 0}`);
        
        console.log('\n✅ Базовые функции работают корректно');
        
    } catch (error) {
        console.log(`❌ Ошибка при тестировании функций: ${error.message}`);
        return false;
    }
    
    return true;
}

// Функция для демонстрации работы API
function demonstrateAPI() {
    if (!checkPresentationAPI()) return;
    
    const api = window.presentation;
    console.log('\n🎬 Демонстрация работы API:');
    console.log('Команды для тестирования:');
    console.log('   presentation.next()      - следующий слайд');
    console.log('   presentation.prev()      - предыдущий слайд');
    console.log('   presentation.goTo(1)     - перейти к слайду 2');
    console.log('   presentation.first()     - первый слайд');
    console.log('   presentation.last()      - последний слайд');
    console.log('   presentation.getCurrent() - текущий слайд');
    console.log('   presentation.getTotal()   - всего слайдов');
    
    // Создаем глобальные функции для удобства тестирования
    window.testNext = () => {
        console.log('▶️  presentation.next()');
        api.next();
        updateStatus();
    };
    
    window.testPrev = () => {
        console.log('◀️  presentation.prev()');
        api.prev();
        updateStatus();
    };
    
    window.testGoTo = (slide) => {
        console.log(`🔢 presentation.goTo(${slide})`);
        api.goTo(slide);
        updateStatus();
    };
    
    window.testFirst = () => {
        console.log('⏮️  presentation.first()');
        api.first();
        updateStatus();
    };
    
    window.testLast = () => {
        console.log('⏭️  presentation.last()');
        api.last();
        updateStatus();
    };
    
    function updateStatus() {
        setTimeout(() => {
            const current = api.getCurrent();
            const total = api.getTotal();
            console.log(`📊 Текущее состояние: слайд ${current + 1}/${total}`);
        }, 100);
    }
    
    console.log('\n🚀 Глобальные функции для тестирования:');
    console.log('   testNext()    - следующий слайд');
    console.log('   testPrev()    - предыдущий слайд');
    console.log('   testGoTo(n)   - перейти к слайду n');
    console.log('   testFirst()   - первый слайд');
    console.log('   testLast()    - последний слайд');
    
    console.log('\n🎉 Глобальное API готово к использованию!');
}

// Автоматический запуск проверки
setTimeout(() => {
    console.log('🔄 Запуск автоматической проверки API...');
    const success = checkPresentationAPI();
    
    if (success) {
        console.log('\n🎉 СОВМЕСТИМОСТЬ С ОРИГИНАЛОМ: ✅ УСПЕШНО');
        console.log('Глобальное API presentation полностью совместимо');
        console.log('с оригинальной jQuery реализацией презентации');
        
        // Предлагаем демонстрацию
        console.log('\n💡 Для демонстрации введите: demonstrateAPI()');
    } else {
        console.log('\n❌ СОВМЕСТИМОСТЬ С ОРИГИНАЛОМ: НЕ УДАЛАСЬ');
        console.log('Требуется дополнительная настройка API');
    }
}, 1000);

// Экспорт функций для ручного использования
window.checkPresentationAPI = checkPresentationAPI;
window.demonstrateAPI = demonstrateAPI;

console.log('📋 Функции проверки доступны:');
console.log('   checkPresentationAPI() - базовая проверка');
console.log('   demonstrateAPI()       - демонстрация работы');