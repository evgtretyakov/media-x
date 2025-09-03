
# Слайд 12: Passage Indexing - Искусство точного поиска

<div class="slide passage-indexing-slide">
    <div class="modern-header">
        <h2 class="modern-title">PASSAGE INDEXING</h2>
        <div class="modern-subtitle">Находим иголку в стоге сена с хирургической точностью</div>
    </div>

    <div class="passage-comparison">
        <div class="comparison-card old-approach">
            <div class="approach-icon">🔍</div>
            <h3>Традиционный поиск</h3>
            <div class="approach-visual">
                <img src="images/llm_structured_data.png" alt="Поиск по всему документу" class="comparison-image">
                <div class="visual-label">Поиск по всему документу</div>
            </div>
            <ul class="approach-features">
                <li>📄 Анализ полных документов</li>
                <li>⏳ Долгое время обработки</li>
                <li>❌ Неточные результаты</li>
                <li>📉 Низкая релевантность</li>
            </ul>
            <div class="result-badge negative">
                <span class="result-emoji">😕</span>
                <span class="result-text">Ответ не найден</span>
            </div>
        </div>

        <div class="comparison-divider">
            <div class="divider-line"></div>
            <div class="divider-arrow">➡️</div>
            <div class="divider-text">VS</div>
        </div>

        <div class="comparison-card new-approach">
            <div class="approach-icon">🎯</div>
            <h3>Passage Indexing</h3>
            <div class="approach-visual">
                <img src="images/ui_dashboard_mockup.png" alt="Поиск по фрагментам" class="comparison-image">
                <div class="visual-label">Точечный поиск по фрагментам</div>
            </div>
            <ul class="approach-features">
                <li>🧩 Анализ отдельных пассажей</li>
                <li>⚡ Мгновенное время ответа</li>
                <li>✅ Точные результаты</li>
                <li>📈 Высокая релевантность</li>
            </ul>
            <div class="result-badge positive">
                <span class="result-emoji">🎯</span>
                <span class="result-text">Точный ответ!</span>
            </div>
        </div>
    </div>

    <div class="passage-benefits">
        <div class="benefit-card">
            <div class="benefit-icon">🚀</div>
            <h4>Скорость</h4>
            <p>В 10 раз быстрее традиционных методов поиска</p>
            <div class="benefit-metric">10x</div>
        </div>

        <div class="benefit-card">
            <div class="benefit-icon">📊</div>
            <h4>Точность</h4>
            <p>95% релевантных ответов с первого запроса</p>
            <div class="benefit-metric">95%</div>
        </div>

        <div class="benefit-card">
            <div class="benefit-icon">🤖</div>
            <h4>AI-совместимость</h4>
            <p>Идеально для интеграции с языковыми моделями</p>
            <div class="benefit-metric">AI Ready</div>
        </div>
    </div>

    <div class="passage-footer">
        <div class="key-takeaway">
            <span class="takeaway-icon">💡</span>
            <span class="takeaway-text">Ищем не просто документы, а <strong>точные фрагменты</strong> с ответами</span>
        </div>
    </div>
</div>

<style>
.passage-indexing-slide {
    padding: 40px !important;
    background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.98) 0%,
        rgba(245, 247, 250, 0.95) 50%,
        rgba(255, 255, 255, 0.98) 100%);
}

.modern-header {
    text-align: center;
    margin-bottom: 50px;
}

.modern-title {
    font-size: 3rem !important;
    font-weight: 800 !important;
    background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 15px !important;
    letter-spacing: -0.5px;
    text-transform: uppercase;
}

.modern-subtitle {
    font-size: 1.4rem;
    color: var(--text-secondary);
    font-weight: 300;
    letter-spacing: 0.5px;
    opacity: 0.9;
}

.passage-comparison {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 40px;
    align-items: start;
    max-width: 1200px;
    margin: 0 auto 60px;
}

.comparison-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
    border-radius: 25px;
    padding: 35px 30px;
    text-align: center;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
}

.comparison-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 60px rgba(102, 126, 234, 0.2);
}

.old-approach {
    border-top: 4px solid #ff6b6b;
}

.new-approach {
    border-top: 4px solid #4ecdc4;
}

.approach-icon {
    font-size: 3.5rem;
    margin-bottom: 20px;
    animation: float-icon 3s ease-in-out infinite;
}

@keyframes float-icon {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-8px) rotate(3deg); }
}

.comparison-card h3 {
    font-size: 1.6rem;
    color: var(--text-primary);
    margin-bottom: 25px;
    font-weight: 700;
}

.approach-visual {
    margin-bottom: 25px;
    position: relative;
}

