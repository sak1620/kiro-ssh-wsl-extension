# Troubleshooting Guide

Common issues and solutions for the SSH & WSL Remote Development Extension.

## 🚨 **Quick Diagnostics**

### **Extension Health Check**

#### **Check Extension Status**
1. **Open Kiro IDE**
2. **Go to Extensions Panel**: Verify "SSH & WSL Remote Development" is installed and enabled
3. **Check MCP Panel**: Verify these servers are running:
   - ✅ `kiro-ssh-wsl`
   - ✅ `kiro-remote-destination`
4. **Test Basic Command**: Try `"List my WSL distributions"`

#### **System Requirements Check**
- ✅ **Kiro IDE**: v1.0.0 or higher
- ✅ **Node.js**: v16.0.0 or higher (`node --version`)
- ✅ **Windows**: 10/11 (for WSL features)
- ✅ **WSL**: Installed and running (for WSL features)

## 🐧 **WSL Issues**

### **WSL Not Detected**

#### **Symptoms**
- "WSL not available" error messages
- Empty WSL distributions list
- Commands fail with WSL errors

#### **Solutions**

##### **1. Check WSL Installation**
```powershell
# Check if WSL is installed
wsl --status

# List installed distributions
wsl --list --verbose
```

##### **2. Install WSL (if not installed)**
```powershell
# Run in elevated PowerShell
wsl --install

# Install specific distribution
wsl --install -d Ubuntu
```

##### **3. Start WSL Distribution**
```powershell
# Start default distribution
wsl

# Start specific distribution
wsl -d Ubuntu
```

##### **4. Update WSL**
```powershell
# Update WSL
wsl --update

# Set WSL version to 2
wsl --set-default-version 2
```

### **WSL Commands Failing**

#### **Symptoms**
- Commands execute but return errors
- "Command not found" errors
- Permission denied errors

#### **Solutions**

##### **1. Check Command Syntax**
```
# Instead of: wsl_execute "sudo apt update"
# Try: "Update package lists in WSL"
```

##### **2. Verify Distribution State**
```powershell
# Check if distribution is running
wsl --list --verbose

# Start stopped distribution
wsl -d Ubuntu
```

##### **3. Fix Permissions**
```bash
# In WSL, fix common permission issues
sudo chown -R $USER:$USER /home/$USER
chmod 755 /home/$USER
```

### **WSL File Operations Failing**

#### **Symptoms**
- File copy operations fail
- Path conversion errors
- "File not found" errors

#### **Solutions**

##### **1. Check Path Formats**
```
# Correct Windows path: C:\Users\username\file.txt
# Correct WSL path: /home/username/file.txt
# Correct mounted path: /mnt/c/Users/username/file.txt
```

##### **2. Verify File Permissions**
```bash
# Check file permissions in WSL
ls -la /path/to/file

# Fix permissions if needed
chmod 644 /path/to/file
```

##### **3. Check Disk Space**
```bash
# Check available space in WSL
df -h
```

## 🔐 **SSH Issues**

### **SSH Connection Failures**

#### **Symptoms**
- "Connection refused" errors
- "Host not found" errors
- "Authentication failed" errors
- Connection timeouts

#### **Solutions**

##### **1. Verify Server Details**
```bash
# Test connection manually
ssh username@hostname -p port

# Test with verbose output
ssh -v username@hostname
```

##### **2. Check Network Connectivity**
```bash
# Test if host is reachable
ping hostname

# Test if SSH port is open
telnet hostname 22
```

##### **3. Verify SSH Service**
```bash
# On the server, check SSH service
sudo systemctl status ssh
sudo systemctl start ssh
```

##### **4. Check Firewall**
```bash
# On server, check firewall rules
sudo ufw status
sudo ufw allow ssh
```

### **SSH Authentication Issues**

#### **Symptoms**
- "Permission denied" errors
- "Authentication failed" messages
- Key-based authentication not working

#### **Solutions**

##### **1. Verify Credentials**
- Double-check username and password
- Ensure account is not locked
- Try connecting with different credentials

##### **2. SSH Key Issues**
```bash
# Generate new SSH key pair
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# Copy public key to server
ssh-copy-id username@hostname

# Check key permissions
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub
```

