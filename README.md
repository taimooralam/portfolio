# Technical Lead Portfolio Website

A modern, responsive portfolio website for technical leads built with vanilla HTML, CSS, and JavaScript.

## Features

- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Modern UI**: Clean, professional design with smooth animations
- **Interactive Components**: Dynamic navigation, contact form, and scroll animations
- **Performance Optimized**: Lightweight and fast-loading
- **Accessibility**: Semantic HTML and keyboard navigation support

## Project Structure

```
technical-lead-website/
├── src/
│   ├── components/
│   │   └── app.js          # Main JavaScript functionality
│   ├── styles/
│   │   └── main.css        # Main stylesheet
│   └── index.html          # Main HTML file
├── public/                 # Static assets
├── package.json            # Project configuration
├── .gitignore             # Git ignore rules
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm (version 9 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd technical-lead-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm start` - Start production server on port 3000

## Customization

### Personal Information

Update the following files with your personal information:

1. **src/index.html**: Update the name, title, and content
2. **src/components/app.js**: Modify the skills, experience, and projects data
3. **package.json**: Update author information and repository URL

### Styling

The website uses CSS custom properties for easy theming. Modify the variables in `src/styles/main.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --accent-color: #3b82f6;
    /* ... other variables */
}
```

### Content Sections

The website includes the following sections:

- **Hero**: Introduction and call-to-action
- **About**: Professional summary
- **Skills**: Technical competencies
- **Experience**: Work history and achievements
- **Projects**: Notable work examples
- **Contact**: Contact form and information

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties, Grid, and Flexbox
- **JavaScript (ES6+)**: Interactive functionality
- **Vite**: Build tool and development server

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact [your-email@domain.com](mailto:your-email@domain.com).