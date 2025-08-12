# WSL Usage Guide

Complete guide to using Windows Subsystem for Linux (WSL) functionality in the SSH & WSL Remote Development Extension.

## 🐧 **WSL Overview**

WSL integration provides seamless access to Linux environments on Windows, enabling cross-platform development, Linux tool usage, and unified development workflows.

## 🚀 **Getting Started with WSL**

### **Basic WSL Operations**

#### **List WSL Distributions**
```
"List my WSL distributions"
"Show me all available WSL environments"
```

#### **Connect to WSL**
```
"Connect to my WSL Ubuntu distribution"
"Switch to my WSL Debian environment"
```

#### **Check WSL Status**
```
"What's the status of my WSL distributions?"
"Is my Ubuntu WSL running?"
```

### **WSL Distribution Management**

#### **Start/Stop Distributions**
```
"Start my Ubuntu WSL distribution"
"Stop my WSL Debian environment"
"Restart my default WSL distribution"
```

#### **Set Default Distribution**
```
"Set Ubuntu as my default WSL distribution"
"Make Debian my primary WSL environment"
```

## 💻 **Command Execution in WSL**

### **Basic Linux Commands**

#### **File System Navigation**
```
"Show current directory in WSL"
"List files in my WSL home directory"
"Navigate to /home/user/projects in WSL"
```

#### **System Information**
```
"Show system information in WSL"
"Check WSL kernel version"
"Display memory usage in WSL"
```

#### **Process Management**
```
"Show running processes in WSL"
"Check if nginx is running in WSL"
"Kill process with PID 1234 in WSL"
```

### **Development Commands**

#### **Node.js Development**
```
"Check Node.js version in WSL"
"Install npm packages in WSL"
"Run npm start in my WSL project directory"
```

#### **Python Development**
```
"Check Python version in WSL"
"Install pip packages in WSL"
"Run my Python script in WSL"
```

#### **Git Operations**
```
"Check git status in WSL"
"Commit changes in my WSL project"
"Push to remote repository from WSL"
```

## 📁 **File Operations Between Windows and WSL**

### **Path Conversion**

#### **Windows to WSL Path**
```
"Convert 'C:\\Users\\username\\Documents' to WSL path"
"What's the WSL path for 'D:\\Projects\\MyApp'?"
```

#### **WSL to Windows Path**
```
"Convert '/home/user/project' to Windows path"
"What's the Windows path for '/mnt/c/temp'?"
```

### **File Transfer**

#### **Copy Files to WSL**
```
"Copy 'C:\\temp\\config.json' to WSL at '/home/user/config.json'"
"Transfer my Windows project files to WSL"
```

#### **Copy Files from WSL**
```
"Copy '/home/user/output.txt' to Windows at 'C:\\temp\\output.txt'"
"Transfer my WSL build output to Windows"
```

#### **Sync Directories**
```
"Sync my Windows project directory with WSL"
"Keep my WSL and Windows code directories in sync"
```

### **File System Access**

#### **Access Windows Files from WSL**
```
"List files in C: drive from WSL"
"Edit Windows file from WSL"
"Access my Windows Documents folder from WSL"
```

#### **Access WSL Files from Windows**
```
"Open WSL file in Windows Explorer"
"Edit WSL file with Windows editor"
"Backup WSL files to Windows"
```

## 🛠 **Development Environment Setup**

### **Programming Languages**

#### **Node.js Setup**
```
"Install Node.js in WSL"
"Set up npm in my WSL environment"
"Configure Node.js development environment in WSL"
```

#### **Python Setup**
```
"Install Python 3 in WSL"
"Set up pip and virtual environments in WSL"
"Configure Python development environment in WSL"
```

#### **Java Setup**
```
"Install OpenJDK in WSL"
"Set up Maven in WSL"
"Configure Java development environment in WSL"
```

### **Development Tools**

#### **Text Editors and IDEs**
```
"Install vim in WSL"
"Set up nano as default editor in WSL"
"Install code editor in WSL"
```

