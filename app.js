/**
 * CHUM VietQR Frame Studio
 * VietQR EMVCo Standard Generator
 * Designed by CHUM / GIANG PRO
 */

// ============================================
// BANK DATA (65+ Vietnamese Banks)
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
// TEMPLATES (12 Premium Designs)
// ============================================
const TEMPLATES = {
    classic: {
        name: "Classic",
        icon: "📋",
        bgColor: "#ffffff",
        borderColor: "#e0e0e0",
        textColor: "#333333",
        accentColor: "#1a73e8"
    },
    neumorphism: {
        name: "Soft UI",
        icon: "🌸",
        bgColor: "#e0e5ec",
        borderColor: "#e0e5ec",
        textColor: "#2d3436",
        accentColor: "#6c5ce7",
        shadow: true
    },
    glass: {
        name: "Glass",
        icon: "💎",
        bgColor: "rgba(255,255,255,0.85)",
        borderColor: "rgba(255,255,255,0.5)",
        textColor: "#333333",
        accentColor: "#00b4d8",
        gradient: ["#667eea", "#764ba2"]
    },
    premiumBlack: {
        name: "VIP Black",
        icon: "👑",
        bgColor: "#0a0a0a",
        borderColor: "#1a1a1a",
        textColor: "#ffd700",
        accentColor: "#ffd700",
        gradient: ["#0a0a0a", "#1a1a1a"],
        premium: true
    },
    neonCyber: {
        name: "Neon",
        icon: "⚡",
        bgColor: "#0f0f23",
        borderColor: "#00ff88",
        textColor: "#00ff88",
        accentColor: "#ff00ff",
        gradient: ["#0f0f23", "#1a1a3e"],
        neon: true
    },
    hologram: {
        name: "Hologram",
        icon: "🌈",
        bgColor: "#1a1a2e",
        borderColor: "#ff6b6b",
        textColor: "#ffffff",
        accentColor: "#4ecdc4",
        gradient: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7"],
        hologram: true
    },
    aurora: {
        name: "Aurora",
        icon: "🔮",
        bgColor: "#0c1445",
        borderColor: "#00d9ff",
        textColor: "#00d9ff",
        accentColor: "#ff6bcb",
        gradient: ["#0c1445", "#1a237e", "#311b92"],
        aurora: true
    },
    gradientPro: {
        name: "Gradient",
        icon: "💜",
        bgColor: "#667eea",
        borderColor: "#764ba2",
        textColor: "#ffffff",
        accentColor: "#ffecd2",
        gradient: ["#667eea", "#764ba2"]
    },
    goldElite: {
        name: "Gold VIP",
        icon: "🏆",
        bgColor: "#1a1a1a",
        borderColor: "#d4af37",
        textColor: "#d4af37",
        accentColor: "#f4e4bc",
        gradient: ["#1a1a1a", "#2d2d2d"],
        gold: true
    },
    dark: {
        name: "Dark",
        icon: "🌙",
        bgColor: "#1a1a2e",
        borderColor: "#16213e",
        textColor: "#e0e0e0",
        accentColor: "#a29bfe"
    },
    floating: {
        name: "Floating",
        icon: "☁️",
        bgColor: "#f8f9fa",
        borderColor: "#dee2e6",
        textColor: "#495057",
        accentColor: "#845ef7",
        gradient: ["#f093fb", "#f5576c"]
    },
    tet2026: {
        name: "Tết 2026",
        icon: "🧧",
        bgColor: "#fff8e1",
        borderColor: "#c9282d",
        textColor: "#c9282d",
        accentColor: "#ffd700",
        decoration: "tet"
    }
};

