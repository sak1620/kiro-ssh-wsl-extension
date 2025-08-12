const { kiroSSH } = require('../out/kiroAPI');
const { kiroWSL } = require('../out/kiroWSL');

/**
 * Simple MCP-compatible server for Kiro SSH/WSL Integration
 * This provides a basic JSON-RPC interface that Kiro can use
 */
class KiroSSHWSLMCPServer {
    constructor() {
        this.tools = this.getToolDefinitions();
    }
    
    getToolDefinitions() {
        return [
            // WSL Tools
            {
                name: 'wsl_execute',
                description: 'Execute a command in Windows Subsystem for Linux',
                inputSchema: {
                    type: 'object',
                    properties: {
                        command: { type: 'string', description: 'Command to execute in WSL' },
                        distribution: { type: 'string', description: 'WSL distribution name (optional)' }
                    },
                    required: ['command']
                }
            },
            {
                name: 'wsl_list_distributions',
                description: 'List all available WSL distributions',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'wsl_copy_file',
                description: 'Copy files between Windows and WSL',
                inputSchema: {
                    type: 'object',
                    properties: {
                        source: { type: 'string', description: 'Source file path' },
                        destination: { type: 'string', description: 'Destination file path' },
                        direction: { type: 'string', enum: ['to_wsl', 'from_wsl'], description: 'Copy direction' }
                    },
                    required: ['source', 'destination', 'direction']
                }
            },
            {
                name: 'wsl_convert_path',
                description: 'Convert between Windows and WSL path formats',
                inputSchema: {
                    type: 'object',
                    properties: {
                        path: { type: 'string', description: 'Path to convert' },
                        to_wsl: { type: 'boolean', description: 'Convert to WSL format (default: true)' }
                    },
                    required: ['path']
                }
            },
            
            // SSH Tools
            {
                name: 'ssh_connect',
                description: 'Connect to an SSH server',
                inputSchema: {
                    type: 'object',
                    properties: {
                        host: { type: 'string', description: 'SSH server hostname' },
                        username: { type: 'string', description: 'SSH username' },
                        password: { type: 'string', description: 'SSH password' },
                        port: { type: 'number', description: 'SSH port (default: 22)' }
                    },
                    required: ['host', 'username', 'password']
                }
            },
            {
                name: 'ssh_execute',
                description: 'Execute a command on an SSH server',
                inputSchema: {
                    type: 'object',
                    properties: {
                        connection_id: { type: 'string', description: 'SSH connection ID' },
                        command: { type: 'string', description: 'Command to execute' }
                    },
                    required: ['connection_id', 'command']
                }
            },
            {
                name: 'ssh_transfer_file',
                description: 'Transfer files to/from SSH server',
                inputSchema: {
                    type: 'object',
                    properties: {
                        connection_id: { type: 'string', description: 'SSH connection ID' },
                        local_path: { type: 'string', description: 'Local file path' },
                        remote_path: { type: 'string', description: 'Remote file path' },
                        direction: { type: 'string', enum: ['upload', 'download'], description: 'Transfer direction' }
                    },
                    required: ['connection_id', 'local_path', 'remote_path', 'direction']
                }
            },
            {
                name: 'ssh_list_connections',
                description: 'List all active SSH connections',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'ssh_connect_wsl',
                description: 'Connect to WSL as an SSH-like destination',
                inputSchema: {
                    type: 'object',
                    properties: {
                        distribution: { type: 'string', description: 'WSL distribution name (optional)' }
                    }
                }
            },
            {
                name: 'ssh_list_all_connections',
                description: 'List all connections (SSH and WSL)',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'ssh_execute_unified',
                description: 'Execute command on SSH or WSL connection',
                inputSchema: {
                    type: 'object',
                    properties: {
                        connection_id: { type: 'string', description: 'Connection ID (SSH or WSL)' },
                        command: { type: 'string', description: 'Command to execute' }
                    },
                    required: ['connection_id', 'command']
                }
            }
        ];
    }
    
