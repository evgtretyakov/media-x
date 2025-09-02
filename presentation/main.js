// Главный файл презентации - объединяет все модули
$(document).ready(function() {
    console.log('🚀 Инициализация модульной презентации...');
    
    // Добавляем easing функции для плавных анимаций
    Animations.addEasingFunctions();
    
    // Инициализируем презентацию
    Presentation.init();
    
    console.log('✅ Презентация успешно инициализирована!');
    console.log('📊 Доступно слайдов:', Presentation.getTotalSlides());
    console.log('🔧 Глобальный объект presentation доступен для использования');
});