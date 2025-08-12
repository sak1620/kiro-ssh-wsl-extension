import { KiroSSHManager } from './sshManager';
import { KiroSSHCommands } from './sshCommands';
import { KiroWSLManager } from './wslManager';
import { KiroWSLCommands } from './wslCommands';

export class KiroSSHExtension {
    private sshManager: KiroSSHManager;
    private commands: KiroSSHCommands;
    private wslManager: KiroWSLManager;
    private wslCommands: KiroWSLCommands;
    
    constructor() {
        this.sshManager = new KiroSSHManager();
        this.commands = new KiroSSHCommands(this.sshManager);
        this.wslManager = new KiroWSLManager();
        this.wslCommands = new KiroWSLCommands(this.wslManager);
    }
    
    async initialize() {
        console.log('Kiro SSH Extension initialized');
        return this;
    }
    
    getManager(): KiroSSHManager {
        return this.sshManager;
    }
    
    getCommands(): KiroSSHCommands {
        return this.commands;
    }
    
    getWSLManager(): KiroWSLManager {
        return this.wslManager;
    }
    
    getWSLCommands(): KiroWSLCommands {
        return this.wslCommands;
    }
    
    async shutdown() {
        await this.sshManager.disconnectAll();
        console.log('Kiro SSH Extension shutdown');
    }
}

// Export for Kiro to use
export const kiroSSHExtension = new KiroSSHExtension();