// ============================================
// STATE
// ============================================
let currentTemplate = 'classic';
let generatedQRData = null;

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initBankSelect();
    initTemplates();
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
// TEMPLATES
// ============================================
function initTemplates() {
    const grid = document.getElementById('templateGrid');

    Object.entries(TEMPLATES).forEach(([key, template]) => {
        const item = document.createElement('div');
        item.className = `template-item template-${key}${key === currentTemplate ? ' active' : ''}`;
        item.dataset.template = key;
        item.innerHTML = `
            <div class="template-preview">${template.icon}</div>
            <span class="template-name">${template.name}</span>
        `;
        item.addEventListener('click', () => selectTemplate(key));
        grid.appendChild(item);
    });
}

function selectTemplate(templateKey) {
    currentTemplate = templateKey;
    document.querySelectorAll('.template-item').forEach(item => {
        item.classList.toggle('active', item.dataset.template === templateKey);
    });

    if (generatedQRData) {
        renderQRWithFrame(generatedQRData);
    }
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

/**
 * Generate VietQR string following EMVCo specification
 * Format: TLV (Tag-Length-Value)
 * Reference: https://www.vietqr.io
 */
function generateVietQRString(bankBin, accountNumber, amount, memo) {
    // Helper function to create TLV field
    function tlv(id, value) {
        const len = value.length.toString().padStart(2, '0');
        return id + len + value;
    }

    // ID 00: Payload Format Indicator (Fixed: "01")
    const field00 = tlv("00", "01");

    // ID 01: Point of Initiation Method ("11" = Static, "12" = Dynamic)
    const field01 = tlv("01", "12");

    // ID 38: Merchant Account Information (VietQR/NAPAS)
    // Sub-field 00: GUID (NAPAS BNB ID)
    const subField38_00 = tlv("00", "A000000727");

    // Sub-field 01: Beneficiary Organization
    // Contains: 00 = BIN (acquirer ID), 01 = Account Number
    const beneficiaryInfo = tlv("00", bankBin) + tlv("01", accountNumber);
    const subField38_01 = tlv("01", beneficiaryInfo);

    // Sub-field 02: Service Code (QRIBFTTA = Transfer to Account)
    const subField38_02 = tlv("02", "QRIBFTTA");

    // Combine field 38
    const field38Content = subField38_00 + subField38_01 + subField38_02;
    const field38 = tlv("38", field38Content);

    // ID 53: Transaction Currency (704 = VND)
    const field53 = tlv("53", "704");

    // ID 54: Transaction Amount (optional)
    let field54 = "";
    if (amount) {
        const amountValue = amount.replace(/[^\d]/g, '');
        if (amountValue && parseInt(amountValue) > 0) {
            field54 = tlv("54", amountValue);
        }
    }

    // ID 58: Country Code (VN)
    const field58 = tlv("58", "VN");

    // ID 62: Additional Data Field Template (optional)
    let field62 = "";
    if (memo && memo.trim()) {
        // Sub-field 08: Purpose of Transaction
        const memoClean = removeVietnameseDiacritics(memo.trim()).substring(0, 25);
        const subField62_08 = tlv("08", memoClean);
        field62 = tlv("62", subField62_08);
    }

    // Assemble QR string (without CRC)
    let qrString = field00 + field01 + field38 + field53 + field54 + field58 + field62;

    // ID 63: CRC (CRC-16/CCITT-FALSE)
    // Add placeholder for CRC calculation
    qrString += "6304";

    // Calculate and append CRC
    const crc = calculateCRC16(qrString);
    qrString += crc;

    console.log("Generated VietQR:", qrString);
    return qrString;
}

function calculateCRC16(str) {
    // CRC-16/CCITT-FALSE (Polynomial: 0x1021, Init: 0xFFFF)
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

    // Validation
    if (!bankBin) {
        alert('Vui lòng chọn ngân hàng!');
        return;
    }
    if (!accountNumber) {
        alert('Vui lòng nhập số tài khoản!');
        return;
    }

    // Generate VietQR string
    const qrString = generateVietQRString(bankBin, accountNumber, amount, memo);

    // Get bank info
    const selectedBank = BANKS.find(b => b.bin === bankBin);

    // Store data for rendering
    generatedQRData = {
        qrString,
        bankName: selectedBank?.shortName || '',
        bankLogo: selectedBank?.logo || '',
        accountNumber,
        accountName: accountName || 'Chủ tài khoản',
        amount: amount || '',
        memo: memo || ''
    };

    // Render QR with frame
    renderQRWithFrame(generatedQRData);

    // Show preview card
    document.getElementById('previewCard').classList.add('visible');
    document.getElementById('previewCard').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ============================================
// RENDER QR WITH FRAME
// ============================================
function renderQRWithFrame(data) {
    const canvas = document.getElementById('qrCanvas');
    const ctx = canvas.getContext('2d');
    const template = TEMPLATES[currentTemplate];

    // Canvas size
    const width = 400;
    const height = 520;
    const qrSize = 240;
    const padding = 30;

    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background based on template
    drawTemplateBackground(ctx, width, height, template);

    // Draw QR code container (white background for QR)
    const qrX = (width - qrSize - 20) / 2;
    const qrY = 80;

    // White background for QR (MANDATORY - ensures scannability)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(qrX, qrY, qrSize + 20, qrSize + 20);

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
                    qrX + 10 + col * moduleSize,
                    qrY + 10 + row * moduleSize,
                    moduleSize,
                    moduleSize
                );
            }
        }
    }

    // Draw text info
    const textY = qrY + qrSize + 50;
    ctx.textAlign = 'center';

    // Bank name
    ctx.fillStyle = template.textColor;
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.fillText(data.bankName, width / 2, textY);

    // Account number
    ctx.font = '16px Inter, sans-serif';
    ctx.fillText(data.accountNumber, width / 2, textY + 28);

    // Account name
    ctx.font = '14px Inter, sans-serif';
    ctx.fillStyle = template.accentColor;
    ctx.fillText(data.accountName.toUpperCase(), width / 2, textY + 52);

    // Amount if exists
    if (data.amount) {
        ctx.font = 'bold 20px Inter, sans-serif';
        ctx.fillStyle = template.textColor;
        ctx.fillText(data.amount + ' VND', width / 2, textY + 82);
    }

    // Draw header
    ctx.fillStyle = template.textColor;
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.fillText('Quét mã để thanh toán', width / 2, 50);

    // Draw template decorations
    drawTemplateDecorations(ctx, width, height, template);
}