##### **3. Server SSH Configuration**
```bash
# On server, check SSH config
sudo nano /etc/ssh/sshd_config

# Ensure these settings:
PermitRootLogin yes  # or no, depending on needs
PasswordAuthentication yes
PubkeyAuthentication yes

# Restart SSH service
sudo systemctl restart ssh
```

### **SSH File Transfer Issues**

#### **Symptoms**
- SFTP connection failures
- File upload/download errors
- "Permission denied" for file operations

#### **Solutions**

##### **1. Check SFTP Subsystem**
```bash
# On server, verify SFTP is enabled
grep -i sftp /etc/ssh/sshd_config
# Should show: Subsystem sftp /usr/lib/openssh/sftp-server
```

##### **2. Verify File Permissions**
```bash
# Check destination directory permissions
ls -la /path/to/destination/

# Fix permissions if needed
sudo chown username:username /path/to/destination/
sudo chmod 755 /path/to/destination/
```

##### **3. Check Disk Space**
```bash
# Check available space on server
df -h
```

## 🔌 **MCP Server Issues**

### **MCP Servers Not Starting**

#### **Symptoms**
- MCP servers show as "Stopped" in Kiro
- "Tool not found" errors
- Extension commands not working

#### **Solutions**

##### **1. Check MCP Configuration**
```json
// Verify .kiro/settings/mcp.json
{
  "mcpServers": {
    "kiro-ssh-wsl": {
      "command": "node",
      "args": ["./kiro-integration/mcpServer.js"],
      "disabled": false
    }
  }
}
```

##### **2. Verify File Paths**
```bash
# Check if MCP server file exists
ls -la ./kiro-integration/mcpServer.js

# Check if Node.js is accessible
node --version
```

##### **3. Check File Permissions**
```bash
# Ensure MCP server is executable
chmod +x ./kiro-integration/mcpServer.js
```

##### **4. Restart MCP Servers**
1. Go to Kiro's MCP panel
2. Stop the servers
3. Start them again
4. Check logs for errors

### **MCP Tools Not Working**

#### **Symptoms**
- "Method not found" errors
- Tools execute but return errors
- Unexpected responses

#### **Solutions**

##### **1. Check Tool Names**
```
# Correct tool names:
wsl_execute, wsl_list_distributions, ssh_connect, etc.

# Use natural language instead:
"Execute 'ls -la' in WSL"
"Connect to my SSH server"
```

##### **2. Verify Parameters**
```json
// Ensure required parameters are provided
{
  "name": "ssh_connect",
  "arguments": {
    "host": "required",
    "username": "required", 
    "password": "required"
  }
}
```

##### **3. Check MCP Server Logs**
1. Open Kiro's developer console
2. Look for MCP server error messages
3. Check for JSON parsing errors

## 🔧 **Installation Issues**

### **Extension Installation Failures**

#### **Symptoms**
- Extension not found in marketplace
- Installation hangs or fails
- Extension appears but doesn't work

#### **Solutions**

##### **1. Manual Installation**
```bash
# Clone and install manually
git clone https://github.com/sak1620/kiro-ssh-wsl-extension.git
cd kiro-ssh-wsl-extension
npm install
npm run build
npm run install-kiro
```

##### **2. Clear Extension Cache**
1. Close Kiro IDE
2. Clear extension cache (location varies by OS)
3. Restart Kiro IDE
4. Reinstall extension

##### **3. Check Node.js Version**
```bash
# Ensure Node.js v16+ is installed
node --version
npm --version
```

### **Build Errors**

#### **Symptoms**
- TypeScript compilation errors
- Missing dependencies
- Build process fails

#### **Solutions**

##### **1. Clean Install**
```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

##### **2. Check TypeScript Version**
```bash
# Install/update TypeScript
npm install -g typescript
tsc --version
```

##### **3. Fix Permission Issues**
```bash
# On Windows, run as Administrator if needed
# On Linux/Mac, check file permissions
chmod -R 755 ./
```

## 🌐 **Network Issues**

### **Connection Timeouts**

#### **Symptoms**
- SSH connections time out
- Slow response times
- Intermittent connection failures

#### **Solutions**

##### **1. Check Network Connectivity**
```bash
# Test basic connectivity
ping hostname

