# 💳 CHUM VietQR Generator

> Tạo mã QR thanh toán VietQR chuẩn NAPAS - Sử dụng VietQR.io API

[![GitHub Pages](https://img.shields.io/badge/Live-Demo-brightgreen)](https://chumvn.github.io/chumqr/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## ✨ Features

- 🏦 **65+ Ngân hàng Việt Nam** - Danh sách cập nhật trực tiếp từ VietQR.io API
- 📱 **VietQR chuẩn NAPAS 247** - Quét được bằng mọi app ngân hàng
- 🎨 **Neumorphism UI** - Giao diện đẹp, hiện đại
- 🌓 **Dark/Light Mode** - Tự động theo system preference
- 📥 **Xuất PNG** - Click vào ảnh hoặc nút để lưu

## 🚀 Quick Start

1. Truy cập [https://chumvn.github.io/chumqr/](https://chumvn.github.io/chumqr/)
2. Chọn ngân hàng
3. Nhập số tài khoản
4. Nhập tên chủ TK, số tiền, nội dung (tùy chọn)
5. Bấm **Tạo mã VietQR** → Click ảnh để lưu!

## 🔧 Tech Stack

- HTML5 / CSS3 / JavaScript (Vanilla)
- [VietQR.io Quick Link API](https://vietqr.io/) - QR generation
- Neumorphism Design System

## 🔗 VietQR.io API

Ứng dụng sử dụng VietQR.io Quick Link API:

```
https://img.vietqr.io/image/{BANK_CODE}-{ACCOUNT_NO}-compact2.png
  ?amount={AMOUNT}
  &addInfo={DESCRIPTION}
  &accountName={NAME}
```

**API Endpoints:**
- Bank List: `https://api.vietqr.io/v2/banks`
- QR Image: `https://img.vietqr.io/image/...`

## 📦 Local Development

```bash
git clone https://github.com/Chumvn/chumqr.git
cd chumqr
# Open index.html in browser
```

## 📄 License

MIT License - feel free to use for personal and commercial projects.

## 👤 Author

**CHUM / GIANG PRO**

- GitHub: [@Chumvn](https://github.com/Chumvn)

---

⭐ Star this repo if you find it useful!
