/**
 * CHUM QR Generator
 * VietQR with Searchable Bank Dropdown & Glassmorphism Effect
 * Designed by CHUM / GIANG PRO
 */

// ============================================
// STATE
// ============================================
let BANKS = [];
let generatedImageUrl = null;
let selectedBank = null;
let isGlassEffect = false;

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadBankList();
    initEventListeners();
    initBankSearch();
});

// ============================================
// THEME TOGGLE
// ============================================
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// ============================================
// LOAD BANK LIST FROM VIETQR.IO API
// ============================================
async function loadBankList() {
    try {
        const response = await fetch('https://api.vietqr.io/v2/banks');
        const result = await response.json();

        if (result.code === '00' && result.data) {
            BANKS = result.data.filter(bank => bank.transferSupported === 1);
            BANKS.sort((a, b) => a.shortName.localeCompare(b.shortName));
        }
    } catch (error) {
        console.error('Failed to load bank list:', error);
    }
}

// ============================================
// SEARCHABLE BANK DROPDOWN
// ============================================
function initBankSearch() {
    const searchInput = document.getElementById('bankSearch');
    const dropdown = document.getElementById('bankDropdown');

    // Show dropdown on focus
    searchInput.addEventListener('focus', () => {
        showBankDropdown('');
    });

    // Filter on input
    searchInput.addEventListener('input', (e) => {
        showBankDropdown(e.target.value);
    });

    // Hide dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-select-wrapper')) {
            dropdown.classList.remove('show');
        }
    });
}

function showBankDropdown(filter) {
    const dropdown = document.getElementById('bankDropdown');
    const filterLower = filter.toLowerCase().trim();

    // Filter banks
    let filteredBanks = BANKS;
    if (filterLower) {
        filteredBanks = BANKS.filter(bank =>
            bank.shortName.toLowerCase().includes(filterLower) ||
            bank.name.toLowerCase().includes(filterLower) ||
            bank.code.toLowerCase().includes(filterLower)
        );
    }

    // Build dropdown HTML
    if (filteredBanks.length === 0) {
        dropdown.innerHTML = '<div class="dropdown-item no-result">Không tìm thấy ngân hàng</div>';
    } else {
        dropdown.innerHTML = filteredBanks.map(bank => `
            <div class="dropdown-item" data-bin="${bank.bin}" data-code="${bank.code}" data-name="${bank.name}" data-short="${bank.shortName}">
                <img src="${bank.logo}" alt="${bank.shortName}" onerror="this.style.display='none'">
                <div class="bank-info">
                    <span class="bank-short">${bank.shortName}</span>
                    <span class="bank-name">${bank.name}</span>
                </div>
            </div>
        `).join('');
    }

    // Add click handlers
    dropdown.querySelectorAll('.dropdown-item:not(.no-result)').forEach(item => {
        item.addEventListener('click', () => selectBank(item));
    });

    dropdown.classList.add('show');
}

function selectBank(item) {
    const searchInput = document.getElementById('bankSearch');
    const bankBinInput = document.getElementById('bankBin');
    const dropdown = document.getElementById('bankDropdown');

    selectedBank = {
        bin: item.dataset.bin,
        code: item.dataset.code,
        name: item.dataset.name,
        shortName: item.dataset.short
    };

    searchInput.value = `${selectedBank.shortName} - ${selectedBank.name}`;
    bankBinInput.value = selectedBank.bin;
    dropdown.classList.remove('show');
}

// ============================================
// EVENT LISTENERS
// ============================================
function initEventListeners() {
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('generateBtn').addEventListener('click', generateQR);
    document.getElementById('amount').addEventListener('input', formatAmountInput);
    document.getElementById('downloadBtn').addEventListener('click', downloadQR);
    document.getElementById('qrImage').addEventListener('click', downloadQR);

    // Glassmorphism toggle
    document.getElementById('glassToggle').addEventListener('change', (e) => {
        isGlassEffect = e.target.checked;
        updateGlassEffect();
    });
}

// ============================================
// FORMAT AMOUNT - #,##0
// ============================================
function formatAmountInput() {
    const input = document.getElementById('amount');
    let value = input.value.replace(/[^\d]/g, '');
    if (value) {
        value = parseInt(value, 10).toLocaleString('en-US');
    }
    input.value = value;
}

