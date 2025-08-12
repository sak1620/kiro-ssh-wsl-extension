# Kiro Remote Destination Extension

Transform your SSH and WSL connections into seamless remote development destinations for Kiro IDE.

## 🎯 **What This Does**

This extension turns your SSH servers and WSL distributions into **remote destinations** that Kiro can use for:

- **Remote Development**: Code on remote servers or WSL as if they were local
- **File Management**: Upload, download, and edit files remotely
- **Command Execution**: Run commands in remote environments
- **Development Environment Setup**: Automatically configure remote dev environments

## 🚀 **Quick Start**

### 1. **Add to Kiro MCP Configuration**

Add this to your `.kiro/settings/mcp.json`:

```json
{
  "mcpServers": {
    "kiro-remote-destination": {
      "command": "node",
      "args": ["./remote-destination/remoteDestinationMCP.js"],
      "disabled": false,
      "autoApprove": [
        "remote_list_destinations",
        "remote_get_current_directory",
        "remote_get_active_destination"
      ]
    }
  }
}
```

### 2. **Use as Remote Destination**

```javascript
// List available destinations
const destinations = await remote_list_destinations();

// Connect to WSL
await remote_connect("wsl-Ubuntu");

// Connect to SSH server
await remote_connect("ssh-myserver", {
  host: "192.168.1.100",
  username: "developer",
  password: "mypassword"
});

// Work with remote files
await remote_execute("ls -la");
await remote_read_file("/home/user/config.json");
await remote_write_file("/home/user/newfile.txt", "Hello Remote!");
```

## 🛠 **Available Remote Operations**

### **Connection Management**
- `remote_list_destinations` - List WSL and SSH destinations
- `remote_connect` - Connect to a destination
- `remote_disconnect` - Disconnect from current destination
- `remote_get_active_destination` - Get current connection info

### **Command Execution**
- `remote_execute` - Run commands remotely
- `remote_get_current_directory` - Get working directory
- `remote_change_directory` - Change directory

### **File Operations**
- `remote_list_files` - List directory contents
- `remote_read_file` - Read remote files
- `remote_write_file` - Write to remote files
- `remote_upload_file` - Upload files to remote
- `remote_download_file` - Download files from remote

### **Development Environment**
- `remote_setup_dev_environment` - Install dev tools and setup project

## 🎯 **Use Cases**

### **1. Remote Development Server**
```
Connect to your cloud development server and work as if it's local:
- Edit files directly on the server
- Run builds and tests remotely
- Deploy from the remote environment
```

### **2. WSL Development Environment**
```
Use WSL as a Linux development environment:
- Access Linux tools and packages
- Run Linux-specific builds
- Test cross-platform compatibility
```

### **3. Multi-Environment Development**
```
Switch between different environments:
- Local Windows development
- WSL Linux environment
- Remote staging server
- Production server (read-only)
```

## 🔧 **Configuration Examples**

### **WSL Destination**
```javascript
// Automatically detected WSL distributions
{
  "id": "wsl-Ubuntu",
  "name": "WSL: Ubuntu",
  "type": "wsl",
  "status": "Running",
  "capabilities": ["execute", "fileSystem", "terminal", "development"]
}
```

### **SSH Destination**
```javascript
// Connect to SSH server
await remote_connect("ssh-production", {
  host: "prod.example.com",
  username: "deploy",
  password: "secure_password",
  port: 22
});
```

## 🚀 **Integration with Kiro**

### **As MCP Tools**
Use through Kiro's AI interface:
```
"Connect to my WSL Ubuntu and list the files in my project directory"
"Upload my local config.json to the remote server"
"Set up a Node.js development environment on my remote server"
```

### **As Direct API**
```javascript
const { KiroRemoteDestination } = require('./kiroRemoteDestination');

const remote = new KiroRemoteDestination();

// Connect to destination
await remote.connect('wsl-Ubuntu');

// Work with files
const files = await remote.listFiles('/home/user/project');
await remote.uploadFile('./local-file.txt', '/remote/path/file.txt');

// Execute commands
const result = await remote.execute('npm install');
```

## 🎯 **Workflow Examples**

### **Development Workflow**
1. Connect to remote destination
2. Upload project files
3. Set up development environment
4. Edit and test code remotely
5. Download results

### **Deployment Workflow**
1. Connect to production server
2. Upload built application
3. Run deployment scripts
4. Verify deployment
5. Monitor logs

### **Cross-Platform Testing**
1. Develop on Windows
2. Test on WSL (Linux)
3. Deploy to remote server
4. Verify on production

## 🔒 **Security Notes**

- Store credentials securely (use environment variables)
- Use SSH keys instead of passwords when possible
- Limit remote access permissions
- Monitor remote connections and activities

## 📋 **Requirements**

- Node.js runtime
- SSH access to remote servers (for SSH destinations)
- WSL installed and configured (for WSL destinations)
- Kiro IDE with MCP support

## 🎉 **Ready to Use**

This remote destination extension is ready to use! It provides a complete remote development environment solution for Kiro IDE, supporting both SSH servers and WSL distributions as seamless remote destinations.