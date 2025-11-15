# AIESEC Carthage - Website

<div align="center">

![AIESEC Carthage](https://img.shields.io/badge/AIESEC-Carthage-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

**A modern, responsive website for AIESEC Carthage built with cutting-edge web technologies**

[Features](#-features) • [Installation](#-installation) • [Deployment](#-deployment) • [Documentation](#-documentation) • [License](#-license)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Technologies](#-technologies)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Deployment](#-deployment)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)
- [Contact](#-contact)

## 🎯 About

This is a professional, modern website for **AIESEC Carthage**, designed to showcase the organization's mission, programs, and provide a comprehensive recruitment platform. The website features a responsive design, Progressive Web App (PWA) capabilities, and an integrated admin dashboard for managing applications.

### Key Highlights

- ✨ **Modern Design**: Clean, professional UI/UX with AIESEC branding
- 📱 **Fully Responsive**: Mobile-first approach ensuring perfect display on all devices
- 🚀 **PWA Ready**: Installable web app with offline capabilities
- ⚡ **Performance Optimized**: Fast loading times with lazy loading and caching
- 🔒 **Secure**: HTTPS enforced with security headers and XSS protection
- 📊 **Admin Dashboard**: Complete management system for applications
- 🔍 **SEO Optimized**: Meta tags, Open Graph, and structured data

## ✨ Features

### Core Features

- **Responsive Design**: Mobile-first approach with Bootstrap 3
- **Progressive Web App (PWA)**: Installable with offline capabilities
- **Modern UI/UX**: Clean, professional design with AIESEC branding
- **Recruitment System**: Complete application form with admin dashboard
- **Performance Optimized**: Fast loading with lazy loading and caching
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Analytics Ready**: Google Analytics 4 and Facebook Pixel integration

### Admin Features

- **Dashboard Access**: Secure login system
- **Application Management**: View, export, and delete applications
- **Real-time Statistics**: Track application metrics
- **Search & Filter**: Advanced filtering capabilities
- **Data Export**: Export individual applications

### Technical Features

- **Service Worker**: Offline functionality
- **Lazy Loading**: Optimized image loading
- **CDN Integration**: Fast content delivery
- **Form Validation**: Client and server-side validation
- **Security Headers**: Content Security Policy

## 🛠️ Technologies

### Frontend

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox/Grid
- **JavaScript (ES6+)**: Interactive functionality
- **Bootstrap 3**: Responsive framework
- **jQuery**: DOM manipulation

### Libraries & Tools

- **Font Awesome**: Icon library
- **Owl Carousel**: Image carousels
- **DataTables**: Admin table functionality
- **Formspree**: Form submission handling
- **Vercel**: Hosting and deployment

## 📁 Project Structure

```
enlight-master/
├── index.html              # Main homepage
├── login.html              # Admin login page
├── dashboard.html          # Admin dashboard
├── about.html              # About page
├── contact.html            # Contact page
├── courses.html            # Courses page
├── events.html             # Events page
├── gallery.html            # Gallery page
├── news.html               # News page
├── teachers.html           # Teachers page
├── thank-you.html          # Thank you page
├── css/                    # Stylesheets
│   ├── custom.css          # Custom styles
│   ├── style.css           # Main styles
│   └── vendor/             # Third-party CSS
├── js/                     # JavaScript files
│   ├── custom.js           # Custom JavaScript
│   ├── main.js             # Main JavaScript
│   └── vendor/             # Third-party JS
├── img/                    # Images and assets
├── fonts/                  # Font files
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
├── vercel.json             # Vercel configuration
└── package.json            # Dependencies
```

## 🚀 Installation

### Prerequisites

- A modern web browser
- Git (optional, for version control)
- Node.js (optional, for local development)

### Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/aiesec-carthage.git
   cd aiesec-carthage
   ```

2. **Open in browser**:
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve
     ```

3. **Access the website**:
   - Open `http://localhost:8000` in your browser

## 🌐 Deployment

### Deploy on Vercel (Recommended)

#### Method 1: Deploy from Git

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/aiesec-carthage.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the settings
   - Click "Deploy"

#### Method 2: Deploy from Local Files

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd enlight-master
   vercel
   ```

3. **Follow the prompts**:
   - Link to existing project or create new
   - Confirm project settings
   - Deploy

### Other Deployment Options

- **Netlify**: Drag and drop the folder or connect via Git
- **GitHub Pages**: Enable in repository settings
- **Traditional Hosting**: Upload files via FTP

## ⚙️ Configuration

### Environment Variables

No environment variables are required for basic functionality.

### Form Configuration

The recruitment form uses Formspree for email delivery:
- **Endpoint**: `https://formspree.io/f/xpwnqkqk`
- **Admin Dashboard**: Uses localStorage for data storage

### Analytics Setup

Update the following in `index.html`:
- **Google Analytics**: Replace `GA_MEASUREMENT_ID`
- **Facebook Pixel**: Replace `YOUR_PIXEL_ID`

### PWA Configuration

Update `manifest.json`:
- App name and description
- Icons and theme colors
- Display mode

## 📱 PWA Features

- **Installable**: Users can install the app on their devices
- **Offline Support**: Basic offline functionality with Service Worker
- **App-like Experience**: Standalone display mode
- **Fast Loading**: Cached resources for quick access

## 🔧 Customization

### Branding

Update the following files for branding:
- `css/custom.css`: Color scheme and styling
- `img/`: Logo and images
- `manifest.json`: App name and icons

### Content

- `index.html`: Main content and sections
- `about.html`: About page content
- `contact.html`: Contact information

### Forms

- `index.html`: Recruitment form fields
- `js/custom.js`: Form validation and submission
- `dashboard.html`: Admin interface

## 📊 Admin Dashboard

### Access

- **URL**: `/dashboard.html`
- **Login**: `admin` / `aiesec2025`

### Features

- View all applications
- Export individual applications
- Delete applications
- Real-time statistics
- Search and filter

## 🔒 Security

- **HTTPS**: Enforced by Vercel
- **Security Headers**: Configured in `vercel.json`
- **Form Validation**: Client and server-side validation
- **XSS Protection**: Content Security Policy headers

## 📈 Performance

- **Optimized Images**: Compressed and responsive
- **Minified Assets**: CSS and JS minification
- **Caching**: Browser and CDN caching
- **Lazy Loading**: Images load on demand

## 🌐 SEO

- **Meta Tags**: Complete meta tag setup
- **Open Graph**: Social media sharing
- **Structured Data**: Schema.org markup
- **Sitemap**: Auto-generated by Vercel

## 🐛 Troubleshooting

### Common Issues

1. **Form Not Submitting**:
   - Check Formspree endpoint
   - Verify form validation
   - Check browser console for errors

2. **Dashboard Not Loading**:
   - Clear localStorage
   - Check login credentials
   - Verify JavaScript is enabled

3. **Images Not Loading**:
   - Check image paths
   - Verify file permissions
   - Check CDN status

### Support

For technical support, contact the development team or create an issue in the repository.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Guidelines

- Follow the existing code style
- Test thoroughly before submitting
- Update documentation as needed
- Be respectful and constructive

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Nedim Mejri

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👤 Author

**Nedim Mejri**

- Developer and maintainer of this project
- Specialized in modern web development
- Passionate about creating user-friendly applications

## 📞 Contact

**Nedim Mejri**

- **Email**: [Contact me via GitHub](https://github.com/Nedim7050)
- **GitHub**: [@Nedim7050](https://github.com/Nedim7050)
- **Project Website**: [AIESEC Carthage](https://aiesec-carthage.vercel.app)

---

<div align="center">

**Built with ❤️ by [Nedim Mejri](https://github.com/yourusername) for AIESEC Carthage**

⭐ Star this repo if you find it helpful!

</div>
