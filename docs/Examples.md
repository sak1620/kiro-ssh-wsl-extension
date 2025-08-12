# Examples and Use Cases

Practical examples and real-world use cases for the SSH & WSL Remote Development Extension.

## 🚀 **Quick Examples**

### **Basic WSL Operations**

#### **Execute Commands in WSL**
```
"Execute 'whoami' in WSL"
"Run 'ls -la' in my WSL Ubuntu"
"Check the current directory in WSL"
```

#### **File Operations**
```
"Copy 'C:\temp\config.json' to WSL at '/home/user/config.json'"
"Convert the Windows path 'D:\Projects\MyApp' to WSL format"
"List files in my WSL home directory"
```

### **Basic SSH Operations**

#### **Connect and Execute**
```
"Connect to SSH server at 192.168.1.100 with username 'admin' and password 'secret'"
"Execute 'uptime' on my SSH server"
"Check disk space on my remote server"
```

#### **File Transfer**
```
"Upload './deploy.zip' to '/tmp/' on my SSH server"
"Download '/var/log/app.log' from my SSH server to './app.log'"
```

## 💻 **Development Workflows**

### **Cross-Platform Node.js Development**

#### **Setup Development Environment**
```javascript
// Natural language commands:
"Set up Node.js development environment in WSL"
"Install npm and git in my WSL Ubuntu"
"Create a new Node.js project in WSL"
```

#### **Development Workflow**
```javascript
// 1. Develop on Windows, test in WSL
"Copy my Windows project to WSL"
"Run 'npm install' in WSL project directory"
"Execute 'npm test' in WSL"

// 2. Build and deploy
"Build the project in WSL"
"Upload the built files to my production server"
"Restart the application service on my server"
```

#### **Automated Testing**
```javascript
// Set up automated testing hook
"Set up automated testing when I save test files"

// This creates a hook that:
// 1. Detects when .test.js files are saved
// 2. Syncs files to WSL
// 3. Runs npm test in WSL
// 4. Reports results
```

### **Python Development with WSL**

#### **Environment Setup**
```
"Install Python 3 and pip in WSL"
"Set up virtual environment in WSL"
"Install development dependencies in WSL"
```

#### **Development Process**
```python
# Natural language workflow:
"Create a Python virtual environment in WSL"
"Activate the virtual environment and install requirements"
"Run my Python script in the WSL environment"
"Test the application with pytest in WSL"
```

### **Web Development Workflow**

#### **Frontend Development**
```javascript
// Setup
"Install Node.js and npm in WSL"
"Create a React project in WSL"
"Start the development server in WSL"

// Development
"Run 'npm start' in my WSL project"
"Build the production version in WSL"
"Copy the build files to my web server"
```

#### **Full-Stack Development**
```javascript
// Backend setup in WSL
"Install Node.js and MongoDB in WSL"
"Start MongoDB service in WSL"
"Run the Express.js server in WSL"

// Frontend on Windows, Backend in WSL
"Connect my Windows frontend to WSL backend"
"Test the full application stack"
```

## 🚀 **DevOps and Deployment**

### **Automated Deployment Pipeline**

#### **Build and Deploy Workflow**
```javascript
// Automated deployment setup
"Set up automated deployment when I save deployment files"

// This creates a workflow that:
// 1. Detects changes to deploy.js or Dockerfile
// 2. Builds the application in WSL
// 3. Connects to production server
// 4. Uploads built files
// 5. Restarts services
// 6. Verifies deployment
```

#### **Manual Deployment**
```javascript
// Step-by-step deployment
"Build my application in WSL"
"Connect to my production server at prod.example.com"
"Upload the dist folder to /var/www/html"
"Restart nginx on my server"
"Check if the application is running"
```

### **Server Management**

#### **Multi-Server Management**
```javascript
// Connect to multiple servers
"Connect to my web server at web.example.com"
"Also connect to my database server at db.example.com"
"Check system status on all my servers"

// Execute commands on multiple servers
"Update packages on all my connected servers"
"Check disk space on all my SSH connections"
"Restart services on my web servers"
```

#### **Monitoring and Maintenance**
```javascript
// System monitoring
"Check CPU and memory usage on my server"
"Monitor the application logs in real-time"
"Check for failed services on my server"

// Maintenance tasks
"Clean up old log files on my server"
"Update system packages on my server"
"Backup important files from my server"
```

