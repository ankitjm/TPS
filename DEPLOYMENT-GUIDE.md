# 🚀 Netlify Deployment Guide for Phygital Studio Website

## 📁 **Folder to Upload to Netlify: `dist`**

The `dist` folder contains your built production files and is what you'll upload to Netlify.

## 🛠️ **Local Development**

Your development server should now be running at: **http://localhost:5173**

## 📋 **Pre-Deployment Checklist**

✅ **Project Built Successfully** - `npm run build` completed  
✅ **Netlify Configuration** - `netlify.toml` created  
✅ **Redirects File** - `public/_redirects` created  
✅ **Production Files** - `dist/` folder ready  

## 🌐 **Netlify Deployment Steps**

### **Option 1: Drag & Drop (Recommended for first deployment)**

1. **Go to [netlify.com](https://netlify.com)** and sign in
2. **Click "Add new site"** → "Deploy manually"
3. **Drag and drop the `dist` folder** from your project
4. **Wait for deployment** (usually 1-2 minutes)
5. **Your site will be live** with a random URL like `random-name-123.netlify.app`

### **Option 2: Git Integration (For continuous deployment)**

1. **Push your code to GitHub/GitLab**
2. **Connect your repository** in Netlify
3. **Set build command**: `npm run build`
4. **Set publish directory**: `dist`
5. **Deploy automatically** on every push

## 🔧 **Netlify Build Settings**

If using Git integration, configure these settings:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: `18` (already configured in netlify.toml)

## 📱 **What Gets Deployed**

Your `dist` folder contains:
- `index.html` - Main HTML file
- `assets/` - CSS, JavaScript, and other assets
- `Embassy.glb` - 3D model file
- All optimized and minified production files

## 🚨 **Important Notes**

- **Client-side routing**: Configured to handle React Router properly
- **3D models**: GLB files are included and will work on Netlify
- **Performance**: Files are optimized and compressed for production
- **Compatibility**: Works on all modern browsers

## 🔍 **Testing Your Deployment**

After deployment:
1. **Test navigation** between slides
2. **Verify 3D models** load correctly
3. **Check video modal** functionality
4. **Test responsive design** on different devices

## 📞 **Support**

If you encounter issues:
1. Check Netlify build logs
2. Verify all files are in the `dist` folder
3. Ensure `netlify.toml` is in your project root
4. Check browser console for any errors

## 🎉 **You're Ready to Deploy!**

Your Phygital Studio website is now fully prepared for Netlify deployment with:
- ✅ Production build ready
- ✅ Netlify configuration set
- ✅ Client-side routing configured
- ✅ All assets optimized

**Upload the `dist` folder to Netlify and your site will be live!** 🚀