function drawTemplateBackground(ctx, width, height, template) {
    // Draw gradient background if template has gradient
    if (template.gradient && Array.isArray(template.gradient)) {
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        const colors = template.gradient;

        if (template.hologram) {
            // Hologram - rainbow gradient
            colors.forEach((color, i) => {
                gradient.addColorStop(i / (colors.length - 1), color);
            });
        } else if (template.aurora) {
            // Aurora - vertical gradient
            const auroraGrad = ctx.createLinearGradient(0, 0, 0, height);
            colors.forEach((color, i) => {
                auroraGrad.addColorStop(i / (colors.length - 1), color);
            });
            ctx.fillStyle = auroraGrad;
            ctx.fillRect(0, 0, width, height);
            return;
        } else {
            // Standard 2-color gradient
            gradient.addColorStop(0, colors[0]);
            gradient.addColorStop(1, colors[colors.length - 1]);
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Glass overlay effect
        if (currentTemplate === 'glass') {
            ctx.fillStyle = 'rgba(255,255,255,0.15)';
            roundRect(ctx, 20, 20, width - 40, height - 40, 20, true, false);
        }
    } else {
        // Solid background
        ctx.fillStyle = template.bgColor;
        ctx.fillRect(0, 0, width, height);
    }

    // Premium Black - gold border glow
    if (template.premium) {
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 20;
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 3;
        roundRect(ctx, 15, 15, width - 30, height - 30, 20, false, true);
        ctx.shadowColor = 'transparent';
    }

    // Neon Cyber - neon glow border
    if (template.neon) {
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 25;
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 2;
        roundRect(ctx, 12, 12, width - 24, height - 24, 15, false, true);

        // Second neon line
        ctx.shadowColor = '#ff00ff';
        ctx.strokeStyle = '#ff00ff';
        roundRect(ctx, 18, 18, width - 36, height - 36, 12, false, true);
        ctx.shadowColor = 'transparent';
    }

    // Gold Elite - double gold border
    if (template.gold) {
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 4;
        roundRect(ctx, 10, 10, width - 20, height - 20, 20, false, true);
        ctx.strokeStyle = '#f4e4bc';
        ctx.lineWidth = 1;
        roundRect(ctx, 16, 16, width - 32, height - 32, 17, false, true);
    }

    // Hologram - shimmer effect
    if (template.hologram) {
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * 120);
            ctx.lineTo(width, i * 120 + 60);
            ctx.lineTo(width, i * 120 + 80);
            ctx.lineTo(0, i * 120 + 20);
            ctx.closePath();
            ctx.fill();
        }
    }

    // Aurora - add glow circles
    if (template.aurora) {
        ctx.globalAlpha = 0.3;
        const auroraColors = ['#00d9ff', '#ff6bcb', '#00ff88'];
        auroraColors.forEach((color, i) => {
            ctx.beginPath();
            ctx.arc(width * (0.2 + i * 0.3), 100, 80, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
        });
        ctx.globalAlpha = 1;
    }

    // Neumorphism effect
    if (template.shadow && currentTemplate === 'neumorphism') {
        ctx.shadowColor = '#a3b1c6';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 8;
        ctx.shadowOffsetY = 8;
        ctx.fillStyle = template.bgColor;
        roundRect(ctx, 15, 15, width - 30, height - 30, 20, true, false);
        ctx.shadowColor = 'transparent';
    }

    // Border for classic
    if (currentTemplate === 'classic') {
        ctx.strokeStyle = template.borderColor;
        ctx.lineWidth = 2;
        roundRect(ctx, 10, 10, width - 20, height - 20, 15, false, true);
    }

    // Dark mode inner glow
    if (currentTemplate === 'dark') {
        ctx.fillStyle = '#16213e';
        roundRect(ctx, 15, 15, width - 30, height - 30, 15, true, false);
    }
}

