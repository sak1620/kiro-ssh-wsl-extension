const { kiroSSH } = require('../out/kiroAPI');
const { kiroWSL } = require('../out/kiroWSL');

/**
 * Kiro Remote Destination Extension
 * Provides SSH and WSL as remote development destinations
 */
class KiroRemoteDestination {
    constructor() {
        this.connections = new Map();
        this.activeDestination = null;
    }

    /**
     * Get available remote destinations
     */
    async getDestinations() {
        const destinations = [];

        // Add WSL destinations
        try {
            const wslDistributions = await kiroWSL.listDistributions();
            for (const dist of wslDistributions) {
                destinations.push({
                    id: `wsl-${dist.name}`,
                    name: `WSL: ${dist.name}`,
                    type: 'wsl',
                    status: dist.state,
                    isDefault: dist.isDefault,
                    icon: '🐧',
                    description: `Windows Subsystem for Linux - ${dist.name}`,
                    capabilities: ['execute', 'fileSystem', 'terminal', 'development']
                });
            }
        } catch (error) {
            console.warn('WSL not available:', error.message);
        }

        // Add configured SSH destinations
        const sshConnections = await kiroSSH.listConnections();
        for (const conn of sshConnections) {
            destinations.push({
                id: `ssh-${conn.id}`,
                name: `SSH: ${conn.host}`,
                type: 'ssh',
                status: conn.connected ? 'Connected' : 'Disconnected',
                icon: '🖥️',
                description: `Remote server - ${conn.username}@${conn.host}`,
                capabilities: ['execute', 'fileSystem', 'terminal', 'deployment']
            });
        }

        return destinations;
    }

    /**
     * Connect to a remote destination
     */
    async connect(destinationId, options = {}) {
        const [type, identifier] = destinationId.split('-', 2);

        try {
            switch (type) {
                case 'wsl':
                    // Set up WSL destination
                    await kiroWSL.setActiveDistribution(identifier);
                    this.activeDestination = {
                        id: destinationId,
                        type: 'wsl',
                        name: identifier,
                        connected: true
                    };
                    return {
                        success: true,
                        message: `Connected to WSL: ${identifier}`,
                        destination: this.activeDestination
                    };

                case 'ssh':
                    // Connect to SSH destination
                    if (options.host && options.username && options.password) {
                        const connectionId = await kiroSSH.connect(
                            options.host,
                            options.username,
                            options.password,
                            options.port || 22
                        );
                        
                        this.activeDestination = {
                            id: destinationId,
                            type: 'ssh',
                            connectionId: connectionId,
                            name: `${options.username}@${options.host}`,
                            connected: true
                        };
                        
                        return {
                            success: true,
                            message: `Connected to SSH: ${options.host}`,
                            destination: this.activeDestination
                        };
                    } else {
                        throw new Error('SSH connection requires host, username, and password');
                    }

                default:
                    throw new Error(`Unknown destination type: ${type}`);
            }
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: `Failed to connect to ${destinationId}`
            };
        }
    }

    /**
     * Execute command on active destination
     */
    async execute(command, options = {}) {
        if (!this.activeDestination) {
            throw new Error('No active remote destination');
        }

        switch (this.activeDestination.type) {
            case 'wsl':
                return await kiroWSL.execute(command, this.activeDestination.name);
            
            case 'ssh':
                return await kiroSSH.execute(this.activeDestination.connectionId, command);
            
            default:
                throw new Error(`Unsupported destination type: ${this.activeDestination.type}`);
        }
    }

    /**
     * File system operations
     */
    async listFiles(remotePath = '.') {
        if (!this.activeDestination) {
            throw new Error('No active remote destination');
        }

        const command = `ls -la "${remotePath}"`;
        return await this.execute(command);
    }

    async readFile(remotePath) {
        if (!this.activeDestination) {
            throw new Error('No active remote destination');
        }

        const command = `cat "${remotePath}"`;
        return await this.execute(command);
    }

    async writeFile(remotePath, content) {
        if (!this.activeDestination) {
            throw new Error('No active remote destination');
        }

        // Use printf to handle special characters properly
        const escapedContent = content.replace(/'/g, "'\"'\"'");
        const command = `printf '%s' '${escapedContent}' > "${remotePath}"`;
        return await this.execute(command);
    }

    /**
     * File transfer operations
     */
    async uploadFile(localPath, remotePath) {
        if (!this.activeDestination) {
            throw new Error('No active remote destination');
        }

        switch (this.activeDestination.type) {
            case 'wsl':
                return await kiroWSL.copyToWSL(localPath, remotePath);
            
            case 'ssh':
                return await kiroSSH.upload(this.activeDestination.connectionId, localPath, remotePath);
            
            default:
                throw new Error(`File upload not supported for ${this.activeDestination.type}`);
        }
    }

    async downloadFile(remotePath, localPath) {
        if (!this.activeDestination) {
            throw new Error('No active remote destination');
        }

        switch (this.activeDestination.type) {
            case 'wsl':
                return await kiroWSL.copyFromWSL(remotePath, localPath);
            
            case 'ssh':
                return await kiroSSH.download(this.activeDestination.connectionId, remotePath, localPath);
            
            default:
                throw new Error(`File download not supported for ${this.activeDestination.type}`);
        }
    }

    /**
     * Development environment operations
     */
    async setupDevEnvironment(projectPath, tools = []) {
        if (!this.activeDestination) {
            throw new Error('No active remote destination');
        }

        const results = [];

        // Install common development tools
        const defaultTools = ['git', 'nodejs', 'npm', 'python3', 'curl', 'wget', ...tools];
        
        if (this.activeDestination.type === 'wsl') {
            // Update package list
            results.push(await this.execute('sudo apt update'));
            
            // Install tools
            const installCommand = `sudo apt install -y ${defaultTools.join(' ')}`;
            results.push(await this.execute(installCommand));
        }

        // Set up project directory
        if (projectPath) {
            results.push(await this.execute(`mkdir -p "${projectPath}"`));
            results.push(await this.execute(`cd "${projectPath}" && pwd`));
        }

        return {
            success: true,
            message: 'Development environment setup completed',
            results: results
        };
    }

    /**
     * Get current working directory
     */
    async getCurrentDirectory() {
        return await this.execute('pwd');
    }

    /**
     * Change directory
     */
    async changeDirectory(path) {
        return await this.execute(`cd "${path}" && pwd`);
    }

    /**
     * Disconnect from current destination
     */
    async disconnect() {
        if (!this.activeDestination) {
            return { success: true, message: 'No active connection' };
        }

        try {
            if (this.activeDestination.type === 'ssh' && this.activeDestination.connectionId) {
                await kiroSSH.disconnect(this.activeDestination.connectionId);
            }

            const previousDestination = this.activeDestination.name;
            this.activeDestination = null;

            return {
                success: true,
                message: `Disconnected from ${previousDestination}`
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to disconnect'
            };
        }
    }

    /**
     * Get active destination info
     */
    getActiveDestination() {
        return this.activeDestination;
    }
}

module.exports = { KiroRemoteDestination };