// Упрощенный тест навигации для запуска в консоли браузера
// Откройте http://localhost:3000 и вставьте этот код в консоль разработчика

function testNavigation() {
    console.log('🚀 Запуск тестирования навигации...');
    
    // Проверяем доступность глобального API
    if (typeof window.presentation === 'undefined') {
        console.error('❌ Глобальное API презентации не доступно');
        return;
    }
    
    console.log('✅ Глобальное API доступно:', Object.keys(window.presentation));
    
    // Тест 1: Проверка текущего состояния
    console.log('\n📊 Тест 1: Проверка текущего состояния');
    console.log('Текущий слайд:', window.presentation.getCurrentSlide() + 1);
    console.log('Всего слайдов:', window.presentation.getTotalSlides());
    console.log('Анимация выполняется:', window.presentation.isAnimating());
    
    // Тест 2: Навигация вперед
    console.log('\n➡️  Тест 2: Переход к следующему слайду');
    window.presentation.next();
    setTimeout(() => {
        console.log('Текущий слайд после next():', window.presentation.getCurrentSlide() + 1);
        
        // Тест 3: Навигация назад
        console.log('\n⬅️  Тест 3: Переход к предыдущему слайду');
        window.presentation.prev();
        setTimeout(() => {
            console.log('Текущий слайд после prev():', window.presentation.getCurrentSlide() + 1);
            
            // Тест 4: Переход к конкретному слайду
            console.log('\n🔢 Тест 4: Переход к слайду 2');
            window.presentation.goTo(1);
            setTimeout(() => {
                console.log('Текущий слайд после goTo(1):', window.presentation.getCurrentSlide() + 1);
                
                // Тест 5: Проверка элементов DOM
                console.log('\n🎯 Тест 5: Проверка элементов DOM');
                const activeSlide = document.querySelector('.slide.active');
                const navButtons = document.querySelectorAll('.nav-btn');
                const indicator = document.querySelector('.slide-indicator');
                
                console.log('Активный слайд:', activeSlide ? 'найден' : 'не найден');
                console.log('Кнопки навигации:', navButtons.length);
                console.log('Индикатор слайдов:', indicator ? indicator.textContent : 'не найден');
                
                // Тест 6: Проверка состояния кнопок
                console.log('\n🔘 Тест 6: Состояние кнопок');
                navButtons.forEach((btn, index) => {
                    console.log(`Кнопка ${index}: disabled=${btn.disabled}, text=${btn.textContent.trim()}`);
                });
                
                console.log('\n✅ Все тесты пройдены успешно!');
                
            }, 1000);
        }, 1000);
    }, 1000);
}

// Запускаем тест
testNavigation();

// Дополнительные функции для ручного тестирования
window.testNavigationManual = {
    next: () => window.presentation.next(),
    prev: () => window.presentation.prev(),
    goTo: (slide) => window.presentation.goTo(slide),
    getState: () => ({
        current: window.presentation.getCurrentSlide() + 1,
        total: window.presentation.getTotalSlides(),
        animating: window.presentation.isAnimating()
    })
};

console.log('📋 Ручные функции тестирования доступны в window.testNavigationManual');