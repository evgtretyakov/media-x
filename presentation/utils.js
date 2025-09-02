// Модуль утилит
const Utils = (function() {
    
    // Публичные методы для глобального доступа
    function getCurrentSlide() {
        return Presentation.getCurrentSlide();
    }
    
    function getTotalSlides() {
        return Presentation.getTotalSlides();
    }
    
    function isAnimating() {
        return Presentation.isAnimating();
    }
    
    function nextSlide() {
        Navigation.next();
    }
    
    function prevSlide() {
        Navigation.prev();
    }
    
    function goToSlide(slideIndex) {
        Navigation.goTo(slideIndex);
    }
    
    function goToFirstSlide() {
        Navigation.first();
    }
    
    function goToLastSlide() {
        Navigation.last();
    }
    
    // Экспорт публичных методов в глобальную область видимости
    window.presentation = {
        next: nextSlide,
        prev: prevSlide,
        goTo: goToSlide,
        first: goToFirstSlide,
        last: goToLastSlide,
        getCurrent: getCurrentSlide,
        getTotal: getTotalSlides,
        isAnimating: isAnimating
    };
    
    // Публичные методы модуля
    return {
        // Методы для доступа к Presentation
        getCurrentSlide: getCurrentSlide,
        getTotalSlides: getTotalSlides,
        isAnimating: isAnimating,
        
        // Методы для доступа к Navigation
        nextSlide: nextSlide,
        prevSlide: prevSlide,
        goToSlide: goToSlide,
        goToFirstSlide: goToFirstSlide,
        goToLastSlide: goToLastSlide
    };
})();