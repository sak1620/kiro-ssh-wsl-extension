# Installation Guide

This guide will walk you through installing the SSH & WSL Remote Development Extension for Kiro IDE.

## 📋 **Prerequisites**

Before installing the extension, ensure you have:

### **Required**
- **Kiro IDE** v1.0.0 or higher
- **Node.js** v16.0.0 or higher
- **Windows 10/11** (for WSL features)

### **Optional (for specific features)**
- **WSL installed** (for WSL integration)
- **SSH access** to remote servers (for SSH features)
- **Git** (for development and updates)

## 🚀 **Installation Methods**

### **Method 1: Kiro Marketplace (Recommended)**

1. **Open Kiro IDE**
2. **Go to Extensions**:
   - Click on the Extensions icon in the sidebar
   - Or use `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)
3. **Search for Extension**:
   - Type "SSH & WSL Remote Development" in the search box
   - Look for the extension by publisher `sak1620`
4. **Install**:
   - Click the "Install" button
   - Wait for installation to complete
5. **Restart Kiro IDE** (if prompted)

### **Method 2: Manual Installation**

1. **Download Extension**:
   ```bash
   git clone https://github.com/sak1620/kiro-ssh-wsl-extension.git
   cd kiro-ssh-wsl-extension
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Build Extension**:
   ```bash
   npm run build
   ```

4. **Install in Kiro**:
   ```bash
   npm run install-kiro
   ```

5. **Restart Kiro IDE**

### **Method 3: Development Installation**

For developers who want to contribute:

1. **Clone Repository**:
   ```bash
   git clone https://github.com/sak1620/kiro-ssh-wsl-extension.git
   cd kiro-ssh-wsl-extension
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Build in Watch Mode**:
   ```bash
   npm run watch
   ```

4. **Install Development Version**:
   ```bash
   npm run install-kiro
   ```

## ⚙️ **Post-Installation Setup**

### **1. Verify Installation**

After installation, verify the extension is working:

1. **Open Kiro IDE**
2. **Check Extensions**: The SSH & WSL extension should appear in your installed extensions
3. **Check MCP Servers**: Go to Kiro's MCP panel and verify the servers are running:
   - `kiro-ssh-wsl` - Main SSH/WSL server
   - `kiro-remote-destination` - Remote destinations server

### **2. Configure WSL (if using WSL features)**

If you plan to use WSL features:

1. **Install WSL** (if not already installed):
   ```powershell
   # Run in elevated PowerShell
   wsl --install
   ```

2. **Install a Linux Distribution**:
   ```powershell
   # Install Ubuntu (recommended)
   wsl --install -d Ubuntu
   ```

3. **Verify WSL Installation**:
   ```powershell
   wsl --list --verbose
   ```

### **3. Test Basic Functionality**

Test the extension with these simple commands in Kiro:

#### **Test WSL Integration**:
```
"List my WSL distributions"
```

#### **Test SSH Tools**:
```
"Show me available SSH tools"
```

## 🔧 **Configuration**

### **Extension Settings**

Configure the extension through Kiro's settings:

```json
{
  "sshwsl.autoSyncToWSL": false,
  "sshwsl.defaultSSHPort": 22,
  "sshwsl.wslDistribution": "Ubuntu",
  "sshwsl.enableDeploymentHooks": false
}
```

### **MCP Server Configuration**

The extension automatically configures MCP servers. If you need to modify the configuration, edit `.kiro/settings/mcp.json`:

```json
{
  "mcpServers": {
    "kiro-ssh-wsl": {
      "command": "node",
      "args": ["./kiro-integration/mcpServer.js"],
      "disabled": false,
      "autoApprove": [
        "wsl_execute",
        "wsl_list_distributions",
        "wsl_convert_path",
        "ssh_list_connections"
      ]
    }
  }
}
```

## 🛠 **Troubleshooting Installation**

### **Common Issues**

#### **Extension Not Found in Marketplace**
- Ensure you're searching for "SSH & WSL Remote Development"
- Check that your Kiro IDE version is compatible (v1.0.0+)
- Try refreshing the marketplace

#### **Build Errors During Manual Installation**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### **WSL Not Detected**
- Ensure WSL is installed and running
- Check WSL status: `wsl --status`
- Restart WSL: `wsl --shutdown` then `wsl`

#### **MCP Servers Not Starting**
- Check Kiro's MCP panel for error messages
- Verify Node.js is installed and accessible
- Check file permissions on the extension directory

#### **Permission Errors**
- On Windows, run installation as Administrator if needed
- Ensure proper file permissions on the extension directory
- Check antivirus software isn't blocking the installation

### **Getting Help**

If you encounter issues:

1. **Check the [Troubleshooting Guide](Troubleshooting)**
2. **Search [GitHub Issues](https://github.com/sak1620/kiro-ssh-wsl-extension/issues)**
3. **Create a new issue** with:
   - Your operating system and version
   - Kiro IDE version
   - Node.js version
   - Complete error messages
   - Steps to reproduce the issue

## ✅ **Verification Checklist**

After installation, verify these items:

- [ ] Extension appears in Kiro's Extensions panel
- [ ] MCP servers are running (check MCP panel)
- [ ] WSL distributions are detected (if WSL is installed)
- [ ] SSH tools are available
- [ ] No error messages in Kiro's console
- [ ] Extension settings are accessible

## 🔄 **Updating the Extension**

### **Marketplace Updates**
- Updates will be automatically available through Kiro's Extensions panel
- Click "Update" when a new version is available

### **Manual Updates**
```bash
cd kiro-ssh-wsl-extension
git pull origin main
npm install
npm run build
npm run install-kiro
```

## 🗑️ **Uninstalling**

### **From Marketplace**
1. Go to Kiro's Extensions panel
2. Find "SSH & WSL Remote Development"
3. Click "Uninstall"
4. Restart Kiro IDE

### **Manual Uninstall**
```bash
npm run uninstall-kiro
```

---

**Next Steps**: Once installed, check out the [Quick Start Guide](Quick-Start) to begin using the extension!