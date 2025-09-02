// Модуль анимаций
const Animations = (function() {
    
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
    
    // Добавление easing функций для плавных анимаций
    function addEasingFunctions() {
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
    }
    
    // Публичные методы
    return {
        animateSlideContent: animateSlideContent,
        addEasingFunctions: addEasingFunctions
    };
})();