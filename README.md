# AbdElMonem Wagih - Portfolio Website

A modern, responsive portfolio website showcasing Flutter development expertise and projects.

## 🌟 Features

### Design & UI
- **Dark Theme** with glassmorphism design
- **Responsive Design** for all devices (mobile, tablet, desktop)
- **Smooth Animations** and transitions
- **Particle Background** with interactive elements
- **Typing Animation** for dynamic hero section
- **Glassmorphism Cards** with backdrop blur effects
- **Gradient Accents** and modern color scheme

### Sections
- **Hero Section** with typing animation and floating icons
- **About Me** with statistics and professional summary
- **Skills** with animated progress bars and categories
- **Experience Timeline** with detailed work history
- **Featured Projects** showcasing main applications
- **GitHub Projects** with automatic API integration
- **Contact Form** with direct email integration
- **Social Links** and professional contact information

### Technical Features
- **GitHub API Integration** - Automatically fetches and displays repositories
- **Real-time Data** - Shows stars, forks, languages, and update dates
- **Project Categorization** - Organizes projects by technology
- **Performance Optimized** - Throttled scroll events and efficient animations
- **Accessibility Features** - Keyboard navigation and focus management
- **Progressive Enhancement** - Graceful fallbacks for all features
- **SEO Optimized** - Meta tags and semantic HTML structure

## 🚀 Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript (ES6+)** - Interactive functionality and API integration
- **GitHub API** - Dynamic repository data
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Inter)

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── style.css           # CSS styles and animations
├── script.js           # JavaScript functionality
├── README.md           # Project documentation
└── static.yml         # GitHub Pages configuration
```

## 🛠️ Setup & Installation

### Local Development

1. **Clone the repository:**
```bash
git clone https://github.com/Abdelmonem-wagih/portfolio.git
cd portfolio
```

2. **Open locally:**
   - Simply open `index.html` in your browser
   - Or use a local server like Live Server in VS Code

3. **Customize:**
   - Update personal information in `index.html`
   - Modify GitHub username in `script.js` (line 2)
   - Adjust colors and styling in `style.css`

### GitHub Pages Deployment

1. **Push to GitHub:**
```bash
git add .
git commit -m "Initial portfolio setup"
git push origin main
```

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click Save

3. **Access your portfolio:**
   - Your portfolio will be available at: `https://abdelmonem-wagih.github.io/portfolio/`
   - Updates will automatically deploy when you push to main

### Custom Domain (Optional)

1. **Add CNAME file:**
```bash
echo "yourdomain.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push origin main
```

2. **Configure DNS:**
   - Add CNAME record pointing to `abdelmonem-wagih.github.io`
   - Wait for DNS propagation (24-48 hours)

## ⚙️ Configuration

### GitHub Integration

Update the GitHub username in `script.js`:

```javascript
const GITHUB_USERNAME = 'Abdelmonem-wagih'; // Change to your username
```

### Personal Information

Update these sections in `index.html`:

1. **Hero Section:**
   - Name, title, description
   - Contact links and CV download

2. **About Section:**
   - Personal bio and statistics
   - Skills and experience summary

3. **Experience Section:**
   - Work history and job descriptions
   - Company names and dates

4. **Contact Section:**
   - Email, phone, location
   - Social media links

### Styling Customization

Modify CSS variables in `style.css`:

```css
:root {
    --accent: #3b82f6;        /* Primary accent color */
    --accent-hover: #2563eb;  /* Hover state */
    --bg-primary: #0a0a0a;    /* Background color */
    /* ... other variables */
}
```

## 🔧 API Integration

### GitHub API Features

The portfolio automatically fetches and displays:

- **Repository Information** - Name, description, stars, forks
- **Primary Language** - Detected from repository
- **Last Updated** - When the repository was last modified
- **Direct Links** - To GitHub repository pages

### Rate Limits

GitHub API has rate limits:
- **Unauthenticated:** 60 requests per hour
- **Authenticated:** 5,000 requests per hour

For higher limits, add a GitHub token:

```javascript
const headers = {
    'Authorization': 'token YOUR_GITHUB_TOKEN'
};
```

## 📱 Responsive Breakpoints

- **Desktop:** 1200px and up
- **Tablet:** 768px - 1199px
- **Mobile:** Below 768px
- **Small Mobile:** Below 480px

## 🎨 Color Palette

- **Primary Background:** `#0a0a0a`
- **Secondary Background:** `#1a1a1a`
- **Accent Blue:** `#3b82f6`
- **Accent Purple:** `#8b5cf6`
- **Text Primary:** `#ffffff`
- **Text Secondary:** `#a1a1aa`
- **Glass Effect:** `rgba(255, 255, 255, 0.05)`

## 📊 Performance

### Optimization Features

- **Lazy Loading** for images and content
- **Throttled Scroll Events** to prevent performance issues
- **Debounced Resize Events** for smooth responsiveness
- **Efficient Particle System** with cleanup
- **Minified External Resources** (fonts, icons)

### Loading Strategy

- **Critical CSS** inlined for above-the-fold content
- **Progressive Enhancement** for JavaScript features
- **Graceful Degradation** when APIs fail

## 🔒 Security

- **No Sensitive Data** exposed in frontend code
- **HTTPS Enforcement** through GitHub Pages
- **Content Security Policy** ready headers
- **XSS Protection** through input sanitization

## 🐛 Troubleshooting

### Common Issues

1. **GitHub API Rate Limit:**
   - Solution: Add authentication token or reduce API calls

2. **Particles Not Showing:**
   - Check browser console for WebGL support
   - Verify canvas element exists

3. **Mobile Menu Not Working:**
   - Ensure JavaScript is enabled
   - Check for CSS conflicts

4. **Contact Form Not Working:**
   - Verify email client is configured
   - Check for popup blockers

### Browser Support

- **Chrome:** 60+
- **Firefox:** 60+
- **Safari:** 12+
- **Edge:** 79+

## 🔄 Updates & Maintenance

### Regular Updates

1. **Content Updates:**
   - Add new projects and experience
   - Update skills and technologies
   - Refresh personal information

2. **Technical Updates:**
   - Update dependencies and CDN links
   - Monitor GitHub API changes
   - Test across different browsers

3. **Performance Monitoring:**
   - Check loading speeds
   - Monitor API response times
   - Optimize images and assets

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio! If you find bugs or have suggestions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Contact

**AbdElMonem Wagih**
- **Email:** abdowagih38@gmail.com
- **Phone:** +20 102 465 7305
- **LinkedIn:** [linkedin.com/in/abdelmonem-wagih-0301ba197](https://www.linkedin.com/in/abdelmonem-wagih-0301ba197)
- **GitHub:** [github.com/Abdelmonem-wagih](https://github.com/Abdelmonem-wagih)
- **Location:** Cairo, Egypt

---

*Built with ❤️ using modern web technologies*