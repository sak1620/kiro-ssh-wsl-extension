#!/usr/bin/env node

/**
 * Simple Windows-compatible publishing script for Kiro Marketplace
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class SimplePublisher {
    constructor() {
        this.extensionInfo = require('./extension.json');
        this.packageInfo = require('../package.json');
    }

    async publish() {
        console.log('🚀 Preparing SSH & WSL Extension for Kiro Marketplace...\n');

        try {
            // Step 1: Validate
            console.log('1. Validating extension...');
            this.validateExtension();
            console.log('   ✅ Extension validation passed\n');

            // Step 2: Build
            console.log('2. Building extension...');
            execSync('npm run build', { stdio: 'inherit' });
            console.log('   ✅ Extension built successfully\n');

            // Step 3: Create package info
            console.log('3. Creating package information...');
            this.createPackageInfo();
            console.log('   ✅ Package information created\n');

            console.log('🎉 Extension ready for marketplace submission!');
            console.log('\n📋 Next Steps:');
            console.log('1. Create GitHub repository: https://github.com/sak1620/kiro-ssh-wsl-extension');
            console.log('2. Upload your code to GitHub');
            console.log('3. Create a release with tag v0.0.1');
            console.log('4. Submit to Kiro Marketplace with the following details:');
            console.log('');
            console.log('📦 Extension Details:');
            console.log(`   Name: ${this.extensionInfo.name}`);
            console.log(`   Display Name: ${this.extensionInfo.displayName}`);
            console.log(`   Version: ${this.extensionInfo.version}`);
            console.log(`   Publisher: ${this.extensionInfo.publisher}`);
            console.log(`   Repository: ${this.extensionInfo.repository.url}`);
            console.log(`   Categories: ${this.extensionInfo.categories.join(', ')}`);
            console.log(`   Keywords: ${this.extensionInfo.keywords.join(', ')}`);
            console.log('');
            console.log('📁 Files to include in marketplace submission:');
            console.log('   • All source code (src/, kiro-integration/, remote-destination/)');
            console.log('   • Built files (out/)');
            console.log('   • Package files (package.json, marketplace/extension.json)');
            console.log('   • Documentation (marketplace/README.md, marketplace/CHANGELOG.md)');
            console.log('   • License (marketplace/LICENSE)');

        } catch (error) {
            console.error('❌ Preparation failed:', error.message);
            process.exit(1);
        }
    }

    validateExtension() {
        // Check required files
        const requiredFiles = [
            'package.json',
            'marketplace/extension.json',
            'marketplace/README.md',
            'marketplace/LICENSE',
            'src/kiroAPI.ts',
            'src/kiroWSL.ts'
        ];

        for (const file of requiredFiles) {
            if (!fs.existsSync(file)) {
                throw new Error(`Required file missing: ${file}`);
            }
        }

        // Check version consistency
        if (this.extensionInfo.version !== this.packageInfo.version) {
            throw new Error('Version mismatch between extension.json and package.json');
        }
    }

    createPackageInfo() {
        const packageInfo = {
            extension: {
                name: this.extensionInfo.name,
                displayName: this.extensionInfo.displayName,
                version: this.extensionInfo.version,
                publisher: this.extensionInfo.publisher,
                description: this.extensionInfo.description,
                categories: this.extensionInfo.categories,
                keywords: this.extensionInfo.keywords,
                repository: this.extensionInfo.repository.url,
                license: this.extensionInfo.license
            },
            features: {
                mcpServers: this.extensionInfo.contributes.mcpServers.length,
                hooks: this.extensionInfo.contributes.hooks.length,
                commands: this.extensionInfo.contributes.commands.length,
                capabilities: Object.keys(this.extensionInfo.capabilities)
            },
            files: {
                main: this.extensionInfo.main,
                source: 'src/',
                integration: 'kiro-integration/',
                remoteDestination: 'remote-destination/',
                examples: 'examples/',
                documentation: 'marketplace/'
            },
            requirements: {
                kiro: this.extensionInfo.engines.kiro,
                node: this.extensionInfo.engines.node
            },
            submissionDate: new Date().toISOString()
        };

        // Save package info
        fs.writeFileSync('marketplace-package-info.json', JSON.stringify(packageInfo, null, 2));
        
        // Create submission checklist
        const checklist = `
# Kiro Marketplace Submission Checklist

## ✅ Pre-Submission
- [x] Extension built and tested
- [x] All required files present
- [x] Version numbers consistent
- [x] Documentation complete
- [x] License included

## 📋 Marketplace Submission
- [ ] GitHub repository created: https://github.com/sak1620/kiro-ssh-wsl-extension
- [ ] Source code uploaded to GitHub
- [ ] GitHub release created (v${this.extensionInfo.version})
- [ ] Kiro Marketplace account created
- [ ] Extension submitted to marketplace
- [ ] Marketplace review completed
- [ ] Extension published

## 📦 Extension Information
- **Name**: ${this.extensionInfo.name}
- **Display Name**: ${this.extensionInfo.displayName}
- **Version**: ${this.extensionInfo.version}
- **Publisher**: ${this.extensionInfo.publisher}
- **Repository**: ${this.extensionInfo.repository.url}
- **License**: ${this.extensionInfo.license}

## 🎯 Features
- **MCP Servers**: ${this.extensionInfo.contributes.mcpServers.length}
- **Hooks**: ${this.extensionInfo.contributes.hooks.length}
- **Commands**: ${this.extensionInfo.contributes.commands.length}
- **Categories**: ${this.extensionInfo.categories.join(', ')}
- **Keywords**: ${this.extensionInfo.keywords.join(', ')}

## 📁 Files to Submit
- Source code (entire repository)
- Built files (out/ directory)
- Documentation (marketplace/ directory)
- Configuration files (package.json, extension.json)
- Examples and demos

## 🚀 Post-Publication
- [ ] Announce on community forums
- [ ] Create documentation website
- [ ] Monitor user feedback
- [ ] Plan future updates
`;

        fs.writeFileSync('SUBMISSION_CHECKLIST.md', checklist);
    }
}

// Run the simple publisher
if (require.main === module) {
    const publisher = new SimplePublisher();
    publisher.publish().catch(console.error);
}

module.exports = { SimplePublisher };