# Changelog

All notable changes to the SSH & WSL Remote Development extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-08-12

### Added
- **SSH Integration**
  - Multiple SSH server connections
  - Secure SFTP file transfer
  - Remote command execution
  - Connection management and pooling
  - SSH key authentication support

- **WSL Integration**
  - Native Windows Subsystem for Linux support
  - Automatic WSL distribution detection
  - Cross-platform file operations
  - Path conversion utilities (Windows ↔ WSL)
  - Development environment setup

- **Remote Destinations**
  - Unified interface for SSH and WSL
  - Remote development environment support
  - File synchronization capabilities
  - Environment switching

- **MCP Integration**
  - Complete MCP server implementation
  - 13+ MCP tools for SSH/WSL operations
  - AI-powered natural language commands
  - Auto-approved safe operations

- **Automation & Hooks**
  - File save hooks for auto-sync
  - Test runner hooks for WSL
  - Deployment hooks for automatic deployment
  - Configurable workflow automation

- **Developer Experience**
  - TypeScript implementation
  - Comprehensive error handling
  - Detailed logging and debugging
  - Extensive documentation

### Features
- **Cross-Platform Development**: Seamless Windows, WSL, and remote server integration
- **AI Integration**: Natural language SSH/WSL operations through Kiro's AI
- **File Management**: Upload, download, and sync files across environments
- **Development Workflows**: Automated build, test, and deployment processes
- **Security**: SSH key support, secure connections, credential management

### Tools Included
- `wsl_execute` - Execute commands in WSL
- `wsl_list_distributions` - List available WSL distributions
- `wsl_copy_file` - Transfer files between Windows and WSL
- `wsl_convert_path` - Convert between Windows and WSL path formats
- `ssh_connect` - Connect to SSH servers
- `ssh_execute` - Execute commands on remote servers
- `ssh_transfer_file` - Upload/download files via SFTP
- `ssh_list_connections` - Manage SSH connections
- `remote_list_destinations` - List all remote destinations
- `remote_connect` - Connect to remote destinations
- `remote_execute` - Execute commands on remote destinations
- `remote_setup_dev_environment` - Setup development environments
- And more...

### Documentation
- Complete installation guide
- Usage examples and tutorials
- API documentation
- Configuration reference
- Troubleshooting guide
- Best practices

### Supported Platforms
- Windows 10/11 with WSL
- Linux (for SSH features)
- macOS (for SSH features)
- Remote servers via SSH

## [Unreleased]

### Planned Features
- SSH key management UI
- Connection profiles and templates
- Advanced file synchronization options
- Terminal integration improvements
- Performance optimizations
- Additional WSL distribution support

---

## Support

For support, please visit our [GitHub Issues](https://github.com/sak1620/kiro-ssh-wsl-extension/issues) page.