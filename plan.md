# Technical Lead Website - CI/CD Pipeline Plan

## Overview
This plan outlines the complete setup for a technical lead single-page website with end-to-end CI/CD pipeline, GitHub repository, and Vercel deployment.

## Prerequisites
- Node.js and npm installed locally
- Git installed and configured
- GitHub account
- Vercel account
- Docker installed (if using containerized development)
- GitHub CLI (`gh`) installed (optional but recommended)
- Vercel CLI installed (for deployment)

## Phase 0: Docker Environment Setup (Optional) ✅ COMPLETE

### Step 0A: Create Dockerfile for Development Environment ✅ COMPLETE
Create a `Dockerfile` for containerized development:
```dockerfile
FROM node:18-alpine

# Install system dependencies
RUN apk add --no-cache git curl bash

# Install GitHub CLI
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
    && chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    && apk update \
    && apk add --no-cache github-cli

# Install Vercel CLI globally
RUN npm install -g vercel

# Set working directory
WORKDIR /app

# Copy package files (if they exist)
COPY package*.json ./

# Install dependencies
RUN npm install || true

# Copy project files
COPY . .

# Expose port for development server
EXPOSE 3000 5173 8080

# Default command
CMD ["npm", "run", "dev"]
```

### Step 0B: Create Docker Compose for Development ✅ COMPLETE
Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  website:
    build: .
    ports:
      - "3000:3000"
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    stdin_open: true
    tty: true
```

### Step 0C: Docker Development Commands ✅ COMPLETE
```bash
# Build and start development environment
docker-compose up --build

# Run commands in container
docker-compose exec website bash

# Install GitHub CLI in existing container (alternative method)
docker-compose exec website sh -c "
  curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | gpg --dearmor -o /usr/share/keyrings/githubcli-archive-keyring.gpg &&
  echo 'deb [arch=amd64 signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main' | tee /etc/apt/sources.list.d/github-cli.list &&
  apt update && apt install -y gh
"

