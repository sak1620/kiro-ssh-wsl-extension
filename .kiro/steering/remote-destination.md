---
inclusion: always
---

# Kiro Remote Destination Integration

This document provides context for using remote destinations (SSH and WSL) in Kiro IDE.

## Available Remote Destinations

### WSL Destinations
- Automatically detected WSL distributions
- Linux development environment on Windows
- Access to Linux tools and packages

### SSH Destinations  
- Remote servers and cloud instances
- Production and staging environments
- Shared development servers

## Remote Destination Operations

### Connection Management
- `remote_list_destinations` - List available destinations
- `remote_connect` - Connect to a destination
- `remote_disconnect` - Disconnect from current destination

### File Operations
- `remote_list_files` - Browse remote directories
- `remote_read_file` - Read remote files
- `remote_write_file` - Edit remote files
- `remote_upload_file` - Upload files to remote
- `remote_download_file` - Download files from remote

### Development Operations
- `remote_execute` - Run commands remotely
- `remote_setup_dev_environment` - Setup development tools
- `remote_change_directory` - Navigate remote filesystem

## Usage Examples

### Connect to WSL
```
Connect to my WSL Ubuntu distribution and list the home directory
```

### Connect to SSH Server
```
Connect to SSH server at 192.168.1.100 with username 'developer' and show current directory
```

### Remote Development
```
Upload my project to the remote server and run npm install
```

### File Management
```
Download the config file from /etc/nginx/nginx.conf to my local machine
```

## Best Practices

1. **Security**: Use SSH keys instead of passwords when possible
2. **File Management**: Always backup before editing remote files
3. **Environment Setup**: Use the setup tools to configure development environments
4. **Connection Management**: Properly disconnect when done

## File References

Remote destination functionality is implemented in:
- #[[file:../remote-destination/kiroRemoteDestination.js]] - Core remote destination API
- #[[file:../remote-destination/remoteDestinationMCP.js]] - MCP server implementation
