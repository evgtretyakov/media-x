// Анимации для слайда "Вижн"
class VisionAnimations {
    constructor() {
        this.visionSlide = document.querySelector('.vision-slide');
        this.visionCards = document.querySelectorAll('.vision-card');
        this.init();
    }

    init() {
        this.setupCardInteractions();
        this.setupScrollAnimations();
    }

    setupCardInteractions() {
        this.visionCards.forEach((card, index) => {
            // Анимация при наведении
            card.addEventListener('mouseenter', () => {
                this.animateCardHover(card, index);
            });

            card.addEventListener('mouseleave', () => {
                this.animateCardLeave(card);
            });

            // Анимация при клике
            card.addEventListener('click', () => {
                this.animateCardClick(card, index);
            });
        });
    }

    animateCardHover(card, index) {
        // Увеличиваем карточку и добавляем свечение
        card.style.transform = 'translateY(-15px) scale(1.05)';
        card.style.boxShadow = '0 35px 70px rgba(102, 126, 234, 0.3)';
        
        // Анимация иконки
        const icon = card.querySelector('.card-icon');
        if (icon) {
            icon.style.animation = 'float-icon-hover 0.5s ease-out forwards';
        }

        // Анимация свечения
        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.animation = 'pulse-glow-hover 1s ease-in-out infinite';
        }
    }

    animateCardLeave(card) {
        // Возвращаем карточку в исходное состояние
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        
        const icon = card.querySelector('.card-icon');
        if (icon) {
            icon.style.animation = 'float-icon 3s ease-in-out infinite';
        }

        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.animation = 'pulse-glow 2s ease-in-out infinite';
        }
    }

    animateCardClick(card, index) {
        // Анимация клика - пульсация
        card.style.animation = 'card-pulse 0.6s ease-out';
        
        setTimeout(() => {
            card.style.animation = '';
        }, 600);

        // Показать дополнительную информацию
        this.showCardDetails(index);
    }

    showCardDetails(index) {
        const details = [
            "Доверенный источник данных для обучения LLM с структурированным контентом",
            "Мгновенное создание контента в пиковые моменты трендов",
            "Автоматическая адаптация под различные аудитории и регионы"
        ];

        // Временное уведомление
        this.showNotification(details[index]);
    }

    showNotification(message) {
        // Создаем временное уведомление
        const notification = document.createElement('div');
        notification.className = 'vision-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">💡</span>
                <span class="notification-text">${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Анимация появления
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Автоматическое скрытие
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    setupScrollAnimations() {
        // Параллакс эффект для карточек при скролле
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollDelta = currentScrollY - lastScrollY;

            this.visionCards.forEach((card, index) => {
                const speed = 0.1 + (index * 0.05);
                const translateY = scrollDelta * speed * -1;
                
                if (Math.abs(scrollDelta) > 1) {
                    card.style.transform = `translateY(${translateY}px)`;
                }
            });

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
    }
}

// Стили для уведомлений
const visionNotificationStyles = `
.vision-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9));
    border: 1px solid rgba(102, 126, 234, 0.2);
    border-radius: 15px;
    padding: 15px 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    max-width: 300px;
}

.vision-notification.show {
    transform: translateX(0);
    opacity: 1;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 12px;
}

.notification-icon {
    font-size: 1.2rem;
}

.notification-text {
    font-size: 0.9rem;
    color: var(--text-primary);
    line-height: 1.4;
}

@media (prefers-color-scheme: dark) {
    .vision-notification {
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.85));
        border-color: rgba(102, 126, 234, 0.3);
    }
    
    .notification-text {
        color: #ffffff;
    }
}

/* Дополнительные анимации */
@keyframes card-pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

@keyframes float-icon-hover {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(5deg); }
    100% { transform: translateY(-8px) rotate(3deg); }
}

@keyframes pulse-glow-hover {
    0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
}
`;

// Добавляем стили в документ
const styleSheet = document.createElement('style');
styleSheet.textContent = visionNotificationStyles;
document.head.appendChild(styleSheet);

// Инициализация анимаций при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new VisionAnimations();
    }, 1000);
});

// Экспорт для использования в других модулях
window.VisionAnimations = VisionAnimations;