# Install Vercel CLI in existing container
docker-compose exec website npm install -g vercel
```

## Phase 1: Project Setup and Local Development

### Step 1: Initialize Project Structure ✅ COMPLETE
```bash
# Create basic project structure (in container or locally)
mkdir -p src/components src/styles public
touch src/index.html src/styles/main.css src/components/app.js
touch package.json .gitignore README.md Dockerfile docker-compose.yml
```

**Completed:**
- ✅ Created directory structure: `src/components/`, `src/styles/`, `public/`
- ✅ Created `src/index.html` with complete HTML5 semantic structure
- ✅ Created `src/styles/main.css` with responsive design and CSS custom properties
- ✅ Created `src/components/app.js` with interactive JavaScript components
- ✅ Created `package.json` with project configuration and scripts
- ✅ Created `.gitignore` with comprehensive ignore rules
- ✅ Created `README.md` with project documentation

### Step 2: Configure Package.json ✅ COMPLETE
#### Substeps:
1. **Initialize npm project basics** ✅ COMPLETE:
   - Set project name, version, description
   - Define main entry point
   - Add author and license information
   
   **Commands to complete:**
   ```bash
   # Option 1: Interactive initialization
   npm init
   
   # Option 2: Quick initialization with defaults
   npm init -y
   
   # Option 3: Manual creation of package.json with specific values
   ```
   
   **Manual package.json template:**
   ```json
   {
     "name": "technical-lead-website",
     "version": "1.0.0",
     "description": "Professional technical lead portfolio website",
     "main": "src/index.html",
     "private": true,
     "author": "Your Name <your.email@domain.com>",
     "license": "MIT",
     "homepage": "https://your-domain.com",
     "repository": {
       "type": "git",
       "url": "git+https://github.com/yourusername/technical-lead-website.git"
     },
     "keywords": [
       "portfolio",
       "technical-lead",
       "website",
       "frontend"
     ],
     "engines": {
       "node": ">=18.0.0",
       "npm": ">=9.0.0"
     }
   }
   ```

2. **Configure build scripts** ✅ COMPLETE:
   - Add `dev` script for development server
   - Add `build` script for production build
   - Add `preview` script for build testing
   - Add `start` script for production serving

3. **Choose and add development dependencies** ✅ COMPLETE:
   - **Option A**: Vite (modern, fast bundler) ✅ SELECTED
   - **Option B**: Webpack (traditional bundler)
   - **Option C**: Plain HTML/CSS/JS (no bundler)

4. **Add utility scripts** ✅ COMPLETE:
   - `test` script for running tests
   - `lint` script for code linting
   - `format` script for code formatting

5. **Set up project metadata** ✅ COMPLETE:
   - Repository URL
   - Keywords for npm
   - Engines specification (Node.js version)

### Step 3: Create Basic Website Structure ✅ COMPLETE
#### Substeps:
1. **Create HTML5 Semantic Structure** (`src/index.html`) ✅ COMPLETE:
   - Complete HTML5 document with proper DOCTYPE and meta tags
   - Semantic HTML structure using header, nav, main, section, footer
   - Sections for: Hero/Introduction, About, Skills, Experience, Projects, Contact
   - Responsive viewport meta tag and accessibility features
   - Links to CSS and JS files with proper Vite integration

2. **Implement Responsive CSS Design** (`src/styles/main.css`) ✅ COMPLETE:
   - CSS custom properties for consistent theming (colors, fonts, spacing)
   - Mobile-first responsive design approach using CSS Grid and Flexbox
   - Modern typography and professional color scheme
   - Smooth animations, transitions, and hover effects
   - Dark/light mode CSS variables foundation

3. **Add Interactive JavaScript Components** (`src/components/app.js`) ✅ COMPLETE:
   - Smooth scrolling navigation and mobile menu toggle
   - Contact form validation (client-side)
   - Intersection Observer for scroll animations
   - Theme preference handling and professional interaction patterns

4. **Create Professional Content Structure** ✅ COMPLETE:
   - Hero section with name, title, and introduction
   - About section with professional summary
   - Skills section with technical competencies
   - Experience section with key roles and achievements
   - Projects section with notable work examples
   - Contact section with professional contact methods

5. **Ensure Accessibility and Performance** ✅ COMPLETE:
   - Semantic HTML for screen readers with proper ARIA labels
   - Keyboard navigation support and optimized performance
   - Clean, maintainable code structure ready for production 
### Step 4: Local Development Setup ✅ COMPLETE
- Configure local development server
- Test responsive design
- Ensure cross-browser compatibility

## Phase 2: Version Control Setup

### Step 5: Initialize Git Repository ✅ COMPLETE
```bash
git init
git add .
git commit -m "Initial commit: Basic website structure"
```

### Step 6: Create GitHub Repository ✅ COMPLETE
```bash
# Login to GitHub CLI (interactive)
gh auth login

# Create private repository and push code
gh repo create portfolio --private --source=. --remote=origin --push
```

### Step 7: Configure Git Workflow ✅ COMPLETE
- Set up main/develop branch strategy
- Configure branch protection rules (optional)
- Set up .gitignore for node_modules, build files, etc.

## Phase 3: Vercel Deployment Setup

### Step 8: Install and Configure Vercel CLI
```bash
# If using Docker, run these commands in the container:
# docker-compose exec website bash

# Install Vercel CLI (if not already installed in Dockerfile)
npm i -g vercel

# Login to Vercel (interactive)
vercel login

# Docker users: Authenticate with Vercel token
# vercel login --token YOUR_VERCEL_TOKEN
```

### Step 9: Configure Vercel Project
```bash
# Initialize Vercel project
vercel init

# Or link existing project
vercel --prod