    async handleToolCall(toolName, args) {
        try {
            switch (toolName) {
                case 'wsl_execute':
                    const result = await kiroWSL.execute(args.command, args.distribution);
                    return { success: true, content: result };
                
                case 'wsl_list_distributions':
                    const distributions = await kiroWSL.listDistributions();
                    return { success: true, content: JSON.stringify(distributions, null, 2) };
                
                case 'wsl_copy_file':
                    let copyResult;
                    if (args.direction === 'to_wsl') {
                        copyResult = await kiroWSL.copyToWSL(args.source, args.destination);
                    } else {
                        copyResult = await kiroWSL.copyFromWSL(args.source, args.destination);
                    }
                    return { success: true, content: copyResult };
                
                case 'wsl_convert_path':
                    const convertedPath = await kiroWSL.convertPath(args.path, args.to_wsl ?? true);
                    return { success: true, content: convertedPath };
                
                case 'ssh_connect':
                    const connectionId = await kiroSSH.connect(args.host, args.username, args.password, args.port || 22);
                    return { success: true, content: `Connected: ${connectionId}` };
                
                case 'ssh_execute':
                    const sshResult = await kiroSSH.execute(args.connection_id, args.command);
                    return { success: true, content: sshResult };
                
                case 'ssh_transfer_file':
                    let transferResult;
                    if (args.direction === 'upload') {
                        transferResult = await kiroSSH.upload(args.connection_id, args.local_path, args.remote_path);
                    } else {
                        transferResult = await kiroSSH.download(args.connection_id, args.remote_path, args.local_path);
                    }
                    return { success: true, content: transferResult };
                
                case 'ssh_list_connections':
                    const connections = await kiroSSH.listConnections();
                    return { success: true, content: JSON.stringify(connections, null, 2) };
                
                case 'ssh_connect_wsl':
                    const wslConnection = await kiroSSH.connectToWSL(args.distribution);
                    return { success: true, content: JSON.stringify(wslConnection, null, 2) };
                
                case 'ssh_list_all_connections':
                    const allConnections = await kiroSSH.getAllConnections();
                    return { success: true, content: JSON.stringify(allConnections, null, 2) };
                
                case 'ssh_execute_unified':
                    const unifiedResult = await kiroSSH.executeUnified(args.connection_id, args.command);
                    return { success: true, content: unifiedResult };
                
                default:
                    throw new Error(`Unknown tool: ${toolName}`);
            }
        } catch (error) {
            return {
                success: false,
                error: error.message,
                content: `Error: ${error.message}`
            };
        }
    }
    
    // MCP Protocol implementation
    async handleRequest(request) {
        const { method, params, id } = request;
        
        try {
            switch (method) {
                case 'initialize':
                    return {
                        jsonrpc: '2.0',
                        id: id,
                        result: {
                            protocolVersion: '2024-11-05',
                            capabilities: {
                                tools: {},
                                logging: {}
                            },
                            serverInfo: {
                                name: 'kiro-ssh-wsl-server',
                                version: '1.0.0'
                            }
                        }
                    };
                
                case 'notifications/initialized':
                    // No response needed for notifications
                    return null;
                
                case 'tools/list':
                    return {
                        jsonrpc: '2.0',
                        id: id,
                        result: { tools: this.tools }
                    };
                
                case 'tools/call':
                    const { name, arguments: args } = params;
                    const result = await this.handleToolCall(name, args);
                    
                    if (result.success) {
                        return {
                            jsonrpc: '2.0',
                            id: id,
                            result: {
                                content: [
                                    {
                                        type: 'text',
                                        text: result.content
                                    }
                                ]
                            }
                        };
                    } else {
                        return {
                            jsonrpc: '2.0',
                            id: id,
                            error: {
                                code: -32000,
                                message: result.error || 'Tool execution failed',
                                data: result.content
                            }
                        };
                    }
                
                case 'ping':
                    return {
                        jsonrpc: '2.0',
                        id: id,
                        result: {}
                    };
                
                default:
                    return {
                        jsonrpc: '2.0',
                        id: id,
                        error: {
                            code: -32601,
                            message: `Method not found: ${method}`
                        }
                    };
            }
        } catch (error) {
            return {
                jsonrpc: '2.0',
                id: id,
                error: {
                    code: -32603,
                    message: 'Internal error',
                    data: error.message
                }
            };
        }
    }
    
    // Start MCP stdio server
    start() {
        // Log to stderr so it doesn't interfere with MCP protocol
        console.error('Kiro SSH/WSL MCP Server started');
        
        process.stdin.setEncoding('utf8');
        let buffer = '';
        
        process.stdin.on('data', async (chunk) => {
            buffer += chunk;
            const lines = buffer.split('\n');
            buffer = lines.pop() || ''; // Keep incomplete line in buffer
            
            for (const line of lines) {
                if (line.trim()) {
                    try {
                        const request = JSON.parse(line);
                        const response = await this.handleRequest(request);
                        
                        // Only send response if it's not null (notifications don't need responses)
                        if (response !== null) {
                            process.stdout.write(JSON.stringify(response) + '\n');
                        }
                    } catch (error) {
                        const errorResponse = {
                            jsonrpc: '2.0',
                            id: null,
                            error: {
                                code: -32700,
                                message: 'Parse error',
                                data: error.message
                            }
                        };
                        process.stdout.write(JSON.stringify(errorResponse) + '\n');
                    }
                }
            }
        });
        
        process.stdin.on('end', () => {
            console.error('Kiro SSH/WSL MCP Server: stdin closed');
            process.exit(0);
        });
        
        // Handle process termination
        process.on('SIGINT', () => {
            console.error('Kiro SSH/WSL MCP Server shutting down');
            process.exit(0);
        });
        
        process.on('SIGTERM', () => {
            console.error('Kiro SSH/WSL MCP Server terminated');
            process.exit(0);
        });
    }
}

// Start the server if run directly
if (require.main === module) {
    const server = new KiroSSHWSLMCPServer();
    server.start();
}

module.exports = { KiroSSHWSLMCPServer };