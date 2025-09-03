// Анимации для современного слайда технологического стека

class TechAnimations {
    constructor() {
        this.techSlide = null;
        this.animationInProgress = false;
        this.init();
    }

    init() {
        // Слушаем события смены слайдов
        $(document).on('slideChanged', this.handleSlideChange.bind(this));
        
        // Инициализация при загрузке
        $(document).ready(() => {
            this.setupTechSlide();
        });
    }

    handleSlideChange(e, data) {
        const currentSlide = $(`.slide:nth-child(${data.newSlide + 1})`);
        if (currentSlide.hasClass('tech-modern-slide')) {
            this.setupTechSlide();
            this.animateTechSlide();
        }
    }

    setupTechSlide() {
        this.techSlide = $('.tech-modern-slide');
        if (this.techSlide.length === 0) return;

        // Добавляем интерактивные эффекты при наведении
        this.addHoverEffects();
        
        // Добавляем клик-анимации
        this.addClickAnimations();
        
        // Добавляем параллакс эффект
        this.addParallaxEffect();
    }

    animateTechSlide() {
        if (this.animationInProgress || !this.techSlide || !this.techSlide.hasClass('active')) return;

        this.animationInProgress = true;

        // Анимация появления элементов с задержкой
        const techCards = this.techSlide.find('.tech-category-modern');
        
        techCards.each((index, card) => {
            const $card = $(card);
            
            // Сбрасываем стили перед анимацией
            $card.css({
                opacity: 0,
                transform: 'translateY(60px) rotateX(-20deg) scale(0.8)'
            });

            // Анимация появления с задержкой
            setTimeout(() => {
                $card.css({
                    opacity: 1,
                    transform: 'translateY(0) rotateX(0deg) scale(1)',
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                });
            }, 400 + index * 200);
        });

        // Анимация частиц
        this.animateParticles();

        // Анимация завершена
        setTimeout(() => {
            this.animationInProgress = false;
        }, 400 + techCards.length * 200);
    }

    addHoverEffects() {
        const techCards = this.techSlide.find('.tech-category-modern');
        
        techCards.hover(
            // Mouse enter
            function() {
                if ($(this).hasClass('animating')) return;
                
                $(this).addClass('animating');
                
                // Анимация иконки
                const icon = $(this).find('.tech-category-icon');
                icon.css({
                    transform: 'scale(1.2) rotate(10deg)',
                    transition: 'all 0.3s ease-out'
                });

                // Эффект свечения
                $(this).css({
                    boxShadow: '0 30px 60px rgba(72, 219, 251, 0.5), 0 0 0 4px rgba(72, 219, 251, 0.4), 0 0 60px rgba(72, 219, 251, 0.4)'
                });

                setTimeout(() => {
                    $(this).removeClass('animating');
                }, 300);
            },
            // Mouse leave
            function() {
                const icon = $(this).find('.tech-category-icon');
                icon.css({
                    transform: 'scale(1) rotate(0deg)',
                    transition: 'all 0.3s ease-in'
                });

                $(this).css({
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 3px rgba(72, 219, 251, 0.4), 0 0 45px rgba(72, 219, 251, 0.4)'
                });
            }
        );
    }

    addClickAnimations() {
        const techCards = this.techSlide.find('.tech-category-modern');
        
        techCards.on('click', function() {
            if ($(this).hasClass('clicked')) return;
            
            $(this).addClass('clicked');
            
            // Анимация клика
            $(this).css({
                transform: 'translateY(-15px) scale(1.06) rotateX(8deg)',
                transition: 'all 0.2s ease-out'
            });

            // Эффект импульса
            const icon = $(this).find('.tech-category-icon');
            icon.css({
                transform: 'scale(1.3) rotate(20deg)',
                filter: 'drop-shadow(0 0 30px currentColor)'
            });

            // Возврат к исходному состоянию
            setTimeout(() => {
                $(this).css({
                    transform: 'translateY(-12px) scale(1.04) rotateX(5deg)',
                    transition: 'all 0.3s ease-in'
                });

                icon.css({
                    transform: 'scale(1.2) rotate(10deg)',
                    filter: 'drop-shadow(0 0 20px currentColor)'
                });

                setTimeout(() => {
                    $(this).removeClass('clicked');
                }, 300);
            }, 200);
        });
    }

    addParallaxEffect() {
        this.techSlide.on('mousemove', (e) => {
            if (!this.techSlide.hasClass('active')) return;

            const techCards = this.techSlide.find('.tech-category-modern');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            techCards.each((index, card) => {
                const $card = $(card);
                const depth = (index % 3) * 0.1 + 0.1;
                
                const moveX = (mouseX - 0.5) * 20 * depth;
                const moveY = (mouseY - 0.5) * 20 * depth;
                
                $card.css({
                    transform: `translateY(-12px) scale(1.04) rotateX(5deg) translateX(${moveX}px) translateY(${moveY}px)`
                });
            });
        });

        this.techSlide.on('mouseleave', () => {
            const techCards = this.techSlide.find('.tech-category-modern');
            techCards.css({
                transform: 'translateY(-12px) scale(1.04) rotateX(5deg)'
            });
        });
    }

    animateParticles() {
        const particles = this.techSlide.find('.tech-category-modern::after');
        
        // Анимация частиц при появлении слайда
        particles.each((index, particle) => {
            const $particle = $(particle);
            
            // Сбрасываем анимацию
            $particle.css('animation', 'none');
            
            // Запускаем с задержкой
            setTimeout(() => {
                $particle.css('animation', `tech-particle-float 12s ease-in-out ${index * 2}s infinite`);
            }, 500 + index * 300);
        });
    }

    // Метод для ручного запуска анимаций
    triggerAnimations() {
        if (this.techSlide && this.techSlide.hasClass('active')) {
            this.animateTechSlide();
        }
    }

    // Метод для остановки анимаций
    stopAnimations() {
        const techCards = this.techSlide.find('.tech-category-modern');
        techCards.css({
            opacity: '',
            transform: '',
            transition: ''
        });
        
        this.animationInProgress = false;
    }
}

// Инициализация анимаций при загрузке
$(document).ready(() => {
    window.techAnimations = new TechAnimations();
});

// API для внешнего использования
window.TechAnimationsAPI = {
    trigger: function() {
        if (window.techAnimations) {
            window.techAnimations.triggerAnimations();
        }
    },
    stop: function() {
        if (window.techAnimations) {
            window.techAnimations.stopAnimations();
        }
    }
};

// Автоматическое пролистывание для демонстрации
setInterval(() => {
    const currentSlide = window.presentation ? window.presentation.getCurrent() : 0;
    if (currentSlide === 8) { // 9 слайд (0-based индекс)
        window.TechAnimationsAPI.trigger();
    }
}, 8000);