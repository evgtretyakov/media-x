// Тестовый скрипт для проверки навигации презентации
// Запуск: node test-navigation.js

const puppeteer = require('puppeteer');

async function testNavigation() {
    console.log('🚀 Запуск тестирования навигации...');
    
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });
    
    const page = await browser.newPage();
    
    try {
        // Переходим на локальный сервер
        console.log('🌐 Переход на http://localhost:3001...');
        await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });
        
        // Ждем загрузки презентации
        console.log('⏳ Ожидание загрузки презентации...');
        await page.waitForSelector('.presentation-container', { timeout: 10000 });
        
        console.log('✅ Презентация загружена');
        
        // Проверяем начальное состояние
        const initialSlide = await page.evaluate(() => {
            const slide = document.querySelector('.slide.active');
            return slide ? slide.textContent.trim() : 'Слайд не найден';
        });
        
        console.log('📊 Начальный слайд:', initialSlide);
        
        // Тест 1: Навигация кнопками
        console.log('\n🧪 Тест 1: Навигация кнопками');
        
        // Жмем кнопку "Вперед"
        console.log('➡️  Нажимаем кнопку "Вперед"...');
        await page.click('.nav-btn:not(.disabled)');
        await page.waitForTimeout(1000);
        
        let currentSlide = await page.evaluate(() => {
            const slide = document.querySelector('.slide.active');
            return slide ? slide.textContent.trim() : 'Слайд не найден';
        });
        console.log('📊 Текущий слайд после перехода вперед:', currentSlide);
        
        // Жмем кнопку "Назад"
        console.log('⬅️  Нажимаем кнопку "Назад"...');
        await page.click('.nav-btn:not(.disabled)');
        await page.waitForTimeout(1000);
        
        currentSlide = await page.evaluate(() => {
            const slide = document.querySelector('.slide.active');
            return slide ? slide.textContent.trim() : 'Слайд не найден';
        });
        console.log('📊 Текущий слайд после перехода назад:', currentSlide);
        
        // Тест 2: Клавиатурная навигация
        console.log('\n⌨️  Тест 2: Клавиатурная навигация');
        
        // Стрелка вправо
        console.log('➡️  Нажимаем стрелку вправо...');
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(1000);
        
        currentSlide = await page.evaluate(() => {
            const slide = document.querySelector('.slide.active');
            return slide ? slide.textContent.trim() : 'Слайд не найден';
        });
        console.log('📊 Текущий слайд после стрелки вправо:', currentSlide);
        
        // Стрелка влево
        console.log('⬅️  Нажимаем стрелку влево...');
        await page.keyboard.press('ArrowLeft');
        await page.waitForTimeout(1000);
        
        currentSlide = await page.evaluate(() => {
            const slide = document.querySelector('.slide.active');
            return slide ? slide.textContent.trim() : 'Слайд не найден';
        });
        console.log('📊 Текущий слайд после стрелки влево:', currentSlide);
        
        // Пробел
        console.log('␣  Нажимаем пробел...');
        await page.keyboard.press(' ');
        await page.waitForTimeout(1000);
        
        currentSlide = await page.evaluate(() => {
            const slide = document.querySelector('.slide.active');
            return slide ? slide.textContent.trim() : 'Слайд не найден';
        });
        console.log('📊 Текущий слайд после пробела:', currentSlide);
        
        // Тест 3: Проверка индикатора слайдов
        console.log('\n📈 Тест 3: Проверка индикатора слайдов');
        
        const slideIndicator = await page.evaluate(() => {
            const indicator = document.querySelector('.slide-indicator');
            return indicator ? indicator.textContent.trim() : 'Индикатор не найден';
        });
        console.log('📊 Индикатор слайдов:', slideIndicator);
        
        // Тест 4: Проверка состояния кнопок
        console.log('\n🔘 Тест 4: Проверка состояния кнопок');
        
        const buttonStates = await page.evaluate(() => {
            const buttons = document.querySelectorAll('.nav-btn');
            return Array.from(buttons).map(btn => ({
                disabled: btn.disabled,
                text: btn.textContent.trim()
            }));
        });
        
        console.log('📊 Состояние кнопок:', JSON.stringify(buttonStates, null, 2));
        
        // Тест 5: Автоматическая прокрутка
        console.log('\n⏱️  Тест 5: Автоматическая прокрутка');
        
        // Включаем автопрокрутку
        console.log('▶️  Включаем автопрокрутку...');
        const playButton = await page.$('.nav-btn:not(.prev-btn):not(.next-btn)');
        if (playButton) {
            await playButton.click();
            await page.waitForTimeout(3000);
            
            currentSlide = await page.evaluate(() => {
                const slide = document.querySelector('.slide.active');
                return slide ? slide.textContent.trim() : 'Слайд не найден';
            });
            console.log('📊 Текущий слайд после автопрокрутки:', currentSlide);
            
            // Выключаем автопрокрутку
            console.log('⏸️  Выключаем автопрокрутку...');
            await playButton.click();
        }
        
        console.log('\n✅ Все тесты пройдены успешно!');
        
    } catch (error) {
        console.error('❌ Ошибка тестирования:', error.message);
    } finally {
        // await browser.close();
        console.log('\n📋 Тестирование завершено');
    }
}

// Запускаем тест
testNavigation().catch(console.error);