# Follow prompts to:
# - Link GitHub repository
# - Configure build settings
# - Set up deployment configuration
```

### Step 10: Create Vercel Configuration
- Create `vercel.json` with build and deployment settings
- Configure environment variables (if needed)
- Set up custom domains section (for future use)

## Phase 4: CI/CD Pipeline Implementation

### Step 11: GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:
- Trigger on push to main branch
- Run tests (if applicable)
- Build project
- Deploy to Vercel
- Notify on success/failure

### Step 12: Vercel Integration
- Connect GitHub repository to Vercel
- Configure automatic deployments
- Set up preview deployments for pull requests
- Configure production deployment triggers

### Step 13: Environment Configuration
- Set up environment variables in Vercel dashboard
- Configure different environments (preview/production)
- Set up secrets for sensitive data

## Phase 5: Testing and Quality Assurance

### Step 14: Automated Testing Setup
- Configure testing framework (Jest, Cypress, etc.)
- Add unit tests for components
- Add integration tests for critical paths
- Configure test coverage reporting

### Step 15: Code Quality Tools
- Set up ESLint for JavaScript linting
- Configure Prettier for code formatting
- Add pre-commit hooks with Husky
- Set up automated code quality checks in CI

### Step 16: Performance Optimization
- Configure build optimization
- Set up performance monitoring
- Implement lazy loading (if applicable)
- Optimize assets and images

## Phase 6: Monitoring and Maintenance

### Step 17: Deployment Monitoring
- Set up Vercel analytics
- Configure error tracking (Sentry, etc.)
- Monitor performance metrics
- Set up uptime monitoring

### Step 18: Backup and Recovery
- Ensure code is backed up in GitHub
- Document deployment process
- Create rollback procedures
- Set up database backups (if applicable)

## Phase 7: Domain Configuration (Future)

### Step 19: Domain Setup (When Ready)
- Purchase/transfer domain
- Configure DNS settings
- Add custom domain in Vercel
- Set up SSL certificates (automatic with Vercel)

### Step 20: SEO and Analytics
- Configure Google Analytics
- Set up Google Search Console
- Implement SEO best practices
- Add meta tags and structured data

## Project Structure
```
technical-lead-website/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── components/
│   ├── styles/
│   └── index.html
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── package.json
├── vercel.json
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── README.md
└── plan.md
```

## Key Configuration Files

### .dockerignore
```
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.nyc_output
coverage
.dist
```

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/src/$1"
    }
  ]
}
```

### GitHub Actions Workflow (.github/workflows/deploy.yml)
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build project
      run: npm run build
      
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        github-token: ${{ secrets.GITHUB_TOKEN }}
        vercel-args: '--prod'
        vercel-org-id: ${{ secrets.ORG_ID}}
        vercel-project-id: ${{ secrets.PROJECT_ID}}

  docker-build:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Build Docker image
      run: docker build -t technical-lead-website .
      
    - name: Test Docker container
      run: |
        docker run -d --name test-container technical-lead-website
        docker exec test-container npm test
        docker stop test-container
        docker rm test-container
```

### Docker Environment Variables
For containerized development, create `.env` file:
```env
VERCEL_TOKEN=your_vercel_token_here
GITHUB_TOKEN=your_github_token_here
NODE_ENV=development
```

## Security Considerations
- Keep dependencies updated
- Use environment variables for sensitive data
- Enable Vercel's security headers
- Implement Content Security Policy
- Regular security audits
- **Docker Security**: Never include secrets in Dockerfile, use environment variables
- **Token Management**: Store GitHub and Vercel tokens securely, use GitHub Secrets for CI/CD

## Success Criteria
- [ ] Local development environment working
- [ ] Docker environment configured (if using containers)
- [ ] GitHub CLI installed and authenticated
- [ ] Project structure initialized (Phase 1, Step 1)
- [ ] Package.json fully configured (Phase 1, Step 2)
- [ ] Vite development dependencies installed
- [ ] Basic website structure with content (Phase 1, Step 3)
- [ ] Local development server working (Phase 1, Step 4)
- [ ] Vercel CLI installed and authenticated
- [x] GitHub repository created and configured
- [ ] Vercel deployment pipeline functional
- [ ] CI/CD pipeline running automated tests
- [ ] Production deployment accessible via Vercel URL
- [ ] Branch protection and PR workflow established
- [ ] Monitoring and analytics configured
- [ ] Docker-based CI/CD pipeline working (if using containers)

## Timeline Estimate
- Phase 0: 1-2 hours (Docker setup, optional)
- Phase 1-2: 2-3 hours (Project setup and Git)
- Phase 3-4: 3-4 hours (Vercel and CI/CD)
- Phase 5: 2-3 hours (Testing and QA)
- Phase 6: 1-2 hours (Monitoring)
- Total: 9-14 hours (with Docker setup)

## Next Steps After Plan Completion
1. Implement website content and design
2. Add custom domain when ready
3. Implement advanced features as needed
4. Scale infrastructure if traffic grows