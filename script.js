// Initialize Lucide Icons
lucide.createIcons();

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);

        if (menuIcon && closeIcon) {
            menuIcon.style.display = isOpen ? 'none' : 'block';
            closeIcon.style.display = isOpen ? 'block' : 'none';
        }
    });

    // Close menu when clicking a nav link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            if (menuIcon && closeIcon) {
                menuIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            }
        });
    });
}

// Scroll Reveal Animation (Intersection Observer)
const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

if (scrollRevealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    scrollRevealElements.forEach(el => revealObserver.observe(el));
}

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Stats Counter Animation
const statValues = document.querySelectorAll('.stat-value');

if (statValues.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(el => statsObserver.observe(el));
}

function animateCounter(el) {
    const text = el.textContent.trim();
    const match = text.match(/^(\d+)(.*)$/);
    if (!match) return;

    const target = parseInt(match[1], 10);
    const suffix = match[2]; // e.g., "+", "%"
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const current = Math.round(eased * target);

        el.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Fetch Fuel Prices from Quote App API
async function fetchFuelPrices() {
    const doPriceEl = document.getElementById('fuel-do-price');
    const ron95PriceEl = document.getElementById('fuel-ron95-price');
    const updateTimeEl = document.getElementById('fuel-update-time');

    try {
        const response = await fetch('https://bao-gia-cuoc-v2.vercel.app/api/public/fuel');
        const data = await response.json();

        if (data.success) {
            const price = data.price;
            // Format price with dots (e.g. 20450 -> 20.450)
            const formattedPrice = new Intl.NumberFormat('vi-VN').format(price) + 'đ';
            
            if (doPriceEl) doPriceEl.textContent = formattedPrice;
            
            // RON 95 often follows a similar trend, here we show the primary DO price 
            // since it's most important for container transport
            if (ron95PriceEl) ron95PriceEl.textContent = "Liên hệ"; 

            if (updateTimeEl) {
                const date = new Date(data.updatedAt);
                const dateStr = date.toLocaleDateString('vi-VN');
                updateTimeEl.innerHTML = `<i data-lucide="refresh-cw"></i> Cập nhật: ${dateStr} (Vùng 1)`;
                lucide.createIcons(); // Re-initialize icons for the new HTML
            }
        }
    } catch (error) {
        console.error('Error fetching fuel prices:', error);
        if (updateTimeEl) updateTimeEl.innerHTML = `<i data-lucide="refresh-cw"></i> Không thể tải dữ liệu`;
    }
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    fetchFuelPrices();
});
