# Configuration Guide

Complete configuration guide for the SSH & WSL Remote Development Extension.

## ⚙️ **Extension Settings**

### **Kiro IDE Settings**

Configure the extension through Kiro's settings panel or by editing the settings file:

```json
{
  "sshwsl.autoSyncToWSL": false,
  "sshwsl.defaultSSHPort": 22,
  "sshwsl.wslDistribution": "Ubuntu",
  "sshwsl.enableDeploymentHooks": false,
  "sshwsl.sshTimeout": 30000,
  "sshwsl.maxConnections": 10,
  "sshwsl.logLevel": "info"
}
```

#### **Setting Descriptions**

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `autoSyncToWSL` | boolean | false | Automatically sync files to WSL on save |
| `defaultSSHPort` | number | 22 | Default port for SSH connections |
| `wslDistribution` | string | "" | Default WSL distribution to use |
| `enableDeploymentHooks` | boolean | false | Enable automatic deployment hooks |
| `sshTimeout` | number | 30000 | SSH connection timeout in milliseconds |
| `maxConnections` | number | 10 | Maximum concurrent SSH connections |
| `logLevel` | string | "info" | Logging level (debug, info, warn, error) |

## 🔌 **MCP Server Configuration**

### **Main MCP Configuration**

Edit `.kiro/settings/mcp.json`:

```json
{
  "mcpServers": {
    "kiro-ssh-wsl": {
      "command": "node",
      "args": ["./kiro-integration/mcpServer.js"],
      "env": {
        "NODE_ENV": "production",
        "LOG_LEVEL": "info"
      },
      "disabled": false,
      "autoApprove": [
        "wsl_execute",
        "wsl_list_distributions",
        "wsl_convert_path",
        "ssh_list_connections"
      ],
      "timeout": 30000,
      "retries": 3
    },
    "kiro-remote-destination": {
      "command": "node", 
      "args": ["./remote-destination/remoteDestinationMCP.js"],
      "env": {
        "NODE_ENV": "production"
      },
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

### **MCP Server Options**

| Option | Type | Description |
|--------|------|-------------|
| `command` | string | Command to run the MCP server |
| `args` | array | Arguments for the command |
| `env` | object | Environment variables |
| `disabled` | boolean | Whether the server is disabled |
| `autoApprove` | array | Tools that don't require approval |
| `timeout` | number | Server timeout in milliseconds |
| `retries` | number | Number of retry attempts |

## 🐧 **WSL Configuration**

### **WSL System Configuration**

#### **WSL Configuration File**

Create or edit `%USERPROFILE%\.wslconfig`:

```ini
[wsl2]
memory=4GB
processors=2
swap=1GB
swapFile=C:\\temp\\wsl-swap.vhdx

[experimental]
autoMemoryReclaim=gradual
networkingMode=mirrored
dnsTunneling=true
firewall=true
```

#### **Distribution-Specific Configuration**

Edit `/etc/wsl.conf` inside your WSL distribution:

```ini
[boot]
systemd=true

[user]
default=username

[interop]
enabled=true
appendWindowsPath=true

[network]
generateHosts=true
generateResolvConf=true
```

### **WSL Extension Settings**

```json
{
  "wsl": {
    "defaultDistribution": "Ubuntu",
    "autoStart": true,
    "pathConversion": {
      "enabled": true,
      "preserveCase": false
    },
    "fileSync": {
      "enabled": false,
      "excludePatterns": [
        "node_modules/**",
        ".git/**",
        "*.log"
      ]
    }
  }
}
```

## 🔐 **SSH Configuration**

### **SSH Client Configuration**

Create or edit `~/.ssh/config`:

```
# Global settings
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3
    ConnectTimeout 30
    TCPKeepAlive yes

# Specific server configurations
Host webserver
    HostName web.example.com
    User deploy
    Port 2222
    IdentityFile ~/.ssh/webserver_key
    ForwardAgent yes

Host dbserver
    HostName db.example.com
    User admin
    IdentityFile ~/.ssh/dbserver_key
    LocalForward 5432 localhost:5432

