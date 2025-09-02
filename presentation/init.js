// Модуль инициализации презентации
const Presentation = (function() {
    // Глобальные переменные
    let currentSlide = 0;
    let isAnimating = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    
    // DOM элементы
    let slides;
    let totalSlides;
    let prevBtn;
    let nextBtn;
    let currentSlideElement;
    let totalSlidesElement;
    let progressBar;
    let slidesContainer;
    
    // Предзагружаемые изображения
    const imagesToPreload = [];
    
    // Инициализация презентации
    function initPresentation() {
        // Получаем DOM элементы
        slides = $('.slide');
        totalSlides = slides.length;
        prevBtn = $('.prev-btn');
        nextBtn = $('.next-btn');
        currentSlideElement = $('.current-slide');
        totalSlidesElement = $('.total-slides');
        progressBar = $('.progress-bar');
        slidesContainer = $('.slides-container');
        
        // Установка общего количества слайдов
        totalSlidesElement.text(totalSlides);
        
        // Предзагрузка изображений
        preloadImages();
        
        // Обновление состояния кнопок
        Navigation.updateNavigationButtons(currentSlide, totalSlides, prevBtn, nextBtn);
        
        // Обновление индикатора слайда
        updateSlideIndicator();
        
        // Обновление прогресс бара
        updateProgressBar();
        
        // Установка обработчиков событий
        Events.setupEventHandlers(slidesContainer, prevBtn, nextBtn);
        
        // Фокус на контейнере для обработки клавиатуры
        slidesContainer.attr('tabindex', '0').focus();
    }
    
    // Функция предзагрузки изображений
    function preloadImages() {
        if (imagesToPreload.length === 0) return;
        
        console.log('Начинается предзагрузка изображений...');
        
        imagesToPreload.forEach(function(src) {
            const img = new Image();
            img.src = src;
            img.onload = function() {
                console.log('Изображение загружено:', src);
            };
            img.onerror = function() {
                console.warn('Не удалось загрузить изображение:', src);
            };
        });
    }
    
    // Обновление состояния навигации
    function updateNavigationState() {
        Navigation.updateNavigationButtons(currentSlide, totalSlides, prevBtn, nextBtn);
        updateSlideIndicator();
        updateProgressBar();
    }
    
    // Обновление индикатора текущего слайда
    function updateSlideIndicator() {
        currentSlideElement.text(currentSlide + 1);
    }
    
    // Обновление прогресс бара с плавной анимацией
    function updateProgressBar() {
        const progress = ((currentSlide + 1) / totalSlides) * 100;
        progressBar.animate(
            { width: progress + '%' },
            {
                duration: 800,
                easing: 'easeOutQuart'
            }
        );
    }
    
    // Публичные методы
    return {
        init: initPresentation,
        getCurrentSlide: () => currentSlide,
        getTotalSlides: () => totalSlides,
        isAnimating: () => isAnimating,
        setAnimating: (value) => { isAnimating = value; },
        setCurrentSlide: (value) => { currentSlide = value; },
        getSlides: () => slides,
        getSlidesContainer: () => slidesContainer,
        updateNavigationState: updateNavigationState,
        updateSlideIndicator: updateSlideIndicator,
        updateProgressBar: updateProgressBar
    };
})();