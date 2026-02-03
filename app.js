/**
 * CHUM VietQR Generator
 * Tab 1: Auto (VietQR.io API)
 * Tab 2: Manual (Local QR Generation)
 * Designed by CHUM / GIANG PRO
 */

// ============================================
// STATE
// ============================================
let BANKS = [];
let generatedImageUrl = null;
let currentMode = 'auto'; // 'auto' or 'manual'

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadBankList();
    initEventListeners();
    initTabs();
});

// ============================================
// TABS
// ============================================
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            switchTab(tabId);
        });
    });
}

function switchTab(tabId) {
    currentMode = tabId;

    // Update buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    // Update content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    if (tabId === 'auto') {
        document.getElementById('tabAuto').classList.add('active');
    } else {
        document.getElementById('tabManual').classList.add('active');
    }

    // Hide preview when switching
    document.getElementById('previewCard').classList.remove('visible');
}

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
    const manualSelect = document.getElementById('manualBankSelect');

    try {
        const response = await fetch('https://api.vietqr.io/v2/banks');
        const result = await response.json();

        if (result.code === '00' && result.data) {
            // Filter only banks that support transfer
            BANKS = result.data.filter(bank => bank.transferSupported === 1);

            // Sort by shortName
            BANKS.sort((a, b) => a.shortName.localeCompare(b.shortName));

            // Populate both selects
            BANKS.forEach(bank => {
                const option = document.createElement('option');
                option.value = bank.bin;
                option.textContent = `${bank.shortName} - ${bank.name}`;
                option.dataset.code = bank.code;
                option.dataset.shortName = bank.shortName;
                select.appendChild(option);

                // Clone for manual select
                manualSelect.appendChild(option.cloneNode(true));
            });
        }
    } catch (error) {
        console.error('Failed to load bank list:', error);
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Lỗi tải danh sách ngân hàng';
        select.appendChild(option);
        manualSelect.appendChild(option.cloneNode(true));
    }
}

// ============================================
// EVENT LISTENERS
// ============================================
function initEventListeners() {
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Auto tab
    document.getElementById('generateBtn').addEventListener('click', generateQRAuto);
    document.getElementById('amount').addEventListener('input', () => formatAmountInput('amount'));

    // Manual tab
    document.getElementById('manualGenerateBtn').addEventListener('click', generateQRManual);
    document.getElementById('manualAmount').addEventListener('input', () => formatAmountInput('manualAmount'));

    // Download
    document.getElementById('downloadBtn').addEventListener('click', downloadQR);
    document.getElementById('qrImage').addEventListener('click', downloadQR);
}

