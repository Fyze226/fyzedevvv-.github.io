(function() {
    // ------------------- ТЕМНАЯ / СВЕТЛАЯ ТЕМА -------------------
    const toggleBtn = document.getElementById('themeToggle');
    const body = document.body;
    const toggleIcon = toggleBtn.querySelector('i');
    const toggleText = toggleBtn.querySelector('span');
    
    // Загружаем сохранённую тему
    const savedTheme = localStorage.getItem('fyzedev-theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        toggleIcon.className = 'fas fa-moon';
        toggleText.innerText = 'Тёмная тема';
    } else {
        body.classList.remove('light-mode');
        toggleIcon.className = 'fas fa-sun';
        toggleText.innerText = 'Светлая тема';
    }
    
    // Переключение темы
    toggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            toggleIcon.className = 'fas fa-sun';
            toggleText.innerText = 'Светлая тема';
            localStorage.setItem('fyzedev-theme', 'dark');
        } else {
            body.classList.add('light-mode');
            toggleIcon.className = 'fas fa-moon';
            toggleText.innerText = 'Тёмная тема';
            localStorage.setItem('fyzedev-theme', 'light');
        }
    });
    
    // ------------------- КНОПКА "СВЯЗАТЬСЯ" -------------------
    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('📱 Нажми на Telegram, там можно связаться через канал');
        });
    }
    
    // ------------------- ИНТЕРАКТИВНЫЕ ЧАСТИЦЫ -------------------
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];
    let mouseX = -1000, mouseY = -1000;
    const MOUSE_RADIUS = 115;
    
    // Отслеживаем движение мыши
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Создание частиц
    function initParticles(count) {
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 3 + 1.5,
                baseAlpha: Math.random() * 0.6 + 0.2,
                speedX: (Math.random() - 0.5) * 0.25,
                speedY: (Math.random() - 0.5) * 0.2,
            });
        }
    }
    
    // Анимация частиц
    function drawParticles() {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);
        
        for (let p of particles) {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.hypot(dx, dy);
            
            // Отталкивание от курсора
            if (dist < MOUSE_RADIUS) {
                const angle = Math.atan2(dy, dx);
                const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                const pushX = Math.cos(angle) * force * 2.3;
                const pushY = Math.sin(angle) * force * 2.3;
                p.x += pushX;
                p.y += pushY;
                // Эффект "пупырки"
                p.x += (Math.random() - 0.5) * 1.1;
                p.y += (Math.random() - 0.5) * 1.1;
            }
            
            // Обычное движение
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Границы с отскоком
            if (p.x < 0) { p.x = 0; p.speedX *= -0.95; }
            if (p.x > width) { p.x = width; p.speedX *= -0.95; }
            if (p.y < 0) { p.y = 0; p.speedY *= -0.95; }
            if (p.y > height) { p.y = height; p.speedY *= -0.95; }
            
            // Яркость при приближении курсора
            let alphaVal = p.baseAlpha;
            if (dist < MOUSE_RADIUS + 30) {
                alphaVal = Math.min(0.95, p.baseAlpha + 0.5 * (1 - dist / (MOUSE_RADIUS + 20)));
            }
            
            // Рисуем частицу
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(100, 150, 255, ${alphaVal})`;
            ctx.fill();
            ctx.shadowBlur = 5;
            ctx.shadowColor = "#3b82f6";
            ctx.fill();
            ctx.shadowBlur = 0;
        }
        requestAnimationFrame(drawParticles);
    }
    
    // Адаптация под размер экрана
    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initParticles(220);
    }
    
    window.addEventListener('resize', () => { resizeCanvas(); });
    resizeCanvas();
    drawParticles();
    
    // ------------------- ДВИЖЕНИЕ ОРБОВ ЗА МЫШКОЙ -------------------
    document.addEventListener('mousemove', (e) => {
        const orb1 = document.querySelector('.orb1');
        const orb2 = document.querySelector('.orb2');
        if (orb1 && orb2) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            orb1.style.transform = `translate(${x * 15}px, ${y * 10}px) scale(1.05)`;
            orb2.style.transform = `translate(${-x * 12}px, ${-y * 8}px) scale(1.02)`;
        }
    });
    
    console.log('%c✨ FyzeDev | Сайт загружен! Частицы реагируют на курсор', 'color: #3b82f6; font-size: 14px');
})();