/**
 * CHUM VietQR Generator
 * Using VietQR.io Quick Link API
 * Designed by CHUM / GIANG PRO
 */

// ============================================
// STATE
// ============================================
let BANKS = [];
let generatedImageUrl = null;

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadBankList();
    initEventListeners();
    formatAmountInput();
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
    const select = document.getElementById('bankSelect');
    
    try {
        const response = await fetch('https://api.vietqr.io/v2/banks');
        const result = await response.json();
        
        if (result.code === '00' && result.data) {
            // Filter only banks that support transfer
            BANKS = result.data.filter(bank => bank.transferSupported === 1);
            
            // Sort by shortName
            BANKS.sort((a, b) => a.shortName.localeCompare(b.shortName));
            
            // Populate select
            BANKS.forEach(bank => {
                const option = document.createElement('option');
                option.value = bank.bin;
                option.textContent = `${bank.shortName} - ${bank.name}`;
                option.dataset.code = bank.code;
                option.dataset.shortName = bank.shortName;
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Failed to load bank list:', error);
        // Show error message
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Lỗi tải danh sách ngân hàng';
        select.appendChild(option);
    }
}

// ============================================
// EVENT LISTENERS
// ============================================
function initEventListeners() {
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('generateBtn').addEventListener('click', generateQR);
    document.getElementById('downloadBtn').addEventListener('click', downloadQR);
    document.getElementById('qrImage').addEventListener('click', downloadQR);

    // Auto-format amount
    document.getElementById('amount').addEventListener('input', formatAmountInput);
}

function formatAmountInput() {
    const input = document.getElementById('amount');
    let value = input.value.replace(/[^\d]/g, '');
    if (value) {
        value = parseInt(value, 10).toLocaleString('vi-VN');
    }
    input.value = value;
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
// QR GENERATION USING VIETQR.IO QUICK LINK
// ============================================
function generateQR() {
    const bankBin = document.getElementById('bankSelect').value;
    const accountNumber = document.getElementById('accountNumber').value.trim();
    const accountName = document.getElementById('accountName').value.trim();
    const amount = document.getElementById('amount').value;
    const memo = document.getElementById('memo').value.trim();

    if (!bankBin) {
        alert('Vui lòng chọn ngân hàng!');
        return;
    }
    if (!accountNumber) {
        alert('Vui lòng nhập số tài khoản!');
        return;
    }

    // Find selected bank
    const selectedBank = BANKS.find(b => b.bin === bankBin);
    if (!selectedBank) {
        alert('Không tìm thấy thông tin ngân hàng!');
        return;
    }

    // Build VietQR.io Quick Link URL
    // Format: https://img.vietqr.io/image/{bankCode}-{accountNo}-{template}.png
    // Templates: compact, compact2, qr_only, print
    const bankCode = selectedBank.code;
    let qrUrl = `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact2.png`;

    // Add optional parameters
    const params = new URLSearchParams();
    
    if (amount) {
        const amountValue = amount.replace(/[^\d]/g, '');
        if (amountValue && parseInt(amountValue) > 0) {
            params.append('amount', amountValue);
        }
    }
    
    if (memo) {
        // Remove diacritics and limit to 25 chars
        const memoClean = removeVietnameseDiacritics(memo).substring(0, 25);
        params.append('addInfo', memoClean);
    }
    
    if (accountName) {
        // Remove diacritics for account name
        const nameClean = removeVietnameseDiacritics(accountName);
        params.append('accountName', nameClean);
    }

    if (params.toString()) {
        qrUrl += '?' + params.toString();
    }

    // Store for download
    generatedImageUrl = qrUrl;

    // Display QR image
    const qrImage = document.getElementById('qrImage');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    // Show loading
    loadingIndicator.style.display = 'block';
    qrImage.style.display = 'none';
    
    // Load image
    qrImage.onload = () => {
        loadingIndicator.style.display = 'none';
        qrImage.style.display = 'block';
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
        document.getElementById('infoAmount').textContent = amount + ' VND';
        document.getElementById('amountRow').style.display = 'block';
    } else {
        document.getElementById('amountRow').style.display = 'none';
    }

    // Show preview card
    document.getElementById('previewCard').classList.add('visible');
    document.getElementById('previewCard').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ============================================
// DOWNLOAD QR IMAGE
// ============================================
async function downloadQR() {
    if (!generatedImageUrl) return;

    try {
        // Fetch the image
        const response = await fetch(generatedImageUrl);
        const blob = await response.blob();
        
        // Create download link
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().slice(0, 10);
        const accountNumber = document.getElementById('accountNumber').value.trim();
        link.download = `VietQR-${accountNumber || 'code'}-${timestamp}.png`;
        link.href = URL.createObjectURL(blob);
        link.click();
        
        // Cleanup
        URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error('Download failed:', error);
        // Fallback: open in new tab
        window.open(generatedImageUrl, '_blank');
    }
}
