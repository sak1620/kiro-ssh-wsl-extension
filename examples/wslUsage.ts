import { kiroWSL } from '../src/kiroWSL';
import { kiroSSH } from '../src/kiroAPI';

/**
 * Example of how to use Kiro with WSL
 */
async function wslBasicExample() {
    try {
        console.log('=== Kiro WSL Integration Example ===');
        
        // Quick setup - automatically find and configure WSL
        console.log('Setting up WSL...');
        const setup = await kiroWSL.quickSetup();
        console.log(`✓ ${setup.status}`);
        
        // List available distributions
        console.log('\nAvailable WSL distributions:');
        const distributions = await kiroWSL.listDistributions();
        distributions.forEach(dist => {
            const status = dist.isDefault ? ' (default)' : '';
            console.log(`  - ${dist.name} (${dist.state})${status}`);
        });
        
        // Execute basic commands
        console.log('\nExecuting WSL commands...');
        const whoami = await kiroWSL.execute('whoami');
        console.log(`✓ Current user: ${whoami}`);
        
        const pwd = await kiroWSL.pwd();
        console.log(`✓ Current directory: ${pwd}`);
        
        const uname = await kiroWSL.execute('uname -a');
        console.log(`✓ System info: ${uname}`);
        
        // List files
        console.log('\nListing current directory:');
        const files = await kiroWSL.ls('.');
        console.log(files);
        
    } catch (error) {
        console.error('❌ WSL Error:', error);
    }
}

/**
 * Example of file operations between Windows and WSL
 */
async function wslFileOperationsExample() {
    try {
        console.log('\n=== WSL File Operations Example ===');
        
        // Path conversion examples
        console.log('Path conversion examples:');
        const windowsPath = 'C:\\Users\\username\\Documents\\file.txt';
        const wslPath = await kiroWSL.convertPath(windowsPath, true);
        console.log(`✓ Windows to WSL: ${windowsPath} -> ${wslPath}`);
        
        const backToWindows = await kiroWSL.convertPath(wslPath, false);
        console.log(`✓ WSL to Windows: ${wslPath} -> ${backToWindows}`);
        
        // Create a test file in WSL
        console.log('\nCreating test file in WSL...');
        const testContent = `Hello from Kiro WSL!\nTimestamp: ${new Date().toISOString()}`;
        await kiroWSL.execute(`echo "${testContent}" > /tmp/kiro-wsl-test.txt`);
        console.log('✓ Test file created in WSL');
        
        // Verify file exists
        const fileContent = await kiroWSL.execute('cat /tmp/kiro-wsl-test.txt');
        console.log('✓ File content:', fileContent.trim());
        
        // Copy file from WSL to Windows temp directory
        console.log('\nCopying file from WSL to Windows...');
        await kiroWSL.copyFromWSL('/tmp/kiro-wsl-test.txt', 'C:\\temp\\from-wsl.txt');
        console.log('✓ File copied to Windows');
        
        // Clean up
        await kiroWSL.execute('rm /tmp/kiro-wsl-test.txt');
        console.log('✓ Cleanup completed');
        
    } catch (error) {
        console.error('❌ File operations error:', error);
    }
}

/**
 * Example of using WSL for development tasks
 */
async function wslDevelopmentExample() {
    try {
        console.log('\n=== WSL Development Example ===');
        
        // Check if common development tools are available
        console.log('Checking development environment...');
        
        try {
            const nodeVersion = await kiroWSL.execute('node --version');
            console.log(`✓ Node.js: ${nodeVersion.trim()}`);
        } catch {
            console.log('⚠ Node.js not found');
        }
        
        try {
            const pythonVersion = await kiroWSL.execute('python3 --version');
            console.log(`✓ Python: ${pythonVersion.trim()}`);
        } catch {
            console.log('⚠ Python not found');
        }
        
        try {
            const gitVersion = await kiroWSL.execute('git --version');
            console.log(`✓ Git: ${gitVersion.trim()}`);
        } catch {
            console.log('⚠ Git not found');
        }
        
        // Example: Run a simple development task
        console.log('\nRunning development task...');
        await kiroWSL.execute('mkdir -p /tmp/kiro-dev-test');
        await kiroWSL.execute('cd /tmp/kiro-dev-test && echo "console.log(\\"Hello from WSL!\\");" > app.js');
        
        try {
            const output = await kiroWSL.execute('cd /tmp/kiro-dev-test && node app.js');
            console.log(`✓ Node.js execution result: ${output.trim()}`);
        } catch {
            console.log('⚠ Could not run Node.js example');
        }
        
        // Clean up
        await kiroWSL.execute('rm -rf /tmp/kiro-dev-test');
        
    } catch (error) {
        console.error('❌ Development example error:', error);
    }
}

/**
 * Example of combining SSH and WSL
 */
async function combinedSSHWSLExample() {
    try {
        console.log('\n=== Combined SSH + WSL Example ===');
        
        // Use WSL to SSH to a remote server
        console.log('Using WSL to connect to remote servers...');
        
        // Generate SSH key in WSL (if not exists)
        try {
            await kiroWSL.execute('test -f ~/.ssh/id_rsa || ssh-keygen -t rsa -b 2048 -f ~/.ssh/id_rsa -N ""');
            console.log('✓ SSH key ready in WSL');
        } catch (error) {
            console.log('⚠ SSH key generation failed:', error);
        }
        
        // Example: Use WSL's SSH client to connect to a server
        // (This would require actual server credentials)
        console.log('✓ WSL is ready for SSH connections');
        console.log('  You can now use: await kiroWSL.execute("ssh user@server \\"command\\"")');
        
        // Example: Use both APIs together
        console.log('\nDemonstrating API integration...');
        console.log('✓ SSH API available for direct connections');
        console.log('✓ WSL API available for local Linux environment');
        console.log('✓ Both can be used together for complex workflows');
        
    } catch (error) {
        console.error('❌ Combined example error:', error);
    }
}

// Export functions for use in other modules
export { 
    wslBasicExample, 
    wslFileOperationsExample, 
    wslDevelopmentExample, 
    combinedSSHWSLExample 
};

// Run examples if called directly
if (typeof require !== 'undefined' && require.main === module) {
    (async () => {
        await wslBasicExample();
        await wslFileOperationsExample();
        await wslDevelopmentExample();
        await combinedSSHWSLExample();
        console.log('\n🎉 All WSL examples completed!');
    })().catch(console.error);
}