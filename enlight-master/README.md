# AIESEC Carthage - Website

A modern, responsive website for AIESEC Carthage built with HTML5, CSS3, JavaScript, and Bootstrap. This website showcases AIESEC's mission, programs, and provides a recruitment platform for new members.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with Bootstrap
- **Progressive Web App (PWA)**: Installable with offline capabilities
- **Modern UI/UX**: Clean, professional design with AIESEC branding
- **Recruitment System**: Complete application form with admin dashboard
- **Performance Optimized**: Fast loading with lazy loading and caching
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Analytics Ready**: Google Analytics 4 and Facebook Pixel integration

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

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox/Grid
- **JavaScript (ES6+)**: Interactive functionality
- **Bootstrap 3**: Responsive framework
- **jQuery**: DOM manipulation
- **Font Awesome**: Icons
- **Owl Carousel**: Image carousels
- **DataTables**: Admin table functionality

## 🚀 Deployment on Vercel

### Prerequisites
- [Vercel account](https://vercel.com)
- [Git repository](https://github.com) (optional)

### Method 1: Deploy from Git (Recommended)

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

### Method 2: Deploy from Local Files

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

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Contact

- **Email**: carthagetm@gmail.com
- **Phone**: +216 98 521 185 | +216 95 465 480 | +216 95 504 055
- **Website**: [AIESEC Carthage](https://aiesec-carthage.vercel.app)

---

**Built with ❤️ for AIESEC Carthage**
