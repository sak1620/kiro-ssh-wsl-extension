# SSH Usage Guide

Complete guide to using SSH functionality in the SSH & WSL Remote Development Extension.

## 🔐 **SSH Overview**

The SSH integration provides secure connections to remote servers with full command execution, file transfer, and management capabilities.

## 🚀 **Getting Started with SSH**

### **Basic Connection**

#### **Connect to SSH Server**
```
"Connect to SSH server at 192.168.1.100 with username 'admin' and password 'mypassword'"
```

#### **Connect with Custom Port**
```
"Connect to SSH server at example.com port 2222 with username 'deploy' and password 'secret'"
```

#### **List Active Connections**
```
"Show me all my SSH connections"
```

#### **Check Connection Status**
```
"Is my SSH connection to server.com still active?"
```

## 💻 **Remote Command Execution**

### **Basic Commands**

#### **System Information**
```
"Execute 'uname -a' on my SSH server"
"Check the uptime on my remote server"
"Show disk usage on my SSH connection"
```

#### **File and Directory Operations**
```
"List files in the home directory on my SSH server"
"Show the contents of /var/log on my remote server"
"Create a directory called 'projects' on my SSH server"
```

#### **Process Management**
```
"Show running processes on my SSH server"
"Check if nginx is running on my remote server"
"Restart the apache service on my SSH connection"
```

### **Advanced Commands**

#### **System Monitoring**
```
"Monitor system resources on my SSH server"
"Show network connections on my remote server"
"Check memory usage on my SSH connection"
```

#### **Log Analysis**
```
"Show the last 50 lines of /var/log/syslog on my SSH server"
"Search for 'error' in the nginx logs on my remote server"
"Monitor the application log in real-time on my SSH connection"
```

## 📁 **File Transfer Operations**

### **Upload Files**

#### **Single File Upload**
```
"Upload the file './config.json' to '/etc/app/config.json' on my SSH server"
```

#### **Directory Upload**
```
"Upload the entire './dist' directory to '/var/www/html' on my SSH server"
```

#### **Backup Upload**
```
"Upload my local backup file to '/backups/' on my SSH server"
```

### **Download Files**

#### **Single File Download**
```
"Download '/etc/nginx/nginx.conf' from my SSH server to './nginx-config.conf'"
```

#### **Log File Download**
```
"Download the latest log file from '/var/log/app.log' on my SSH server"
```

#### **Configuration Download**
```
"Download all configuration files from '/etc/myapp/' on my SSH server to './configs/'"
```

### **File Management**

#### **Remote File Operations**
```
"Create a backup of '/etc/hosts' on my SSH server"
"Delete old log files older than 7 days on my SSH server"
"Change permissions of '/var/www/html' to 755 on my SSH server"
```

## 🔧 **Server Management**

### **Service Management**

#### **Web Server Management**
```
"Start nginx on my SSH server"
"Restart apache2 on my SSH server"
"Check the status of mysql on my SSH server"
"Stop the application service on my SSH server"
```

#### **System Services**
```
"Enable ssh service on boot on my SSH server"
"Disable unnecessary services on my SSH server"
"Show all running services on my SSH server"
```

### **Package Management**

#### **Ubuntu/Debian Servers**
```
"Update package lists on my SSH server"
"Install nodejs on my SSH server"
"Upgrade all packages on my SSH server"
"Search for available python packages on my SSH server"
```

#### **CentOS/RHEL Servers**
```
"Install git using yum on my SSH server"
"Update all packages using yum on my SSH server"
"Search for nginx package on my SSH server"
```

### **User Management**

#### **User Operations**
```
"Create a new user 'developer' on my SSH server"
"Add user 'developer' to sudo group on my SSH server"
"Change password for user 'app' on my SSH server"
"List all users on my SSH server"
```

## 🚀 **Development Workflows**

### **Application Deployment**

#### **Node.js Application Deployment**
```
"Deploy my Node.js application to my SSH server"
```

This typically involves:
1. Upload application files
2. Install dependencies (`npm install`)
3. Start/restart the application
4. Verify deployment

#### **Static Website Deployment**
```
"Deploy my website files to /var/www/html on my SSH server"
"Set proper permissions for web files on my SSH server"
"Restart nginx to serve the new website on my SSH server"
```

#### **Database Deployment**
```
"Upload database backup to my SSH server"
"Restore database from backup on my SSH server"
"Create database user for the application on my SSH server"
```

### **Continuous Integration**

#### **Automated Deployment**
```
"Set up automated deployment when I save deployment files"
```

This sets up hooks that automatically:
1. Build the application locally
2. Upload to the SSH server
3. Restart services
4. Verify deployment

#### **Testing on Remote Server**
```
"Run tests on my SSH server"
"Execute the test suite in the staging environment on my SSH server"
"Check application health after deployment on my SSH server"
```

## 🔒 **Security Best Practices**