# Jump host configuration
Host internal-server
    HostName internal.company.com
    User developer
    ProxyJump bastion.company.com
```

### **SSH Extension Settings**

```json
{
  "ssh": {
    "defaultPort": 22,
    "timeout": 30000,
    "keepAlive": true,
    "compression": true,
    "authentication": {
      "preferredMethods": ["publickey", "password"],
      "keyFiles": [
        "~/.ssh/id_rsa",
        "~/.ssh/id_ed25519"
      ]
    },
    "security": {
      "strictHostKeyChecking": true,
      "hashKnownHosts": true
    }
  }
}
```

## 🎣 **Hooks Configuration**

### **Automation Hooks**

Edit `.kiro/hooks/ssh-wsl-hooks.json`:

```json
{
  "hooks": [
    {
      "name": "WSL File Sync",
      "trigger": "file.save",
      "script": "./kiro-integration/hooks.js",
      "function": "onFileSave",
      "enabled": false,
      "condition": "file.path.includes('src/')",
      "description": "Sync source files to WSL on save",
      "settings": {
        "targetPath": "/home/user/project",
        "preservePermissions": true
      }
    },
    {
      "name": "WSL Test Runner",
      "trigger": "file.save", 
      "script": "./kiro-integration/hooks.js",
      "function": "onTestFileSave",
      "enabled": false,
      "condition": "file.path.includes('.test.') || file.path.includes('.spec.')",
      "description": "Run tests in WSL when test files are saved",
      "settings": {
        "testCommand": "npm test",
        "workingDirectory": "/home/user/project"
      }
    },
    {
      "name": "Auto Deploy",
      "trigger": "file.save",
      "script": "./kiro-integration/hooks.js", 
      "function": "onDeploymentFileChange",
      "enabled": false,
      "condition": "file.path.includes('deploy.') || file.path.includes('Dockerfile')",
      "description": "Deploy to server when deployment files change",
      "settings": {
        "serverConfig": {
          "host": "deploy.example.com",
          "username": "deploy",
          "keyFile": "~/.ssh/deploy_key"
        },
        "deployPath": "/var/www/app",
        "buildCommand": "npm run build"
      }
    }
  ]
}
```

### **Hook Settings**

| Setting | Type | Description |
|---------|------|-------------|
| `name` | string | Hook display name |
| `trigger` | string | Event that triggers the hook |
| `script` | string | Path to hook script |
| `function` | string | Function to call in script |
| `enabled` | boolean | Whether hook is active |
| `condition` | string | JavaScript condition for execution |
| `settings` | object | Hook-specific configuration |

## 🎯 **Remote Destinations Configuration**

### **Remote Destination Settings**

```json
{
  "remoteDestinations": {
    "wsl": {
      "autoDetect": true,
      "preferredDistribution": "Ubuntu",
      "mountWindows": true
    },
    "ssh": {
      "connectionPooling": true,
      "maxConnections": 5,
      "defaultTimeout": 30000
    },
    "unified": {
      "showConnectionType": true,
      "groupByType": false,
      "autoConnect": false
    }
  }
}
```

### **Connection Profiles**

Create connection profiles for quick access:

```json
{
  "connectionProfiles": {
    "development": {
      "type": "ssh",
      "host": "dev.example.com",
      "username": "developer",
      "keyFile": "~/.ssh/dev_key",
      "description": "Development server"
    },
    "staging": {
      "type": "ssh", 
      "host": "staging.example.com",
      "username": "deploy",
      "keyFile": "~/.ssh/staging_key",
      "description": "Staging environment"
    },
    "local-wsl": {
      "type": "wsl",
      "distribution": "Ubuntu",
      "description": "Local WSL Ubuntu"
    }
  }
}
```

## 🔒 **Security Configuration**

### **SSH Security Settings**

```json
{
  "security": {
    "ssh": {
      "strictHostKeyChecking": true,
      "hashKnownHosts": true,
      "forwardAgent": false,
      "forwardX11": false,
      "passwordAuthentication": false,
      "pubkeyAuthentication": true,
      "allowedCiphers": [
        "aes256-gcm@openssh.com",
        "aes128-gcm@openssh.com",
        "aes256-ctr",
        "aes192-ctr",
        "aes128-ctr"
      ]
    },
    "credentials": {
      "storePasswords": false,
      "useKeychain": true,
      "encryptStorage": true
    }
  }
}
```

### **WSL Security Settings**

```json
{
  "security": {
    "wsl": {
      "restrictFileAccess": false,
      "allowWindowsInterop": true,
      "mountOptions": "metadata,uid=1000,gid=1000",
      "networkAccess": true
    }
  }
}
```

## 📊 **Logging Configuration**

### **Log Settings**

```json
{
  "logging": {
    "level": "info",
    "file": {
      "enabled": true,
      "path": ".kiro/logs/ssh-wsl.log",
      "maxSize": "10MB",
      "maxFiles": 5
    },
    "console": {
      "enabled": true,
      "colorize": true
    },
    "categories": {
      "ssh": "info",
      "wsl": "info", 
      "mcp": "warn",
      "hooks": "info"
    }
  }
}
```

### **Debug Configuration**

For troubleshooting, enable debug logging:

```json
{
  "logging": {
    "level": "debug",
    "categories": {
      "ssh": "debug",
      "wsl": "debug",
      "mcp": "debug"
    }
  }
}
```

## 🔄 **Environment-Specific Configuration**

### **Development Environment**

```json
{
  "environment": "development",
  "ssh": {
    "timeout": 10000,
    "retries": 1
  },
  "wsl": {
    "autoStart": true
  },
  "logging": {
    "level": "debug"
  },
  "hooks": {
    "enabled": true
  }
}
```

### **Production Environment**

```json
{
  "environment": "production",
  "ssh": {
    "timeout": 30000,
    "retries": 3,
    "keepAlive": true
  },
  "wsl": {
    "autoStart": false
  },
  "logging": {
    "level": "warn"
  },
  "hooks": {
    "enabled": false
  }
}
```

## 📁 **Configuration File Locations**

### **Windows**
- Extension settings: `%APPDATA%\Kiro\User\settings.json`
- MCP configuration: `.kiro\settings\mcp.json`
- Hook configuration: `.kiro\hooks\ssh-wsl-hooks.json`
- SSH configuration: `%USERPROFILE%\.ssh\config`
- WSL configuration: `%USERPROFILE%\.wslconfig`

### **Linux/Mac**
- Extension settings: `~/.config/Kiro/User/settings.json`
- MCP configuration: `.kiro/settings/mcp.json`
- Hook configuration: `.kiro/hooks/ssh-wsl-hooks.json`
- SSH configuration: `~/.ssh/config`

## 🛠 **Configuration Management**

### **Backup Configuration**

```bash
# Backup all configuration files
mkdir -p backup/kiro-config
cp -r .kiro/ backup/kiro-config/
cp ~/.ssh/config backup/kiro-config/ssh-config
cp ~/.wslconfig backup/kiro-config/wslconfig
```

### **Restore Configuration**

```bash
# Restore configuration files
cp -r backup/kiro-config/.kiro/ ./
cp backup/kiro-config/ssh-config ~/.ssh/config
cp backup/kiro-config/wslconfig ~/.wslconfig
```

### **Share Configuration**

Create a configuration template for team sharing:

```json
{
  "template": "ssh-wsl-team-config",
  "version": "1.0.0",
  "settings": {
    "sshwsl.defaultSSHPort": 22,
    "sshwsl.sshTimeout": 30000
  },
  "mcpServers": {
    "kiro-ssh-wsl": {
      "autoApprove": ["wsl_execute", "ssh_list_connections"]
    }
  },
  "hooks": {
    "enabled": ["WSL File Sync", "WSL Test Runner"]
  }
}
```

---

**Next Steps**:
- Apply your configuration changes
- Restart Kiro IDE to load new settings
- Test the configuration with basic operations
- Check [Troubleshooting](Troubleshooting) if issues occur