// Анимации для современного слайда метрик AI-эры

class MetricsAnimations {
    constructor() {
        this.currentSlide = null;
        this.isAnimating = false;
        this.init();
    }

    init() {
        // Слушатель события смены слайда
        $(document).on('slideChanged', (e, data) => {
            this.handleSlideChange(data);
        });

        // Инициализация интерактивных элементов
        this.initInteractiveElements();
    }

    handleSlideChange(data) {
        const newSlide = $(`.slide:nth-child(${data.newSlide + 1})`);
        
        if (newSlide.hasClass('metrics-modern-slide')) {
            this.currentSlide = newSlide;
            this.animateMetricsSlide();
        }
    }

    animateMetricsSlide() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        
        // Анимация прогресс-баров
        this.animateProgressBars();
        
        // Анимация статистических значков
        this.animateStatBadges();
        
        // Анимация радара
        this.animateRadar();
        
        // Запуск циклических анимаций
        this.startCyclicAnimations();
        
        this.isAnimating = false;
    }

    animateProgressBars() {
        const progressBars = this.currentSlide.find('.metric-progress-bar');
        
        progressBars.each((index, bar) => {
            const $bar = $(bar);
            const targetWidth = $bar.css('width');
            
            // Сброс ширины для анимации
            $bar.css('width', '0%');
            
            setTimeout(() => {
                $bar.animate(
                    { width: targetWidth },
                    {
                        duration: 2000,
                        easing: 'easeOutQuart',
                        complete: () => {
                            // Добавляем пульсацию после завершения
                            $bar.addClass('animated');
                        }
                    }
                );
            }, 800 + (index * 300));
        });
    }

    animateStatBadges() {
        const badges = this.currentSlide.find('.metric-stat-badge');
        
        badges.each((index, badge) => {
            setTimeout(() => {
                $(badge)
                    .css({
                        opacity: 0,
                        transform: 'translateY(20px) scale(0.8)'
                    })
                    .animate(
                        {
                            opacity: 1,
                            transform: 'translateY(0) scale(1)'
                        },
                        {
                            duration: 600,
                            easing: 'easeOutBack'
                        }
                    );
            }, 1200 + (index * 200));
        });
    }

    animateRadar() {
        const radar = this.currentSlide.find('.ai-radar');
        const radarValue = this.currentSlide.find('.radar-value');
        
        if (radar.length) {
            radar
                .css({
                    opacity: 0,
                    transform: 'scale(0.5) translateY(30px)'
                })
                .delay(1800)
                .animate(
                    {
                        opacity: 1,
                        transform: 'scale(1) translateY(0)'
                    },
                    {
                        duration: 800,
                        easing: 'easeOutElastic',
                        complete: () => {
                            this.animateRadarValue(radarValue);
                        }
                    }
                );
        }
    }

    animateRadarValue(radarValue) {
        if (radarValue.length) {
            const finalValue = radarValue.text();
            radarValue.text('0%');
            
            let current = 0;
            const target = parseInt(finalValue);
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            const interval = duration / steps;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                radarValue.text(Math.round(current) + '%');
            }, interval);
        }
    }

    startCyclicAnimations() {
        // Пульсация иконок
        this.pulseIcons();
        
        // Анимация свечения
        this.glowAnimation();
        
        // Взаимодействие с карточками
        this.setupCardInteractions();
    }

    pulseIcons() {
        const icons = this.currentSlide.find('.metric-icon');
        
        setInterval(() => {
            icons.each((index, icon) => {
                setTimeout(() => {
                    $(icon)
                        .animate({ scale: '1.1' }, 300)
                        .animate({ scale: '1' }, 700);
                }, index * 500);
            });
        }, 4000);
    }

    glowAnimation() {
        const glows = this.currentSlide.find('.metric-glow');
        
        setInterval(() => {
            glows.each((index, glow) => {
                setTimeout(() => {
                    $(glow)
                        .animate({ opacity: 0.9, scale: '1.2' }, 1000)
                        .animate({ opacity: 0.6, scale: '1' }, 2000);
                }, index * 800);
            });
        }, 3000);
    }

    setupCardInteractions() {
        const cards = this.currentSlide.find('.metric-card-modern');
        
        cards.hover(
            // mouseenter
            function() {
                $(this)
                    .stop(true, true)
                    .animate(
                        { 
                            transform: 'translateY(-20px) scale(1.03) rotateX(8deg)',
                            boxShadow: '0 45px 80px rgba(102, 126, 234, 0.35)'
                        },
                        400,
                        'easeOutQuint'
                    );
                
                // Подсветка соответствующего прогресс-бара
                $(this).find('.metric-progress-bar')
                    .animate(
                        { opacity: 0.9 },
                        300
                    );
            },
            // mouseleave
            function() {
                $(this)
                    .stop(true, true)
                    .animate(
                        { 
                            transform: 'translateY(0) scale(1) rotateX(0)',
                            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)'
                        },
                        600,
                        'easeOutBack'
                    );
                
                $(this).find('.metric-progress-bar')
                    .animate(
                        { opacity: 1 },
                        300
                    );
            }
        );

        // Клик по карточке для фокусировки
        cards.on('click', function() {
            cards.removeClass('focused');
            $(this).addClass('focused');
            
            // Анимация фокусировки
            $(this)
                .stop(true, true)
                .animate(
                    { scale: '1.05' },
                    300
                );
        });
    }

    initInteractiveElements() {
        // Добавляем easing функции
        $.easing.easeOutQuart = function(x, t, b, c, d) {
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        };
        
        $.easing.easeOutBack = function(x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        };
        
        $.easing.easeOutElastic = function(x, t, b, c, d) {
            let s = 1.70158;
            let p = 0;
            let a = c;
            if (t === 0) return b;
            if ((t /= d) === 1) return b + c;
            if (!p) p = d * 0.3;
            if (a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        };
        
        $.easing.easeOutQuint = function(x, t, b, c, d) {
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        };
    }

    // Метод для ручного запуска анимаций
    triggerAnimations() {
        if (this.currentSlide && this.currentSlide.hasClass('active')) {
            this.animateMetricsSlide();
        }
    }

    // Очистка анимаций при переходе на другой слайд
    cleanup() {
        if (this.currentSlide) {
            this.currentSlide.find('.metric-progress-bar').stop(true);
            this.currentSlide.find('.metric-stat-badge').stop(true);
            this.currentSlide.find('.ai-radar').stop(true);
        }
    }
}

// Инициализация при загрузке документа
$(document).ready(function() {
    window.metricsAnimations = new MetricsAnimations();
});

// API для внешнего использования
window.MetricsAnimationsAPI = {
    init: function() {
        return new MetricsAnimations();
    },
    
    trigger: function() {
        if (window.metricsAnimations) {
            window.metricsAnimations.triggerAnimations();
        }
    },
    
    cleanup: function() {
        if (window.metricsAnimations) {
            window.metricsAnimations.cleanup();
        }
    }
};