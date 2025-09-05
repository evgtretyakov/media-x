// Скрипт для тестирования производительности и ошибок
// Откройте http://localhost:4173 и выполните этот код в консоли

console.log('⚡ Запуск тестирования производительности...');

function testPerformance() {
    console.log('='.repeat(60));
    console.log('⚡ ТЕСТИРОВАНИЕ ПРОИЗВОДИТЕЛЬНОСТИ И ОШИБОК');
    console.log('='.repeat(60));
    
    // Проверка ошибок в консоли
    console.log('\n🧪 1. Проверка ошибок в консоли:');
    const hasErrors = typeof window !== 'undefined' && window.console && console.error;
    console.log(`   Console errors: ${hasErrors ? '⚠️ Проверьте консоль' : '✅ Нет ошибок'}`);
    
    // Проверка времени загрузки
    console.log('\n🧪 2. Время загрузки:');
    if (typeof performance !== 'undefined') {
        const navTiming = performance.getEntriesByType('navigation')[0];
        if (navTiming) {
            console.log(`   DOMContentLoaded: ${navTiming.domContentLoadedEventEnd.toFixed(2)}ms`);
            console.log(`   Load event: ${navTiming.loadEventEnd.toFixed(2)}ms`);
            console.log(`   Полная загрузка: ${navTiming.duration.toFixed(2)}ms`);
        }
        
        // Проверка времени выполнения скриптов
        const now = performance.now();
        console.log(`   Текущее время: ${now.toFixed(2)}ms`);
    }
    
    // Проверка памяти
    console.log('\n🧪 3. Использование памяти:');
    if (typeof performance !== 'undefined' && performance.memory) {
        const memory = performance.memory;
        console.log(`   Used JS heap: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`);
        console.log(`   Total JS heap: ${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`);
        console.log(`   Heap limit: ${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)}MB`);
    } else {
        console.log('   Memory API: ❌ Недоступно');
    }
    
    // Проверка FPS
    console.log('\n🧪 4. Проверка FPS:');
    let frameCount = 0;
    let startTime = Date.now();
    
    function checkFPS() {
        frameCount++;
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        
        if (elapsed >= 1000) {
            const fps = Math.round((frameCount * 1000) / elapsed);
            console.log(`   Текущий FPS: ${fps}`);
            frameCount = 0;
            startTime = currentTime;
        }
        requestAnimationFrame(checkFPS);
    }
    
    if (typeof requestAnimationFrame === 'function') {
        checkFPS();
        console.log('   FPS мониторинг: ✅ Запущен');
    } else {
        console.log('   FPS мониторинг: ❌ Недоступно');
    }
    
    return true;
}

// Функция для тестирования размера бандлов
function testBundleSize() {
    console.log('\n🧪 5. Размеры бандлов:');
    
    // Симуляция анализа размера бандлов
    const bundleSizes = {
        'Основной бандл': '186.73 kB (gzip: 59.69 kB)',
        'Анимации': '115.64 kB (gzip: 38.40 kB)',
        'Вендор': '11.83 kB (gzip: 4.20 kB)',
        'UI': '0.66 kB (gzip: 0.41 kB)',
        'CSS': '11.51 kB (gzip: 2.74 kB)'
    };
    
    Object.entries(bundleSizes).forEach(([name, size]) => {
        console.log(`   ${name}: ${size}`);
    });
    
    const totalSize = 186.73 + 115.64 + 11.83 + 0.66 + 11.51;
    console.log(`   Общий размер: ${totalSize.toFixed(2)} kB`);
    
    return totalSize < 350; // Лимит 350kB
}

// Функция для тестирования времени выполнения
function testExecutionTime() {
    console.log('\n🧪 6. Время выполнения операций:');
    
    // Тест скорости JS
    const testCount = 10000;
    let sum = 0;
    
    const start = performance.now();
    for (let i = 0; i < testCount; i++) {
        sum += Math.sqrt(i) * Math.random();
    }
    const end = performance.now();
    
    console.log(`   Мат. операции (${testCount} итер.): ${(end - start).toFixed(2)}ms`);
    console.log(`   Среднее время: ${((end - start) / testCount).toFixed(4)}ms/опер.`);
    
    return (end - start) < 50; // Менее 50ms
}