## 🐳 **Container Development**

### **Docker Development with WSL**

#### **Docker Setup**
```bash
# Setup Docker in WSL
"Install Docker in my WSL Ubuntu"
"Start Docker service in WSL"
"Test Docker installation in WSL"
```

#### **Container Workflow**
```dockerfile
# Natural language Docker operations
"Build Docker image from my Dockerfile in WSL"
"Run my application container in WSL"
"Push the Docker image to registry from WSL"

# Development workflow
"Build and run my Docker container in WSL"
"Test the containerized application"
"Deploy the container to my remote server"
```

### **Kubernetes Development**

#### **Local Kubernetes with WSL**
```yaml
# Setup local Kubernetes
"Install kubectl and minikube in WSL"
"Start minikube cluster in WSL"
"Deploy my application to local Kubernetes"

# Development workflow
"Apply Kubernetes manifests in WSL"
"Check pod status in my WSL Kubernetes cluster"
"Port-forward services for testing"
```

## 🗄️ **Database Development**

### **Database Setup in WSL**

#### **MySQL Development**
```sql
-- Setup and usage
"Install MySQL server in WSL"
"Start MySQL service in WSL"
"Create database and user in WSL MySQL"

-- Development workflow
"Connect to MySQL in WSL"
"Import database schema in WSL"
"Run database migrations in WSL"
```

#### **PostgreSQL Development**
```sql
-- Setup
"Install PostgreSQL in WSL"
"Configure PostgreSQL in WSL"
"Create development database in WSL"

-- Usage
"Connect to PostgreSQL from my application"
"Backup database in WSL"
"Restore database from backup in WSL"
```

## 🔧 **System Administration**

### **Server Configuration Management**

#### **Configuration Deployment**
```bash
# Deploy configurations
"Upload my nginx configuration to my server"
"Restart nginx with new configuration"
"Test nginx configuration on my server"

# System configuration
"Update SSH configuration on my server"
"Configure firewall rules on my server"
"Set up SSL certificates on my web server"
```

#### **User and Permission Management**
```bash
# User management
"Create a new user 'developer' on my server"
"Add user to sudo group on my server"
"Set up SSH keys for the new user"

# Permission management
"Fix file permissions for web directory"
"Set proper ownership for application files"
"Configure directory permissions for uploads"
```

### **Backup and Recovery**

#### **Automated Backups**
```bash
# Database backups
"Create MySQL backup on my server"
"Download database backup to local machine"
"Schedule daily database backups"

# File backups
"Backup application files from my server"
"Sync important directories to backup server"
"Verify backup integrity"
```

#### **Disaster Recovery**
```bash
# Recovery procedures
"Restore database from backup on my server"
"Deploy application from backup files"
"Verify system functionality after recovery"
```

## 🎯 **Specialized Use Cases**

### **Machine Learning Development**

#### **ML Environment Setup**
```python
# Setup ML environment in WSL
"Install Python data science stack in WSL"
"Set up Jupyter notebook in WSL"
"Install TensorFlow and PyTorch in WSL"

# Development workflow
"Train model in WSL environment"
"Export trained model from WSL"
"Deploy model to production server"
```

### **Mobile App Backend Development**

#### **API Development**
```javascript
// Backend development in WSL
"Set up Node.js API server in WSL"
"Install and configure MongoDB in WSL"
"Test API endpoints from WSL"

// Deployment
"Build production API in WSL"
"Deploy API to cloud server"
"Configure load balancer for API"
```

### **IoT Development**

#### **IoT Backend Services**
```javascript
// IoT service development
"Set up MQTT broker in WSL"
"Develop IoT data processing service in WSL"
"Test IoT device connections"

// Deployment
"Deploy IoT services to edge server"
"Configure IoT device management"
"Monitor IoT device connectivity"
```

## 📊 **Data Processing Workflows**

### **ETL Pipelines**

#### **Data Processing in WSL**
```python
# Data processing setup
"Install pandas and data processing tools in WSL"
"Set up data processing pipeline in WSL"
"Process large datasets in WSL environment"

# Deployment
"Upload processed data to remote server"
"Schedule data processing jobs"
"Monitor data pipeline performance"
```

### **Analytics and Reporting**

#### **Analytics Setup**
```r
# Analytics environment
"Install R and analytics packages in WSL"
"Set up data visualization tools in WSL"
"Generate reports from WSL"

# Report distribution
"Upload reports to web server"
"Schedule automated report generation"
"Send reports via email from server"
```

