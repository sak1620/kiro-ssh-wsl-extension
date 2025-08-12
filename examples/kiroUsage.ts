import { kiroSSH } from '../src/kiroAPI';

/**
 * Example of how to use the Kiro SSH Extension
 */
async function exampleUsage() {
    try {
        console.log('=== Kiro SSH Extension Example ===');
        
        // Connect to SSH server
        console.log('Connecting to SSH server...');
        const connectionId = await kiroSSH.connect(
            'your-server.com',
            'username', 
            'password',
            22
        );
        console.log(`✓ Connected: ${connectionId}`);
        
        // Execute a simple command
        console.log('\nExecuting remote command...');
        const whoami = await kiroSSH.execute(connectionId, 'whoami');
        console.log(`✓ Current user: ${whoami.trim()}`);
        
        // List current directory
        console.log('\nListing remote directory...');
        const files = await kiroSSH.listFiles(connectionId, '.');
        console.log(`✓ Found ${files.length} items:`);
        files.slice(0, 5).forEach(file => {
            console.log(`  - ${file.name} (${file.type})`);
        });
        
        // Check system info
        console.log('\nGetting system information...');
        const uname = await kiroSSH.execute(connectionId, 'uname -a');
        console.log(`✓ System: ${uname.trim()}`);
        
        // List all active connections
        console.log('\nActive connections:');
        const connections = await kiroSSH.listConnections();
        connections.forEach(conn => {
            console.log(`  - ${conn.id} (connected: ${conn.connected})`);
        });
        
        // Disconnect
        console.log('\nDisconnecting...');
        await kiroSSH.disconnect(connectionId);
        console.log('✓ Disconnected successfully');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

/**
 * Example of file operations
 */
async function fileOperationsExample() {
    try {
        console.log('\n=== File Operations Example ===');
        
        const connectionId = await kiroSSH.connect('your-server.com', 'username', 'password');
        
        // Create a test file locally
        const fs = require('fs');
        const testContent = `Hello from Kiro SSH Extension!\nTimestamp: ${new Date().toISOString()}`;
        fs.writeFileSync('./test-upload.txt', testContent);
        
        // Upload file
        console.log('Uploading file...');
        await kiroSSH.upload(connectionId, './test-upload.txt', '/tmp/kiro-test.txt');
        console.log('✓ File uploaded');
        
        // Verify file exists on remote
        const remoteContent = await kiroSSH.execute(connectionId, 'cat /tmp/kiro-test.txt');
        console.log('✓ Remote file content:', remoteContent.trim());
        
        // Download file back
        console.log('Downloading file...');
        await kiroSSH.download(connectionId, '/tmp/kiro-test.txt', './test-download.txt');
        console.log('✓ File downloaded');
        
        // Clean up
        await kiroSSH.execute(connectionId, 'rm /tmp/kiro-test.txt');
        fs.unlinkSync('./test-upload.txt');
        fs.unlinkSync('./test-download.txt');
        
        await kiroSSH.disconnect(connectionId);
        console.log('✓ Cleanup completed');
        
    } catch (error) {
        console.error('❌ File operations error:', error.message);
    }
}

// Run examples if called directly
if (require.main === module) {
    exampleUsage()
        .then(() => fileOperationsExample())
        .then(() => console.log('\n🎉 All examples completed!'))
        .catch(console.error);
}

export { exampleUsage, fileOperationsExample };