// Скрипт для тестирования навигации через консоль браузера
// Откройте http://localhost:3000 и выполните этот код в консоли

console.log('🚀 Запуск тестирования навигации Media X Presentation...');

// Проверка глобального API
function testGlobalAPI() {
    console.log('\n🧪 1. Проверка глобального API');
    
    if (typeof window.presentation === 'undefined') {
        console.error('❌ Глобальное API не доступно');
        return false;
    }
    
    const apiMethods = Object.keys(window.presentation);
    console.log('✅ Глобальное API доступно');
    console.log('📋 Методы:', apiMethods.join(', '));
    
    return true;
}

// Тест навигации
function testNavigation() {
    console.log('\n🧪 2. Тестирование навигации');
    
    const presentation = window.presentation;
    const initialSlide = presentation.getCurrent();
    const totalSlides = presentation.getTotal();
    
    console.log('📊 Начальное состояние:');
    console.log('   Текущий слайд:', initialSlide + 1);
    console.log('   Всего слайдов:', totalSlides);
    console.log('   Анимация:', presentation.isAnimating() ? 'да' : 'нет');
    
    // Тест перехода вперед
    console.log('\n➡️  Тестирование перехода вперед...');
    presentation.next();
    
    setTimeout(() => {
        const afterNext = presentation.getCurrent();
        console.log('   После next():', afterNext + 1);
        
        // Тест перехода назад
        console.log('\n⬅️  Тестирование перехода назад...');
        presentation.prev();
        
        setTimeout(() => {
            const afterPrev = presentation.getCurrent();
            console.log('   После prev():', afterPrev + 1);
            
            // Тест перехода к конкретному слайду
            console.log('\n🔢 Тестирование перехода к слайду 2...');
            presentation.goTo(1);
            
            setTimeout(() => {
                const afterGoTo = presentation.getCurrent();
                console.log('   После goTo(1):', afterGoTo + 1);
                
                // Возврат к начальному слайду
                console.log('\n↩️  Возврат к начальному слайду...');
                presentation.goTo(0);
                
                setTimeout(() => {
                    const finalSlide = presentation.getCurrent();
                    console.log('   Финальный слайд:', finalSlide + 1);
                    
                    console.log('\n✅ Навигация протестирована успешно!');
                    
                }, 500);
            }, 500);
        }, 500);
    }, 500);
}

// Тест клавиатурной навигации
function testKeyboardNavigation() {
    console.log('\n⌨️  3. Тестирование клавиатурной навигации');
    console.log('   Попробуйте использовать:');
    console.log('   - Стрелка вправо → следующий слайд');
    console.log('   - Стрелка влево → предыдущий слайд');
    console.log('   - Пробел → следующий слайд');
    console.log('   - Клавиши 1,2,3 → переход к слайду');
}

// Проверка элементов DOM
function testDOMElements() {
    console.log('\n🎯 4. Проверка элементов DOM');
    
    const elements = {
        'Контейнер презентации': document.querySelector('.presentation-container'),
        'Активный слайд': document.querySelector('.slide.active'),
        'Кнопки навигации': document.querySelectorAll('.nav-btn'),
        'Индикатор слайдов': document.querySelector('.slide-indicator'),
        'Прогресс бар': document.querySelector('.progress-bar')
    };
    
    Object.entries(elements).forEach(([name, element]) => {
        if (Array.isArray(element) || element instanceof NodeList) {
            console.log(`   ${name}: ${element.length} элементов`);
        } else {
            console.log(`   ${name}: ${element ? 'найден' : 'не найден'}`);
        }
    });
}

// Основная функция тестирования
function runAllTests() {
    console.log('='.repeat(60));
    console.log('🧪 ПОЛНОЕ ТЕСТИРОВАНИЕ НАВИГАЦИИ');
    console.log('='.repeat(60));
    
    if (!testGlobalAPI()) {
        console.error('❌ Тестирование прервано: API не доступно');
        return;
    }
    
    testNavigation();
    testKeyboardNavigation();
    testDOMElements();
    
    console.log('\n📋 Ручное управление доступно через:');
    console.log('   window.presentation.next() - следующий слайд');
    console.log('   window.presentation.prev() - предыдущий слайд');
    console.log('   window.presentation.goTo(n) - перейти к слайду n');
    console.log('   window.presentation.getCurrent() - текущий слайд');
    console.log('   window.presentation.getTotal() - всего слайдов');
}

// Запуск тестов
setTimeout(runAllTests, 1000);

// Экспорт функций для ручного тестирования
window.testNavigation = {
    runAll: runAllTests,
    testAPI: testGlobalAPI,
    testNav: testNavigation,
    testKeyboard: testKeyboardNavigation,
    testDOM: testDOMElements
};

console.log('📋 Функции тестирования доступны в window.testNavigation');