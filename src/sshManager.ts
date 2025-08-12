import { Client, ConnectConfig } from 'ssh2';
import SftpClient from 'ssh2-sftp-client';

export interface SSHConfig {
    host: string;
    port: number;
    username: string;
    password?: string;
    privateKey?: Buffer;
    name?: string; // Connection name for identification
}

export interface SSHConnection {
    id: string;
    config: SSHConfig;
    client: Client;
    sftp?: SftpClient;
    isConnected: boolean;
    connectedAt: Date;
}

export class KiroSSHManager {
    private connections: Map<string, SSHConnection> = new Map();
    
    async connect(config: SSHConfig): Promise<string> {
        const connectionId = `${config.username}@${config.host}:${config.port}`;
        
        if (this.connections.has(connectionId)) {
            throw new Error(`Already connected to ${connectionId}`);
        }
        
        return new Promise((resolve, reject) => {
            const client = new Client();
            
            client.on('ready', () => {
                const connection: SSHConnection = {
                    id: connectionId,
                    config,
                    client,
                    isConnected: true,
                    connectedAt: new Date()
                };
                
                this.connections.set(connectionId, connection);
                console.log(`SSH connection established: ${connectionId}`);
                resolve(connectionId);
            });
            
            client.on('error', (err: Error) => {
                console.error(`SSH connection error for ${connectionId}:`, err);
                reject(err);
            });
            
            client.on('close', () => {
                const connection = this.connections.get(connectionId);
                if (connection) {
                    connection.isConnected = false;
                }
                console.log(`SSH connection closed: ${connectionId}`);
            });
            
            client.connect({
                host: config.host,
                port: config.port,
                username: config.username,
                password: config.password,
                privateKey: config.privateKey
            });
        });
    }
    
    async executeCommand(connectionId: string, command: string): Promise<string> {
        const connection = this.connections.get(connectionId);
        if (!connection || !connection.isConnected) {
            throw new Error(`Not connected to ${connectionId}`);
        }
        
        return new Promise((resolve, reject) => {
            connection.client.exec(command, (err: Error | undefined, stream: any) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                let output = '';
                let errorOutput = '';
                
                stream.on('close', (code: number) => {
                    if (code === 0) {
                        resolve(output);
                    } else {
                        reject(new Error(`Command failed with code ${code}: ${errorOutput}`));
                    }
                });
                
                stream.on('data', (data: Buffer) => {
                    output += data.toString();
                });
                
                stream.stderr.on('data', (data: Buffer) => {
                    errorOutput += data.toString();
                });
            });
        });
    }
    
    async uploadFile(connectionId: string, localPath: string, remotePath: string): Promise<void> {
        const connection = this.connections.get(connectionId);
        if (!connection || !connection.isConnected) {
            throw new Error(`Not connected to ${connectionId}`);
        }
        
        if (!connection.sftp) {
            connection.sftp = new SftpClient();
            await connection.sftp.connect({
                host: connection.config.host,
                port: connection.config.port,
                username: connection.config.username,
                password: connection.config.password,
                privateKey: connection.config.privateKey
            });
        }
        
        await connection.sftp.put(localPath, remotePath);
    }
    
    async downloadFile(connectionId: string, remotePath: string, localPath: string): Promise<void> {
        const connection = this.connections.get(connectionId);
        if (!connection || !connection.isConnected) {
            throw new Error(`Not connected to ${connectionId}`);
        }
        
        if (!connection.sftp) {
            connection.sftp = new SftpClient();
            await connection.sftp.connect({
                host: connection.config.host,
                port: connection.config.port,
                username: connection.config.username,
                password: connection.config.password,
                privateKey: connection.config.privateKey
            });
        }
        
        await connection.sftp.get(remotePath, localPath);
    }
    
    async listDirectory(connectionId: string, remotePath: string): Promise<any[]> {
        const connection = this.connections.get(connectionId);
        if (!connection || !connection.isConnected) {
            throw new Error(`Not connected to ${connectionId}`);
        }
        
        if (!connection.sftp) {
            connection.sftp = new SftpClient();
            await connection.sftp.connect({
                host: connection.config.host,
                port: connection.config.port,
                username: connection.config.username,
                password: connection.config.password,
                privateKey: connection.config.privateKey
            });
        }
        
        return await connection.sftp.list(remotePath);
    }
    
    async disconnect(connectionId: string): Promise<void> {
        const connection = this.connections.get(connectionId);
        if (connection) {
            if (connection.sftp) {
                await connection.sftp.end();
            }
            connection.client.end();
            this.connections.delete(connectionId);
            console.log(`Disconnected from ${connectionId}`);
        }
    }
    
    async disconnectAll(): Promise<void> {
        const promises = Array.from(this.connections.keys()).map(id => this.disconnect(id));
        await Promise.all(promises);
    }
    
    getConnections(): SSHConnection[] {
        return Array.from(this.connections.values());
    }
    
    getConnection(connectionId: string): SSHConnection | undefined {
        return this.connections.get(connectionId);
    }
    
    isConnected(connectionId: string): boolean {
        const connection = this.connections.get(connectionId);
        return connection ? connection.isConnected : false;
    }
}