let menuOpen = false;
const modStates = {};
const menuToggle = document.getElementById('menuToggle');
const menuContainer = document.getElementById('menuContainer');
const closeBtn = document.getElementById('closeBtn');
const clickEffects = document.getElementById('clickEffects');
document.addEventListener('DOMContentLoaded', function() {
    initializeMenu();
    setupEventListeners();
    showWelcomeMessage();
});

function initializeMenu() {
    const toggles = document.querySelectorAll('.toggle-checkbox');
    toggles.forEach(toggle => {
        modStates[toggle.id] = false;
        toggle.addEventListener('change', handleModToggle);
    });
    const interactiveElements = document.querySelectorAll('.mod-item, .footer-btn, .menu-toggle, .close-btn');
    interactiveElements.forEach(element => {
        element.addEventListener('click', createClickEffect);
    });
}

function setupEventListeners() {
    menuToggle.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', closeMenu);
    document.getElementById('saveConfig').addEventListener('click', saveConfiguration);
    document.getElementById('loadConfig').addEventListener('click', loadConfiguration);
    document.getElementById('resetAll').addEventListener('click', resetAllMods);
    document.addEventListener('click', function(e) {
        if (menuOpen && !menuContainer.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMenu();
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuOpen) {
            closeMenu();
        }
        if (e.ctrlKey && e.key === 'm') {
            e.preventDefault();
            toggleMenu();
        }
    });
    const modItems = document.querySelectorAll('.mod-item');
    modItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
}

