import { KiroSSHManager, SSHConfig } from './sshManager';

export class KiroSSHCommands {
    constructor(private sshManager: KiroSSHManager) {}
    
    async connectToServer(config: SSHConfig): Promise<string> {
        try {
            const connectionId = await this.sshManager.connect(config);
            return `Successfully connected to ${connectionId}`;
        } catch (error) {
            throw new Error(`Failed to connect: ${error}`);
        }
    }
    
    async executeRemoteCommand(connectionId: string, command: string): Promise<string> {
        try {
            const output = await this.sshManager.executeCommand(connectionId, command);
            return output;
        } catch (error) {
            throw new Error(`Command execution failed: ${error}`);
        }
    }
    
    async uploadFileToServer(connectionId: string, localPath: string, remotePath: string): Promise<string> {
        try {
            await this.sshManager.uploadFile(connectionId, localPath, remotePath);
            return `File uploaded: ${localPath} -> ${remotePath}`;
        } catch (error) {
            throw new Error(`Upload failed: ${error}`);
        }
    }
    
    async downloadFileFromServer(connectionId: string, remotePath: string, localPath: string): Promise<string> {
        try {
            await this.sshManager.downloadFile(connectionId, remotePath, localPath);
            return `File downloaded: ${remotePath} -> ${localPath}`;
        } catch (error) {
            throw new Error(`Download failed: ${error}`);
        }
    }
    
    async listRemoteDirectory(connectionId: string, remotePath: string = '.'): Promise<any[]> {
        try {
            const files = await this.sshManager.listDirectory(connectionId, remotePath);
            return files;
        } catch (error) {
            throw new Error(`Directory listing failed: ${error}`);
        }
    }
    
    async disconnectFromServer(connectionId: string): Promise<string> {
        try {
            await this.sshManager.disconnect(connectionId);
            return `Disconnected from ${connectionId}`;
        } catch (error) {
            throw new Error(`Disconnect failed: ${error}`);
        }
    }
    
    async listActiveConnections(): Promise<any[]> {
        const connections = this.sshManager.getConnections();
        return connections.map(conn => ({
            id: conn.id,
            host: conn.config.host,
            username: conn.config.username,
            connected: conn.isConnected,
            connectedAt: conn.connectedAt
        }));
    }
    
    async getConnectionStatus(connectionId: string): Promise<boolean> {
        return this.sshManager.isConnected(connectionId);
    }
}