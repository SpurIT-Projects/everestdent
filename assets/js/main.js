// ЭверестДент - Основной JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling для якорных ссылок
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Кнопка "Наверх"
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.title = 'Наверх';
    document.body.appendChild(scrollTopBtn);
    
    // Показ/скрытие кнопки наверх
    function toggleScrollTopButton() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', toggleScrollTopButton);
    
    // Клик по кнопке наверх
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Анимация при скролле (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Добавляем анимацию для карточек
    const animatedElements = document.querySelectorAll('.card, .service-card, .advantage-card, .testimonial-card');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Автоматическое скрытие мобильного меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav) {
                nav.classList.remove('active');
            }
        });
    });
    
    // Обработка форм (заглушка)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
        });
    });
    
    // Маска для телефона
    function phoneMask(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.startsWith('375')) {
            value = value.substring(3);
        }
        if (value.length > 0) {
            value = '+375 (' + value.substring(0, 2) + ') ' + 
                   value.substring(2, 5) + '-' + 
                   value.substring(5, 7) + '-' + 
                   value.substring(7, 9);
        }
        input.value = value;
    }
    
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            phoneMask(this);
        });
        
        // Установка начального значения
        input.addEventListener('focus', function() {
            if (!this.value) {
                this.value = '+375 (';
            }
        });
    });
    
    // Lazy loading для изображений
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Функция для переключения страниц (для SPA)
    window.navigateToPage = function(page) {
        // Скролл наверх при переходе на новую страницу
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Здесь будет логика переключения страниц
        console.log('Переход на страницу:', page);
    };
    
    // Инициализация
    console.log('ЭверестДент - сайт загружен');
    toggleScrollTopButton();
});