.comparison-image {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 15px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.visual-label {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-top: 10px;
    font-weight: 500;
}

.approach-features {
    list-style: none;
    padding: 0;
    margin: 0 0 25px 0;
}

.approach-features li {
    font-size: 1rem;
    color: var(--text-primary);
    margin-bottom: 8px;
    padding: 8px 12px;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    border-radius: 12px;
    border-left: 3px solid #667eea;
}

.old-approach .approach-features li {
    border-left-color: #ff6b6b;
}

.new-approach .approach-features li {
    border-left-color: #4ecdc4;
}

.result-badge {
    padding: 15px 20px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 1.1rem;
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

.negative {
    background: linear-gradient(135deg, rgba(255, 107, 107, 0.15), rgba(255, 107, 107, 0.1));
    color: #ff6b6b;
    border: 2px solid rgba(255, 107, 107, 0.3);
}

.positive {
    background: linear-gradient(135deg, rgba(78, 205, 196, 0.15), rgba(78, 205, 196, 0.1));
    color: #4ecdc4;
    border: 2px solid rgba(78, 205, 196, 0.3);
}

.comparison-divider {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    height: 100%;
}

.divider-line {
    width: 2px;
    height: 100px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 1px;
}

.divider-arrow {
    font-size: 2rem;
    animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(5px); }
}

.divider-text {
    font-size: 1.2rem;
    font-weight: 800;
    color: #667eea;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.passage-benefits {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
    max-width: 1000px;
    margin: 0 auto 40px;
}

.benefit-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
    padding: 30px 25px;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
}

.benefit-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px rgba(102, 126, 234, 0.25);
}

.benefit-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    animation: float-icon 3s ease-in-out infinite;
}

.benefit-card h4 {
    font-size: 1.3rem;
    color: var(--text-primary);
    margin-bottom: 12px;
    font-weight: 700;
}

.benefit-card p {
    font-size: 1rem;
    color: var(--text-secondary);
    margin-bottom: 20px;
    line-height: 1.5;
}

.benefit-metric {
    font-size: 1.8rem;
    font-weight: 800;
    color: #667eea;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    padding: 15px;
    border-radius: 15px;
    border: 2px solid rgba(102, 126, 234, 0.2);
}

.passage-footer {
    text-align: center;
}

.key-takeaway {
    display: inline-flex;
    align-items: center;
    gap: 15px;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.1));
    padding: 20px 30px;
    border-radius: 25px;
    box-shadow: 0 15px 35px rgba(102, 126, 234, 0.2);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(102, 126, 234, 0.2);
}

.takeaway-icon {
    font-size: 2rem;
}

.takeaway-text {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-primary);
}

.takeaway-text strong {
    color: #667eea;
}

/* Анимации появления */
.passage-indexing-slide.active .modern-title {
    animation: slide-in-from-top 0.8s ease-out 0.4s both;
}

.passage-indexing-slide.active .modern-subtitle {
    animation: slide-in-from-bottom 0.8s ease-out 0.6s both;
}

.passage-indexing-slide.active .old-approach {
    animation: slide-in-from-left 0.8s ease-out 0.8s both;
}

.passage-indexing-slide.active .comparison-divider {
    animation: fade-in 0.8s ease-out 1.0s both;
}

.passage-indexing-slide.active .new-approach {
    animation: slide-in-from-right 0.8s ease-out 1.2s both;
}

.passage-indexing-slide.active .benefit-card:nth-child(1) {
    animation: slide-in-from-bottom 0.8s ease-out 1.4s both;
}

.passage-indexing-slide.active .benefit-card:nth-child(2) {
    animation: slide-in-from-bottom 0.8s ease-out 1.6s both;
}

.passage-indexing-slide.active .benefit-card:nth-child(3) {
    animation: slide-in-from-bottom 0.8s ease-out 1.8s both;
}

.passage-indexing-slide.active .key-takeaway {
    animation: slide-in-up 0.8s ease-out 2.0s both;
}

@keyframes slide-in-from-top {
    from {
        opacity: 0;
        transform: translateY(-50px) rotateX(-45deg);
    }
    to {
        opacity: 1;
        transform: translateY(0) rotateX(0);
    }
}

@keyframes slide-in-from-bottom {
    from {
        opacity: 0;
        transform: translateY(50px) rotateX(45deg);
    }
    to {
        opacity: 1;
        transform: translateY(0) rotateX(0);
    }
}

@keyframes slide-in-from-left {
    from {
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slide-in-from-right {
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slide-in-up {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* Адаптивность */
@media (max-width: 1024px) {
    .passage-comparison {
        grid-template-columns: 1fr;
        gap: 30px;
    }
    
    .comparison-divider {
        flex-direction: row;
        height: auto;
        gap: 20px;
    }
    
    .divider-line {
        width: 100px;
        height: 2px;
    }
    
    .passage-benefits {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
}

@media (max-width: 768px) {
    .passage-indexing-slide {
        padding: 30px 20px !important;
    }
    
    .modern-title {
        font-size: 2.2rem !important;
    }
    
    .modern-subtitle {
        font-size: 1.1rem;
    }
    
    .comparison-card {
        padding: 25px 20px;
    }
    
    .approach-icon {
        font-size: 2.5rem;
    }
    
    .comparison-card h3 {
        font-size: 1.3rem;
    }
    
    .passage-benefits {
        grid-template-columns: 1fr;
    }
    
    .key-takeaway {
        flex-direction: column;
        text-align: center;
        padding: 15px 20px;
    }
}

@media (max-width: 480px) {
    .modern-title {
        font-size: 1.8rem !important;
    }
    
    .comparison-card {
        padding: 20px 15px;
    }
    
    .approach-icon {
        font-size: 2rem;
    }
    
    .comparison-image {
        height: 100px;
