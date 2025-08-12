#!/usr/bin/env node

import { kiroSSHExtension } from './extension';

async function main() {
    try {
        console.log('Starting Kiro SSH Extension...');
        
        await kiroSSHExtension.initialize();
        
        // Example usage - you can remove this in production
        const manager = kiroSSHExtension.getManager();
        const commands = kiroSSHExtension.getCommands();
        
        console.log('Kiro SSH Extension is ready!');
        console.log('Available methods:');
        console.log('- connectToServer(config)');
        console.log('- executeRemoteCommand(connectionId, command)');
        console.log('- uploadFileToServer(connectionId, localPath, remotePath)');
        console.log('- downloadFileFromServer(connectionId, remotePath, localPath)');
        console.log('- listRemoteDirectory(connectionId, remotePath)');
        console.log('- disconnectFromServer(connectionId)');
        console.log('- listActiveConnections()');
        
        // Keep the process running
        process.on('SIGINT', async () => {
            console.log('\nShutting down Kiro SSH Extension...');
            await kiroSSHExtension.shutdown();
            process.exit(0);
        });
        
    } catch (error) {
        console.error('Failed to start Kiro SSH Extension:', error);
        process.exit(1);
    }
}

// Export for programmatic use
export { kiroSSHExtension };

// Run if called directly
if (require.main === module) {
    main();
}