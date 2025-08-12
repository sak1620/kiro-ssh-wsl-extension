# SSH & WSL Remote Development Extension for Kiro IDE

Transform your development workflow with seamless SSH and WSL integration in Kiro IDE. Connect to remote servers and Windows Subsystem for Linux as if they were local environments.

## 🚀 **Features**

### **SSH Integration**
- **Multiple SSH Connections**: Connect to multiple remote servers simultaneously
- **Secure File Transfer**: Upload/download files via SFTP
- **Remote Command Execution**: Run commands on remote servers
- **Connection Management**: Easy connection pooling and management

### **WSL Integration**
- **Native WSL Support**: Access Windows Subsystem for Linux directly
- **Cross-Platform Development**: Seamless Windows ↔ Linux development
- **Path Conversion**: Automatic path translation between Windows and WSL
- **Development Environment Setup**: One-click dev environment configuration

### **Remote Destinations**
- **Unified Interface**: Same operations work on SSH servers and WSL
- **Remote Development**: Code on remote environments as if local
- **File Synchronization**: Keep files in sync across environments
- **Environment Switching**: Easy switching between local, WSL, and remote

### **AI Integration**
- **Natural Language Commands**: Use AI to perform SSH/WSL operations
- **Smart Suggestions**: Context-aware recommendations
- **Workflow Automation**: AI-assisted development workflows

## 📋 **Installation**

1. **Install from Kiro Marketplace**
   - Open Kiro IDE
   - Go to Extensions → Browse Marketplace
   - Search for "SSH & WSL Remote Development"
   - Click Install

2. **Manual Installation**
   ```bash
   git clone https://github.com/sak1620/kiro-ssh-wsl-extension
   cd kiro-ssh-wsl-extension
   npm install
   npm run install-kiro
   ```

## 🎯 **Quick Start**

### **Connect to WSL**
```
"Connect to my WSL Ubuntu distribution and list the home directory"
```

### **Connect to SSH Server**
```
"Connect to SSH server at 192.168.1.100 with username 'developer'"
```

### **File Operations**
```
"Upload my project files to the remote server"
"Download the config file from /etc/nginx/nginx.conf"
```

### **Development Workflows**
```
"Set up a Node.js development environment in WSL"
"Build my project in WSL and deploy to the remote server"
```

## 🛠 **Available Tools**

### **WSL Tools**
- `wsl_execute` - Execute Linux commands
- `wsl_list_distributions` - List WSL distributions
- `wsl_copy_file` - Transfer files between Windows/WSL
- `wsl_convert_path` - Convert path formats

### **SSH Tools**
- `ssh_connect` - Connect to remote servers
- `ssh_execute` - Execute remote commands
- `ssh_transfer_file` - Upload/download files
- `ssh_list_connections` - Manage connections

### **Remote Destination Tools**
- `remote_list_destinations` - List available destinations
- `remote_connect` - Connect to destinations
- `remote_execute` - Run commands remotely
- `remote_setup_dev_environment` - Setup development tools

## 🎨 **Use Cases**

### **Cross-Platform Development**
- Develop on Windows, test on Linux (WSL)
- Deploy to remote Linux servers
- Maintain consistent environments

### **Remote Development**
- Code on cloud instances
- Access powerful remote development servers
- Collaborate on shared development environments

### **DevOps & Deployment**
- Automated deployment workflows
- Server management and monitoring
- Configuration management

### **Learning & Experimentation**
- Safe Linux environment on Windows
- Experiment with different distributions
- Learn server administration

## 📚 **Documentation**

### **Configuration**
The extension can be configured through Kiro's settings:

```json
{
  "sshwsl.autoSyncToWSL": true,
  "sshwsl.defaultSSHPort": 22,
  "sshwsl.wslDistribution": "Ubuntu",
  "sshwsl.enableDeploymentHooks": true
}
```

### **Hooks**
Set up automatic workflows:
- **File Sync**: Auto-sync files to WSL on save
- **Test Runner**: Run tests in WSL when test files change
- **Auto Deploy**: Deploy when deployment files are modified

### **Security**
- Use SSH keys instead of passwords when possible
- Store credentials securely
- Limit remote access permissions
- Monitor connection activities

## 🔧 **Requirements**

- **Kiro IDE** v1.0.0 or higher
- **Node.js** v16.0.0 or higher
- **Windows 10/11** (for WSL features)
- **WSL installed** (for WSL features)
- **SSH access** to remote servers (for SSH features)

## 🤝 **Contributing**

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 **Support**

- **Documentation**: [Full Documentation](https://github.com/sak1620/kiro-ssh-wsl-extension/wiki)
- **Issues**: [Report Issues](https://github.com/sak1620/kiro-ssh-wsl-extension/issues)
- **Discussions**: [Community Discussions](https://github.com/sak1620/kiro-ssh-wsl-extension/discussions)

## 🎉 **What's New**

### **Version 1.0.0**
- Initial release
- SSH server connectivity
- WSL integration
- Remote destinations
- MCP tool integration
- AI-powered workflows
- Automatic hooks
- File synchronization

---

**Made with ❤️ for the Kiro IDE community**