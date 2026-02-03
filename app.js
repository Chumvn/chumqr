/**
 * CHUM VietQR Generator
 * VietQR EMVCo Standard - NAPAS Format
 * Designed by CHUM / GIANG PRO
 */

// ============================================
// BANK DATA (Vietnamese Banks)
// ============================================
const BANKS = [
    { id: 17, code: "ICB", bin: "970415", name: "Ngân hàng TMCP Công thương Việt Nam", shortName: "VietinBank", logo: "https://cdn.vietqr.io/img/ICB.png" },
    { id: 43, code: "VCB", bin: "970436", name: "Ngân hàng TMCP Ngoại Thương Việt Nam", shortName: "Vietcombank", logo: "https://cdn.vietqr.io/img/VCB.png" },
    { id: 4, code: "BIDV", bin: "970418", name: "Ngân hàng TMCP Đầu tư và Phát triển Việt Nam", shortName: "BIDV", logo: "https://cdn.vietqr.io/img/BIDV.png" },
    { id: 42, code: "VBA", bin: "970405", name: "Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam", shortName: "Agribank", logo: "https://cdn.vietqr.io/img/VBA.png" },
    { id: 26, code: "OCB", bin: "970448", name: "Ngân hàng TMCP Phương Đông", shortName: "OCB", logo: "https://cdn.vietqr.io/img/OCB.png" },
    { id: 21, code: "MB", bin: "970422", name: "Ngân hàng TMCP Quân đội", shortName: "MBBank", logo: "https://cdn.vietqr.io/img/MB.png" },
    { id: 38, code: "TCB", bin: "970407", name: "Ngân hàng TMCP Kỹ thương Việt Nam", shortName: "Techcombank", logo: "https://cdn.vietqr.io/img/TCB.png" },
    { id: 2, code: "ACB", bin: "970416", name: "Ngân hàng TMCP Á Châu", shortName: "ACB", logo: "https://cdn.vietqr.io/img/ACB.png" },
    { id: 47, code: "VPB", bin: "970432", name: "Ngân hàng TMCP Việt Nam Thịnh Vượng", shortName: "VPBank", logo: "https://cdn.vietqr.io/img/VPB.png" },
    { id: 39, code: "TPB", bin: "970423", name: "Ngân hàng TMCP Tiên Phong", shortName: "TPBank", logo: "https://cdn.vietqr.io/img/TPB.png" },
    { id: 36, code: "STB", bin: "970403", name: "Ngân hàng TMCP Sài Gòn Thương Tín", shortName: "Sacombank", logo: "https://cdn.vietqr.io/img/STB.png" },
    { id: 12, code: "HDB", bin: "970437", name: "Ngân hàng TMCP Phát triển Thành phố Hồ Chí Minh", shortName: "HDBank", logo: "https://cdn.vietqr.io/img/HDB.png" },
    { id: 44, code: "VCCB", bin: "970454", name: "Ngân hàng TMCP Bản Việt", shortName: "VietCapitalBank", logo: "https://cdn.vietqr.io/img/VCCB.png" },
    { id: 31, code: "SCB", bin: "970429", name: "Ngân hàng TMCP Sài Gòn", shortName: "SCB", logo: "https://cdn.vietqr.io/img/SCB.png" },
    { id: 45, code: "VIB", bin: "970441", name: "Ngân hàng TMCP Quốc tế Việt Nam", shortName: "VIB", logo: "https://cdn.vietqr.io/img/VIB.png" },
    { id: 35, code: "SHB", bin: "970443", name: "Ngân hàng TMCP Sài Gòn - Hà Nội", shortName: "SHB", logo: "https://cdn.vietqr.io/img/SHB.png" },
    { id: 10, code: "EIB", bin: "970431", name: "Ngân hàng TMCP Xuất Nhập khẩu Việt Nam", shortName: "Eximbank", logo: "https://cdn.vietqr.io/img/EIB.png" },
    { id: 22, code: "MSB", bin: "970426", name: "Ngân hàng TMCP Hàng Hải Việt Nam", shortName: "MSB", logo: "https://cdn.vietqr.io/img/MSB.png" },
    { id: 53, code: "CAKE", bin: "546034", name: "Ngân hàng số CAKE by VPBank", shortName: "CAKE", logo: "https://cdn.vietqr.io/img/CAKE.png" },
    { id: 54, code: "Ubank", bin: "546035", name: "Ngân hàng số Ubank by VPBank", shortName: "Ubank", logo: "https://cdn.vietqr.io/img/UBANK.png" },
    { id: 65, code: "momo", bin: "971025", name: "Ví MoMo", shortName: "MoMo", logo: "https://cdn.vietqr.io/img/momo.png" },
    { id: 34, code: "SGICB", bin: "970400", name: "Ngân hàng TMCP Sài Gòn Công Thương", shortName: "SaigonBank", logo: "https://cdn.vietqr.io/img/SGICB.png" },
    { id: 3, code: "BAB", bin: "970409", name: "Ngân hàng TMCP Bắc Á", shortName: "BacABank", logo: "https://cdn.vietqr.io/img/BAB.png" },
    { id: 30, code: "PVCB", bin: "970412", name: "Ngân hàng TMCP Đại Chúng Việt Nam", shortName: "PVcomBank", logo: "https://cdn.vietqr.io/img/PVCB.png" },
    { id: 24, code: "NCB", bin: "970419", name: "Ngân hàng TMCP Quốc Dân", shortName: "NCB", logo: "https://cdn.vietqr.io/img/NCB.png" },
    { id: 37, code: "SHBVN", bin: "970424", name: "Ngân hàng TNHH MTV Shinhan Việt Nam", shortName: "ShinhanBank", logo: "https://cdn.vietqr.io/img/SHBVN.png" },
    { id: 1, code: "ABB", bin: "970425", name: "Ngân hàng TMCP An Bình", shortName: "ABBANK", logo: "https://cdn.vietqr.io/img/ABB.png" },
    { id: 41, code: "VAB", bin: "970427", name: "Ngân hàng TMCP Việt Á", shortName: "VietABank", logo: "https://cdn.vietqr.io/img/VAB.png" },
    { id: 23, code: "NAB", bin: "970428", name: "Ngân hàng TMCP Nam Á", shortName: "NamABank", logo: "https://cdn.vietqr.io/img/NAB.png" },
    { id: 29, code: "PGB", bin: "970430", name: "Ngân hàng TMCP Thịnh vượng và Phát triển", shortName: "PGBank", logo: "https://cdn.vietqr.io/img/PGB.png" },
    { id: 46, code: "VIETBANK", bin: "970433", name: "Ngân hàng TMCP Việt Nam Thương Tín", shortName: "VietBank", logo: "https://cdn.vietqr.io/img/VIETBANK.png" },
    { id: 5, code: "BVB", bin: "970438", name: "Ngân hàng TMCP Bảo Việt", shortName: "BaoVietBank", logo: "https://cdn.vietqr.io/img/BVB.png" },
    { id: 33, code: "SEAB", bin: "970440", name: "Ngân hàng TMCP Đông Nam Á", shortName: "SeABank", logo: "https://cdn.vietqr.io/img/SEAB.png" },
    { id: 52, code: "COOPBANK", bin: "970446", name: "Ngân hàng Hợp tác xã Việt Nam", shortName: "COOPBANK", logo: "https://cdn.vietqr.io/img/COOPBANK.png" },
    { id: 20, code: "LPB", bin: "970449", name: "Ngân hàng TMCP Lộc Phát Việt Nam", shortName: "LPBank", logo: "https://cdn.vietqr.io/img/LPB.png" },
    { id: 19, code: "KLB", bin: "970452", name: "Ngân hàng TMCP Kiên Long", shortName: "KienLongBank", logo: "https://cdn.vietqr.io/img/KLB.png" },
    { id: 55, code: "KBank", bin: "668888", name: "Ngân hàng Đại chúng TNHH Kasikornbank", shortName: "KBank", logo: "https://cdn.vietqr.io/img/KBANK.png" },
    { id: 7, code: "CIMB", bin: "422589", name: "Ngân hàng TNHH MTV CIMB Việt Nam", shortName: "CIMB", logo: "https://cdn.vietqr.io/img/CIMB.png" },
    { id: 49, code: "WVN", bin: "970457", name: "Ngân hàng TNHH MTV Woori Việt Nam", shortName: "Woori", logo: "https://cdn.vietqr.io/img/WVN.png" }
];