#### **Version Control**
```
"Install git in WSL"
"Configure git with my credentials in WSL"
"Set up SSH keys for git in WSL"
```

#### **Build Tools**
```
"Install make and build tools in WSL"
"Set up Docker in WSL"
"Install development dependencies in WSL"
```

### **Package Management**

#### **Ubuntu/Debian (apt)**
```
"Update package lists in WSL"
"Install curl in WSL"
"Upgrade all packages in WSL"
"Search for available packages in WSL"
```

#### **Package Installation Examples**
```
"Install essential development tools in WSL"
"Install web development stack in WSL"
"Install data science tools in WSL"
```

## 🔄 **Cross-Platform Development Workflows**

### **Build and Test Workflows**

#### **Cross-Platform Building**
```
"Build my project in both Windows and WSL"
"Test my application in WSL Linux environment"
"Compare build outputs between Windows and WSL"
```

#### **Automated Testing**
```
"Run tests in WSL when I save test files"
"Set up continuous testing in WSL"
"Compare test results between Windows and WSL"
```

### **Development Patterns**

#### **Windows Development, Linux Testing**
```
"Develop on Windows, test in WSL"
"Use Windows IDE, build in WSL"
"Edit in Windows, run in WSL"
```

#### **Unified Development Environment**
```
"Set up identical development environment in Windows and WSL"
"Sync development tools between Windows and WSL"
"Maintain consistent configuration across environments"
```

## 🌐 **Web Development with WSL**

### **Web Server Setup**

#### **Apache Setup**
```
"Install Apache web server in WSL"
"Configure Apache virtual hosts in WSL"
"Start Apache service in WSL"
```

#### **Nginx Setup**
```
"Install Nginx in WSL"
"Configure Nginx server blocks in WSL"
"Test Nginx configuration in WSL"
```

#### **Node.js Web Applications**
```
"Set up Express.js application in WSL"
"Run Node.js web server in WSL"
"Configure port forwarding for WSL web server"
```

### **Database Development**

#### **MySQL Setup**
```
"Install MySQL server in WSL"
"Configure MySQL in WSL"
"Create database and user in WSL MySQL"
```

#### **PostgreSQL Setup**
```
"Install PostgreSQL in WSL"
"Set up PostgreSQL database in WSL"
"Configure PostgreSQL access in WSL"
```

#### **MongoDB Setup**
```
"Install MongoDB in WSL"
"Start MongoDB service in WSL"
"Connect to MongoDB from WSL"
```

## 🐳 **Container Development**

### **Docker in WSL**

#### **Docker Setup**
```
"Install Docker in WSL"
"Configure Docker daemon in WSL"
"Test Docker installation in WSL"
```

#### **Container Operations**
```
"Build Docker image in WSL"
"Run container in WSL"
"Manage Docker containers in WSL"
```

### **Kubernetes Development**

#### **Kubernetes Tools**
```
"Install kubectl in WSL"
"Set up minikube in WSL"
"Configure Kubernetes development environment in WSL"
```

## 📊 **System Administration in WSL**

### **System Monitoring**

#### **Resource Monitoring**
```
"Check CPU usage in WSL"
"Monitor memory usage in WSL"
"Show disk usage in WSL"
```

#### **Process Management**
```
"List all processes in WSL"
"Monitor system processes in WSL"
"Kill unresponsive processes in WSL"
```

### **Service Management**

#### **Systemd Services**
```
"List running services in WSL"
"Start service in WSL"
"Enable service on boot in WSL"
```

#### **Custom Services**
```
"Create custom service in WSL"
"Configure service startup in WSL"
"Monitor service logs in WSL"
```

## 🔧 **WSL Configuration and Optimization**

### **WSL Configuration**

#### **WSL Settings**
```
"Configure WSL memory limits"
"Set WSL default user"
"Configure WSL network settings"
```

#### **Performance Optimization**
```
"Optimize WSL performance"
"Configure WSL for development"
"Tune WSL for better performance"
```

### **Integration Settings**

