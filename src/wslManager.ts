import { spawn, exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs';

const execAsync = promisify(exec);

export interface WSLDistribution {
    name: string;
    version: string;
    state: 'Running' | 'Stopped';
    isDefault: boolean;
}

export class KiroWSLManager {
    private activeDistribution: string | null = null;
    
    /**
     * List all available WSL distributions
     */
    async listDistributions(): Promise<WSLDistribution[]> {
        try {
            const { stdout } = await execAsync('wsl --list --verbose');
            // Remove null bytes and other control characters
            const cleanOutput = stdout.replace(/\0/g, '').replace(/\r/g, '');
            const lines = cleanOutput.split('\n').filter(line => line.trim());
            const distributions: WSLDistribution[] = [];
            
            // Skip header line
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line) {
                    // Handle the case where distribution name might have asterisk for default
                    const isDefault = line.includes('*');
                    const cleanLine = line.replace('*', '').trim();
                    const parts = cleanLine.split(/\s+/).filter(part => part.length > 0);
                    
                    if (parts.length >= 3) {
                        distributions.push({
                            name: parts[0].trim(),
                            version: parts[2].trim(),
                            state: parts[1].trim() as 'Running' | 'Stopped',
                            isDefault: isDefault
                        });
                    }
                }
            }
            
            return distributions;
        } catch (error) {
            throw new Error(`Failed to list WSL distributions: ${error}`);
        }
    }
    
    /**
     * Execute command in WSL distribution
     */
    async executeCommand(command: string, distribution?: string): Promise<string> {
        const distro = distribution || this.activeDistribution;
        // Use bash -c to properly execute the command in WSL
        const bashCommand = `bash -c "${command.replace(/"/g, '\\"')}"`;
        const wslCommand = distro ? `wsl -d ${distro} ${bashCommand}` : `wsl ${bashCommand}`;
        
        try {
            const { stdout, stderr } = await execAsync(wslCommand);
            if (stderr) {
                console.warn('WSL command stderr:', stderr);
            }
            return stdout;
        } catch (error) {
            throw new Error(`WSL command failed: ${error}`);
        }
    }
    
    /**
     * Set active WSL distribution
     */
    setActiveDistribution(distribution: string): void {
        this.activeDistribution = distribution;
    }
    
    /**
     * Get current working directory in WSL
     */
    async getCurrentDirectory(distribution?: string): Promise<string> {
        return await this.executeCommand('pwd', distribution);
    }
    
    /**
     * Convert Windows path to WSL path
     */
    windowsToWSLPath(windowsPath: string): string {
        // Convert C:\path\to\file to /mnt/c/path/to/file
        const normalized = windowsPath.replace(/\\/g, '/');
        if (normalized.match(/^[A-Za-z]:/)) {
            const drive = normalized.charAt(0).toLowerCase();
            return `/mnt/${drive}${normalized.substring(2)}`;
        }
        return normalized;
    }
    
    /**
     * Convert WSL path to Windows path
     */
    wslToWindowsPath(wslPath: string): string {
        // Convert /mnt/c/path/to/file to C:\path\to\file
        if (wslPath.startsWith('/mnt/')) {
            const parts = wslPath.split('/');
            if (parts.length >= 3) {
                const drive = parts[2].toUpperCase();
                const restPath = parts.slice(3).join('\\');
                return `${drive}:\\${restPath}`;
            }
        }
        return wslPath;
    }
    
    /**
     * Copy file from Windows to WSL
     */
    async copyToWSL(windowsPath: string, wslPath: string, distribution?: string): Promise<string> {
        const wslSourcePath = this.windowsToWSLPath(windowsPath);
        const command = `cp "${wslSourcePath}" "${wslPath}"`;
        return await this.executeCommand(command, distribution);
    }
    
    /**
     * Copy file from WSL to Windows
     */
    async copyFromWSL(wslPath: string, windowsPath: string, distribution?: string): Promise<string> {
        const wslDestPath = this.windowsToWSLPath(windowsPath);
        const command = `cp "${wslPath}" "${wslDestPath}"`;
        return await this.executeCommand(command, distribution);
    }
    
    /**
     * List files in WSL directory
     */
    async listFiles(wslPath: string = '.', distribution?: string): Promise<string> {
        const command = `ls -la "${wslPath}"`;
        return await this.executeCommand(command, distribution);
    }
    
    /**
     * Check if WSL is available
     */
    async isWSLAvailable(): Promise<boolean> {
        try {
            await execAsync('wsl --status');
            return true;
        } catch {
            return false;
        }
    }
    
    /**
     * Start WSL distribution
     */
    async startDistribution(distribution: string): Promise<string> {
        try {
            const { stdout } = await execAsync(`wsl -d ${distribution} echo "WSL started"`);
            return `Distribution ${distribution} started successfully`;
        } catch (error) {
            throw new Error(`Failed to start distribution ${distribution}: ${error}`);
        }
    }
    
    /**
     * Stop WSL distribution
     */
    async stopDistribution(distribution: string): Promise<string> {
        try {
            await execAsync(`wsl --terminate ${distribution}`);
            return `Distribution ${distribution} stopped successfully`;
        } catch (error) {
            throw new Error(`Failed to stop distribution ${distribution}: ${error}`);
        }
    }
}