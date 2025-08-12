# SSH & WSL Remote Development Extension for Kiro IDE

Complete SSH and WSL integration for Kiro IDE - Connect to remote servers and WSL distributions seamlessly.

## 🚀 Features

### SSH Integration
- Multiple SSH connection management
- Secure SFTP file transfer
- Remote command execution
- Connection pooling and management

### WSL Integration
- Native Windows Subsystem for Linux support
- Cross-platform development workflows
- Path conversion utilities (Windows ↔ WSL)
- Development environment setup

### Remote Destinations
- Unified interface for SSH and WSL
- Remote development environments
- File synchronization capabilities
- AI-powered operations

## 📦 Installation

```bash
npm install
npm run build
npm run install-kiro
```

## 🎯 Quick Start

### Connect to WSL
```
"Connect to my WSL Ubuntu distribution and list the home directory"
```

### Connect to SSH Server
```
"Connect to SSH server at 192.168.1.100 with username 'developer'"
```

### File Operations
```
"Upload my project files to the remote server"
"Download the config file from /etc/nginx/nginx.conf"
```

## 🛠 Available Tools

### WSL Tools
- `wsl_execute` - Execute Linux commands
- `wsl_list_distributions` - List WSL distributions
- `wsl_copy_file` - Transfer files between Windows/WSL
- `wsl_convert_path` - Convert path formats

### SSH Tools
- `ssh_connect` - Connect to remote servers
- `ssh_execute` - Execute remote commands
- `ssh_transfer_file` - Upload/download files
- `ssh_list_connections` - Manage connections

### Remote Destination Tools
- `remote_list_destinations` - List available destinations
- `remote_connect` - Connect to destinations
- `remote_execute` - Run commands remotely
- `remote_setup_dev_environment` - Setup development tools

## 📋 Requirements

- Kiro IDE v1.0.0 or higher
- Node.js v16.0.0 or higher
- Windows 10/11 (for WSL features)
- WSL installed (for WSL features)
- SSH access to remote servers (for SSH features)

## 📚 Documentation

Complete documentation is available in the [GitHub Wiki](https://github.com/sak1620/kiro-ssh-wsl-extension/wiki):

- **[Installation Guide](https://github.com/sak1620/kiro-ssh-wsl-extension/wiki/Installation-Guide)** - Complete setup instructions
- **[Quick Start](https://github.com/sak1620/kiro-ssh-wsl-extension/wiki/Quick-Start)** - Get started in 5 minutes
- **[SSH Usage Guide](https://github.com/sak1620/kiro-ssh-wsl-extension/wiki/SSH-Usage-Guide)** - Complete SSH functionality
- **[WSL Usage Guide](https://github.com/sak1620/kiro-ssh-wsl-extension/wiki/WSL-Usage-Guide)** - Complete WSL functionality
- **[API Reference](https://github.com/sak1620/kiro-ssh-wsl-extension/wiki/API-Reference)** - Complete API documentation
- **[Examples](https://github.com/sak1620/kiro-ssh-wsl-extension/wiki/Examples)** - Practical examples and use cases
- **[Configuration](https://github.com/sak1620/kiro-ssh-wsl-extension/wiki/Configuration)** - Advanced configuration options
- **[Troubleshooting](https://github.com/sak1620/kiro-ssh-wsl-extension/wiki/Troubleshooting)** - Common issues and solutions

## 📝 License

MIT License - see [LICENSE](marketplace/LICENSE) for details.

## 🆘 Support

- **[GitHub Issues](https://github.com/sak1620/kiro-ssh-wsl-extension/issues)** - Report bugs and request features
- **[GitHub Discussions](https://github.com/sak1620/kiro-ssh-wsl-extension/discussions)** - Ask questions and share ideas
- **[Documentation Wiki](https://github.com/sak1620/kiro-ssh-wsl-extension/wiki)** - Comprehensive guides and references