function showWelcomeMessage() {
    setTimeout(() => {
        Swal.fire({
            title: 'MENU VIP BY NG BALUAT ',
            html: `
                <div style="text-align: center; padding: 20px;">
                    <p style="font-size: 16px; margin-bottom: 15px;">Menu mod được tạo bởi Nguyễn Bá Luật</p>
                    <div style="display: flex; justify-content: space-around; margin: 20px 0;">
                        <div style="text-align: center;">
                            <i class="fas fa-rocket" style="font-size: 24px; color: #ff0080; margin-bottom: 8px;"></i>
                            <p style="font-size: 12px;">Tốc độ cao</p>
                        </div>
                        <div style="text-align: center;">
                            <i class="fas fa-shield-alt" style="font-size: 24px; color: #00f5ff; margin-bottom: 8px;"></i>
                            <p style="font-size: 12px;">Bảo mật</p>
                        </div>
                        <div style="text-align: center;">
                            <i class="fas fa-magic" style="font-size: 24px; color: #ff0080; margin-bottom: 8px;"></i>
                            <p style="font-size: 12px;">Hiệu ứng đẹp</p>
                        </div>
                    </div>
                    <p style="font-size: 14px; color: #aaa;">Nhấn <kbd>Ctrl+M</kbd> để mở/đóng menu nhanh</p>
                </div>
            `,
            icon: 'success',
            confirmButtonText: 'Bắt đầu sử dụng',
            timer: 5000,
            timerProgressBar: true,
            background: 'rgba(10, 10, 10, 0.95)',
            color: '#ffffff',
            confirmButtonColor: '#ff0080',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    }, 1000);
}

function toggleMenu() {
    if (menuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

function openMenu() {
    menuOpen = true;
    menuContainer.classList.add('active');
    menuToggle.style.transform = 'scale(0.9) rotate(90deg)';
    const sections = document.querySelectorAll('.menu-section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.animation = `slideInUp 0.6s ease forwards`;
        }, index * 100);
    });

    showToast('Menu đã mở', 'success');
}

function closeMenu() {
    menuOpen = false;
    menuContainer.classList.remove('active');
    menuToggle.style.transform = 'scale(1) rotate(0deg)';

    showToast('Menu đã đóng', 'info');
}

function handleModToggle(event) {
    const modId = event.target.id;
    const isEnabled = event.target.checked;
    const modItem = event.target.closest('.mod-item');

    modStates[modId] = isEnabled;
    if (isEnabled) {
        modItem.style.background = 'rgba(255, 0, 128, 0.1)';
        modItem.style.borderColor = 'rgba(255, 0, 128, 0.5)';
        showToast(`${getModName(modId)} đã bật`, 'success');
        setTimeout(() => {
            modItem.style.boxShadow = '0 0 20px rgba(255, 0, 128, 0.4)';
        }, 100);
    } else {
        modItem.style.background = 'rgba(255, 255, 255, 0.05)';
        modItem.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        modItem.style.boxShadow = 'none';
        showToast(`${getModName(modId)} đã tắt`, 'warning');
    }
    simulateModActivation(modId, isEnabled);
}

function getModName(modId) {
    const names = {
        'speedHack': 'Speed Hack',
        'superJump': 'Super Jump',
        'invisibility': 'Invisibility',
        'wallhack': 'Wallhack',
        'esp': 'ESP',
        'fullbright': 'Fullbright',
        'aimbot': 'Aimbot',
        'godmode': 'God Mode',
        'rapidfire': 'Rapid Fire'
    };
    return names[modId] || modId;
}

function simulateModActivation(modId, isEnabled) {
    if (isEnabled) {
        const effect = document.createElement('div');
        effect.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff0080, #00f5ff);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: bold;
            z-index: 10000;
            animation: popIn 0.5s ease;
            pointer-events: none;
        `;
        effect.textContent = `${getModName(modId)} ACTIVATED!`;
        document.body.appendChild(effect);

        setTimeout(() => {
            effect.remove();
        }, 2000);
    }
}

function createClickEffect(event) {
    const effect = document.createElement('div');
    effect.className = 'click-effect';

    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    effect.style.left = (rect.left + x - 10) + 'px';
    effect.style.top = (rect.top + y - 10) + 'px';
    const colors = ['#ff0080', '#00f5ff', '#ff6b35', '#7b68ee'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    effect.style.borderColor = randomColor;

    clickEffects.appendChild(effect);

    setTimeout(() => {
        effect.remove();
    }, 600);
}

function saveConfiguration() {
    const config = {
        timestamp: new Date().toISOString(),
        mods: {...modStates },
        version: '2.1.0'
    };

    localStorage.setItem('huanha_mod_config', JSON.stringify(config));

    Swal.fire({
        title: 'Cấu hình đã lưu!',
        text: 'Cấu hình mod đã được lưu thành công',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        confirmButtonColor: '#ff0080'
    });
}

function loadConfiguration() {
    const savedConfig = localStorage.getItem('huanha_mod_config');

    if (savedConfig) {
        try {
            const config = JSON.parse(savedConfig);
            Object.keys(config.mods).forEach(modId => {
                const toggle = document.getElementById(modId);
                if (toggle) {
                    toggle.checked = config.mods[modId];
                    modStates[modId] = config.mods[modId];
                    toggle.dispatchEvent(new Event('change'));
                }
            });

            Swal.fire({
                title: 'Cấu hình đã tải!',
                text: `Đã tải cấu hình từ ${new Date(config.timestamp).toLocaleString()}`,
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                confirmButtonColor: '#ff0080'
            });
        } catch (error) {
            showToast('Lỗi khi tải cấu hình', 'error');
        }
    } else {
        Swal.fire({
            title: 'Không tìm thấy cấu hình',
            text: 'Chưa có cấu hình nào được lưu',
            icon: 'info',
            confirmButtonColor: '#ff0080'
        });
    }
}

function resetAllMods() {
    Swal.fire({
        title: 'Bạn có chắc chắn?',
        text: 'Tất cả mod sẽ được tắt và cấu hình sẽ được reset',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff0080',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Có, reset tất cả!',
        cancelButtonText: 'Hủy'
    }).then((result) => {
        if (result.isConfirmed) {
            const toggles = document.querySelectorAll('.toggle-checkbox');
            toggles.forEach(toggle => {
                toggle.checked = false;
                modStates[toggle.id] = false;
                const modItem = toggle.closest('.mod-item');
                modItem.style.background = 'rgba(255, 255, 255, 0.05)';
                modItem.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                modItem.style.boxShadow = 'none';
            });
            localStorage.removeItem('huanha_mod_config');

            Swal.fire({
                title: 'Đã reset!',
                text: 'Tất cả mod đã được tắt và cấu hình đã được xóa',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                confirmButtonColor: '#ff0080'
            });
        }
    });
}

function showToast(message, type = 'info') {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    Toast.fire({
        icon: type,
        title: message,
        background: 'rgba(10, 10, 10, 0.95)',
        color: '#ffffff'
    });
}

const style = document.createElement('style');
style.textContent = `
    @keyframes popIn {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .shake {
        animation: shake 0.5s ease-in-out;
    }
`;
document.head.appendChild(style);
let ticking = false;

function updateParticles() {
    if (!ticking) {
        requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
}

document.addEventListener('mousemove', function(e) {
    const particles = document.querySelectorAll('.particle');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.5;
        const x = mouseX * speed;
        const y = mouseY * speed;

        particle.style.transform = `translate(${x}px, ${y}px)`;
    });
});
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);

    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        Swal.fire({
            title: '🎉 Easter Egg Activated!',
            text: 'Bạn đã mở khóa chế độ Rainbow!',
            icon: 'success',
            confirmButtonColor: '#ff0080'
        });

        const logo = document.querySelector('.logo');
        logo.style.filter = 'hue-rotate(0deg)';
        logo.style.animation = 'logoSpin 1s linear infinite, hueRotate 3s linear infinite';

        konamiCode = [];
    }
});

const hueStyle = document.createElement('style');
hueStyle.textContent = `
    @keyframes hueRotate {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(hueStyle);