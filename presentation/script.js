$(document).ready(function() {
    // Инициализация переменных
    let currentSlide = 0;
    const slides = $('.slide');
    const totalSlides = slides.length;
    const prevBtn = $('.prev-btn');
    const nextBtn = $('.next-btn');
    const currentSlideElement = $('.current-slide');
    const totalSlidesElement = $('.total-slides');
    const progressBar = $('.progress-bar');
    const slidesContainer = $('.slides-container');
    
    // Переменные для управления анимациями
    let isAnimating = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    
    // Предзагружаемые изображения (если будут добавлены реальные изображения)
    const imagesToPreload = [];
    
    // Инициализация презентации
    function initPresentation() {
        // Установка общего количества слайдов
        totalSlidesElement.text(totalSlides);
        
        // Предзагрузка изображений
        preloadImages();
        
        // Обновление состояния кнопок
        updateNavigationButtons();
        
        // Обновление индикатора слайда
        updateSlideIndicator();
        
        // Обновление прогресс бара
        updateProgressBar();
        
        // Установка обработчиков событий
        setupEventHandlers();
        
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
    
    // Переход к следующему слайду с плавной анимацией
    function nextSlide() {
        if (isAnimating || currentSlide >= totalSlides - 1) return;
        goToSlide(currentSlide + 1, 'next');
    }
    
    // Переход к предыдущему слайду с плавной анимацией
    function prevSlide() {
        if (isAnimating || currentSlide <= 0) return;
        goToSlide(currentSlide - 1, 'prev');
    }
    
    // Переход к конкретному слайду с направлением анимации
    function goToSlide(slideIndex, direction = 'auto') {
        if (isAnimating || slideIndex < 0 || slideIndex >= totalSlides || slideIndex === currentSlide) {
            return;
        }

        isAnimating = true;
        
        // Определяем направление анимации
        if (direction === 'auto') {
            direction = slideIndex > currentSlide ? 'next' : 'prev';
        }
        
        const currentSlideElement = slides.eq(currentSlide);
        const nextSlideElement = slides.eq(slideIndex);
        
        // Настройка CSS классов для анимации
        currentSlideElement.removeClass('active').addClass('exiting');
        nextSlideElement.removeClass('prev').addClass('entering');
        
        // Анимация перехода с использованием jQuery
        const animationDuration = 800;
        
        // Анимация выхода текущего слайда
        currentSlideElement.animate(
            {
                opacity: 0,
                translateX: direction === 'next' ? '-100%' : '100%',
                scale: 0.95
            },
            {
                duration: animationDuration,
                easing: 'easeInOutQuint',
                complete: function() {
                    currentSlideElement.removeClass('exiting').addClass('prev');
                }
            }
        );
        
        // Анимация входа нового слайда
        nextSlideElement.css({
            opacity: 0,
            translateX: direction === 'next' ? '100%' : '-100%',
            scale: 0.95
        });
        
        nextSlideElement.animate(
            {
                opacity: 1,
                translateX: '0%',
                scale: 1
            },
            {
                duration: animationDuration,
                easing: 'easeInOutQuint',
                complete: function() {
                    nextSlideElement.removeClass('entering').addClass('active');
                    currentSlide = slideIndex;
                    updateNavigationState();
                    isAnimating = false;
                    
                    // Анимация появления контента на новом слайде
                    animateSlideContent(nextSlideElement);
                }
            }
        );
    }
    
    // Анимация появления контента на слайде
    function animateSlideContent(slideElement) {
        const contentElements = slideElement.find('h1, h2, p, li, .content-wrapper');
        
        contentElements.each(function(index) {
            const element = $(this);
            const delay = index * 200;
            
            element.css({
                opacity: 0,
                transform: 'translateY(30px)'
            });
            
            setTimeout(function() {
                element.animate(
                    {
                        opacity: 1,
                        transform: 'translateY(0)'
                    },
                    {
                        duration: 600,
                        easing: 'easeOutQuart'
                    }
                );
            }, delay);
        });
    }
    
    // Обновление состояния навигации
    function updateNavigationState() {
        updateNavigationButtons();
        updateSlideIndicator();
        updateProgressBar();
    }
    
    // Обновление состояния кнопок навигации
    function updateNavigationButtons() {
        // Блокируем кнопку "назад" на первом слайде
        prevBtn.prop('disabled', currentSlide === 0);
        
        // Блокируем кнопку "вперед" на последнем слайде
        nextBtn.prop('disabled', currentSlide === totalSlides - 1);
        
        // Добавляем/убираем классы для стилизации отключенных кнопок
        if (currentSlide === 0) {
            prevBtn.addClass('disabled');
        } else {
            prevBtn.removeClass('disabled');
        }
        
        if (currentSlide === totalSlides - 1) {
            nextBtn.addClass('disabled');
        } else {
            nextBtn.removeClass('disabled');
        }
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
    
    // Обработка жестов касания для мобильных устройств
    function handleTouchEvents() {
        slidesContainer.on('touchstart', function(e) {
            const touch = e.originalEvent.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
        });
        
        slidesContainer.on('touchmove', function(e) {
            if (!touchStartX) return;
            
            const touch = e.originalEvent.touches[0];
            touchEndX = touch.clientX;
            touchEndY = touch.clientY;
            
            // Предотвращаем скролл страницы при горизонтальном свайпе
            const diffX = Math.abs(touchEndX - touchStartX);
            const diffY = Math.abs(touchEndY - touchStartY);
            
            if (diffX > diffY && diffX > 10) {
                e.preventDefault();
            }
        });
        
        slidesContainer.on('touchend', function() {
            if (!touchStartX || !touchEndX) return;
            
            const diffX = touchStartX - touchEndX;
            const diffY = Math.abs(touchStartY - touchEndY);
            const swipeThreshold = 50;
            const verticalThreshold = 100;
            
            // Проверяем, что это горизонтальный свайп, а не вертикальный
            if (Math.abs(diffX) > swipeThreshold && diffY < verticalThreshold) {
                if (diffX > 0) {
                    // Свайп влево - следующий слайд
                    nextSlide();
                } else {
                    // Свайп вправо - предыдущий слайд
                    prevSlide();
                }
            }
            
            // Сбрасываем значения
            touchStartX = 0;
            touchEndX = 0;
        });
    }
    
    // Обработка кликов мышью по кнопкам навигации
    function handleMouseNavigation() {
        // Обработчик для кнопки "вперед"
        nextBtn.on('click', function(e) {
            e.preventDefault();
            if ($(this).prop('disabled') || isAnimating) return;
            nextSlide();
        });
        
        // Обработчик для кнопки "назад"
        prevBtn.on('click', function(e) {
            e.preventDefault();
            if ($(this).prop('disabled') || isAnimating) return;
            prevSlide();
        });
        
        // Обработчик клика по слайду для перехода вперед
        slidesContainer.on('click', function(e) {
            if ($(e.target).closest('.nav-btn').length === 0 && !isAnimating) {
                const containerWidth = $(this).width();
                const clickX = e.clientX - $(this).offset().left;
                
                // Клик в правой части - следующий слайд
                if (clickX > containerWidth * 0.7 && currentSlide < totalSlides - 1) {
                    nextSlide();
                }
                // Клик в левой части - предыдущий слайд
                else if (clickX < containerWidth * 0.3 && currentSlide > 0) {
                    prevSlide();
                }
            }
        });
        
        // Обработка колесика мыши
        slidesContainer.on('wheel', function(e) {
            if (isAnimating) return;
            
            e.preventDefault();
            const delta = e.originalEvent.deltaY;
            
            if (delta > 0) {
                // Прокрутка вниз - следующий слайд
                nextSlide();
            } else if (delta < 0) {
                // Прокрутка вверх - предыдущий слайд
                prevSlide();
            }
        });
    }
    
    // Обработка клавиатуры
    function handleKeyboardNavigation() {
        $(document).on('keydown', function(e) {
            console.log('⌨️  Нажата клавиша:', e.key, 'Код:', e.code);
            
            if (isAnimating) {
                console.log('⏸️  Анимация выполняется, клавиша проигнорирована');
                return;
            }
            
            switch(e.key) {
                case 'ArrowRight':
                    console.log('➡️  Стрелка вправо - переход вперед');
                    nextSlide();
                    e.preventDefault();
                    break;
                    
                case ' ':
                    console.log('␣  Пробел - переход вперед');
                    nextSlide();
                    e.preventDefault();
                    break;
                    
                case 'PageDown':
                    console.log('📄 PageDown - переход вперед');
                    nextSlide();
                    e.preventDefault();
                    break;
                    
                case 'ArrowLeft':
                    console.log('⬅️  Стрелка влево - переход назад');
                    prevSlide();
                    e.preventDefault();
                    break;
                    
                case 'PageUp':
                    console.log('📄 PageUp - переход назад');
                    prevSlide();
                    e.preventDefault();
                    break;
                    
                case 'Home':
                    console.log('🏠 Home - переход к первому слайду');
                    goToSlide(0);
                    e.preventDefault();
                    break;
                    
                case 'End':
                    console.log('🔚 End - переход к последнему слайду');
                    goToSlide(totalSlides - 1);
                    e.preventDefault();
                    break;
                    
                case '1':
                case '2':
                case '3':
                case '4':
                    const num = parseInt(e.key);
                    console.log('🔢 Цифра', num, '- переход к слайду', num);
                    if (num >= 1 && num <= totalSlides) {
                        goToSlide(num - 1);
                        e.preventDefault();
                    } else {
                        console.log('❌ Неверный номер слайда:', num);
                    }
                    break;
                    
                default:
                    console.log('ℹ️  Клавиша не обрабатывается:', e.key);
            }
        });
    }
    
    // Настройка всех обработчиков событий
    function setupEventHandlers() {
        handleMouseNavigation();
        handleKeyboardNavigation();
        handleTouchEvents();
        
        // Предотвращаем контекстное меню на мобильных устройствах
        slidesContainer.on('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
    }
    
    // Дополнительные функции для удобства
    function goToFirstSlide() {
        goToSlide(0);
    }
    
    function goToLastSlide() {
        goToSlide(totalSlides - 1);
    }
    
    function getCurrentSlide() {
        return currentSlide;
    }
    
    function getTotalSlides() {
        return totalSlides;
    }
    
    // Публичные методы для расширения функциональности
    window.presentation = {
        next: nextSlide,
        prev: prevSlide,
        goTo: goToSlide,
        first: goToFirstSlide,
        last: goToLastSlide,
        getCurrent: getCurrentSlide,
        getTotal: getTotalSlides,
        isAnimating: function() { return isAnimating; }
    };
    
    // Добавляем easing функции для плавных анимаций
    if (!$.easing) {
        $.easing = {};
    }
    
    $.extend($.easing, {
        easeInOutQuint: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        },
        easeOutQuart: function(x, t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        }
    });
    
    // Запуск инициализации
    initPresentation();
});