// ============================================
// STATE
// ============================================
let generatedQRData = null;
let bankLogoLoaded = null;
let napasLogoLoaded = null;
let vietqrLogoLoaded = null;

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initBankSelect();
    initEventListeners();
    formatAmountInput();
    preloadLogos();
});

// ============================================
// PRELOAD LOGOS
// ============================================
function preloadLogos() {
    // Preload NAPAS logo
    napasLogoLoaded = new Image();
    napasLogoLoaded.crossOrigin = 'anonymous';
    napasLogoLoaded.src = 'https://cdn.vietqr.io/img/NAPAS247.png';

    // Preload VietQR logo
    vietqrLogoLoaded = new Image();
    vietqrLogoLoaded.crossOrigin = 'anonymous';
    vietqrLogoLoaded.src = 'https://cdn.vietqr.io/img/vietqr.png';
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
// BANK SELECT
// ============================================
function initBankSelect() {
    const select = document.getElementById('bankSelect');
    BANKS.sort((a, b) => a.shortName.localeCompare(b.shortName));

    BANKS.forEach(bank => {
        const option = document.createElement('option');
        option.value = bank.bin;
        option.textContent = `${bank.shortName} - ${bank.name}`;
        option.dataset.logo = bank.logo;
        option.dataset.code = bank.code;
        select.appendChild(option);
    });
}

// ============================================
// EVENT LISTENERS
// ============================================
function initEventListeners() {
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('generateBtn').addEventListener('click', generateQR);
    document.getElementById('downloadBtn').addEventListener('click', downloadQR);
    document.getElementById('qrCanvas').addEventListener('click', downloadQR);

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
// VietQR EMVCo GENERATOR (NAPAS Standard)
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

function removeVietnameseDiacritics(str) {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .replace(/[^a-zA-Z0-9\s]/g, '');
}

// ============================================
// QR GENERATION
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

    const qrString = generateVietQRString(bankBin, accountNumber, amount, memo);
    const selectedBank = BANKS.find(b => b.bin === bankBin);

    generatedQRData = {
        qrString,
        bankName: selectedBank?.name || '',
        bankShortName: selectedBank?.shortName || '',
        bankLogo: selectedBank?.logo || '',
        accountNumber,
        accountName: accountName || 'Chủ tài khoản',
        amount: amount || '',
        memo: memo || ''
    };

    // Load bank logo then render
    bankLogoLoaded = new Image();
    bankLogoLoaded.crossOrigin = 'anonymous';
    bankLogoLoaded.onload = () => renderVietQR(generatedQRData);
    bankLogoLoaded.onerror = () => renderVietQR(generatedQRData);
    bankLogoLoaded.src = generatedQRData.bankLogo;

    document.getElementById('previewCard').classList.add('visible');
    document.getElementById('previewCard').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ============================================
// RENDER STANDARD VIETQR
// ============================================
function renderVietQR(data) {
    const canvas = document.getElementById('qrCanvas');
    const ctx = canvas.getContext('2d');

    // Canvas size - VietQR Standard ratio
    const width = 400;
    const height = 600;
    const qrSize = 280;
    const padding = 30;
    const borderRadius = 20;

    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw gradient border
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#00A650');  // Green
    gradient.addColorStop(0.5, '#0066B3'); // Blue
    gradient.addColorStop(1, '#00A650');   // Green

    ctx.fillStyle = gradient;
    roundRect(ctx, 0, 0, width, height, borderRadius, true, false);

    // Draw white inner background
    ctx.fillStyle = '#ffffff';
    roundRect(ctx, 8, 8, width - 16, height - 16, borderRadius - 4, true, false);

    // Draw VietQR Logo at top
    const vietqrLogoY = 25;
    if (vietqrLogoLoaded && vietqrLogoLoaded.complete && vietqrLogoLoaded.naturalWidth > 0) {
        const logoWidth = 140;
        const logoHeight = 50;
        ctx.drawImage(vietqrLogoLoaded, (width - logoWidth) / 2, vietqrLogoY, logoWidth, logoHeight);
    } else {
        // Fallback: Draw text logo
        drawVietQRTextLogo(ctx, width / 2, vietqrLogoY + 35);
    }

    // QR code position
    const qrX = (width - qrSize) / 2;
    const qrY = 90;

    // Draw QR code border
    ctx.strokeStyle = '#1a3a5c';
    ctx.lineWidth = 3;
    roundRect(ctx, qrX - 10, qrY - 10, qrSize + 20, qrSize + 20, 8, false, true);

    // Generate and draw QR code
    const qr = qrcode(0, 'M');
    qr.addData(data.qrString);
    qr.make();

    const moduleCount = qr.getModuleCount();
    const moduleSize = qrSize / moduleCount;

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

    // Draw VietQR checkmark in center of QR
    const centerX = width / 2;
    const centerY = qrY + qrSize / 2;
    const checkSize = 45;

    // White circle background
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(centerX, centerY, checkSize / 2 + 8, 0, Math.PI * 2);
    ctx.fill();

    // Draw checkmark
    drawCheckmark(ctx, centerX, centerY, checkSize);

    // Draw NAPAS 247 and Bank logo section
    const logoSectionY = qrY + qrSize + 25;

    // Draw NAPAS logo
    if (napasLogoLoaded && napasLogoLoaded.complete && napasLogoLoaded.naturalWidth > 0) {
        const napasWidth = 100;
        const napasHeight = 35;
        ctx.drawImage(napasLogoLoaded, width / 2 - napasWidth - 15, logoSectionY, napasWidth, napasHeight);
    } else {
        // Fallback text
        ctx.fillStyle = '#1a3a5c';
        ctx.font = 'bold 14px Inter, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('napas', width / 2 - 20, logoSectionY + 20);
        ctx.fillStyle = '#e31837';
        ctx.fillText('247', width / 2 - 20, logoSectionY + 35);
    }

    // Separator line
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width / 2, logoSectionY + 5);
    ctx.lineTo(width / 2, logoSectionY + 35);
    ctx.stroke();

    // Draw Bank logo
    if (bankLogoLoaded && bankLogoLoaded.complete && bankLogoLoaded.naturalWidth > 0) {
        const bankLogoWidth = 100;
        const bankLogoHeight = 35;
        ctx.drawImage(bankLogoLoaded, width / 2 + 15, logoSectionY, bankLogoWidth, bankLogoHeight);
    } else {
        ctx.fillStyle = '#1a3a5c';
        ctx.font = 'bold 14px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(data.bankShortName, width / 2 + 20, logoSectionY + 25);
    }

    // Draw account info
    const infoY = logoSectionY + 55;
    ctx.textAlign = 'center';

    // Account name
    ctx.fillStyle = '#333333';
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText('Tên chủ TK: ' + data.accountName.toUpperCase(), width / 2, infoY);

    // Account number
    ctx.fillStyle = '#0066B3';
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.fillText('Số TK: ' + data.accountNumber, width / 2, infoY + 25);

    // Bank name
    ctx.fillStyle = '#666666';
    ctx.font = '13px Inter, sans-serif';
    const bankNameLines = wrapText(ctx, data.bankName, width - 60);
    bankNameLines.forEach((line, i) => {
        ctx.fillText(line, width / 2, infoY + 50 + (i * 18));
    });

    // Amount if exists
    if (data.amount) {
        const amountY = infoY + 50 + (bankNameLines.length * 18) + 10;
        ctx.fillStyle = '#00A650';
        ctx.font = 'bold 18px Inter, sans-serif';
        ctx.fillText('Số tiền: ' + data.amount + ' VND', width / 2, amountY);
    }

    // Footer
    ctx.fillStyle = '#999999';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('Tạo bởi CHUM VietQR', width - 15, height - 18);
}

function drawVietQRTextLogo(ctx, x, y) {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // V
    ctx.fillStyle = '#e31837';
    ctx.font = 'bold 36px Outfit, sans-serif';
    ctx.fillText('V', x - 55, y);

    // IET
    ctx.fillStyle = '#0066B3';
    ctx.fillText('IET', x - 10, y);

    // QR
    ctx.fillText('QR', x + 50, y);
}

function drawCheckmark(ctx, x, y, size) {
    // Red checkmark like VietQR
    ctx.fillStyle = '#e31837';
    ctx.beginPath();
    ctx.moveTo(x - size / 3, y);
    ctx.lineTo(x - size / 8, y + size / 3);
    ctx.lineTo(x + size / 3, y - size / 4);
    ctx.lineTo(x + size / 3 - 4, y - size / 4 - 4);
    ctx.lineTo(x - size / 8, y + size / 6);
    ctx.lineTo(x - size / 3 + 4, y - 4);
    ctx.closePath();
    ctx.fill();
}

function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + ' ' + word).width;
        if (width < maxWidth) {
            currentLine += ' ' + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
}

// ============================================
// DOWNLOAD
// ============================================
function downloadQR() {
    const canvas = document.getElementById('qrCanvas');
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().slice(0, 10);
    link.download = `VietQR-${generatedQRData?.accountNumber || 'code'}-${timestamp}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
}
