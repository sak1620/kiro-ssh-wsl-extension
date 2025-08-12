# API Reference

Complete API documentation for the SSH & WSL Remote Development Extension.

## 📚 **Overview**

The extension provides multiple APIs for different use cases:
- **MCP Tools**: For AI-powered natural language operations
- **JavaScript APIs**: For direct programmatic access
- **Remote Destination APIs**: For unified remote development

## 🔧 **MCP Tools Reference**

### **WSL MCP Tools**

#### **wsl_execute**
Execute a command in Windows Subsystem for Linux.

**Parameters:**
- `command` (string, required): Command to execute in WSL
- `distribution` (string, optional): WSL distribution name

**Example:**
```json
{
  "name": "wsl_execute",
  "arguments": {
    "command": "ls -la",
    "distribution": "Ubuntu"
  }
}
```

**Response:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "total 24\ndrwxr-xr-x 1 user user 4096 Jan 1 12:00 .\n..."
    }
  ]
}
```

#### **wsl_list_distributions**
List all available WSL distributions.

**Parameters:** None

**Example:**
```json
{
  "name": "wsl_list_distributions",
  "arguments": {}
}
```

**Response:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "[\n  {\n    \"name\": \"Ubuntu\",\n    \"version\": \"2\",\n    \"state\": \"Running\",\n    \"isDefault\": true\n  }\n]"
    }
  ]
}
```

#### **wsl_copy_file**
Copy files between Windows and WSL.

**Parameters:**
- `source` (string, required): Source file path
- `destination` (string, required): Destination file path
- `direction` (string, required): Copy direction ("to_wsl" or "from_wsl")

**Example:**
```json
{
  "name": "wsl_copy_file",
  "arguments": {
    "source": "C:\\temp\\file.txt",
    "destination": "/home/user/file.txt",
    "direction": "to_wsl"
  }
}
```

#### **wsl_convert_path**
Convert between Windows and WSL path formats.

**Parameters:**
- `path` (string, required): Path to convert
- `to_wsl` (boolean, optional): Convert to WSL format (default: true)

**Example:**
```json
{
  "name": "wsl_convert_path",
  "arguments": {
    "path": "C:\\Users\\username\\Documents",
    "to_wsl": true
  }
}
```

**Response:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "/mnt/c/Users/username/Documents"
    }
  ]
}
```

### **SSH MCP Tools**

#### **ssh_connect**
Connect to an SSH server.

**Parameters:**
- `host` (string, required): SSH server hostname
- `username` (string, required): SSH username
- `password` (string, required): SSH password
- `port` (number, optional): SSH port (default: 22)

**Example:**
```json
{
  "name": "ssh_connect",
  "arguments": {
    "host": "example.com",
    "username": "user",
    "password": "password",
    "port": 22
  }
}
```

**Response:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "Connected: user@example.com:22"
    }
  ]
}
```

#### **ssh_execute**
Execute a command on an SSH server.

**Parameters:**
- `connection_id` (string, required): SSH connection ID
- `command` (string, required): Command to execute

**Example:**
```json
{
  "name": "ssh_execute",
  "arguments": {
    "connection_id": "user@example.com:22",
    "command": "ls -la"
  }
}
```

#### **ssh_transfer_file**
Transfer files to/from SSH server.

**Parameters:**
- `connection_id` (string, required): SSH connection ID
- `local_path` (string, required): Local file path
- `remote_path` (string, required): Remote file path
- `direction` (string, required): Transfer direction ("upload" or "download")

**Example:**
```json
{
  "name": "ssh_transfer_file",
  "arguments": {
    "connection_id": "user@example.com:22",
    "local_path": "./file.txt",
    "remote_path": "/home/user/file.txt",
    "direction": "upload"
  }
}
```

#### **ssh_list_connections**
List all active SSH connections.

**Parameters:** None

**Example:**
```json
{
  "name": "ssh_list_connections",
  "arguments": {}
}
```

### **Remote Destination MCP Tools**

#### **remote_list_destinations**
List all available remote destinations (WSL and SSH).

**Parameters:** None

**Example:**
```json
{
  "name": "remote_list_destinations",
  "arguments": {}
}
```

