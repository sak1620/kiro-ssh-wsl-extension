# Contributing to SSH & WSL Remote Development Extension

Thank you for your interest in contributing to the SSH & WSL Remote Development extension for Kiro IDE! This document provides guidelines and information for contributors.

## 🤝 **How to Contribute**

### **Reporting Issues**
- Use the [GitHub Issues](https://github.com/sak1620/kiro-ssh-wsl-extension/issues) page
- Search existing issues before creating a new one
- Provide detailed information about the problem
- Include steps to reproduce the issue
- Mention your operating system and Kiro IDE version

### **Suggesting Features**
- Open a [Feature Request](https://github.com/sak1620/kiro-ssh-wsl-extension/issues/new?template=feature_request.md)
- Describe the feature and its benefits
- Explain the use case
- Consider implementation complexity

### **Code Contributions**
1. **Fork the Repository**
   ```bash
   git clone https://github.com/sak1620/kiro-ssh-wsl-extension
   cd kiro-ssh-wsl-extension
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the coding standards
   - Add tests for new functionality
   - Update documentation as needed

4. **Test Your Changes**
   ```bash
   npm install
   npm run build
   npm run test-wsl
   npm run demo
   ```

5. **Submit a Pull Request**
   - Provide a clear description of changes
   - Reference related issues
   - Ensure all tests pass

## 🛠 **Development Setup**

### **Prerequisites**
- Node.js v16.0.0 or higher
- TypeScript knowledge
- Windows 10/11 with WSL (for WSL features)
- SSH access to test servers (for SSH features)

### **Local Development**
```bash
# Clone the repository
git clone https://github.com/sak1620/kiro-ssh-wsl-extension
cd kiro-ssh-wsl-extension

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm run test-wsl
npm run demo

# Install in Kiro (for testing)
npm run install-kiro
```

### **Project Structure**
```
├── src/                    # TypeScript source code
│   ├── kiroAPI.ts         # Main SSH API
│   ├── kiroWSL.ts         # WSL API
│   ├── sshManager.ts      # SSH connection management
│   ├── wslManager.ts      # WSL management
│   └── ...
├── kiro-integration/      # Kiro IDE integration
│   ├── mcpServer.js       # MCP server
│   ├── hooks.js           # Kiro hooks
│   └── ...
├── remote-destination/    # Remote destination functionality
├── examples/              # Usage examples
├── marketplace/           # Marketplace files
└── out/                   # Compiled JavaScript
```

## 📝 **Coding Standards**

### **TypeScript/JavaScript**
- Use TypeScript for new code
- Follow ESLint configuration
- Use meaningful variable names
- Add JSDoc comments for public APIs
- Handle errors appropriately

### **Code Style**
```typescript
// Good
async function connectToServer(config: SSHConfig): Promise<string> {
    try {
        const connectionId = await this.sshManager.connect(config);
        return `Connected to ${connectionId}`;
    } catch (error) {
        throw new Error(`Connection failed: ${error.message}`);
    }
}

// Bad
function connect(c) {
    return this.ssh.connect(c);
}
```

### **Error Handling**
- Always handle errors gracefully
- Provide meaningful error messages
- Log errors appropriately
- Don't expose sensitive information

### **Testing**
- Add tests for new functionality
- Test both success and error cases
- Test cross-platform compatibility
- Include integration tests

## 🧪 **Testing Guidelines**

### **Unit Tests**
- Test individual functions and methods
- Mock external dependencies
- Test edge cases and error conditions

### **Integration Tests**
- Test SSH connections (with test servers)
- Test WSL integration (on Windows)
- Test MCP server functionality
- Test file operations

### **Manual Testing**
- Test in actual Kiro IDE environment
- Test with different SSH servers
- Test with different WSL distributions
- Test error scenarios

## 📚 **Documentation**

### **Code Documentation**
- Add JSDoc comments to public APIs
- Document complex algorithms
- Explain non-obvious code sections

### **User Documentation**
- Update README.md for new features
- Add examples for new functionality
- Update configuration documentation

### **API Documentation**
- Document all public methods
- Include parameter descriptions
- Provide usage examples

## 🔒 **Security Considerations**

### **SSH Security**
- Never log passwords or private keys
- Use secure connection methods
- Validate input parameters
- Handle credentials securely

### **WSL Security**
- Validate file paths
- Prevent path traversal attacks
- Handle permissions appropriately

## 🚀 **Release Process**

### **Version Numbering**
- Follow [Semantic Versioning](https://semver.org/)
- MAJOR.MINOR.PATCH format
- Update CHANGELOG.md

### **Release Checklist**
- [ ] All tests pass
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version number bumped
- [ ] Create GitHub release
- [ ] Publish to Kiro Marketplace

## 🎯 **Areas for Contribution**

### **High Priority**
- SSH key management improvements
- Performance optimizations
- Error handling enhancements
- Cross-platform compatibility

### **Medium Priority**
- Additional WSL features
- UI/UX improvements
- More automation hooks
- Better logging

### **Low Priority**
- Code refactoring
- Documentation improvements
- Example additions
- Test coverage

## 💬 **Communication**

### **Getting Help**
- [GitHub Discussions](https://github.com/sak1620/kiro-ssh-wsl-extension/discussions)
- [Discord Community](https://discord.gg/kiro-ide)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/kiro-ide)

### **Staying Updated**
- Watch the repository for updates
- Follow the project on GitHub
- Join the community discussions

## 🙏 **Recognition**

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page
- Community highlights

Thank you for contributing to the SSH & WSL Remote Development extension!