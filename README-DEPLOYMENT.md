# AIESEC Carthage Website - Deployment Guide

## 🚀 Quick Start

This is a complete, production-ready recruitment website for AIESEC Carthage with advanced features including analytics, form handling, performance optimization, and PWA capabilities.

## 📁 File Structure

```
enlight-master/
├── index.html                 # Main homepage
├── about.html                 # About page
├── events.html                # Events page
├── courses.html               # Courses page
├── teachers.html              # Teachers page
├── contact.html               # Contact page
├── gallery.html               # Gallery page
├── news.html                  # News page
├── course-single.html         # Single course page
├── manifest.json              # PWA manifest
├── sw.js                      # Service Worker
├── contact-backend-examples.php # Backend form handling
├── css/
│   ├── custom.css            # Custom AIESEC styles
│   ├── style.min.css         # Main styles
│   └── styles-merged.css     # Merged styles
├── js/
│   ├── custom.js             # Custom functionality
│   ├── main.min.js           # Main scripts
│   └── scripts.min.js        # Vendor scripts
└── img/                      # Images and assets
```

## 🛠 Setup Instructions

### 1. Basic Deployment (Static Hosting)

**For Netlify, Vercel, GitHub Pages, or any static host:**

1. Upload all files to your hosting provider
2. Update analytics IDs in `index.html`:
   - Replace `GA_MEASUREMENT_ID` with your Google Analytics ID
   - Replace `YOUR_PIXEL_ID` with your Facebook Pixel ID
3. Update domain URLs in meta tags
4. Deploy!

### 2. Backend Integration (PHP Hosting)

**For shared hosting with PHP support:**

1. Upload all files to your web server
2. Configure `contact-backend-examples.php`:
   - Update email addresses
   - Choose PHP mail or database method
   - Uncomment the AJAX code in `js/custom.js`
3. Test form submissions

### 3. Database Setup (Optional)

**For advanced form storage:**

```sql
CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    university VARCHAR(255) NOT NULL,
    motivation TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45)
);
```

## 🎯 Features Included

### ✅ Core Features
- **Responsive Design** - Mobile-first, works on all devices
- **AIESEC Branding** - Official colors, logo, and messaging
- **Smooth Navigation** - Anchor links with dynamic scroll offset
- **Form Validation** - Client-side validation with error handling
- **Loading States** - Professional UX with animations

### ✅ Advanced Features
- **Google Analytics 4** - Complete tracking setup
- **Facebook Pixel** - Social media conversion tracking
- **SEO Optimized** - Meta tags, Open Graph, Twitter Cards
- **Accessibility** - WCAG compliant with ARIA labels
- **Performance** - Lazy loading, preloading, optimization
- **PWA Ready** - Service Worker, manifest, offline support
- **Error Handling** - Comprehensive fallbacks and monitoring

### ✅ Backend Options
- **PHP Mail** - Simple email sending
- **Database Storage** - MySQL integration
- **Third-party Services** - Formspree, Netlify Forms, EmailJS
- **Analytics Integration** - Form submission tracking

## 🔧 Configuration

### Analytics Setup

1. **Google Analytics 4:**
   ```html
   <!-- Replace GA_MEASUREMENT_ID with your actual ID -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   ```

2. **Facebook Pixel:**
   ```html
   <!-- Replace YOUR_PIXEL_ID with your actual Pixel ID -->
   fbq('init', 'YOUR_PIXEL_ID');
   ```

### Form Backend Setup

1. **Enable Backend Integration:**
   ```javascript
   // In js/custom.js, uncomment the AJAX section:
   $.ajax({
       url: 'contact-backend-examples.php',
       // ... rest of the code
   });
   ```

2. **Configure Email Settings:**
   ```php
   // In contact-backend-examples.php
   $to = 'carthage@aiesec.org';  // Update with your email
   ```

### PWA Configuration

1. **Update Manifest:**
   ```json
   // In manifest.json
   "start_url": "/",
   "scope": "/",
   ```

2. **Service Worker:**
   - Automatically registers on page load
   - Caches resources for offline use
   - Handles background sync

## 📱 Mobile Features

- **Touch-friendly** - 44px minimum touch targets
- **iOS Optimized** - Prevents zoom on input focus
- **PWA Support** - Install as app on mobile devices
- **Offline Capable** - Works without internet connection

## 🔒 Security Features

- **Input Sanitization** - All form data is sanitized
- **CSRF Protection** - Form validation and rate limiting ready
- **HTTPS Ready** - Secure connections supported
- **Error Handling** - Graceful fallbacks for all features

## 📊 Analytics Events

The website tracks these events automatically:

- `apply_button_click` - Apply button interactions
- `form_submit_success` - Successful form submissions
- `timing_complete` - Page load performance
- `exception` - JavaScript errors

## 🚀 Performance Features

- **Lazy Loading** - Images load as needed
- **Resource Preloading** - Critical assets preloaded
- **DNS Prefetching** - External domains prefetched
- **Service Worker Caching** - Offline functionality
- **Performance Monitoring** - Load time tracking

## 🎨 Customization

### Colors
```css
:root {
  --aiesec-blue: #037ef3;
  --aiesec-light: #f8f9fa;
  --aiesec-dark: #333;
}
```

### Content
- Update contact information in all HTML files
- Replace placeholder images in `/img/` folder
- Modify form fields in `index.html`
- Update social media links

## 📞 Support

For technical support or customization requests:
- Email: carthage@aiesec.org
- Phone: +216 00 000 000

## 📄 License

This website template is customized for AIESEC Carthage. All rights reserved.

---

**Ready to deploy!** 🎉

The website is production-ready with all modern web standards, accessibility compliance, and professional features. Simply upload to your hosting provider and configure the analytics IDs.


