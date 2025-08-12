---
inclusion: always
---

# Kiro SSH/WSL Integration Steering

This document provides context and guidelines for using SSH and WSL functionality within Kiro IDE.

## Available Capabilities

### WSL Integration
- Execute Linux commands directly from Kiro
- Transfer files between Windows and WSL seamlessly
- Convert paths between Windows and WSL formats
- Manage WSL distributions
- Run development tools in Linux environment

### SSH Integration
- Connect to remote servers
- Execute commands on remote systems
- Transfer files via SFTP
- Manage multiple SSH connections
- Automate deployment workflows

## Common Workflows

### Development Setup
When working on a project, you can:
1. Automatically sync files to WSL for Linux-based development
2. Install dependencies using Linux package managers
3. Run tests and builds in WSL environment
4. Deploy to remote servers via SSH

### File Operations
- Use `wsl_copy_file` to move files between Windows and WSL
- Use `wsl_convert_path` to translate file paths
- Use SSH file transfer for remote operations

### Command Execution
- Use `wsl_execute` for Linux commands
- Use `ssh_execute` for remote server commands
- Chain commands for complex workflows

## Best Practices

1. **Path Handling**: Always use path conversion utilities when working across Windows/WSL boundaries
2. **Error Handling**: Wrap operations in try-catch blocks for robust error handling
3. **Connection Management**: Properly disconnect SSH connections when done
4. **Security**: Use environment variables for sensitive credentials
5. **Performance**: Batch operations when possible to reduce overhead

## Example Usage Patterns

### Quick WSL Setup
```javascript
// Auto-setup WSL environment
const setup = await wsl_quick_setup();
const result = await wsl_execute("ls -la");
```

### SSH Deployment
```javascript
// Connect and deploy
const conn = await ssh_connect("server.com", "user", "password");
await ssh_upload(conn, "./dist", "/var/www/app");
await ssh_execute(conn, "systemctl restart nginx");
```

### Cross-Platform Development
```javascript
// Sync Windows project to WSL
const wslPath = await wsl_convert_path("C:\\Projects\\MyApp");
await wsl_copy_file("C:\\Projects\\MyApp", wslPath, "to_wsl");
await wsl_execute(`cd "${wslPath}" && npm install`);
```

## Integration Points

This extension integrates with Kiro through:
- **MCP Tools**: Available as MCP server tools
- **Hooks**: Automatic triggers on file save, project open, etc.
- **Direct API**: Import and use APIs directly in Kiro workflows
- **Workflow Templates**: Pre-built workflows for common tasks

## File References

The SSH/WSL functionality is implemented in:
- #[[file:../src/kiroWSL.ts]] - WSL API
- #[[file:../src/kiroAPI.ts]] - SSH API  
- #[[file:../src/wslManager.ts]] - WSL core functionality
- #[[file:../src/sshManager.ts]] - SSH core functionality