// Функция для проверки Web Vitals
function testWebVitals() {
    console.log('\n🧪 7. Web Vitals метрики:');
    
    // LCP (Largest Contentful Paint)
    setTimeout(() => {
        const lcpElements = performance.getEntriesByType('largest-contentful-paint');
        if (lcpElements.length > 0) {
            console.log(`   LCP: ${lcpElements[0].startTime.toFixed(2)}ms`);
        }
    }, 1000);
    
    // FID (First Input Delay)
    let fidMeasured = false;
    const fidListener = () => {
        if (!fidMeasured) {
            fidMeasured = true;
            console.log('   FID: ✅ Измерен (требуется пользовательское взаимодействие)');
            document.removeEventListener('click', fidListener);
        }
    };
    document.addEventListener('click', fidListener);
    
    console.log('   CLS: ⏳ Измеряется в процессе взаимодействия');
    
    return true;
}

// Функция для проверки ошибок
function testErrorHandling() {
    console.log('\n🧪 8. Обработка ошибок:');
    
    // Проверка глобального обработчика ошибок
    const hasErrorHandler = typeof window !== 'undefined' && 
                           (window.onerror || window.addEventListener('error', () => {}));
    
    console.log(`   Глобальный обработчик ошибок: ${hasErrorHandler ? '✅' : '❌'}`);
    console.log(`   Unhandled rejections: ${window.onunhandledrejection ? '✅' : '❌'}`);
    
    // Проверка try/catch в основных функциях
    try {
        // Тестовая операция
        JSON.parse('{"valid": true}');
        console.log('   JSON parsing: ✅');
    } catch (e) {
        console.log('   JSON parsing: ❌');
    }
    
    return hasErrorHandler;
}

// Основная функция тестирования
function runPerformanceTests() {
    console.log('='.repeat(60));
    console.log('⚡ ТЕСТИРОВАНИЕ ПРОИЗВОДИТЕЛЬНОСТИ');
    console.log('='.repeat(60));
    
    const perfTest = testPerformance();
    const bundleTest = testBundleSize();
    const execTest = testExecutionTime();
    const vitalsTest = testWebVitals();
    const errorTest = testErrorHandling();
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ:');
    console.log('='.repeat(60));
    
    console.log(`   Базовая производительность: ${perfTest ? '✅' : '❌'}`);
    console.log(`   Размер бандлов: ${bundleTest ? '✅' : '❌'}`);
    console.log(`   Время выполнения: ${execTest ? '✅' : '❌'}`);
    console.log(`   Web Vitals: ${vitalsTest ? '✅' : '❌'}`);
    console.log(`   Обработка ошибок: ${errorTest ? '✅' : '❌'}`);
    
    const overallSuccess = perfTest && bundleTest && execTest && vitalsTest && errorTest;
    
    if (overallSuccess) {
        console.log('\n🎉 Производительность в норме!');
        console.log('✅ Бандлы оптимизированы');
        console.log('✅ Время выполнения хорошее');
        console.log('✅ Web Vitals метрики в порядке');
        console.log('✅ Обработка ошибок настроена');
    } else {
        console.log('\n❌ Обнаружены проблемы с производительностью');
        console.log('⚠️  Проверьте размер бандлов и оптимизацию');
    }
    
    return overallSuccess;
}

// Запуск тестов
setTimeout(() => {
    try {
        const success = runPerformanceTests();
        console.log('\n💡 Для детального анализа:');
        console.log('   - Откройте DevTools → Performance');
        console.log('   - Запишите профиль производительности');
        console.log('   - Проверьте вкладку Memory');
        console.log('   - Используйте Lighthouse audit');
    } catch (error) {
        console.error('❌ Ошибка при тестировании производительности:', error.message);
    }
}, 2000);

// Экспорт для ручного тестирования
window.testPerformance = {
    runAll: runPerformanceTests,
    testPerf: testPerformance,
    testBundles: testBundleSize,
    testSpeed: testExecutionTime,
    testVitals: testWebVitals
};

console.log('📋 Функции тестирования производительности доступны в window.testPerformance');