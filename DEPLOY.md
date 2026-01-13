# Deploy to Vercel

## Option 1: Deploy via Vercel Web Interface (Easiest)

1. **Go to [vercel.com](https://vercel.com)** and sign in (or create an account)

2. **Click "Add New Project"**

3. **Import your project:**
   - If your code is on GitHub/GitLab/Bitbucket: Connect your repository and select the `tax-filing-tool` folder
   - If your code is local: Use Vercel CLI (see Option 2 below)

4. **Configure the project:**
   - Framework Preset: **Other**
   - Root Directory: `tax-filing-tool` (if deploying from repo root)
   - Build Command: Leave empty (static site)
   - Output Directory: Leave empty
   - Install Command: Leave empty

5. **Click "Deploy"**

6. **Your site will be live** at a URL like `your-project-name.vercel.app`

## Option 2: Deploy via Vercel CLI

### Prerequisites
- Node.js and npm installed
- Vercel account

### Steps

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to project:**
   ```bash
   cd tax-filing-tool
   ```

3. **Login to Vercel:**
   ```bash
   vercel login
   ```

4. **Deploy:**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project? **No** (first time)
   - Project name: `simpletax-ng` (or your choice)
   - Directory: `.` (current directory)
   - Override settings? **No**

5. **For production deployment:**
   ```bash
   vercel --prod
   ```

## Project Structure

The project is configured as a static site:
- `index.html` - Main application file
- `vercel.json` - Vercel configuration
- All assets are embedded in the HTML file

## Custom Domain (Optional)

After deployment:
1. Go to your project settings on Vercel
2. Click "Domains"
3. Add your custom domain

## Environment Variables

No environment variables needed for this static site.
