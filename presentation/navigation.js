// Модуль навигации по слайдам
const Navigation = (function() {
    
    // Переход к следующему слайду с плавной анимацией
    function nextSlide() {
        if (Presentation.isAnimating() || Presentation.getCurrentSlide() >= Presentation.getTotalSlides() - 1) return;
        goToSlide(Presentation.getCurrentSlide() + 1, 'next');
    }
    
    // Переход к предыдущему слайду с плавной анимацией
    function prevSlide() {
        if (Presentation.isAnimating() || Presentation.getCurrentSlide() <= 0) return;
        goToSlide(Presentation.getCurrentSlide() - 1, 'prev');
    }
    
    // Переход к конкретному слайду с направлением анимации
    function goToSlide(slideIndex, direction = 'auto') {
        const currentSlide = Presentation.getCurrentSlide();
        const totalSlides = Presentation.getTotalSlides();
        const slides = Presentation.getSlides();
        
        if (Presentation.isAnimating() || slideIndex < 0 || slideIndex >= totalSlides || slideIndex === currentSlide) {
            return;
        }
        
        Presentation.setAnimating(true);
        
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
                    Presentation.setCurrentSlide(slideIndex);
                    Presentation.updateNavigationState();
                    Presentation.setAnimating(false);
                    
                    // Анимация появления контента на новом слайде
                    Animations.animateSlideContent(nextSlideElement);
                }
            }
        );
    }
    
    // Переход к первому слайду
    function goToFirstSlide() {
        goToSlide(0);
    }
    
    // Переход к последнему слайду
    function goToLastSlide() {
        goToSlide(Presentation.getTotalSlides() - 1);
    }
    
    // Обновление состояния кнопок навигации
    function updateNavigationButtons(currentSlide, totalSlides, prevBtn, nextBtn) {
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
    
    // Публичные методы
    return {
        next: nextSlide,
        prev: prevSlide,
        goTo: goToSlide,
        first: goToFirstSlide,
        last: goToLastSlide,
        updateNavigationButtons: updateNavigationButtons
    };
})();