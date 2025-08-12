#!/usr/bin/env node

/**
 * Installation script for Kiro SSH/WSL Integration
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class KiroIntegrationInstaller {
    constructor() {
        this.kiroConfigDir = path.join(process.env.HOME || process.env.USERPROFILE, '.kiro');
        this.workspaceConfigDir = '.kiro';
    }
    
    async install() {
        console.log('🚀 Installing Kiro SSH/WSL Integration...\n');
        
        try {
            // Step 1: Build the extension
            console.log('1. Building SSH/WSL extension...');
            execSync('npm run build', { stdio: 'inherit' });
            console.log('   ✅ Build completed\n');
            
            // Step 2: Setup MCP configuration
            console.log('2. Setting up MCP configuration...');
            await this.setupMCPConfig();
            console.log('   ✅ MCP configuration created\n');
            
            // Step 3: Setup steering files
            console.log('3. Setting up steering files...');
            await this.setupSteering();
            console.log('   ✅ Steering files created\n');
            
            // Step 4: Setup hooks (optional)
            console.log('4. Setting up hooks...');
            await this.setupHooks();
            console.log('   ✅ Hooks configured\n');
            
            // Step 5: Test installation
            console.log('5. Testing installation...');
            await this.testInstallation();
            console.log('   ✅ Installation test passed\n');
            
            console.log('🎉 Installation completed successfully!');
            console.log('\n📚 Next steps:');
            console.log('   • Restart Kiro IDE to load the new configuration');
            console.log('   • Use the command palette to find "MCP" commands');
            console.log('   • Try the WSL and SSH tools in your workflows');
            console.log('   • Check the steering files for usage examples');
            
        } catch (error) {
            console.error('❌ Installation failed:', error.message);
            process.exit(1);
        }
    }
    
    async setupMCPConfig() {
        // Create workspace MCP config
        const workspaceMCPPath = path.join(this.workspaceConfigDir, 'settings', 'mcp.json');
        const mcpConfig = {
            mcpServers: {
                "kiro-ssh-wsl": {
                    command: "node",
                    args: [path.resolve("./kiro-integration/mcpServer.js")],
                    env: {
                        NODE_ENV: "production"
                    },
                    disabled: false,
                    autoApprove: [
                        "wsl_execute",
                        "wsl_list_distributions", 
                        "wsl_convert_path",
                        "ssh_list_connections"
                    ]
                }
            }
        };
        
        // Ensure directory exists
        const mcpDir = path.dirname(workspaceMCPPath);
        if (!fs.existsSync(mcpDir)) {
            fs.mkdirSync(mcpDir, { recursive: true });
        }
        
        // Write or merge with existing config
        if (fs.existsSync(workspaceMCPPath)) {
            const existing = JSON.parse(fs.readFileSync(workspaceMCPPath, 'utf8'));
            existing.mcpServers = { ...existing.mcpServers, ...mcpConfig.mcpServers };
            fs.writeFileSync(workspaceMCPPath, JSON.stringify(existing, null, 2));
        } else {
            fs.writeFileSync(workspaceMCPPath, JSON.stringify(mcpConfig, null, 2));
        }
    }
    
    async setupSteering() {
        const steeringDir = path.join(this.workspaceConfigDir, 'steering');
        
        // Ensure directory exists
        if (!fs.existsSync(steeringDir)) {
            fs.mkdirSync(steeringDir, { recursive: true });
        }
        
        // Copy steering file
        const steeringSource = path.join('kiro-integration', 'steering.md');
        const steeringDest = path.join(steeringDir, 'ssh-wsl-integration.md');
        
        if (fs.existsSync(steeringSource)) {
            fs.copyFileSync(steeringSource, steeringDest);
        }
    }
    
    async setupHooks() {
        const hooksDir = path.join(this.workspaceConfigDir, 'hooks');
        
        // Ensure directory exists
        if (!fs.existsSync(hooksDir)) {
            fs.mkdirSync(hooksDir, { recursive: true });
        }
        
        // Create hook configuration
        const hookConfig = {
            hooks: [
                {
                    name: "WSL File Sync",
                    trigger: "file.save",
                    script: path.resolve("./kiro-integration/hooks.js"),
                    function: "onFileSave",
                    enabled: false,
                    description: "Automatically sync saved files to WSL"
                },
                {
                    name: "WSL Test Runner", 
                    trigger: "file.save",
                    script: path.resolve("./kiro-integration/hooks.js"),
                    function: "onTestFileSave",
                    enabled: false,
                    condition: "file.path.includes('.test.') || file.path.includes('.spec.')",
                    description: "Run tests in WSL when test files are saved"
                }
            ]
        };
        
        const hookConfigPath = path.join(hooksDir, 'ssh-wsl-hooks.json');
        fs.writeFileSync(hookConfigPath, JSON.stringify(hookConfig, null, 2));
    }
    
    async testInstallation() {
        // Test that the built files exist
        const requiredFiles = [
            'out/kiroWSL.js',
            'out/kiroAPI.js',
            'out/wslManager.js',
            'out/sshManager.js'
        ];
        
        for (const file of requiredFiles) {
            if (!fs.existsSync(file)) {
                throw new Error(`Required file not found: ${file}`);
            }
        }
        
        // Test basic functionality
        const { kiroWSL } = require('../out/kiroWSL');
        const status = await kiroWSL.getStatus();
        
        if (!status) {
            throw new Error('WSL status check failed');
        }
    }
    
    async uninstall() {
        console.log('🗑️  Uninstalling Kiro SSH/WSL Integration...\n');
        
        try {
            // Remove MCP configuration
            const workspaceMCPPath = path.join(this.workspaceConfigDir, 'settings', 'mcp.json');
            if (fs.existsSync(workspaceMCPPath)) {
                const config = JSON.parse(fs.readFileSync(workspaceMCPPath, 'utf8'));
                delete config.mcpServers['kiro-ssh-wsl'];
                fs.writeFileSync(workspaceMCPPath, JSON.stringify(config, null, 2));
            }
            
            // Remove steering files
            const steeringFile = path.join(this.workspaceConfigDir, 'steering', 'ssh-wsl-integration.md');
            if (fs.existsSync(steeringFile)) {
                fs.unlinkSync(steeringFile);
            }
            
            // Remove hooks
            const hookFile = path.join(this.workspaceConfigDir, 'hooks', 'ssh-wsl-hooks.json');
            if (fs.existsSync(hookFile)) {
                fs.unlinkSync(hookFile);
            }
            
            console.log('✅ Uninstallation completed');
            
        } catch (error) {
            console.error('❌ Uninstallation failed:', error.message);
        }
    }
}

// CLI interface
const command = process.argv[2];
const installer = new KiroIntegrationInstaller();

switch (command) {
    case 'install':
        installer.install();
        break;
    case 'uninstall':
        installer.uninstall();
        break;
    default:
        console.log('Usage: node install.js [install|uninstall]');
        break;
}