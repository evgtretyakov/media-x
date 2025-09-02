// Анимации для второго слайда - Вызов
class ChallengeAnimations {
    constructor() {
        this.slideElement = null;
        this.isActive = false;
        this.init();
    }

    init() {
        // Слушаем события смены слайдов
        $(document).on('slideChanged', (e, data) => {
            this.handleSlideChange(data.newSlide);
        });
    }

    handleSlideChange(slideIndex) {
        // Второй слайд имеет индекс 1 (0-based)
        if (slideIndex === 1) {
            this.slideElement = $('.challenge-slide');
            this.isActive = true;
            this.startAnimations();
        } else if (this.isActive) {
            this.stopAnimations();
            this.isActive = false;
        }
    }

    startAnimations() {
        if (!this.slideElement || !this.isActive) return;

        // Запускаем анимации с задержками
        setTimeout(() => this.animateChatMessages(), 1000);
        setTimeout(() => this.animateCards(), 2000);
        setTimeout(() => this.animateTrendGraph(), 3000);
        
        // Запускаем непрерывные анимации
        this.startContinuousAnimations();
    }

    stopAnimations() {
        // Останавливаем все анимации
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
    }

    animateChatMessages() {
        const messages = this.slideElement.find('.message');
        messages.each((index, message) => {
            setTimeout(() => {
                $(message).addClass('animated');
            }, index * 500);
        });
    }

    animateCards() {
        const cards = this.slideElement.find('.challenge-card');
        cards.each((index, card) => {
            setTimeout(() => {
                $(card).addClass('pulse');
                setTimeout(() => $(card).removeClass('pulse'), 1000);
            }, index * 300);
        });
    }

    animateTrendGraph() {
        const bars = this.slideElement.find('.graph-bar');
        bars.each((index, bar) => {
            setTimeout(() => {
                $(bar).addClass('active');
            }, index * 200);
        });
    }

    startContinuousAnimations() {
        // Пульсирующая анимация для карточек
        this.animationInterval = setInterval(() => {
            if (!this.isActive) return;
            
            const randomCard = this.slideElement.find('.challenge-card').eq(
                Math.floor(Math.random() * 3)
            );
            
            randomCard.addClass('highlight');
            setTimeout(() => randomCard.removeClass('highlight'), 1000);
        }, 3000);
    }

    // Анимация glitch эффекта для заголовка
    static initGlitchEffect() {
        const glitchElements = $('.glitch-text');
        glitchElements.each(function() {
            const element = $(this);
            setInterval(() => {
                if (element.is(':visible')) {
                    element.toggleClass('glitch-active');
                }
            }, 2000);
        });
    }
}

// Инициализация при загрузке
$(document).ready(() => {
    // Инициализируем анимации
    window.challengeAnimations = new ChallengeAnimations();
    
    // Инициализируем glitch эффект
    ChallengeAnimations.initGlitchEffect();

    // Добавляем интерактивность для карточек
    $('.challenge-card').on('click', function() {
        $(this).toggleClass('expanded');
    });

    // Анимация при наведении на чат
    $('.chat-interface').hover(
        function() {
            $(this).css('transform', 'translateY(-5px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );
});

// Дополнительные CSS классы для анимаций
const additionalStyles = `
.challenge-card.pulse {
    animation: card-pulse 1s ease-in-out;
}

@keyframes card-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.challenge-card.highlight {
    box-shadow: 0 0 30px rgba(102, 126, 234, 0.6);
    transform: translateY(-5px);
}

.challenge-card.expanded {
    transform: scale(1.05);
    z-index: 100;
}

.message.animated {
    animation: message-float 2s ease-in-out infinite;
}

@keyframes message-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
}

.glitch-active::before {
    animation: glitch-intense 0.3s;
}

@keyframes glitch-intense {
    0% { transform: translate(0); }
    20% { transform: translate(-8px, 8px); }
    40% { transform: translate(-8px, -8px); }
    60% { transform: translate(8px, 8px); }
    80% { transform: translate(8px, -8px); }
    100% { transform: translate(0); }
}

.graph-bar.active {
    animation: graph-active 2s ease-in-out infinite;
}

@keyframes graph-active {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
}
`;

// Добавляем стили в документ
$(document).ready(() => {
    $('<style>').html(additionalStyles).appendTo('head');
});