# Test with different DNS
nslookup hostname 8.8.8.8
```

##### **2. Adjust SSH Timeout Settings**
```bash
# In SSH config (~/.ssh/config)
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3
    ConnectTimeout 30
```

##### **3. Check Proxy Settings**
```bash
# If behind corporate proxy
export HTTP_PROXY=http://proxy:port
export HTTPS_PROXY=http://proxy:port
```

### **Firewall Issues**

#### **Symptoms**
- Connections blocked
- Specific ports not accessible
- Works on some networks but not others

#### **Solutions**

##### **1. Check Windows Firewall**
```powershell
# Allow Node.js through firewall
New-NetFirewallRule -DisplayName "Node.js" -Direction Inbound -Program "C:\Program Files\nodejs\node.exe" -Action Allow
```

##### **2. Check Corporate Firewall**
- Contact IT department about SSH access
- Request port 22 (or custom SSH port) to be opened
- Consider using SSH over HTTPS (port 443)

##### **3. Use Alternative Ports**
```bash
# Try SSH on different port
ssh -p 443 username@hostname
ssh -p 80 username@hostname
```

## 🔍 **Debugging Steps**

### **Enable Debug Logging**

#### **1. Kiro IDE Debug Mode**
1. Open Kiro IDE
2. Go to Help → Toggle Developer Tools
3. Check Console tab for errors
4. Look for extension-related messages

#### **2. MCP Server Debug**
```json
// Add to MCP configuration
{
  "mcpServers": {
    "kiro-ssh-wsl": {
      "env": {
        "DEBUG": "true",
        "LOG_LEVEL": "debug"
      }
    }
  }
}
```

#### **3. SSH Debug Mode**
```bash
# Test SSH with verbose output
ssh -vvv username@hostname
```

### **Collect Diagnostic Information**

#### **System Information**
```bash
# Operating System
uname -a  # Linux/Mac
systeminfo  # Windows

# Node.js version
node --version
npm --version

# WSL information (Windows)
wsl --status
wsl --list --verbose
```

#### **Extension Information**
1. Extension version
2. Kiro IDE version
3. Error messages (exact text)
4. Steps to reproduce
5. Expected vs actual behavior

## 🆘 **Getting Help**

### **Self-Help Resources**
1. **Check this troubleshooting guide**
2. **Review [API Reference](API-Reference)** for correct usage
3. **Try [Quick Start](Quick-Start)** to verify basic functionality
4. **Check [Examples](Examples)** for working code

### **Community Support**
1. **Search [GitHub Issues](https://github.com/sak1620/kiro-ssh-wsl-extension/issues)**
2. **Check [GitHub Discussions](https://github.com/sak1620/kiro-ssh-wsl-extension/discussions)**
3. **Join [Kiro IDE Community](https://community.kiro-ide.com)**

### **Report Issues**
When reporting issues, include:
- **Operating System** and version
- **Kiro IDE version**
- **Extension version**
- **Node.js version**
- **Complete error messages**
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)

### **Create GitHub Issue**
1. Go to [GitHub Issues](https://github.com/sak1620/kiro-ssh-wsl-extension/issues)
2. Click "New Issue"
3. Choose appropriate template
4. Fill in all requested information
5. Add relevant labels

## 🔄 **Recovery Procedures**

### **Reset Extension**
```bash
# Uninstall and reinstall
npm run uninstall-kiro
npm run install-kiro
```

### **Reset MCP Configuration**
1. Delete `.kiro/settings/mcp.json`
2. Restart Kiro IDE
3. Reinstall extension

### **Reset WSL**
```powershell
# Reset WSL distribution (WARNING: This deletes all data)
wsl --unregister Ubuntu
wsl --install -d Ubuntu
```

### **Factory Reset**
1. Uninstall extension
2. Delete all configuration files
3. Clear Kiro IDE cache
4. Restart Kiro IDE
5. Reinstall extension

---

**Still having issues?** Create a [GitHub Issue](https://github.com/sak1620/kiro-ssh-wsl-extension/issues) with detailed information about your problem.