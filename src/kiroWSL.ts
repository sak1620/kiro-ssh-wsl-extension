import { KiroWSLManager, WSLDistribution } from './wslManager';
import { KiroWSLCommands } from './wslCommands';

/**
 * Kiro WSL API - Simple interface for Kiro to interact with WSL
 */
export class KiroWSLAPI {
    private static instance: KiroWSLAPI;
    private wslManager: KiroWSLManager;
    private wslCommands: KiroWSLCommands;
    
    private constructor() {
        this.wslManager = new KiroWSLManager();
        this.wslCommands = new KiroWSLCommands(this.wslManager);
    }
    
    static getInstance(): KiroWSLAPI {
        if (!KiroWSLAPI.instance) {
            KiroWSLAPI.instance = new KiroWSLAPI();
        }
        return KiroWSLAPI.instance;
    }
    
    /**
     * Check if WSL is available and list distributions
     */
    async getStatus(): Promise<{ available: boolean; distributions: WSLDistribution[] }> {
        return await this.wslCommands.checkWSLStatus();
    }
    
    /**
     * List all WSL distributions
     */
    async listDistributions(): Promise<WSLDistribution[]> {
        return await this.wslCommands.listDistributions();
    }
    
    /**
     * Execute command in WSL
     */
    async execute(command: string, distribution?: string): Promise<string> {
        return await this.wslCommands.executeCommand(command, distribution);
    }
    
    /**
     * Set the active WSL distribution for subsequent commands
     */
    async setActiveDistribution(distribution: string): Promise<string> {
        return await this.wslCommands.setActiveDistribution(distribution);
    }
    
    /**
     * Get current working directory in WSL
     */
    async pwd(distribution?: string): Promise<string> {
        return await this.wslCommands.getCurrentDirectory(distribution);
    }
    
    /**
     * List files in WSL directory
     */
    async ls(path: string = '.', distribution?: string): Promise<string> {
        return await this.wslCommands.listFiles(path, distribution);
    }
    
    /**
     * Copy file from Windows to WSL
     */
    async copyToWSL(windowsPath: string, wslPath: string, distribution?: string): Promise<string> {
        return await this.wslCommands.copyFileToWSL(windowsPath, wslPath, distribution);
    }
    
    /**
     * Copy file from WSL to Windows
     */
    async copyFromWSL(wslPath: string, windowsPath: string, distribution?: string): Promise<string> {
        return await this.wslCommands.copyFileFromWSL(wslPath, windowsPath, distribution);
    }
    
    /**
     * Convert Windows path to WSL path or vice versa
     */
    async convertPath(path: string, toWSL: boolean = true): Promise<string> {
        return await this.wslCommands.convertPath(path, toWSL);
    }
    
    /**
     * Start a WSL distribution
     */
    async start(distribution: string): Promise<string> {
        return await this.wslCommands.startDistribution(distribution);
    }
    
    /**
     * Stop a WSL distribution
     */
    async stop(distribution: string): Promise<string> {
        return await this.wslCommands.stopDistribution(distribution);
    }
    
    /**
     * Quick setup - find and set the default or first available distribution
     */
    async quickSetup(): Promise<{ distribution: string; status: string }> {
        const distributions = await this.listDistributions();
        
        if (distributions.length === 0) {
            throw new Error('No WSL distributions found. Please install a WSL distribution first.');
        }
        
        // Find default distribution or use the first running one
        let targetDistro = distributions.find(d => d.isDefault);
        if (!targetDistro) {
            targetDistro = distributions.find(d => d.state === 'Running');
        }
        if (!targetDistro) {
            targetDistro = distributions[0];
        }
        
        // Start the distribution if it's not running
        if (targetDistro.state === 'Stopped') {
            await this.start(targetDistro.name);
        }
        
        await this.setActiveDistribution(targetDistro.name);
        
        return {
            distribution: targetDistro.name,
            status: `WSL setup complete. Active distribution: ${targetDistro.name}`
        };
    }
}

// Export singleton instance
export const kiroWSL = KiroWSLAPI.getInstance();