import { kiroSSHExtension } from './extension';
import { SSHConfig } from './sshManager';

/**
 * Kiro SSH API - Simple interface for Kiro to interact with SSH functionality
 */
export class KiroSSHAPI {
    private static instance: KiroSSHAPI;
    
    static getInstance(): KiroSSHAPI {
        if (!KiroSSHAPI.instance) {
            KiroSSHAPI.instance = new KiroSSHAPI();
        }
        return KiroSSHAPI.instance;
    }
    
    async connect(host: string, username: string, password: string, port: number = 22): Promise<string> {
        const config: SSHConfig = { host, username, password, port };
        return await kiroSSHExtension.getCommands().connectToServer(config);
    }
    
    async execute(connectionId: string, command: string): Promise<string> {
        return await kiroSSHExtension.getCommands().executeRemoteCommand(connectionId, command);
    }
    
    async upload(connectionId: string, localPath: string, remotePath: string): Promise<string> {
        return await kiroSSHExtension.getCommands().uploadFileToServer(connectionId, localPath, remotePath);
    }
    
    async download(connectionId: string, remotePath: string, localPath: string): Promise<string> {
        return await kiroSSHExtension.getCommands().downloadFileFromServer(connectionId, remotePath, localPath);
    }
    
    async listFiles(connectionId: string, remotePath: string = '.'): Promise<any[]> {
        return await kiroSSHExtension.getCommands().listRemoteDirectory(connectionId, remotePath);
    }
    
    async disconnect(connectionId: string): Promise<string> {
        return await kiroSSHExtension.getCommands().disconnectFromServer(connectionId);
    }
    
    async listConnections(): Promise<any[]> {
        return await kiroSSHExtension.getCommands().listActiveConnections();
    }
    
    async isConnected(connectionId: string): Promise<boolean> {
        return await kiroSSHExtension.getCommands().getConnectionStatus(connectionId);
    }
    
    // WSL Integration in SSH Extension
    async connectToWSL(distribution?: string): Promise<any> {
        const { kiroWSL } = await import('./kiroWSL');
        
        try {
            // Setup WSL if not already done
            const setup = await kiroWSL.quickSetup();
            
            // If specific distribution requested, set it as active
            if (distribution) {
                await kiroWSL.setActiveDistribution(distribution);
            }
            
            // Create a pseudo SSH connection ID for WSL
            const wslConnectionId = `wsl-${distribution || setup.distribution}`;
            
            return {
                connectionId: wslConnectionId,
                message: `Connected to WSL: ${distribution || setup.distribution}`,
                type: 'wsl',
                distribution: distribution || setup.distribution,
                host: 'localhost',
                username: 'wsl-user'
            };
        } catch (error: any) {
            throw new Error(`Failed to connect to WSL: ${error.message}`);
        }
    }
    
    async listWSLDistributions(): Promise<any[]> {
        const { kiroWSL } = await import('./kiroWSL');
        
        try {
            const distributions = await kiroWSL.listDistributions();
            return distributions.map(dist => ({
                id: `wsl-${dist.name}`,
                name: `WSL: ${dist.name}`,
                distribution: dist.name,
                status: dist.state,
                isDefault: dist.isDefault,
                type: 'wsl',
                host: 'localhost',
                username: 'wsl-user',
                connected: dist.state === 'Running'
            }));
        } catch (error) {
            console.warn('WSL not available:', error);
            return [];
        }
    }
    
    async getAllConnections(): Promise<any> {
        // Get both SSH and WSL connections
        const sshConnections = await this.listConnections();
        const wslConnections = await this.listWSLDistributions();
        
        return {
            ssh: sshConnections,
            wsl: wslConnections,
            all: [...sshConnections, ...wslConnections]
        };
    }
    
    // Enhanced execute method that handles both SSH and WSL
    async executeUnified(connectionId: string, command: string): Promise<string> {
        if (connectionId.startsWith('wsl-')) {
            // Handle WSL execution
            const { kiroWSL } = await import('./kiroWSL');
            const distribution = connectionId.replace('wsl-', '');
            return await kiroWSL.execute(command, distribution === 'default' ? undefined : distribution);
        } else {
            // Handle SSH execution
            return await this.execute(connectionId, command);
        }
    }
    
    // Enhanced file operations that handle both SSH and WSL
    async uploadUnified(connectionId: string, localPath: string, remotePath: string): Promise<string> {
        if (connectionId.startsWith('wsl-')) {
            // Handle WSL file upload
            const { kiroWSL } = await import('./kiroWSL');
            return await kiroWSL.copyToWSL(localPath, remotePath);
        } else {
            // Handle SSH upload
            return await this.upload(connectionId, localPath, remotePath);
        }
    }
    
    async downloadUnified(connectionId: string, remotePath: string, localPath: string): Promise<string> {
        if (connectionId.startsWith('wsl-')) {
            // Handle WSL file download
            const { kiroWSL } = await import('./kiroWSL');
            return await kiroWSL.copyFromWSL(remotePath, localPath);
        } else {
            // Handle SSH download
            return await this.download(connectionId, remotePath, localPath);
        }
    }
}

// Export singleton instance
export const kiroSSH = KiroSSHAPI.getInstance();