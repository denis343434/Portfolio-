const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

// Устанавливаем размер canvas - ширина как окно, высота как 200% от окна
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 2; // Важно: соответствуем CSS

// Массив для хранения частиц
const particles = [];

// Получаем элемент секции work
const workSection = document.getElementById('work');

// Создаем класс для частицы
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height; // Теперь по всей высоте canvas
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        this.alpha = 1;
        this.targetAlpha = 1;
    }

    update() {
        // Плавное изменение прозрачности
        this.alpha += (this.targetAlpha - this.alpha) * 0.05;

        this.x += this.speedX;
        this.y += this.speedY;

        // Если частица ушла за границу, возвращаем ее с другой стороны
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // ИСПРАВЛЕННЫЙ МЕТОД - учитываем растяжение canvas
    isInWorkSection() {
        const rect = workSection.getBoundingClientRect();

        // Преобразуем координаты частицы в координаты viewport
        // с учетом растяжения canvas
        const canvasRect = canvas.getBoundingClientRect();
        const scaleY = canvasRect.height / canvas.height; // Коэффициент масштабирования

        const particleViewportY = canvasRect.top + (this.y * scaleY);

        return particleViewportY >= rect.top && particleViewportY <= rect.bottom;
    }
}

// Создаем частицы
function init() {
    for (let i = 0; i < 420; i++) {
        particles.push(new Particle());
    }
}

// Соединяем частицы линиями, если они близко
function connectParticles() {
    const maxDistance = 80;
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                const alphaA = particles[a].alpha;
                const alphaB = particles[b].alpha;
                const avgAlpha = (alphaA + alphaB) / 2;

                const hueA = parseFloat(particles[a].color.split('(')[1].split(',')[0]);
                const hueB = parseFloat(particles[b].color.split('(')[1].split(',')[0]);
                const avgHue = (hueA + hueB) / 2;

                ctx.save();
                ctx.globalAlpha = avgAlpha * (1 - distance / maxDistance) * 0.7;
                ctx.strokeStyle = `hsl(${avgHue}, 90%, 80%)`;
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
                ctx.restore();
            }
        }
    }
}

// Обновляем прозрачность частиц в зависимости от их положения
function updateParticlesAlpha() {
    particles.forEach(particle => {
        if (particle.isInWorkSection()) {
            particle.targetAlpha = 0.1;
        } else {
            particle.targetAlpha = 1;
        }
    });
}

// Функция анимации
function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Обновляем прозрачность частиц
    updateParticlesAlpha();

    // Обновляем и отрисовываем каждую частицу
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }

    connectParticles();
    requestAnimationFrame(animate);
}

// Запускаем все
init();
animate();

// Обновляем размер canvas при изменении размера окна
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 2; // Сохраняем соотношение 200%

    // Можно пересоздать частицы для нового размера
    particles.length = 0;
    init();
});