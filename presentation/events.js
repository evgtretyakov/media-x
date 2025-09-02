// Модуль обработки событий
const Events = (function() {
    // Переменные для управления жестами касания
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    
    // Обработка жестов касания для мобильных устройств
    function handleTouchEvents(slidesContainer) {
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
                    Navigation.next();
                } else {
                    // Свайп вправо - предыдущий слайд
                    Navigation.prev();
                }
            }
            
            // Сбрасываем значения
            touchStartX = 0;
            touchEndX = 0;
        });
    }
    
    // Обработка кликов мышью по кнопкам навигации
    function handleMouseNavigation(slidesContainer, prevBtn, nextBtn) {
        // Обработчик для кнопки "вперед"
        nextBtn.on('click', function(e) {
            e.preventDefault();
            if ($(this).prop('disabled') || Presentation.isAnimating()) return;
            Navigation.next();
        });
        
        // Обработчик для кнопки "назад"
        prevBtn.on('click', function(e) {
            e.preventDefault();
            if ($(this).prop('disabled') || Presentation.isAnimating()) return;
            Navigation.prev();
        });
        
        // Обработчик клика по слайду для перехода вперед
        slidesContainer.on('click', function(e) {
            if ($(e.target).closest('.nav-btn').length === 0 && !Presentation.isAnimating()) {
                const containerWidth = $(this).width();
                const clickX = e.clientX - $(this).offset().left;
                const currentSlide = Presentation.getCurrentSlide();
                const totalSlides = Presentation.getTotalSlides();
                
                // Клик в правой части - следующий слайд
                if (clickX > containerWidth * 0.7 && currentSlide < totalSlides - 1) {
                    Navigation.next();
                }
                // Клик в левой части - предыдущий слайд
                else if (clickX < containerWidth * 0.3 && currentSlide > 0) {
                    Navigation.prev();
                }
            }
        });
        
        // Обработка колесика мыши
        slidesContainer.on('wheel', function(e) {
            if (Presentation.isAnimating()) return;
            
            e.preventDefault();
            const delta = e.originalEvent.deltaY;
            
            if (delta > 0) {
                // Прокрутка вниз - следующий слайд
                Navigation.next();
            } else if (delta < 0) {
                // Прокрутка вверх - предыдущий слайд
                Navigation.prev();
            }
        });
    }
    
    // Обработка клавиатуры
    function handleKeyboardNavigation() {
        $(document).on('keydown', function(e) {
            console.log('⌨️  Нажата клавиша:', e.key, 'Код:', e.code);
            
            if (Presentation.isAnimating()) {
                console.log('⏸️  Анимация выполняется, клавиша проигнорирована');
                return;
            }
            
            switch(e.key) {
                case 'ArrowRight':
                    console.log('➡️  Стрелка вправо - переход вперед');
                    Navigation.next();
                    e.preventDefault();
                    break;
                    
                case ' ':
                    console.log('␣  Пробел - переход вперед');
                    Navigation.next();
                    e.preventDefault();
                    break;
                    
                case 'PageDown':
                    console.log('📄 PageDown - переход вперед');
                    Navigation.next();
                    e.preventDefault();
                    break;
                    
                case 'ArrowLeft':
                    console.log('⬅️  Стрелка влево - переход назад');
                    Navigation.prev();
                    e.preventDefault();
                    break;
                    
                case 'PageUp':
                    console.log('📄 PageUp - переход назад');
                    Navigation.prev();
                    e.preventDefault();
                    break;
                    
                case 'Home':
                    console.log('🏠 Home - переход к первому слайду');
                    Navigation.first();
                    e.preventDefault();
                    break;
                    
                case 'End':
                    console.log('🔚 End - переход к последнему слайду');
                    Navigation.last();
                    e.preventDefault();
                    break;
                    
                case '1':
                case '2':
                case '3':
                case '4':
                    const num = parseInt(e.key);
                    console.log('🔢 Цифра', num, '- переход к слайду', num);
                    if (num >= 1 && num <= Presentation.getTotalSlides()) {
                        Navigation.goTo(num - 1);
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
    function setupEventHandlers(slidesContainer, prevBtn, nextBtn) {
        handleMouseNavigation(slidesContainer, prevBtn, nextBtn);
        handleKeyboardNavigation();
        handleTouchEvents(slidesContainer);
        
        // Убрано блокирование контекстного меню для работы правой кнопки мыши
        
        // Обработчик для кнопки расширения презентации
        $('.expand-btn').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            togglePresentationExpand();
        });
    }
    
    // Функция переключения расширения презентации
    function togglePresentationExpand() {
        const container = $('.presentation-container');
        const expandBtn = $('.expand-btn');
        const isExpanded = container.hasClass('expanded');
        
        if (isExpanded) {
            // Возвращаем к обычному размеру
            container.removeClass('expanded');
            expandBtn.removeClass('expanded');
            console.log('📐 Презентация возвращена к обычному размеру');
        } else {
            // Расширяем на весь экран
            container.addClass('expanded');
            expandBtn.addClass('expanded');
            console.log('🖥️ Презентация расширена на весь экран');
        }
    }
    
    // Публичные методы
    return {
        setupEventHandlers: setupEventHandlers,
        handleTouchEvents: handleTouchEvents,
        handleMouseNavigation: handleMouseNavigation,
        handleKeyboardNavigation: handleKeyboardNavigation
    };
})();