### **SSH Key Authentication**

#### **Generate SSH Keys**
```bash
# On your local machine
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"
```

#### **Copy Public Key to Server**
```
"Copy my SSH public key to my server for passwordless login"
```

#### **Use SSH Keys Instead of Passwords**
```javascript
// In your code, use SSH keys
const config = {
    host: 'server.com',
    username: 'user',
    privateKey: fs.readFileSync('/path/to/private/key')
};
```

### **Connection Security**

#### **Change Default SSH Port**
```
"Change SSH port from 22 to 2222 on my SSH server"
"Update firewall rules for new SSH port on my SSH server"
```

#### **Disable Root Login**
```
"Disable root SSH login on my SSH server"
"Configure SSH to only allow specific users on my SSH server"
```

#### **Enable SSH Key Only Authentication**
```
"Disable password authentication for SSH on my SSH server"
"Configure SSH to only accept key-based authentication on my SSH server"
```

## 🛠 **Advanced SSH Features**

### **SSH Tunneling**

#### **Port Forwarding**
```
"Set up port forwarding from local port 8080 to remote port 80 on my SSH server"
```

#### **Reverse Tunneling**
```
"Create reverse SSH tunnel from my SSH server to local port 3000"
```

### **Multiple Server Management**

#### **Connect to Multiple Servers**
```
"Connect to my web server at web.example.com"
"Also connect to my database server at db.example.com"
"Show me all my active SSH connections"
```

#### **Execute Commands on Multiple Servers**
```
"Execute 'uptime' on all my SSH servers"
"Update packages on all my connected servers"
"Check disk space on all my SSH connections"
```

### **SSH Configuration**

#### **SSH Config File**
Create `~/.ssh/config` for easier connections:
```
Host webserver
    HostName web.example.com
    User deploy
    Port 2222
    IdentityFile ~/.ssh/webserver_key

Host dbserver
    HostName db.example.com
    User admin
    IdentityFile ~/.ssh/dbserver_key
```

Then connect with:
```
"Connect to my webserver using SSH config"
```

## 📊 **Monitoring and Logging**

### **System Monitoring**

#### **Resource Monitoring**
```
"Monitor CPU usage on my SSH server"
"Check memory usage every 5 seconds on my SSH server"
"Show disk I/O statistics on my SSH server"
```

#### **Network Monitoring**
```
"Monitor network traffic on my SSH server"
"Show active network connections on my SSH server"
"Check bandwidth usage on my SSH server"
```

### **Log Management**

#### **Log Monitoring**
```
"Monitor the application log in real-time on my SSH server"
"Show new entries in /var/log/syslog on my SSH server"
"Alert me when errors appear in the log on my SSH server"
```

#### **Log Analysis**
```
"Analyze nginx access logs for the last hour on my SSH server"
"Count error occurrences in the application log on my SSH server"
"Extract IP addresses from the security log on my SSH server"
```

## 🚨 **Troubleshooting SSH**

### **Connection Issues**

#### **Connection Refused**
```
"Test SSH connection to my server"
"Check if SSH service is running on my server"
"Verify firewall settings for SSH on my server"
```

#### **Authentication Failures**
```
"Test SSH authentication with my server"
"Check SSH key permissions on my server"
"Verify user exists on my SSH server"
```

#### **Timeout Issues**
```
"Check network connectivity to my SSH server"
"Test SSH connection with verbose output"
"Verify SSH server configuration"
```

### **Performance Issues**

#### **Slow Connections**
```
"Test network latency to my SSH server"
"Check SSH server load and performance"
"Optimize SSH connection settings"
```

#### **File Transfer Issues**
```
"Test SFTP connection to my SSH server"
"Check available disk space on my SSH server"
"Verify file permissions on my SSH server"
```

## 📚 **SSH Command Reference**

### **Available MCP Tools**

- `ssh_connect` - Connect to SSH servers
- `ssh_execute` - Execute remote commands
- `ssh_transfer_file` - Upload/download files
- `ssh_list_connections` - List active connections
- `ssh_disconnect` - Disconnect from servers

### **Common SSH Commands**

| Purpose | Command Example |
|---------|----------------|
| System Info | `uname -a`, `lsb_release -a`, `hostnamectl` |
| Disk Usage | `df -h`, `du -sh /path`, `lsblk` |
| Memory | `free -h`, `cat /proc/meminfo` |
| Processes | `ps aux`, `top`, `htop` |
| Network | `netstat -tulpn`, `ss -tulpn`, `ip addr` |
| Services | `systemctl status service`, `service --status-all` |
| Logs | `tail -f /var/log/syslog`, `journalctl -f` |

---

**Next Steps**: 
- Explore [File Operations](File-Operations) for advanced file management
- Check out [Development Workflows](Development-Workflows) for automation
- Learn about [Security Best Practices](Security-Best-Practices) for secure connections