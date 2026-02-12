// ==================== REVEAL ON SCROLL ====================
const revealElements = () => {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    reveals.forEach(element => {
        observer.observe(element);
    });
};

// ==================== MOBILE MENU TOGGLE ====================
const mobileMenu = () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
};

// ==================== SMOOTH SCROLL ====================
const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
};

// ==================== HEADER SCROLL EFFECT ====================
const headerScroll = () => {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
};

// ==================== FORM SUBMISSION ====================
const handleFormSubmit = () => {
    // We let the browser handle the POST submission to FormSubmit
    // But we can add a simple loading state if needed 
    const forms = document.querySelectorAll('form[action^="https://formsubmit.co"]');
    forms.forEach(form => {
        form.addEventListener('submit', () => {
            const btn = form.querySelector('button[type="submit"]');
            if (btn) {
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';
            }
        });
    });
};

// ==================== DYNAMIC MAP INITIALIZATION ====================
const initMap = () => {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    // Eletricom Operating Locations
    const places = [
        { id: 1, name: 'Eletricom BH', city: 'Belo Horizonte / MG', coords: [-19.9167, -43.9345] },
        { id: 2, name: 'Log CP', city: 'Guarulhos / SP', coords: [-23.4294, -46.3927], link: 'https://logcp.com.br/' },
        { id: 3, name: 'Eletricom RJ', city: 'Rio de Janeiro / RJ', coords: [-22.9068, -43.1729] },
        { id: 4, name: 'Eletricom ES', city: 'Serra / ES', coords: [-20.1286, -40.3064] },
        { id: 5, name: 'Eletricom GO', city: 'Goiânia / GO', coords: [-16.6869, -49.2643] },
        { id: 6, name: 'Eletricom DF', city: 'Taguatinga / DF', coords: [-15.8333, -48.05] },
        { id: 7, name: 'Eletricom BA', city: 'Salvador / BA', coords: [-12.9777, -38.5016] },
        { id: 8, name: 'Eletricom CE', city: 'Fortaleza / CE', coords: [-3.7319, -38.5267] }
    ];

    // Update counter in UI
    const counter = document.getElementById('mapPlacesCount');
    // if (counter) counter.innerText = `${places.length} Unidades`;

    // Initialize Map
    const map = L.map('map', {
        center: [-15.7975, -47.8919],
        zoom: 4,
        zoomControl: false,
        attributionControl: false
    });

    // Add Dark Tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
    }).addTo(map);

    // Premium Icon Construction
    const createPremiumIcon = () => {
        return L.divIcon({
            className: 'custom-map-marker',
            html: `
                <div class="marker-shockwave"></div>
                <div class="marker-shockwave"></div>
                <div class="marker-logo-wrapper">
                    <img src="https://www.eletricom.me/wp-content/uploads/2018/01/cropped-favicon_eletricom-32x32.png" 
                         style="width: 24px; height: 24px; filter: drop-shadow(0 0 5px #fab915);">
                </div>
            `,
            iconSize: [45, 45],
            iconAnchor: [22, 22]
        });
    };

    // Add Markers with Electric Surge Logic
    places.forEach(place => {
        const marker = L.marker(place.coords, {
            icon: createPremiumIcon()
        }).addTo(map);

        // Minimalist Popup with Link Support
        const popupContent = `
            <div class="minimal-popup">
                <span class="tagline">${place.id === 2 ? 'Cliente Eletricom' : 'Eletricom Unidade'}</span>
                <h4>${place.name}</h4>
                <p style="font-size: 9px; color: #8b949e; margin-top: 5px; text-transform: uppercase; font-weight: 700;">${place.city}</p>
                ${place.link ? `<a href="${place.link}" target="_blank" style="display: inline-block; margin-top: 10px; font-size: 10px; color: var(--c-primary); text-decoration: none; font-weight: 900; border: 1px solid var(--c-primary); padding: 5px 10px; border-radius: 4px; transition: all 0.3s ease;">VISITAR SITE</a>` : ''}
            </div>
        `;

        marker.bindPopup(popupContent, {
            maxWidth: 250,
            closeButton: false,
            offset: [0, -10]
        });

        // Add "Electric Surge" effect randomly
        setInterval(() => {
            if (Math.random() > 0.8) {
                const el = marker.getElement();
                if (el) {
                    const wrapper = el.querySelector('.marker-logo-wrapper');
                    if (wrapper) {
                        wrapper.style.boxShadow = '0 0 60px #fab915';
                        wrapper.style.borderColor = '#fff';
                        setTimeout(() => {
                            wrapper.style.boxShadow = '0 0 25px rgba(250, 185, 21, 0.6)';
                            wrapper.style.borderColor = 'var(--c-primary)';
                        }, 150);
                    }
                }
            }
        }, 3000);
    });

    // Fit map to markers
    const group = new L.featureGroup(places.map(p => L.marker(p.coords)));
    map.fitBounds(group.getBounds().pad(0.15));
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    mobileMenu();
    smoothScroll();
    handleFormSubmit();
    headerScroll();
    revealElements();
    initMap();

    // Set active link in nav based on current path
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__menu a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