#### **Windows Integration**
```
"Enable Windows PATH in WSL"
"Configure WSL interoperability"
"Set up WSL Windows integration"
```

#### **File System Performance**
```
"Optimize file system performance in WSL"
"Configure WSL file system settings"
"Improve WSL file access speed"
```

## 🚨 **Troubleshooting WSL**

### **Common Issues**

#### **WSL Not Starting**
```
"Check WSL installation status"
"Restart WSL service"
"Reinstall WSL distribution"
```

#### **Performance Issues**
```
"Diagnose WSL performance problems"
"Check WSL resource usage"
"Optimize WSL configuration"
```

#### **File Access Issues**
```
"Fix WSL file permission problems"
"Resolve WSL file access errors"
"Check WSL file system integrity"
```

### **Network Issues**

#### **Connectivity Problems**
```
"Test WSL network connectivity"
"Configure WSL network settings"
"Fix WSL DNS resolution"
```

#### **Port Access Issues**
```
"Configure WSL port forwarding"
"Access WSL services from Windows"
"Fix WSL network port binding"
```

## 🎯 **Advanced WSL Usage**

### **Multiple Distributions**

#### **Distribution Management**
```
"Install additional WSL distributions"
"Switch between WSL distributions"
"Compare different WSL distributions"
```

#### **Distribution-Specific Tasks**
```
"Run command in specific WSL distribution"
"Configure Ubuntu WSL differently from Debian WSL"
"Manage packages in multiple WSL distributions"
```

### **WSL 2 Features**

#### **WSL 2 Advantages**
```
"Check if I'm using WSL 2"
"Upgrade to WSL 2"
"Configure WSL 2 features"
```

#### **WSL 2 Integration**
```
"Use WSL 2 with Docker Desktop"
"Configure WSL 2 for development"
"Optimize WSL 2 performance"
```

## 📚 **WSL Command Reference**

### **Available MCP Tools**

- `wsl_execute` - Execute commands in WSL
- `wsl_list_distributions` - List WSL distributions
- `wsl_copy_file` - Transfer files between Windows/WSL
- `wsl_convert_path` - Convert path formats
- `wsl_setup_dev_environment` - Setup development environment

### **Common WSL Commands**

| Purpose | Command Example |
|---------|----------------|
| System Info | `uname -a`, `lsb_release -a`, `cat /proc/version` |
| File Operations | `ls -la`, `cp`, `mv`, `rm`, `chmod` |
| Package Management | `sudo apt update`, `sudo apt install`, `apt search` |
| Process Management | `ps aux`, `top`, `htop`, `kill` |
| Network | `ip addr`, `netstat -tulpn`, `curl`, `wget` |
| Development | `node --version`, `python3 --version`, `git status` |
| Text Processing | `grep`, `sed`, `awk`, `sort`, `uniq` |

### **WSL-Specific Commands**

| Purpose | Windows Command | WSL Command |
|---------|----------------|-------------|
| List Distributions | `wsl --list --verbose` | N/A |
| Start Distribution | `wsl -d Ubuntu` | N/A |
| Stop Distribution | `wsl --terminate Ubuntu` | N/A |
| Access Windows Files | N/A | `cd /mnt/c/Users` |
| Run Windows Command | N/A | `cmd.exe /c dir` |

## 🎓 **Learning Resources**

### **WSL Documentation**
- [Microsoft WSL Documentation](https://docs.microsoft.com/en-us/windows/wsl/)
- [WSL Best Practices](https://docs.microsoft.com/en-us/windows/wsl/setup/environment)
- [WSL Troubleshooting](https://docs.microsoft.com/en-us/windows/wsl/troubleshooting)

### **Linux Learning**
- Basic Linux commands and concepts
- Shell scripting and automation
- System administration in Linux
- Development tools and environments

---

**Next Steps**:
- Explore [File Operations](File-Operations) for advanced file management
- Check out [Development Workflows](Development-Workflows) for automation
- Learn about [Remote Destinations](Remote-Destinations) for unified development