## 🔄 **Continuous Integration Examples**

### **CI/CD Pipeline with WSL and SSH**

#### **Build Pipeline**
```yaml
# CI/CD workflow
"Set up build environment in WSL"
"Run tests in WSL environment"
"Build application artifacts in WSL"
"Upload artifacts to deployment server"
"Deploy to staging environment"
"Run integration tests on staging"
"Deploy to production if tests pass"
```

#### **Quality Assurance**
```javascript
// QA automation
"Run linting and code quality checks in WSL"
"Execute unit tests in WSL"
"Generate test coverage reports"
"Upload QA reports to server"
```

## 🎓 **Learning and Experimentation**

### **Learning Linux Administration**

#### **Safe Learning Environment**
```bash
# Use WSL for learning
"Practice Linux commands in WSL"
"Set up web server in WSL for learning"
"Experiment with system configuration in WSL"
"Learn shell scripting in WSL environment"
```

### **Technology Experimentation**

#### **New Technology Testing**
```bash
# Experiment safely
"Install new programming language in WSL"
"Test new frameworks in WSL environment"
"Experiment with different databases in WSL"
"Try new development tools in WSL"
```

## 📚 **Code Examples**

### **JavaScript API Usage**

#### **SSH Operations**
```javascript
const { kiroSSH } = require('./out/kiroAPI');

async function deployApplication() {
    try {
        // Connect to server
        const connectionId = await kiroSSH.connect(
            'deploy.example.com',
            'deploy',
            'password',
            22
        );
        
        // Upload application
        await kiroSSH.upload(connectionId, './dist.tar.gz', '/tmp/app.tar.gz');
        
        // Deploy application
        await kiroSSH.execute(connectionId, 'cd /var/www && tar -xzf /tmp/app.tar.gz');
        await kiroSSH.execute(connectionId, 'systemctl restart nginx');
        
        // Verify deployment
        const status = await kiroSSH.execute(connectionId, 'systemctl status nginx');
        console.log('Deployment status:', status);
        
        // Cleanup
        await kiroSSH.execute(connectionId, 'rm /tmp/app.tar.gz');
        await kiroSSH.disconnect(connectionId);
        
    } catch (error) {
        console.error('Deployment failed:', error);
    }
}
```

#### **WSL Operations**
```javascript
const { kiroWSL } = require('./out/kiroWSL');

async function buildAndTest() {
    try {
        // Setup WSL environment
        const setup = await kiroWSL.quickSetup();
        console.log('WSL setup:', setup.status);
        
        // Copy project to WSL
        await kiroWSL.copyToWSL('C:\\Projects\\MyApp', '/home/user/myapp');
        
        // Install dependencies
        await kiroWSL.execute('cd /home/user/myapp && npm install');
        
        // Run tests
        const testResult = await kiroWSL.execute('cd /home/user/myapp && npm test');
        console.log('Test results:', testResult);
        
        // Build application
        await kiroWSL.execute('cd /home/user/myapp && npm run build');
        
        // Copy build back to Windows
        await kiroWSL.copyFromWSL('/home/user/myapp/dist', 'C:\\Projects\\MyApp\\dist');
        
    } catch (error) {
        console.error('Build failed:', error);
    }
}
```

### **Remote Destination Usage**

#### **Unified Remote Development**
```javascript
const { KiroRemoteDestination } = require('./out/remote-destination/kiroRemoteDestination');

async function remoteDevWorkflow() {
    const remote = new KiroRemoteDestination();
    
    try {
        // List available destinations
        const destinations = await remote.getDestinations();
        console.log('Available destinations:', destinations);
        
        // Connect to WSL
        await remote.connect('wsl-Ubuntu');
        
        // Set up development environment
        await remote.setupDevEnvironment('/home/user/project', ['nodejs', 'git']);
        
        // Upload project files
        await remote.uploadFile('./src', '/home/user/project/src');
        
        // Run development commands
        await remote.execute('cd /home/user/project && npm install');
        await remote.execute('cd /home/user/project && npm start');
        
    } catch (error) {
        console.error('Remote development failed:', error);
    }
}
```

---

**Next Steps**:
- Try these examples in your own environment
- Modify examples for your specific use cases
- Combine different patterns for complex workflows
- Check [API Reference](API-Reference) for more detailed information