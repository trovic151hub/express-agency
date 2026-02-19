
    // --- 1. MOBILE MENU ---
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
            const spans = hamburger.querySelectorAll('span');
            if(mobileNav.classList.contains('open')) {
                spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
                spans[1].style.opacity = "0";
                spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
            } else {
                spans[0].style.transform = "none";
                spans[1].style.opacity = "1";
                spans[2].style.transform = "none";
            }
        });
    }

    // --- 2. SCROLL REVEAL ---
    function reveal() {
        const reveals = document.querySelectorAll(".reveal");
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);

    // --- 3. STICKY NAVBAR ---
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (nav) {
            if (window.scrollY > 50) {
                nav.style.padding = '0.75rem 0';
                nav.style.background = 'rgba(6, 6, 6, 0.85)';
            } else {
                nav.style.padding = '1.25rem 0';
                nav.style.background = 'transparent';
            }
        }
    });

    // --- 4. PRELOADER & INITIALIZATION ---
 window.addEventListener('load', () => {
    const COLORS = ['#00f2ff', '#7000ff', '#ff007a', '#00ff8c', '#ffcf00'];
    const preloader = document.getElementById('xp-preloader');
    const bouncingX = document.getElementById('xp-bouncing-x');
    const xSlot = document.getElementById('xp-x-placeholder');
    const bar = document.getElementById('xp-bar');
    const percentTxt = document.getElementById('xp-percent');

    let bx = 50, by = 50;
    let vx = 4, vy = 4;
    let phase = 'bouncing';
    const sessionColor = COLORS[Math.floor(Math.random() * COLORS.length)];

    function animate() {
        if (phase === 'bouncing') {
            bx += vx; by += vy;
            if (bx + 60 >= window.innerWidth || bx <= 0) {
                vx *= -1;
                bouncingX.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
            }
            if (by + 60 >= window.innerHeight || by <= 0) {
                vy *= -1;
                bouncingX.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
            }
            bouncingX.style.transform = `translate3d(${bx}px, ${by}px, 0)`;
        }
        if (phase !== 'done') requestAnimationFrame(animate);
    }
    animate();

    // Loading Progress
    let p = 0;
    const interval = setInterval(() => {
        p += Math.random() * 3;
        if (p >= 100) {
            p = 100;
            clearInterval(interval);
            finishLoading();
        }
        bar.style.width = p + '%';
        percentTxt.innerText = Math.floor(p);
    }, 50);

    function finishLoading() {
        phase = 'snapping';
        const rect = xSlot.getBoundingClientRect();
        
        // Fly to slot
        bouncingX.style.transition = 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)';
        bouncingX.style.left = '0'; bouncingX.style.top = '0';
        bouncingX.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0)`;
        bouncingX.style.color = sessionColor;

        setTimeout(() => {
            phase = 'done';
            bouncingX.style.opacity = '0';
            xSlot.classList.add('lit');
            preloader.style.setProperty('--xp-glow', sessionColor);
            
            document.getElementById('xp-press-word').classList.add('lit');
            document.getElementById('xp-agency-word').classList.add('lit');
            document.getElementById('xp-loader-tagline').classList.add('lit');

            // Trigger Shockwave
            const wave = document.getElementById('xp-shockwave');
            wave.style.left = (rect.left + 30) + 'px';
            wave.style.top = (rect.top + 30) + 'px';
            wave.classList.add('fire-shock');

            setTimeout(() => {
                preloader.classList.add('fade-out');
                document.body.classList.add('loaded');
                
                // Initialize your web's specific functions
                if (typeof reveal === 'function') reveal();
                if (typeof initStars === 'function') initStars();
                if (typeof startBouncing === 'function') startBouncing();
            }, 1200);
        }, 600);
    }
});


// --- 5. FIXED BOUNCING ENGINE (SUPER DEBUG – force logs everywhere) ---
function startBouncing() {
    const box = document.getElementById('coming-soon-section');
    const logo = document.getElementById('bouncing-pill-logo');
    if (!box || !logo) return;

    const b_colors = ['#00f2ff', '#7000ff', '#ff007a', '#00ff8c', '#ffcf00', '#ff6a00', '#00d4ff'];
    const GLOW_PAD = 18;

    let b_x, b_y;
    // Slightly faster, diagonal-feeling start angle
    let b_xSpeed = (Math.random() > 0.5 ? 1 : -1) * (1.5 + Math.random() * 0.3);
    let b_ySpeed = (Math.random() > 0.5 ? 1 : -1) * (1.3 + Math.random() * 0.3);

    function getMaxX() { return box.clientWidth  - logo.offsetWidth  - GLOW_PAD; }
    function getMaxY() { return box.clientHeight - logo.offsetHeight - GLOW_PAD; }

    function forceCenter() {
        b_x = Math.round((box.clientWidth  - logo.offsetWidth)  / 2);
        b_y = Math.round((box.clientHeight - logo.offsetHeight) / 2);
        logo.style.transform = `translate3d(${b_x}px, ${b_y}px, 0)`;
    }

    function b_animate() {
        b_x += b_xSpeed;
        b_y += b_ySpeed;

        const maxX = getMaxX();
        const maxY = getMaxY();
        let hit = false;

        if (b_x >= maxX) {
            b_x = maxX;
            b_xSpeed = -(Math.abs(b_xSpeed));
            hit = true;
        } else if (b_x <= GLOW_PAD) {
            b_x = GLOW_PAD;
            b_xSpeed = Math.abs(b_xSpeed);
            hit = true;
        }

        if (b_y >= maxY) {
            b_y = maxY;
            b_ySpeed = -(Math.abs(b_ySpeed));
            hit = true;
        } else if (b_y <= GLOW_PAD) {
            b_y = GLOW_PAD;
            b_ySpeed = Math.abs(b_ySpeed);
            hit = true;
        }

        logo.style.transform = `translate3d(${b_x}px, ${b_y}px, 0)`;
        if (hit) b_changeStyle();

        requestAnimationFrame(b_animate);
    }

    function b_changeStyle() {
        const color = b_colors[Math.floor(Math.random() * b_colors.length)];
        logo.style.borderColor = color;
        logo.style.boxShadow = `0 0 18px ${color}, 0 0 6px ${color}, inset 0 0 12px ${color}`;
        logo.style.transition = 'none';
        logo.style.scale = '1.07';
        setTimeout(() => {
            logo.style.transition = 'border-color 0.3s ease, box-shadow 0.3s ease, scale 0.35s ease-out';
            logo.style.scale = '1';
        }, 80);
    }

    window.addEventListener('resize', forceCenter);

    forceCenter();
    setTimeout(b_animate, 500);
}

    
    // --- 6. STAR GLITTER ---
 function initStars() {
    const canvas = document.getElementById('cs-star-canvas');
    const box = document.getElementById('coming-soon-section');
    if (!canvas || !box) return;

    canvas.width = box.clientWidth;
    canvas.height = box.clientHeight;
    const ctx = canvas.getContext('2d');

    // Two layers: ambient bg stars + glitter micro-stars near text
    const ambientStars = Array.from({ length: 55 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.2 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.008 + Math.random() * 0.012
    }));

    // Glitter stars cluster in top ~45% where "coming soon" text lives
    const glitterStars = Array.from({ length: 28 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.45,
        size: Math.random() * 1.0 + 0.4,
        phase: Math.random() * Math.PI * 2,
        speed: 0.025 + Math.random() * 0.04, // faster twinkle
        drift: (Math.random() - 0.5) * 0.12   // very subtle horizontal drift
    }));

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Ambient stars — slow, calm
        ambientStars.forEach(s => {
            s.phase += s.speed;
            const alpha = (Math.sin(s.phase) * 0.5 + 0.5) * 0.45; // max 45% opacity
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            ctx.fill();
        });

        // Glitter micro-stars — faster twinkle, near text
        glitterStars.forEach(s => {
            s.phase += s.speed;
            s.x += s.drift;
            // Wrap horizontally
            if (s.x < 0) s.x = canvas.width;
            if (s.x > canvas.width) s.x = 0;

            const raw = Math.sin(s.phase);
            const alpha = raw > 0 ? raw * 0.9 : 0; // hard off, bright flash on
            if (alpha < 0.05) return; // skip near-invisible draws

            // Tiny cross/sparkle shape for the brightest ones
            if (alpha > 0.6 && s.size > 1.0) {
                ctx.save();
                ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.5})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(s.x - s.size * 2.5, s.y);
                ctx.lineTo(s.x + s.size * 2.5, s.y);
                ctx.moveTo(s.x, s.y - s.size * 2.5);
                ctx.lineTo(s.x, s.y + s.size * 2.5);
                ctx.stroke();
                ctx.restore();
            }

            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    draw();
}

    // Handle screen resize
    window.addEventListener('resize', () => {
        const canvas = document.getElementById('cs-star-canvas');
        const box = document.getElementById('coming-soon-section');
        if(canvas && box) {
            canvas.width = box.clientWidth;
            canvas.height = box.clientHeight;
        }
    });
