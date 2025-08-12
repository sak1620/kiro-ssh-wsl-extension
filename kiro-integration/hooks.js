const { kiroSSH } = require('../out/kiroAPI');
const { kiroWSL } = require('../out/kiroWSL');

/**
 * Kiro IDE Hooks for SSH and WSL Integration
 */
class KiroSSHWSLHooks {
    
    /**
     * Hook: Auto-sync files to WSL when saved
     */
    static async onFileSave(filePath) {
        try {
            // Convert Windows path to WSL path
            const wslPath = await kiroWSL.convertPath(filePath);
            
            // Copy file to WSL if it's in a project directory
            if (filePath.includes('\\Projects\\') || filePath.includes('\\workspace\\')) {
                await kiroWSL.copyToWSL(filePath, wslPath);
                console.log(`File synced to WSL: ${filePath} → ${wslPath}`);
            }
        } catch (error) {
            console.warn('Failed to sync file to WSL:', error);
        }
    }
    
    /**
     * Hook: Run tests in WSL when test files are saved
     */
    static async onTestFileSave(filePath) {
        try {
            if (filePath.includes('.test.') || filePath.includes('.spec.')) {
                const wslPath = await kiroWSL.convertPath(filePath);
                const projectDir = wslPath.substring(0, wslPath.lastIndexOf('/'));
                
                // Run tests in WSL
                const testResult = await kiroWSL.execute(`cd "${projectDir}" && npm test`);
                console.log('Test results:', testResult);
                
                return {
                    success: true,
                    output: testResult,
                    message: 'Tests completed in WSL'
                };
            }
        } catch (error) {
            console.error('Failed to run tests in WSL:', error);
            return {
                success: false,
                error: error.message,
                message: 'Test execution failed'
            };
        }
    }
    
    /**
     * Hook: Deploy to server when deployment files change
     */
    static async onDeploymentFileChange(filePath, serverConfig) {
        try {
            if (filePath.includes('deploy.') || filePath.includes('Dockerfile')) {
                // Build in WSL
                const wslProjectPath = await kiroWSL.convertPath(filePath.substring(0, filePath.lastIndexOf('\\')));
                await kiroWSL.execute(`cd "${wslProjectPath}" && npm run build`);
                
                // Connect to server and deploy
                const connectionId = await kiroSSH.connect(
                    serverConfig.host,
                    serverConfig.username,
                    serverConfig.password,
                    serverConfig.port || 22
                );
                
                // Upload built files
                await kiroSSH.upload(connectionId, `${wslProjectPath}/dist`, '/var/www/app');
                
                // Restart services
                await kiroSSH.execute(connectionId, 'systemctl restart nginx');
                
                await kiroSSH.disconnect(connectionId);
                
                return {
                    success: true,
                    message: 'Deployment completed successfully'
                };
            }
        } catch (error) {
            console.error('Deployment failed:', error);
            return {
                success: false,
                error: error.message,
                message: 'Deployment failed'
            };
        }
    }
    
    /**
     * Hook: Setup development environment when opening a project
     */
    static async onProjectOpen(projectPath) {
        try {
            const wslProjectPath = await kiroWSL.convertPath(projectPath);
            
            // Check if package.json exists
            const hasPackageJson = await kiroWSL.execute(`test -f "${wslProjectPath}/package.json" && echo "exists"`);
            
            if (hasPackageJson.trim() === 'exists') {
                // Install dependencies in WSL
                console.log('Installing dependencies in WSL...');
                const installResult = await kiroWSL.execute(`cd "${wslProjectPath}" && npm install`);
                
                return {
                    success: true,
                    message: 'Development environment setup completed',
                    details: installResult
                };
            }
        } catch (error) {
            console.warn('Failed to setup development environment:', error);
            return {
                success: false,
                error: error.message,
                message: 'Development environment setup failed'
            };
        }
    }
    
    /**
     * Hook: Spell check and grammar check using WSL tools
     */
    static async onMarkdownSave(filePath) {
        try {
            if (filePath.endsWith('.md') || filePath.endsWith('.markdown')) {
                const wslPath = await kiroWSL.convertPath(filePath);
                
                // Use aspell or other tools in WSL for spell checking
                const spellCheckResult = await kiroWSL.execute(`aspell check "${wslPath}" 2>/dev/null || echo "aspell not installed"`);
                
                return {
                    success: true,
                    message: 'Spell check completed',
                    suggestions: spellCheckResult
                };
            }
        } catch (error) {
            console.warn('Spell check failed:', error);
        }
    }
    
    /**
     * Hook: Format code using WSL tools
     */
    static async onCodeFormat(filePath, language) {
        try {
            const wslPath = await kiroWSL.convertPath(filePath);
            let formatCommand = '';
            
            switch (language) {
                case 'javascript':
                case 'typescript':
                    formatCommand = `prettier --write "${wslPath}"`;
                    break;
                case 'python':
                    formatCommand = `black "${wslPath}"`;
                    break;
                case 'json':
                    formatCommand = `jq . "${wslPath}" > "${wslPath}.tmp" && mv "${wslPath}.tmp" "${wslPath}"`;
                    break;
                default:
                    return { success: false, message: `No formatter available for ${language}` };
            }
            
            const formatResult = await kiroWSL.execute(formatCommand);
            
            // Copy formatted file back to Windows
            await kiroWSL.copyFromWSL(wslPath, filePath);
            
            return {
                success: true,
                message: `Code formatted using WSL tools`,
                output: formatResult
            };
        } catch (error) {
            console.error('Code formatting failed:', error);
            return {
                success: false,
                error: error.message,
                message: 'Code formatting failed'
            };
        }
    }
}

/**
 * Hook configuration for Kiro IDE
 */
const kiroHookConfig = {
    hooks: [
        {
            name: 'WSL File Sync',
            event: 'file.save',
            handler: KiroSSHWSLHooks.onFileSave,
            description: 'Automatically sync saved files to WSL'
        },
        {
            name: 'WSL Test Runner',
            event: 'file.save',
            handler: KiroSSHWSLHooks.onTestFileSave,
            description: 'Run tests in WSL when test files are saved',
            condition: (filePath) => filePath.includes('.test.') || filePath.includes('.spec.')
        },
        {
            name: 'Auto Deploy',
            event: 'file.save',
            handler: KiroSSHWSLHooks.onDeploymentFileChange,
            description: 'Deploy to server when deployment files change',
            condition: (filePath) => filePath.includes('deploy.') || filePath.includes('Dockerfile')
        },
        {
            name: 'Dev Environment Setup',
            event: 'project.open',
            handler: KiroSSHWSLHooks.onProjectOpen,
            description: 'Setup development environment when opening a project'
        },
        {
            name: 'Markdown Spell Check',
            event: 'file.save',
            handler: KiroSSHWSLHooks.onMarkdownSave,
            description: 'Spell check markdown files using WSL tools',
            condition: (filePath) => filePath.endsWith('.md') || filePath.endsWith('.markdown')
        },
        {
            name: 'Code Formatter',
            event: 'format.request',
            handler: KiroSSHWSLHooks.onCodeFormat,
            description: 'Format code using WSL tools'
        }
    ]
};

module.exports = { KiroSSHWSLHooks, kiroHookConfig };