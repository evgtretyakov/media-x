// Скрипт для тестирования отображения слайдов и контента
// Откройте http://localhost:3000 и выполните этот код в консоли

console.log('🎨 Запуск тестирования отображения контента...');

function testSlidesContent() {
    console.log('\n🧪 1. Проверка количества слайдов');
    
    const slides = document.querySelectorAll('.slide');
    console.log(`📊 Найдено слайдов: ${slides.length}`);
    
    if (slides.length !== 3) {
        console.error('❌ Ожидалось 3 слайда, найдено:', slides.length);
        return false;
    }
    console.log('✅ Количество слайдов корректно');
    
    // Проверка каждого слайда
    console.log('\n🧪 2. Проверка содержания слайдов');
    
    // Слайд 1: Титульный
    console.log('\n📄 Слайд 1: Титульный');
    const slide1 = slides[0];
    testSlideContent(slide1, 1, ['Media X: AI-Powered Media Platform']);
    
    // Слайд 2: Вызовы
    console.log('\n📄 Слайд 2: Вызовы медиа-ландшафта');
    const slide2 = slides[1];
    testSlideContent(slide2, 2, ['Вызовы современного медиа-ландшафта']);
    
    // Слайд 3: Технологический стек
    console.log('\n📄 Слайд 3: Технологический стек');
    const slide3 = slides[2];
    testSlideContent(slide3, 3, ['Технологический стек решения']);
    
    // Проверка активного слайда
    console.log('\n🧪 3. Проверка активного слайда');
    const activeSlide = document.querySelector('.slide.active');
    if (!activeSlide) {
        console.error('❌ Активный слайд не найден');
        return false;
    }
    console.log('✅ Активный слайд найден');
    console.log('📊 Индекс активного слайда:', Array.from(slides).indexOf(activeSlide) + 1);
    
    // Проверка анимаций
    console.log('\n🧪 4. Проверка анимационных классов');
    testAnimations(activeSlide);
    
    // Проверка фонов
    console.log('\n🧪 5. Проверка фоновых стилей');
    testBackgroundStyles(slides);
    
    console.log('\n✅ Все проверки контента завершены успешно!');
    return true;
}

function testSlideContent(slide, slideNumber, expectedTexts) {
    const title = slide.querySelector('h1');
    const content = slide.innerHTML;
    
    console.log(`   Заголовок: ${title ? title.textContent : 'не найден'}`);
    
    // Проверка ожидаемых текстов
    let allTextsFound = true;
    expectedTexts.forEach(text => {
        if (!content.includes(text)) {
            console.error(`   ❌ Ожидаемый текст не найден: "${text}"`);
            allTextsFound = false;
        }
    });
    
    if (allTextsFound) {
        console.log('   ✅ Основной контент присутствует');
    }
    
    // Проверка специфичных элементов для каждого слайда
    switch(slideNumber) {
        case 1:
            testTitleSlide(slide);
            break;
        case 2:
            testChallengeSlide(slide);
            break;
        case 3:
            testTechSlide(slide);
            break;
    }
}

function testTitleSlide(slide) {
    const subtitle = slide.querySelector('.subtitle');
    const placeholder = slide.querySelector('.placeholder-image');
    
    console.log('   Подзаголовок:', subtitle ? subtitle.textContent : 'не найден');
    console.log('   Placeholder:', placeholder ? 'найден' : 'не найден');
}

function testChallengeSlide(slide) {
    const chatInterface = slide.querySelector('.chat-interface');
    const challengeCards = slide.querySelectorAll('.challenge-card');
    const stats = slide.querySelectorAll('.stat-value');
    
    console.log('   Чат-интерфейс:', chatInterface ? 'найден' : 'не найден');
    console.log('   Карточки вызовов:', challengeCards.length);
    console.log('   Статистические значения:', stats.length);
    
    if (challengeCards.length !== 3) {
        console.error('   ❌ Ожидалось 3 карточки вызовов');
    }
}

function testTechSlide(slide) {
    const listItems = slide.querySelectorAll('.list-item');
    
    console.log('   Элементы списка технологий:', listItems.length);
    
    if (listItems.length < 3) {
        console.error('   ❌ Мало элементов в списке технологий');
    }
    
    listItems.forEach((item, index) => {
        console.log(`     ${index + 1}. ${item.textContent}`);
    });
}

function testAnimations(slide) {
    const animatedElements = slide.querySelectorAll('[class*="animate"], [class*="motion"]');
    console.log('   Анимированные элементы:', animatedElements.length);
    
    // Проверка классов анимаций
    const hasAnimationClasses = Array.from(slide.classList).some(cls => 
        cls.includes('animate') || cls.includes('active')
    );
    console.log('   Классы анимаций:', hasAnimationClasses ? 'присутствуют' : 'отсутствуют');
}

function testBackgroundStyles(slides) {
    slides.forEach((slide, index) => {
        const background = window.getComputedStyle(slide).background;
        const hasGradient = background.includes('gradient');
        
        console.log(`   Слайд ${index + 1} фон: ${hasGradient ? 'градиент' : 'обычный'}`);
        
        if (!hasGradient && index !== 2) { // Слайд 2 может иметь другой фон
            console.warn(`   ⚠️  Слайд ${index + 1}: Возможно отсутствует градиентный фон`);
        }
    });
}

// Проверка responsive элементов
function testResponsiveElements() {
    console.log('\n🧪 6. Проверка responsive элементов');
    
    const wrapper = document.querySelector('.content-wrapper');
    const responsiveClasses = [
        'content-wrapper',
        'text-content', 
        'image-content',
        'challenge-content',
        'challenge-card'
    ];
    
    responsiveClasses.forEach(className => {
        const elements = document.querySelectorAll(`.${className}`);
        console.log(`   ${className}: ${elements.length} элементов`);
    });
}

// Основная функция тестирования
function runContentTests() {
    console.log('='.repeat(60));
    console.log('🎨 ТЕСТИРОВАНИЕ ОТОБРАЖЕНИЯ КОНТЕНТА');
    console.log('='.repeat(60));
    
    const success = testSlidesContent();
    testResponsiveElements();
    
    if (success) {
        console.log('\n🎉 Все слайды и контент отображаются корректно!');
    } else {
        console.log('\n❌ Обнаружены проблемы с отображением контента');
    }
}

// Запуск тестов
setTimeout(runContentTests, 1000);

// Экспорт для ручного тестирования
window.testContent = {
    runAll: runContentTests,
    testSlides: testSlidesContent,
    testResponsive: testResponsiveElements
};

console.log('📋 Функции тестирования контента доступны в window.testContent');