function drawTemplateDecorations(ctx, width, height, template) {
    // Tết 2026 decorations
    if (template.decoration === 'tet') {
        ctx.fillStyle = '#c9282d';
        ctx.font = '24px serif';
        ctx.textAlign = 'center';
        ctx.fillText('🌸', 40, 40);
        ctx.fillText('🌸', width - 40, 40);
        ctx.fillText('🧧', 40, height - 30);
        ctx.fillText('🧧', width - 40, height - 30);

        // Gold accent line
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(60, height - 15);
        ctx.lineTo(width - 60, height - 15);
        ctx.stroke();

        // Tết text
        ctx.fillStyle = '#c9282d';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillText('Chúc Mừng Năm Mới 2026', width / 2, height - 25);
    }

    // Premium decorations
    if (template.premium) {
        ctx.fillStyle = '#ffd700';
        ctx.font = '16px serif';
        ctx.textAlign = 'center';
        ctx.fillText('👑', width / 2, 30);
    }

    // Gold Elite crown
    if (template.gold) {
        ctx.fillStyle = '#d4af37';
        ctx.font = '20px serif';
        ctx.textAlign = 'center';
        ctx.fillText('🏆', width / 2, 35);
    }

    // Neon corner accents
    if (template.neon) {
        ctx.fillStyle = '#00ff88';
        ctx.font = '14px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('◢', 20, height - 15);
        ctx.textAlign = 'right';
        ctx.fillText('◣', width - 20, height - 15);
    }
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
    link.download = `CHUM-VietQR-${timestamp}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
}
