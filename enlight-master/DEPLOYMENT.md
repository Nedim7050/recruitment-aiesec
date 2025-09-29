# 🚀 Deployment Guide - AIESEC Carthage

This guide will help you deploy the AIESEC Carthage website to Vercel.

## 📋 Pre-Deployment Checklist

### ✅ Files Ready for Deployment
- [x] `index.html` - Main homepage
- [x] `login.html` - Admin login
- [x] `dashboard.html` - Admin dashboard
- [x] `thank-you.html` - Thank you page
- [x] `vercel.json` - Vercel configuration
- [x] `manifest.json` - PWA manifest
- [x] `sw.js` - Service Worker
- [x] `package.json` - Dependencies
- [x] `.gitignore` - Git ignore rules
- [x] `README.md` - Documentation

### ✅ Configuration Files
- [x] **vercel.json**: Routing, headers, and security
- [x] **manifest.json**: PWA configuration with Cloudinary icons
- [x] **package.json**: Scripts and dependencies
- [x] **sw.js**: Service Worker for offline functionality

### ✅ Assets and Resources
- [x] **CSS**: All stylesheets in `/css/` directory
- [x] **JavaScript**: All scripts in `/js/` directory
- [x] **Images**: All images in `/img/` directory
- [x] **Fonts**: All fonts in `/fonts/` directory

## 🚀 Deployment Methods

### Method 1: Deploy from GitHub (Recommended)

1. **Create GitHub Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - AIESEC Carthage website"
   git branch -M main
   git remote add origin https://github.com/yourusername/aiesec-carthage.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect settings
   - Click "Deploy"

### Method 2: Deploy with Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd enlight-master
   vercel
   ```

3. **Follow Prompts**:
   - Link to existing project or create new
   - Confirm project settings
   - Deploy to production

### Method 3: Drag & Drop on Vercel

1. **Zip the Project**:
   - Compress the `enlight-master` folder
   - Make sure to include all files

2. **Upload to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Drag and drop the zip file
   - Vercel will automatically deploy

## ⚙️ Post-Deployment Configuration

### 1. Update Formspree Endpoint
- Go to [formspree.io](https://formspree.io)
- Create a new form
- Update the action URL in `index.html`:
  ```html
  <form action="https://formspree.io/f/YOUR_NEW_FORM_ID" method="POST">
  ```

### 2. Configure Analytics
Update in `index.html`:
```javascript
// Google Analytics
gtag('config', 'YOUR_GA_MEASUREMENT_ID');

// Facebook Pixel
fbq('init', 'YOUR_PIXEL_ID');
```

### 3. Update Domain Settings
- In Vercel dashboard, go to Project Settings
- Add your custom domain
- Update DNS records as instructed

## 🔧 Environment Variables (Optional)

No environment variables are required for basic functionality, but you can add:

```bash
# In Vercel dashboard > Settings > Environment Variables
FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
GA_MEASUREMENT_ID=G-XXXXXXXXXX
FACEBOOK_PIXEL_ID=123456789
```

## 📱 PWA Features

### Automatic PWA Setup
- ✅ **Manifest**: Configured in `manifest.json`
- ✅ **Service Worker**: Implemented in `sw.js`
- ✅ **Icons**: Using Cloudinary URLs
- ✅ **Offline Support**: Basic caching implemented

### Testing PWA
1. Deploy to Vercel
2. Open in Chrome/Edge
3. Look for "Install" button in address bar
4. Test offline functionality

## 🔒 Security Features

### Headers Configured
- ✅ **X-Content-Type-Options**: nosniff
- ✅ **X-Frame-Options**: DENY
- ✅ **X-XSS-Protection**: 1; mode=block
- ✅ **Referrer-Policy**: strict-origin-when-cross-origin
- ✅ **Permissions-Policy**: Restricted camera, microphone, geolocation

### HTTPS
- ✅ **Automatic HTTPS**: Enabled by Vercel
- ✅ **SSL Certificate**: Auto-renewed

## 📊 Performance Optimizations

### Caching Strategy
- ✅ **Static Assets**: 1 year cache
- ✅ **HTML Files**: No cache
- ✅ **Service Worker**: Must revalidate
- ✅ **Manifest**: 1 day cache

### Image Optimization
- ✅ **Cloudinary CDN**: All images served from CDN
- ✅ **Responsive Images**: Different sizes for different devices
- ✅ **Lazy Loading**: Implemented in JavaScript

## 🐛 Troubleshooting

### Common Issues

1. **404 Errors**:
   - Check `vercel.json` routing configuration
   - Verify file paths are correct

2. **Form Not Working**:
   - Verify Formspree endpoint
   - Check form validation
   - Test in browser console

3. **PWA Not Installing**:
   - Check manifest.json syntax
   - Verify Service Worker registration
   - Test HTTPS requirement

4. **Images Not Loading**:
   - Check Cloudinary URLs
   - Verify image paths
   - Test CDN status

### Debug Commands
```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]

# Test locally
npm run dev
```

## 📈 Monitoring

### Analytics Setup
1. **Google Analytics 4**:
   - Create GA4 property
   - Add tracking code to `index.html`
   - Set up conversion tracking

2. **Vercel Analytics**:
   - Enable in Vercel dashboard
   - View performance metrics
   - Monitor Core Web Vitals

### Performance Monitoring
- **Lighthouse**: Test performance scores
- **PageSpeed Insights**: Monitor loading times
- **Vercel Analytics**: Real-time metrics

## 🔄 Updates and Maintenance

### Updating Content
1. Edit files locally
2. Commit changes to Git
3. Push to GitHub
4. Vercel auto-deploys

### Updating Dependencies
```bash
npm update
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

## 📞 Support

### Technical Issues
- Check Vercel documentation
- Review browser console errors
- Test locally first

### Contact Information
- **Email**: carthagetm@gmail.com
- **Phone**: +216 98 521 185
- **Website**: [AIESEC Carthage](https://aiesec-carthage.vercel.app)

---

## 🎉 Deployment Complete!

Your AIESEC Carthage website is now ready for deployment on Vercel. Follow the steps above to get it live on the internet!

**Next Steps:**
1. Deploy to Vercel
2. Configure analytics
3. Test all functionality
4. Share with your team
5. Monitor performance

**Good luck with your deployment! 🚀**