**Response:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "[\n  {\n    \"id\": \"wsl-Ubuntu\",\n    \"name\": \"WSL: Ubuntu\",\n    \"type\": \"wsl\",\n    \"status\": \"Running\"\n  }\n]"
    }
  ]
}
```

#### **remote_connect**
Connect to a remote destination.

**Parameters:**
- `destination_id` (string, required): Destination ID (e.g., "wsl-Ubuntu", "ssh-server")
- `host` (string, optional): SSH hostname (for SSH destinations)
- `username` (string, optional): SSH username (for SSH destinations)
- `password` (string, optional): SSH password (for SSH destinations)
- `port` (number, optional): SSH port (default: 22)

**Example:**
```json
{
  "name": "remote_connect",
  "arguments": {
    "destination_id": "wsl-Ubuntu"
  }
}
```

#### **remote_execute**
Execute a command on the active remote destination.

**Parameters:**
- `command` (string, required): Command to execute

**Example:**
```json
{
  "name": "remote_execute",
  "arguments": {
    "command": "ls -la"
  }
}
```

#### **remote_setup_dev_environment**
Set up development environment on remote destination.

**Parameters:**
- `project_path` (string, optional): Project directory path
- `tools` (array, optional): Additional tools to install

**Example:**
```json
{
  "name": "remote_setup_dev_environment",
  "arguments": {
    "project_path": "/home/user/project",
    "tools": ["nodejs", "python3", "git"]
  }
}
```

## 🔌 **JavaScript APIs**

### **SSH API (kiroSSH)**

#### **Import**
```javascript
const { kiroSSH } = require('./out/kiroAPI');
// or
import { kiroSSH } from './out/kiroAPI';
```

#### **Methods**

##### **connect(host, username, password, port?)**
Connect to an SSH server.

**Parameters:**
- `host` (string): SSH server hostname
- `username` (string): SSH username
- `password` (string): SSH password
- `port` (number, optional): SSH port (default: 22)

**Returns:** Promise<string> - Connection ID

**Example:**
```javascript
const connectionId = await kiroSSH.connect('example.com', 'user', 'password', 22);
console.log('Connected:', connectionId);
```

##### **execute(connectionId, command)**
Execute a command on an SSH server.

**Parameters:**
- `connectionId` (string): SSH connection ID
- `command` (string): Command to execute

**Returns:** Promise<string> - Command output

**Example:**
```javascript
const result = await kiroSSH.execute(connectionId, 'ls -la');
console.log('Output:', result);
```

##### **upload(connectionId, localPath, remotePath)**
Upload a file to an SSH server.

**Parameters:**
- `connectionId` (string): SSH connection ID
- `localPath` (string): Local file path
- `remotePath` (string): Remote file path

**Returns:** Promise<string> - Success message

**Example:**
```javascript
await kiroSSH.upload(connectionId, './file.txt', '/home/user/file.txt');
```

##### **download(connectionId, remotePath, localPath)**
Download a file from an SSH server.

**Parameters:**
- `connectionId` (string): SSH connection ID
- `remotePath` (string): Remote file path
- `localPath` (string): Local file path

**Returns:** Promise<string> - Success message

**Example:**
```javascript
await kiroSSH.download(connectionId, '/home/user/file.txt', './downloaded.txt');
```

##### **listFiles(connectionId, remotePath?)**
List files in a remote directory.

**Parameters:**
- `connectionId` (string): SSH connection ID
- `remotePath` (string, optional): Remote directory path (default: '.')

**Returns:** Promise<any[]> - Array of file objects

**Example:**
```javascript
const files = await kiroSSH.listFiles(connectionId, '/home/user');
console.log('Files:', files);
```

##### **disconnect(connectionId)**
Disconnect from an SSH server.

**Parameters:**
- `connectionId` (string): SSH connection ID

**Returns:** Promise<string> - Success message

**Example:**
```javascript
await kiroSSH.disconnect(connectionId);
```

##### **listConnections()**
List all active SSH connections.

**Returns:** Promise<any[]> - Array of connection objects

**Example:**
```javascript
const connections = await kiroSSH.listConnections();
console.log('Active connections:', connections);
```

##### **isConnected(connectionId)**
Check if an SSH connection is active.

**Parameters:**
- `connectionId` (string): SSH connection ID

**Returns:** Promise<boolean> - Connection status

**Example:**
```javascript
const connected = await kiroSSH.isConnected(connectionId);
console.log('Connected:', connected);
```

### **WSL API (kiroWSL)**

#### **Import**
```javascript
const { kiroWSL } = require('./out/kiroWSL');
// or
import { kiroWSL } from './out/kiroWSL';
```

#### **Methods**

##### **quickSetup()**
Automatically set up WSL with the default or first available distribution.

**Returns:** Promise<{distribution: string, status: string}>

**Example:**
```javascript
const setup = await kiroWSL.quickSetup();
console.log('Setup:', setup.status);
```

##### **listDistributions()**
List all available WSL distributions.

**Returns:** Promise<WSLDistribution[]>

**WSLDistribution Interface:**
```typescript
interface WSLDistribution {
    name: string;
    version: string;
    state: 'Running' | 'Stopped';
    isDefault: boolean;
}
```

**Example:**
```javascript
const distributions = await kiroWSL.listDistributions();
console.log('Distributions:', distributions);
```

##### **execute(command, distribution?)**
Execute a command in WSL.

**Parameters:**
- `command` (string): Command to execute
- `distribution` (string, optional): WSL distribution name

**Returns:** Promise<string> - Command output

**Example:**
```javascript
const result = await kiroWSL.execute('ls -la', 'Ubuntu');
console.log('Output:', result);
```

##### **setActiveDistribution(distribution)**
Set the active WSL distribution for subsequent commands.

**Parameters:**
- `distribution` (string): WSL distribution name

**Returns:** Promise<string> - Success message

**Example:**
```javascript
await kiroWSL.setActiveDistribution('Ubuntu');
```

##### **copyToWSL(windowsPath, wslPath, distribution?)**
Copy a file from Windows to WSL.

**Parameters:**
- `windowsPath` (string): Windows file path
- `wslPath` (string): WSL destination path
- `distribution` (string, optional): WSL distribution name

**Returns:** Promise<string> - Success message

**Example:**
```javascript
await kiroWSL.copyToWSL('C:\\temp\\file.txt', '/home/user/file.txt');
```

##### **copyFromWSL(wslPath, windowsPath, distribution?)**
Copy a file from WSL to Windows.

**Parameters:**
- `wslPath` (string): WSL file path
- `windowsPath` (string): Windows destination path
- `distribution` (string, optional): WSL distribution name

**Returns:** Promise<string> - Success message

**Example:**
```javascript
await kiroWSL.copyFromWSL('/home/user/file.txt', 'C:\\temp\\file.txt');
```

##### **convertPath(path, toWSL?)**
Convert between Windows and WSL path formats.

**Parameters:**
- `path` (string): Path to convert
- `toWSL` (boolean, optional): Convert to WSL format (default: true)

**Returns:** Promise<string> - Converted path

**Example:**
```javascript
const wslPath = await kiroWSL.convertPath('C:\\Users\\username\\Documents');
console.log('WSL path:', wslPath); // /mnt/c/Users/username/Documents
```

## 🎯 **Remote Destination API**

### **Import**
```javascript
const { KiroRemoteDestination } = require('./out/remote-destination/kiroRemoteDestination');
```

### **Methods**

#### **getDestinations()**
Get all available remote destinations.

**Returns:** Promise<RemoteDestination[]>

**RemoteDestination Interface:**
```typescript
interface RemoteDestination {
    id: string;
    name: string;
    type: 'wsl' | 'ssh';
    status: string;
    icon: string;
    description: string;
    capabilities: string[];
}
```

#### **connect(destinationId, options?)**
Connect to a remote destination.

**Parameters:**
- `destinationId` (string): Destination ID
- `options` (object, optional): Connection options for SSH

**Returns:** Promise<ConnectionResult>

#### **execute(command)**
Execute a command on the active destination.

**Parameters:**
- `command` (string): Command to execute

**Returns:** Promise<string> - Command output

#### **uploadFile(localPath, remotePath)**
Upload a file to the active destination.

**Parameters:**
- `localPath` (string): Local file path
- `remotePath` (string): Remote file path

**Returns:** Promise<string> - Success message

#### **downloadFile(remotePath, localPath)**
Download a file from the active destination.

**Parameters:**
- `remotePath` (string): Remote file path
- `localPath` (string): Local file path

**Returns:** Promise<string> - Success message

## 🔧 **Configuration APIs**

### **Extension Configuration**

#### **SSH Configuration**
```typescript
interface SSHConfig {
    host: string;
    port: number;
    username: string;
    password?: string;
    privateKey?: Buffer;
    name?: string;
}
```

#### **WSL Configuration**
```typescript
interface WSLConfig {
    defaultDistribution?: string;
    autoSync?: boolean;
    pathConversion?: boolean;
}
```

### **MCP Server Configuration**

#### **MCP Server Settings**
```json
{
  "mcpServers": {
    "kiro-ssh-wsl": {
      "command": "node",
      "args": ["./kiro-integration/mcpServer.js"],
      "disabled": false,
      "autoApprove": [
        "wsl_execute",
        "wsl_list_distributions",
        "ssh_list_connections"
      ]
    }
  }
}
```

## 🚨 **Error Handling**

### **Common Error Types**

#### **SSH Errors**
```javascript
try {
    await kiroSSH.connect('invalid-host', 'user', 'pass');
} catch (error) {
    if (error.message.includes('ENOTFOUND')) {
        console.log('Host not found');
    } else if (error.message.includes('Authentication failed')) {
        console.log('Invalid credentials');
    }
}
```

#### **WSL Errors**
```javascript
try {
    await kiroWSL.execute('invalid-command');
} catch (error) {
    if (error.message.includes('command not found')) {
        console.log('Command not available in WSL');
    } else if (error.message.includes('WSL not available')) {
        console.log('WSL is not installed');
    }
}
```

### **Error Response Format**

#### **MCP Error Response**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32000,
    "message": "Tool execution failed",
    "data": "Detailed error message"
  }
}
```

#### **JavaScript API Errors**
All API methods throw standard JavaScript Error objects with descriptive messages.

## 📊 **Response Formats**

### **Success Response**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Operation result"
      }
    ]
  }
}
```

### **File List Response**
```json
{
  "content": [
    {
      "type": "text",
      "text": "[\n  {\n    \"name\": \"file.txt\",\n    \"size\": 1024,\n    \"type\": \"file\",\n    \"permissions\": \"rw-r--r--\"\n  }\n]"
    }
  ]
}
```

---

**Next Steps**:
- Check out [Examples](Examples) for practical usage examples
- See [Custom Workflows](Custom-Workflows) for advanced automation
- Review [Troubleshooting](Troubleshooting) for common issues