function formatAmount(value) {
    if (!value) return '';
    const num = parseInt(value.replace(/[^\d]/g, ''), 10);
    if (isNaN(num) || num === 0) return '';
    return num.toLocaleString('en-US');
}

// ============================================
// REMOVE VIETNAMESE DIACRITICS
// ============================================
function removeVietnameseDiacritics(str) {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .toUpperCase();
}

// ============================================
// GLASSMORPHISM EFFECT
// ============================================
function updateGlassEffect() {
    const wrapper = document.getElementById('glassWrapper');
    if (isGlassEffect) {
        wrapper.classList.add('glass-active');
    } else {
        wrapper.classList.remove('glass-active');
    }
}

// ============================================
// GENERATE QR
// ============================================
function generateQR() {
    const bankBin = document.getElementById('bankBin').value;
    const accountNumber = document.getElementById('accountNumber').value.trim();
    const accountName = document.getElementById('accountName').value.trim();
    const amount = document.getElementById('amount').value;
    const memo = document.getElementById('memo').value.trim();

    if (!bankBin || !selectedBank) {
        alert('Vui lòng chọn ngân hàng!');
        return;
    }
    if (!accountNumber) {
        alert('Vui lòng nhập số tài khoản!');
        return;
    }

    // Build VietQR.io Quick Link URL
    const bankCode = selectedBank.code;
    let qrUrl = `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact2.png`;

    const params = new URLSearchParams();

    if (amount) {
        const amountValue = amount.replace(/[^\d]/g, '');
        if (amountValue && parseInt(amountValue) > 0) {
            params.append('amount', amountValue);
        }
    }

    if (memo) {
        const memoClean = removeVietnameseDiacritics(memo).substring(0, 25);
        params.append('addInfo', memoClean);
    }

    if (accountName) {
        const nameClean = removeVietnameseDiacritics(accountName);
        params.append('accountName', nameClean);
    }

    if (params.toString()) {
        qrUrl += '?' + params.toString();
    }

    generatedImageUrl = qrUrl;

    // Display QR image
    const qrImage = document.getElementById('qrImage');
    const loadingIndicator = document.getElementById('loadingIndicator');

    loadingIndicator.style.display = 'flex';
    qrImage.style.display = 'none';

    qrImage.onload = () => {
        loadingIndicator.style.display = 'none';
        qrImage.style.display = 'block';
        updateGlassEffect();
    };

    qrImage.onerror = () => {
        loadingIndicator.style.display = 'none';
        qrImage.style.display = 'none';
        alert('Lỗi tạo mã QR. Vui lòng kiểm tra lại thông tin!');
    };

    qrImage.src = qrUrl;

    // Update info display
    document.getElementById('infoAccountName').textContent = accountName || 'Chủ tài khoản';
    document.getElementById('infoAccountNumber').textContent = accountNumber;
    document.getElementById('infoBankName').textContent = selectedBank.name;

    if (amount) {
        document.getElementById('infoAmount').textContent = formatAmount(amount) + ' VND';
        document.getElementById('amountRow').style.display = 'flex';
    } else {
        document.getElementById('amountRow').style.display = 'none';
    }

    document.getElementById('previewCard').classList.add('visible');
    document.getElementById('previewCard').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ============================================
// DOWNLOAD QR IMAGE
// ============================================
async function downloadQR() {
    const timestamp = new Date().toISOString().slice(0, 10);
    const accountNumber = document.getElementById('accountNumber').value.trim();
    const filename = `CHUMQR-${accountNumber || 'code'}-${timestamp}.png`;

    if (isGlassEffect) {
        // Use html2canvas for glassmorphism effect
        const wrapper = document.getElementById('glassWrapper');
        try {
            const canvas = await html2canvas(wrapper, {
                backgroundColor: null,
                scale: 2
            });
            const link = document.createElement('a');
            link.download = filename;
            link.href = canvas.toDataURL('image/png', 1.0);
            link.click();
        } catch (error) {
            console.error('Download failed:', error);
            // Fallback to direct download
            downloadDirect(filename);
        }
    } else {
        downloadDirect(filename);
    }
}

async function downloadDirect(filename) {
    if (!generatedImageUrl) return;

    try {
        const response = await fetch(generatedImageUrl);
        const blob = await response.blob();
        const link = document.createElement('a');
        link.download = filename;
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error('Download failed:', error);
        window.open(generatedImageUrl, '_blank');
    }
}
