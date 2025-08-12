const { kiroSSH } = require('../out/kiroAPI');
const { kiroWSL } = require('../out/kiroWSL');

/**
 * Kiro IDE Plugin for SSH and WSL Integration
 */
class KiroSSHWSLPlugin {
    constructor() {
        if (KiroSSHWSLPlugin.instance) {
            return KiroSSHWSLPlugin.instance;
        }
        KiroSSHWSLPlugin.instance = this;
    }
    
    static getInstance() {
        if (!KiroSSHWSLPlugin.instance) {
            KiroSSHWSLPlugin.instance = new KiroSSHWSLPlugin();
        }
        return KiroSSHWSLPlugin.instance;
    }
    
    /**
     * Initialize the plugin with Kiro IDE
     */
    async initialize() {
        console.log('Initializing Kiro SSH/WSL Plugin...');
        
        // Test WSL availability
        try {
            const wslStatus = await kiroWSL.getStatus();
            if (wslStatus.available) {
                console.log(`WSL available with ${wslStatus.distributions.length} distributions`);
                await kiroWSL.quickSetup();
            }
        } catch (error) {
            console.warn('WSL not available:', error);
        }
        
        return this;
    }
    
    /**
     * Get available tools for Kiro
     */
    getTools() {
        return {
            // WSL Tools
            wsl_execute: {
                name: 'Execute WSL Command',
                description: 'Execute a command in Windows Subsystem for Linux',
                parameters: {
                    command: { type: 'string', required: true, description: 'Command to execute' },
                    distribution: { type: 'string', required: false, description: 'WSL distribution name' }
                },
                execute: async (params) => {
                    return await kiroWSL.execute(params.command, params.distribution);
                }
            },
            
            wsl_list_distributions: {
                name: 'List WSL Distributions',
                description: 'List all available WSL distributions',
                parameters: {},
                execute: async () => {
                    return await kiroWSL.listDistributions();
                }
            },
            
            wsl_copy_to_wsl: {
                name: 'Copy File to WSL',
                description: 'Copy a file from Windows to WSL',
                parameters: {
                    windowsPath: { type: 'string', required: true, description: 'Windows file path' },
                    wslPath: { type: 'string', required: true, description: 'WSL destination path' },
                    distribution: { type: 'string', required: false, description: 'WSL distribution name' }
                },
                execute: async (params) => {
                    return await kiroWSL.copyToWSL(params.windowsPath, params.wslPath, params.distribution);
                }
            },
            
            wsl_copy_from_wsl: {
                name: 'Copy File from WSL',
                description: 'Copy a file from WSL to Windows',
                parameters: {
                    wslPath: { type: 'string', required: true, description: 'WSL file path' },
                    windowsPath: { type: 'string', required: true, description: 'Windows destination path' },
                    distribution: { type: 'string', required: false, description: 'WSL distribution name' }
                },
                execute: async (params) => {
                    return await kiroWSL.copyFromWSL(params.wslPath, params.windowsPath, params.distribution);
                }
            },
            
            wsl_convert_path: {
                name: 'Convert Path',
                description: 'Convert between Windows and WSL path formats',
                parameters: {
                    path: { type: 'string', required: true, description: 'Path to convert' },
                    toWSL: { type: 'boolean', required: false, description: 'Convert to WSL format (default: true)' }
                },
                execute: async (params) => {
                    return await kiroWSL.convertPath(params.path, params.toWSL ?? true);
                }
            },
            
            // SSH Tools
            ssh_connect: {
                name: 'SSH Connect',
                description: 'Connect to an SSH server',
                parameters: {
                    host: { type: 'string', required: true, description: 'SSH server hostname' },
                    username: { type: 'string', required: true, description: 'SSH username' },
                    password: { type: 'string', required: true, description: 'SSH password' },
                    port: { type: 'number', required: false, description: 'SSH port (default: 22)' }
                },
                execute: async (params) => {
                    return await kiroSSH.connect(params.host, params.username, params.password, params.port || 22);
                }
            },
            
            ssh_execute: {
                name: 'SSH Execute Command',
                description: 'Execute a command on an SSH server',
                parameters: {
                    connectionId: { type: 'string', required: true, description: 'SSH connection ID' },
                    command: { type: 'string', required: true, description: 'Command to execute' }
                },
                execute: async (params) => {
                    return await kiroSSH.execute(params.connectionId, params.command);
                }
            },
            
            ssh_upload: {
                name: 'SSH Upload File',
                description: 'Upload a file to an SSH server',
                parameters: {
                    connectionId: { type: 'string', required: true, description: 'SSH connection ID' },
                    localPath: { type: 'string', required: true, description: 'Local file path' },
                    remotePath: { type: 'string', required: true, description: 'Remote file path' }
                },
                execute: async (params) => {
                    return await kiroSSH.upload(params.connectionId, params.localPath, params.remotePath);
                }
            },
            
            ssh_download: {
                name: 'SSH Download File',
                description: 'Download a file from an SSH server',
                parameters: {
                    connectionId: { type: 'string', required: true, description: 'SSH connection ID' },
                    remotePath: { type: 'string', required: true, description: 'Remote file path' },
                    localPath: { type: 'string', required: true, description: 'Local file path' }
                },
                execute: async (params) => {
                    return await kiroSSH.download(params.connectionId, params.remotePath, params.localPath);
                }
            },
            
            ssh_list_connections: {
                name: 'SSH List Connections',
                description: 'List all active SSH connections',
                parameters: {},
                execute: async () => {
                    return await kiroSSH.listConnections();
                }
            },
            
            ssh_disconnect: {
                name: 'SSH Disconnect',
                description: 'Disconnect from an SSH server',
                parameters: {
                    connectionId: { type: 'string', required: true, description: 'SSH connection ID' }
                },
                execute: async (params) => {
                    return await kiroSSH.disconnect(params.connectionId);
                }
            }
        };
    }
    
