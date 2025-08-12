# 📦 Publishing Guide: SSH & WSL Extension to Kiro Marketplace

This guide walks you through publishing your SSH & WSL extension to the Kiro IDE marketplace.

## 🚀 **Quick Publish**

```bash
# Prepare and package the extension
npm run prepare-release

# This will create:
# - dist/kiro-ssh-wsl-extension-1.0.0.tar.gz (extension package)
# - dist/marketplace-submission/ (marketplace files)
# - dist/PUBLISHING_INSTRUCTIONS.md (next steps)
```

## 📋 **Step-by-Step Publishing Process**

### **Step 1: Prepare Your Extension**

1. **Update Version Numbers**
   ```bash
   # Update version in both files:
   # - package.json
   # - marketplace/extension.json
   ```

2. **Update Documentation**
   ```bash
   # Update these files:
   # - marketplace/README.md
   # - marketplace/CHANGELOG.md
   # - marketplace/CONTRIBUTING.md
   ```

3. **Test Your Extension**
   ```bash
   npm run build
   npm run test-wsl
   npm run demo
   npm run install-kiro  # Test in Kiro IDE
   ```

### **Step 2: Package the Extension**

```bash
# Build and package everything
npm run package-extension
```

This creates:
- **Extension Package**: `dist/kiro-ssh-wsl-extension-1.0.0.tar.gz`
- **Marketplace Files**: `dist/marketplace-submission/`
- **Publishing Instructions**: `dist/PUBLISHING_INSTRUCTIONS.md`

### **Step 3: Create GitHub Repository**

1. **Create Repository**
   ```bash
   # Create on GitHub: https://github.com/sak1620/kiro-ssh-wsl-extension
   git init
   git add .
   git commit -m "Initial release v1.0.0"
   git branch -M main
   git remote add origin https://github.com/sak1620/kiro-ssh-wsl-extension.git
   git push -u origin main
   ```

2. **Create Release**
   ```bash
   # Create a GitHub release
   # - Tag: v1.0.0
   # - Title: SSH & WSL Remote Development v1.0.0
   # - Description: Copy from CHANGELOG.md
   # - Attach: kiro-ssh-wsl-extension-1.0.0.tar.gz
   ```

### **Step 4: Submit to Kiro Marketplace**

1. **Visit Kiro Marketplace Publisher Portal**
   - Go to: `https://marketplace.kiro-ide.com/publish`
   - Sign in with your developer account

2. **Create Publisher Profile** (if first time)
   - Publisher ID: `kiro-extensions` (or your preferred ID)
   - Display Name: Your name or organization
   - Contact information
   - Verification (if required)

3. **Submit Extension**
   - **Upload Package**: `kiro-ssh-wsl-extension-1.0.0.tar.gz`
   - **Extension Name**: `kiro-ssh-wsl-extension`
   - **Display Name**: `SSH & WSL Remote Development`
   - **Version**: `1.0.0`
   - **Categories**: 
     - Remote Development
     - SSH
     - WSL
     - Development Tools
     - File Management
   - **Keywords**: `ssh, wsl, remote, linux, server, development, terminal, sftp, deployment`
   - **Description**: Copy from `marketplace/README.md`
   - **License**: MIT
   - **Repository**: `https://github.com/sak1620/kiro-ssh-wsl-extension`

4. **Extension Details**
   - **Icon**: Upload `marketplace/assets/icon.svg` (or convert to PNG)
   - **Screenshots**: Create screenshots showing the extension in action
   - **Pricing**: Free
   - **Support**: Link to GitHub Issues

5. **Review and Submit**
   - Review all information
   - Submit for marketplace review
   - Wait for approval (typically 1-3 business days)

## 🎯 **Marketplace Listing Optimization**

### **Title and Description**
```
Title: SSH & WSL Remote Development
Subtitle: Seamless SSH and WSL integration for remote development

Description:
Transform your development workflow with seamless SSH and WSL integration. 
Connect to remote servers and Windows Subsystem for Linux as if they were 
local environments. Perfect for cross-platform development, remote work, 
and DevOps workflows.
```

### **Key Features to Highlight**
- ✅ **Multiple SSH Connections**: Connect to multiple servers simultaneously
- ✅ **Native WSL Support**: Access Windows Subsystem for Linux directly
- ✅ **AI Integration**: Natural language SSH/WSL operations
- ✅ **File Synchronization**: Keep files in sync across environments
- ✅ **Remote Development**: Code on remote environments as if local
- ✅ **Automation Hooks**: Automated workflows and deployment

### **Screenshots to Include**
1. **Connection List**: Show WSL and SSH connections
2. **Command Execution**: Terminal showing remote commands
3. **File Transfer**: File upload/download in progress
4. **AI Integration**: Natural language commands in action
5. **Configuration**: Settings and options panel

## 📈 **Post-Publication Marketing**

### **Community Engagement**
1. **Announce on Forums**
   - Kiro IDE Community Forum
   - Reddit (r/KiroIDE, r/programming)
   - Dev.to article
   - Hacker News

2. **Social Media**
   - Twitter announcement
   - LinkedIn post
   - YouTube demo video

3. **Documentation**
   - Create GitHub Pages site
   - Write tutorial blog posts
   - Record video tutorials

### **User Support**
1. **GitHub Issues**: Monitor and respond to issues
2. **Community Support**: Answer questions in forums
3. **Feature Requests**: Collect and prioritize user feedback
4. **Updates**: Regular updates and improvements

## 🔄 **Update Process**

### **For Future Updates**
1. **Update Version Numbers**
   ```bash
   # Increment version in:
   # - package.json
   # - marketplace/extension.json
   ```

2. **Update Changelog**
   ```bash
   # Add new version to marketplace/CHANGELOG.md
   ```

3. **Test and Package**
   ```bash
   npm run prepare-release
   ```

4. **Submit Update**
   - Upload new package to marketplace
   - Update listing information
   - Create new GitHub release

## 🎉 **Success Metrics**

Track these metrics after publication:
- **Downloads**: Number of extension installations
- **Ratings**: User ratings and reviews
- **Issues**: GitHub issues and resolution time
- **Community**: Forum discussions and engagement
- **Usage**: MCP tool usage statistics (if available)

## 🆘 **Troubleshooting**

### **Common Issues**
1. **Package Too Large**: Remove unnecessary files, optimize assets
2. **Validation Errors**: Check extension.json format and required fields
3. **Permission Issues**: Ensure proper file permissions in package
4. **Dependency Issues**: Include all required dependencies

### **Getting Help**
- **Kiro Marketplace Support**: support@kiro-ide.com
- **Community Forums**: https://community.kiro-ide.com
- **GitHub Issues**: For technical problems

---

## 🎯 **Ready to Publish?**

Your SSH & WSL extension is ready for the Kiro marketplace! Run:

```bash
npm run prepare-release
```

Then follow the instructions in `dist/PUBLISHING_INSTRUCTIONS.md` to complete the submission.

**Good luck with your extension! 🚀**