// ============================================
// FORMAT AMOUNT - #,##0
// ============================================
function formatAmountInput(inputId) {
    const input = document.getElementById(inputId);
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
// TAB 1: AUTO - VIETQR.IO QUICK LINK
// ============================================
function generateQRAuto() {
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

    const selectedBank = BANKS.find(b => b.bin === bankBin);
    if (!selectedBank) {
        alert('Không tìm thấy thông tin ngân hàng!');
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
    const qrCanvas = document.getElementById('qrCanvas');
    const loadingIndicator = document.getElementById('loadingIndicator');

    loadingIndicator.style.display = 'flex';
    qrImage.style.display = 'none';
    qrCanvas.style.display = 'none';

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
    updateInfoDisplay(accountName, accountNumber, selectedBank.name, amount);

    document.getElementById('previewCard').classList.add('visible');
    document.getElementById('previewCard').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ============================================
// TAB 2: MANUAL - LOCAL QR GENERATION
// ============================================
function generateQRManual() {
    const bankBin = document.getElementById('manualBankSelect').value;
    const accountNumber = document.getElementById('manualAccountNumber').value.trim();
    const accountName = document.getElementById('manualAccountName').value.trim();
    const amount = document.getElementById('manualAmount').value;
    const memo = document.getElementById('manualMemo').value.trim();

    if (!bankBin) {
        alert('Vui lòng chọn ngân hàng!');
        return;
    }
    if (!accountNumber) {
        alert('Vui lòng nhập số tài khoản!');
        return;
    }

    const selectedBank = BANKS.find(b => b.bin === bankBin);
    if (!selectedBank) {
        alert('Không tìm thấy thông tin ngân hàng!');
        return;
    }

    // Generate VietQR EMVCo string
    const qrString = generateVietQRString(bankBin, accountNumber, amount, memo);

    // Render QR code on canvas
    renderQRCanvas(qrString, selectedBank, accountName, accountNumber, amount);

    generatedImageUrl = null; // Will use canvas for download

    // Update info display
    updateInfoDisplay(accountName, accountNumber, selectedBank.name, amount);

    document.getElementById('previewCard').classList.add('visible');
    document.getElementById('previewCard').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ============================================
// VIETQR EMVCO STRING GENERATOR
// ============================================
function generateVietQRString(bankBin, accountNumber, amount, memo) {
    function tlv(id, value) {
        const len = value.length.toString().padStart(2, '0');
        return id + len + value;
    }

    const field00 = tlv("00", "01");
    const field01 = tlv("01", "12");

    const subField38_00 = tlv("00", "A000000727");
    const beneficiaryInfo = tlv("00", bankBin) + tlv("01", accountNumber);
    const subField38_01 = tlv("01", beneficiaryInfo);
    const subField38_02 = tlv("02", "QRIBFTTA");
    const field38Content = subField38_00 + subField38_01 + subField38_02;
    const field38 = tlv("38", field38Content);

    const field53 = tlv("53", "704");

    let field54 = "";
    if (amount) {
        const amountValue = amount.replace(/[^\d]/g, '');
        if (amountValue && parseInt(amountValue) > 0) {
            field54 = tlv("54", amountValue);
        }
    }

    const field58 = tlv("58", "VN");

    let field62 = "";
    if (memo && memo.trim()) {
        const memoClean = removeVietnameseDiacritics(memo.trim()).substring(0, 25);
        const subField62_08 = tlv("08", memoClean);
        field62 = tlv("62", subField62_08);
    }

    let qrString = field00 + field01 + field38 + field53 + field54 + field58 + field62;
    qrString += "6304";
    const crc = calculateCRC16(qrString);
    qrString += crc;

    return qrString;
}

function calculateCRC16(str) {
    let crc = 0xFFFF;
    const polynomial = 0x1021;

    for (let i = 0; i < str.length; i++) {
        crc ^= (str.charCodeAt(i) << 8);
        for (let j = 0; j < 8; j++) {
            if (crc & 0x8000) {
                crc = ((crc << 1) ^ polynomial) & 0xFFFF;
            } else {
                crc = (crc << 1) & 0xFFFF;
            }
        }
    }

    return crc.toString(16).toUpperCase().padStart(4, '0');
}

// ============================================
// RENDER QR ON CANVAS (MANUAL MODE)
// ============================================
function renderQRCanvas(qrString, bank, accountName, accountNumber, amount) {
    const canvas = document.getElementById('qrCanvas');
    const qrImage = document.getElementById('qrImage');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const ctx = canvas.getContext('2d');

    loadingIndicator.style.display = 'none';
    qrImage.style.display = 'none';
    canvas.style.display = 'block';

    // Canvas size
    const width = 400;
    const height = 500;
    const qrSize = 280;

    canvas.width = width;
    canvas.height = height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Border
    ctx.strokeStyle = '#0066B3';
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, width - 4, height - 4);

    // Header
    ctx.fillStyle = '#0066B3';
    ctx.font = 'bold 18px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('VietQR', width / 2, 35);

    // Generate QR
    const qr = qrcode(0, 'M');
    qr.addData(qrString);
    qr.make();

    const moduleCount = qr.getModuleCount();
    const moduleSize = qrSize / moduleCount;
    const qrX = (width - qrSize) / 2;
    const qrY = 55;

    ctx.fillStyle = '#000000';
    for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
            if (qr.isDark(row, col)) {
                ctx.fillRect(
                    qrX + col * moduleSize,
                    qrY + row * moduleSize,
                    moduleSize,
                    moduleSize
                );
            }
        }
    }

    // Info section
    const infoY = qrY + qrSize + 25;
    ctx.textAlign = 'center';

    // Bank name
    ctx.fillStyle = '#0066B3';
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.fillText(bank.shortName, width / 2, infoY);

    // Account number
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.fillText(accountNumber, width / 2, infoY + 25);

    // Account name
    if (accountName) {
        ctx.fillStyle = '#666666';
        ctx.font = '13px Inter, sans-serif';
        ctx.fillText(accountName.toUpperCase(), width / 2, infoY + 45);
    }

    // Amount
    if (amount) {
        const amountValue = amount.replace(/[^\d]/g, '');
        if (amountValue && parseInt(amountValue) > 0) {
            ctx.fillStyle = '#00A650';
            ctx.font = 'bold 16px Inter, sans-serif';
            ctx.fillText(formatAmount(amount) + ' VND', width / 2, infoY + 70);
        }
    }

    // Footer
    ctx.fillStyle = '#999999';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText('CHUM VietQR', width / 2, height - 15);
}

// ============================================
// UPDATE INFO DISPLAY
// ============================================
function updateInfoDisplay(accountName, accountNumber, bankName, amount) {
    document.getElementById('infoAccountName').textContent = accountName || 'Chủ tài khoản';
    document.getElementById('infoAccountNumber').textContent = accountNumber;
    document.getElementById('infoBankName').textContent = bankName;

    if (amount) {
        document.getElementById('infoAmount').textContent = formatAmount(amount) + ' VND';
        document.getElementById('amountRow').style.display = 'flex';
    } else {
        document.getElementById('amountRow').style.display = 'none';
    }
}

// ============================================
// DOWNLOAD QR IMAGE
// ============================================
async function downloadQR() {
    const timestamp = new Date().toISOString().slice(0, 10);
    let accountNumber = '';

    if (currentMode === 'auto') {
        accountNumber = document.getElementById('accountNumber').value.trim();
    } else {
        accountNumber = document.getElementById('manualAccountNumber').value.trim();
    }

    const filename = `VietQR-${accountNumber || 'code'}-${timestamp}.png`;

    if (generatedImageUrl) {
        // Download from URL (auto mode)
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
    } else {
        // Download from canvas (manual mode)
        const canvas = document.getElementById('qrCanvas');
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
    }
}
