/**
 * CHUM VietQR Generator
 * Tab 1: VietQR Generator (VietQR.io API)
 * Tab 2: OCR - Text Recognition from Image (Tesseract.js)
 * Designed by CHUM / GIANG PRO
 */

// ============================================
// STATE
// ============================================
let BANKS = [];
let generatedImageUrl = null;
let ocrFile = null;

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadBankList();
    initEventListeners();
    initTabs();
    initOCR();
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
    // Update buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    // Update content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    if (tabId === 'qr') {
        document.getElementById('tabQR').classList.add('active');
    } else {
        document.getElementById('tabOCR').classList.add('active');
    }

    // Hide QR preview when switching
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

    try {
        const response = await fetch('https://api.vietqr.io/v2/banks');
        const result = await response.json();

        if (result.code === '00' && result.data) {
            BANKS = result.data.filter(bank => bank.transferSupported === 1);
            BANKS.sort((a, b) => a.shortName.localeCompare(b.shortName));

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

    // QR Tab
    document.getElementById('generateBtn').addEventListener('click', generateQR);
    document.getElementById('amount').addEventListener('input', formatAmountInput);
    document.getElementById('downloadBtn').addEventListener('click', downloadQR);
    document.getElementById('qrImage').addEventListener('click', downloadQR);

    // OCR Tab
    document.getElementById('ocrBtn').addEventListener('click', runOCR);
    document.getElementById('copyResult').addEventListener('click', copyResult);
    document.getElementById('removeImage').addEventListener('click', removeOCRImage);
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
// TAB 1: VIETQR GENERATOR
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
    const loadingIndicator = document.getElementById('loadingIndicator');

    loadingIndicator.style.display = 'flex';
    qrImage.style.display = 'none';

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
    if (!generatedImageUrl) return;

    try {
        const response = await fetch(generatedImageUrl);
        const blob = await response.blob();
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().slice(0, 10);
        const accountNumber = document.getElementById('accountNumber').value.trim();
        link.download = `VietQR-${accountNumber || 'code'}-${timestamp}.png`;
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error('Download failed:', error);
        window.open(generatedImageUrl, '_blank');
    }
}

// ============================================
// TAB 2: OCR - TEXT RECOGNITION
// ============================================
function initOCR() {
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('ocrFileInput');

    // Click to upload
    uploadZone.addEventListener('click', () => fileInput.click());

    // File selected
    fileInput.addEventListener('change', handleFileSelect);

    // Drag and drop
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragover');
    });

    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('dragover');
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}

function handleFile(file) {
    // Validate file type
    if (!file.type.match('image.*')) {
        alert('Vui lòng chọn file ảnh!');
        return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
        alert('File quá lớn! Tối đa 10MB.');
        return;
    }

    ocrFile = file;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById('ocrImage').src = e.target.result;
        document.getElementById('ocrPreview').style.display = 'block';
        document.getElementById('uploadZone').style.display = 'none';
        document.getElementById('ocrBtn').disabled = false;
    };
    reader.readAsDataURL(file);
}

function removeOCRImage() {
    ocrFile = null;
    document.getElementById('ocrPreview').style.display = 'none';
    document.getElementById('uploadZone').style.display = 'flex';
    document.getElementById('ocrBtn').disabled = true;
    document.getElementById('ocrFileInput').value = '';
    document.getElementById('ocrResult').style.display = 'none';
    document.getElementById('ocrProgress').style.display = 'none';
}

async function runOCR() {
    if (!ocrFile) return;

    const language = document.getElementById('ocrLanguage').value;
    const progressEl = document.getElementById('ocrProgress');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const resultEl = document.getElementById('ocrResult');
    const ocrTextEl = document.getElementById('ocrText');

    // Show progress
    progressEl.style.display = 'block';
    resultEl.style.display = 'none';
    document.getElementById('ocrBtn').disabled = true;
    progressFill.style.width = '30%';
    progressText.textContent = 'Đang tải ảnh lên...';

    // OCR.space API - Free public key
    const API_KEY = 'K85730633088957';

    // Map language codes
    const langMap = {
        'vie': 'vie',
        'eng': 'eng',
        'vie+eng': 'vie'  // OCR.space doesn't support multiple, use Vietnamese
    };

    try {
        // Prepare form data
        const formData = new FormData();
        formData.append('file', ocrFile);
        formData.append('language', langMap[language] || 'vie');
        formData.append('isOverlayRequired', 'false');
        formData.append('OCREngine', '2');  // Engine 2 is better for Asian languages

        progressFill.style.width = '60%';
        progressText.textContent = 'Đang nhận dạng văn bản...';

        const response = await fetch('https://api.ocr.space/parse/image', {
            method: 'POST',
            headers: {
                'apikey': API_KEY
            },
            body: formData
        });

        const result = await response.json();

        progressFill.style.width = '100%';
        progressText.textContent = 'Hoàn thành!';

        if (result.IsErroredOnProcessing) {
            throw new Error(result.ErrorMessage || 'OCR processing failed');
        }

        if (result.ParsedResults && result.ParsedResults.length > 0) {
            const text = result.ParsedResults.map(r => r.ParsedText).join('\n').trim();

            // Show result
            setTimeout(() => {
                progressEl.style.display = 'none';
                resultEl.style.display = 'block';
                ocrTextEl.value = text || 'Không nhận dạng được văn bản trong ảnh.';
            }, 500);
        } else {
            throw new Error('No text found');
        }

    } catch (error) {
        console.error('OCR failed:', error);
        progressEl.style.display = 'none';
        alert('Lỗi nhận dạng! ' + (error.message || 'Vui lòng thử lại.'));
    }

    document.getElementById('ocrBtn').disabled = false;
}

function copyResult() {
    const text = document.getElementById('ocrText').value;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('copyResult');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '✓ Đã copy';
        setTimeout(() => {
            btn.innerHTML = originalHTML;
        }, 2000);
    });
}
