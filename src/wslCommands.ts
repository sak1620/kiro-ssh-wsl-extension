import { KiroWSLManager, WSLDistribution } from './wslManager';

export class KiroWSLCommands {
    constructor(private wslManager: KiroWSLManager) {}
    
    async listDistributions(): Promise<WSLDistribution[]> {
        try {
            return await this.wslManager.listDistributions();
        } catch (error) {
            throw new Error(`Failed to list WSL distributions: ${error}`);
        }
    }
    
    async executeCommand(command: string, distribution?: string): Promise<string> {
        try {
            const output = await this.wslManager.executeCommand(command, distribution);
            return output.trim();
        } catch (error) {
            throw new Error(`WSL command execution failed: ${error}`);
        }
    }
    
    async setActiveDistribution(distribution: string): Promise<string> {
        try {
            this.wslManager.setActiveDistribution(distribution);
            return `Active WSL distribution set to: ${distribution}`;
        } catch (error) {
            throw new Error(`Failed to set active distribution: ${error}`);
        }
    }
    
    async getCurrentDirectory(distribution?: string): Promise<string> {
        try {
            const dir = await this.wslManager.getCurrentDirectory(distribution);
            return dir.trim();
        } catch (error) {
            throw new Error(`Failed to get current directory: ${error}`);
        }
    }
    
    async copyFileToWSL(windowsPath: string, wslPath: string, distribution?: string): Promise<string> {
        try {
            await this.wslManager.copyToWSL(windowsPath, wslPath, distribution);
            return `File copied from Windows to WSL: ${windowsPath} -> ${wslPath}`;
        } catch (error) {
            throw new Error(`Failed to copy file to WSL: ${error}`);
        }
    }
    
    async copyFileFromWSL(wslPath: string, windowsPath: string, distribution?: string): Promise<string> {
        try {
            await this.wslManager.copyFromWSL(wslPath, windowsPath, distribution);
            return `File copied from WSL to Windows: ${wslPath} -> ${windowsPath}`;
        } catch (error) {
            throw new Error(`Failed to copy file from WSL: ${error}`);
        }
    }
    
    async listFiles(wslPath: string = '.', distribution?: string): Promise<string> {
        try {
            return await this.wslManager.listFiles(wslPath, distribution);
        } catch (error) {
            throw new Error(`Failed to list WSL files: ${error}`);
        }
    }
    
    async checkWSLStatus(): Promise<{ available: boolean; distributions: WSLDistribution[] }> {
        try {
            const available = await this.wslManager.isWSLAvailable();
            const distributions = available ? await this.wslManager.listDistributions() : [];
            return { available, distributions };
        } catch (error) {
            throw new Error(`Failed to check WSL status: ${error}`);
        }
    }
    
    async startDistribution(distribution: string): Promise<string> {
        try {
            return await this.wslManager.startDistribution(distribution);
        } catch (error) {
            throw new Error(`Failed to start distribution: ${error}`);
        }
    }
    
    async stopDistribution(distribution: string): Promise<string> {
        try {
            return await this.wslManager.stopDistribution(distribution);
        } catch (error) {
            throw new Error(`Failed to stop distribution: ${error}`);
        }
    }
    
    async convertPath(path: string, toWSL: boolean = true): Promise<string> {
        if (toWSL) {
            return this.wslManager.windowsToWSLPath(path);
        } else {
            return this.wslManager.wslToWindowsPath(path);
        }
    }
}