    /**
     * Get workflow templates for common tasks
     */
    getWorkflowTemplates() {
        return {
            'wsl-dev-setup': {
                name: 'WSL Development Setup',
                description: 'Set up a development environment in WSL',
                steps: [
                    { tool: 'wsl_execute', params: { command: 'sudo apt update' } },
                    { tool: 'wsl_execute', params: { command: 'sudo apt install -y nodejs npm python3 git' } },
                    { tool: 'wsl_execute', params: { command: 'node --version && python3 --version && git --version' } }
                ]
            },
            
            'deploy-to-server': {
                name: 'Deploy to Remote Server',
                description: 'Deploy code from WSL to remote server via SSH',
                steps: [
                    { tool: 'wsl_execute', params: { command: 'cd /home/user/project && npm run build' } },
                    { tool: 'ssh_connect', params: { host: '${server}', username: '${username}', password: '${password}' } },
                    { tool: 'ssh_upload', params: { connectionId: '${connectionId}', localPath: '/home/user/project/dist', remotePath: '/var/www/app' } },
                    { tool: 'ssh_execute', params: { connectionId: '${connectionId}', command: 'systemctl restart nginx' } }
                ]
            },
            
            'sync-files': {
                name: 'Sync Files Between Windows and WSL',
                description: 'Synchronize files between Windows and WSL environments',
                steps: [
                    { tool: 'wsl_copy_to_wsl', params: { windowsPath: 'C:\\Projects\\${project}', wslPath: '/home/user/${project}' } },
                    { tool: 'wsl_execute', params: { command: 'cd /home/user/${project} && npm install' } },
                    { tool: 'wsl_copy_from_wsl', params: { wslPath: '/home/user/${project}/dist', windowsPath: 'C:\\Projects\\${project}\\dist' } }
                ]
            }
        };
    }
}

// Export singleton instance
const kiroSSHWSLPlugin = KiroSSHWSLPlugin.getInstance();

module.exports = { KiroSSHWSLPlugin, kiroSSHWSLPlugin };