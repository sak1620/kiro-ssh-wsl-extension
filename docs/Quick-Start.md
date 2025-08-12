# Quick Start Guide

Get up and running with the SSH & WSL Remote Development Extension in just 5 minutes!

## 🚀 **5-Minute Quick Start**

### **Step 1: Verify Installation (30 seconds)**

1. **Open Kiro IDE**
2. **Check MCP Panel**: Verify these servers are running:
   - ✅ `kiro-ssh-wsl`
   - ✅ `kiro-remote-destination`
3. **If not running**: Restart Kiro IDE

### **Step 2: Test WSL Integration (2 minutes)**

#### **List WSL Distributions**
In Kiro's AI chat, type:
```
"List my WSL distributions"
```

**Expected Result**: You should see your installed WSL distributions (like Ubuntu).

#### **Execute WSL Command**
```
"Execute 'whoami' in WSL"
```

**Expected Result**: Shows your WSL username.

#### **Check Current Directory**
```
"What's the current directory in WSL?"
```

**Expected Result**: Shows your current WSL directory path.

### **Step 3: Test SSH Tools (1 minute)**

#### **List Available SSH Tools**
```
"Show me available SSH connection tools"
```

**Expected Result**: Lists SSH-related MCP tools.

#### **Check SSH Connections**
```
"List my active SSH connections"
```

**Expected Result**: Shows current SSH connections (likely empty if none active).

### **Step 4: Test Remote Destinations (1 minute)**

#### **List Remote Destinations**
```
"List all available remote destinations"
```

**Expected Result**: Shows WSL distributions and any SSH connections as remote destinations.

#### **Connect to WSL as Remote Destination**
```
"Connect to my WSL Ubuntu as a remote destination"
```

**Expected Result**: Connects to WSL Ubuntu and confirms connection.

### **Step 5: Test File Operations (30 seconds)**

#### **Convert Path Format**
```
"Convert the Windows path 'C:\\Users\\username\\Documents' to WSL format"
```

**Expected Result**: Shows `/mnt/c/Users/username/Documents`.

## 🎯 **Common First Tasks**

### **WSL Development Setup**

#### **Set Up Development Environment**
```
"Set up a Node.js development environment in my WSL Ubuntu"
```

This will:
- Update package lists
- Install Node.js, npm, and other dev tools
- Verify installation

#### **Create and Test Project**
```
"Create a directory called 'test-project' in WSL and navigate to it"
```

Then:
```
"Create a simple package.json file in the current WSL directory"
```

### **SSH Server Connection**

#### **Connect to SSH Server**
```
"Connect to SSH server at [your-server-ip] with username '[your-username]' and password '[your-password]'"
```

Replace with your actual server details.

#### **Execute Remote Command**
```
"Execute 'ls -la' on my SSH connection"
```

#### **Check Server Status**
```
"Check disk space on my SSH server"
```

### **File Transfer Operations**

#### **Upload File to Remote**
```
"Upload the file './local-file.txt' to '/remote/path/' on my SSH server"
```

#### **Download File from Remote**
```
"Download '/etc/hostname' from my SSH server to './downloaded-hostname.txt'"
```

#### **Sync Files with WSL**
```
"Copy the file 'C:\\temp\\config.json' to WSL at '/home/user/config.json'"
```

## 📚 **Next Steps by Use Case**

### **For Cross-Platform Development**
1. **Read**: [WSL Usage Guide](WSL-Usage-Guide)
2. **Try**: Set up a project that builds on both Windows and WSL
3. **Explore**: File synchronization between Windows and WSL

### **For Remote Development**
1. **Read**: [SSH Usage Guide](SSH-Usage-Guide)
2. **Try**: Connect to a cloud instance or VPS
3. **Explore**: [Remote Destinations](Remote-Destinations) for unified remote development

### **For DevOps & Deployment**
1. **Read**: [Development Workflows](Development-Workflows)
2. **Try**: Set up automated deployment hooks
3. **Explore**: [Automation Hooks](Automation-Hooks) for workflow automation

### **For Learning Linux**
1. **Read**: [WSL Integration](WSL-Integration) guide
2. **Try**: Install different Linux distributions
3. **Explore**: Linux command line and development tools

## 🛠 **Troubleshooting Quick Start**

### **WSL Not Working?**
- **Check WSL Installation**: `wsl --list --verbose` in Command Prompt
- **Install WSL**: `wsl --install` in elevated PowerShell
- **Restart**: Restart your computer after WSL installation

### **SSH Not Connecting?**
- **Check Server Details**: Verify IP, username, and password
- **Test Connection**: Try connecting with a regular SSH client first
- **Firewall**: Ensure port 22 (or your SSH port) is open

### **MCP Tools Not Available?**
- **Restart Kiro**: Close and reopen Kiro IDE
- **Check MCP Panel**: Verify servers are running
- **Reinstall**: Try reinstalling the extension

### **Commands Not Working?**
- **Check Syntax**: Ensure you're using natural language commands
- **Try Alternatives**: Use different phrasing for the same request
- **Check Logs**: Look at Kiro's console for error messages

## 💡 **Pro Tips**

### **Natural Language Commands**
The extension works with natural language. Try these variations:

**Instead of**: "wsl_execute ls -la"  
**Try**: "List files in my WSL directory"

**Instead of**: "ssh_connect server.com user pass"  
**Try**: "Connect to my server at server.com with username user"

### **Context Awareness**
The AI remembers context within a conversation:

```
"Connect to my WSL Ubuntu"
"Now list the files in the home directory"
"Create a new file called test.txt"
```

### **Batch Operations**
You can request multiple operations:

```
"Connect to WSL, navigate to my project directory, and run npm install"
```

### **Error Recovery**
If something goes wrong:

```
"What went wrong with my last command?"
"Show me my active connections"
"Disconnect from all SSH connections"
```

## 🎉 **You're Ready!**

Congratulations! You've successfully set up and tested the SSH & WSL Remote Development Extension. 

### **What You've Accomplished**
- ✅ Verified the extension is working
- ✅ Tested WSL integration
- ✅ Tested SSH tools
- ✅ Tested remote destinations
- ✅ Performed basic file operations

### **Where to Go Next**
- **Explore**: [SSH Usage Guide](SSH-Usage-Guide) for advanced SSH features
- **Learn**: [WSL Usage Guide](WSL-Usage-Guide) for comprehensive WSL usage
- **Automate**: [Automation Hooks](Automation-Hooks) for workflow automation
- **Develop**: [Development Workflows](Development-Workflows) for common patterns

**Happy coding with your new remote development capabilities!** 🚀