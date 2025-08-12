const { KiroRemoteDestination } = require('./kiroRemoteDestination');

/**
 * MCP Server for Remote Destination functionality
 */
class RemoteDestinationMCPServer {
    constructor() {
        this.remoteDestination = new KiroRemoteDestination();
        this.tools = this.getToolDefinitions();
    }

    getToolDefinitions() {
        return [
            {
                name: 'remote_list_destinations',
                description: 'List all available remote destinations (WSL and SSH)',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'remote_connect',
                description: 'Connect to a remote destination',
                inputSchema: {
                    type: 'object',
                    properties: {
                        destination_id: { type: 'string', description: 'Destination ID (e.g., wsl-Ubuntu, ssh-server)' },
                        host: { type: 'string', description: 'SSH hostname (for SSH destinations)' },
                        username: { type: 'string', description: 'SSH username (for SSH destinations)' },
                        password: { type: 'string', description: 'SSH password (for SSH destinations)' },
                        port: { type: 'number', description: 'SSH port (default: 22)' }
                    },
                    required: ['destination_id']
                }
            },
            {
                name: 'remote_execute',
                description: 'Execute a command on the active remote destination',
                inputSchema: {
                    type: 'object',
                    properties: {
                        command: { type: 'string', description: 'Command to execute' }
                    },
                    required: ['command']
                }
            },
            {
                name: 'remote_list_files',
                description: 'List files in a directory on the remote destination',
                inputSchema: {
                    type: 'object',
                    properties: {
                        path: { type: 'string', description: 'Remote directory path (default: current directory)' }
                    }
                }
            },
            {
                name: 'remote_read_file',
                description: 'Read a file from the remote destination',
                inputSchema: {
                    type: 'object',
                    properties: {
                        path: { type: 'string', description: 'Remote file path' }
                    },
                    required: ['path']
                }
            },
            {
                name: 'remote_write_file',
                description: 'Write content to a file on the remote destination',
                inputSchema: {
                    type: 'object',
                    properties: {
                        path: { type: 'string', description: 'Remote file path' },
                        content: { type: 'string', description: 'File content' }
                    },
                    required: ['path', 'content']
                }
            },
            {
                name: 'remote_upload_file',
                description: 'Upload a file to the remote destination',
                inputSchema: {
                    type: 'object',
                    properties: {
                        local_path: { type: 'string', description: 'Local file path' },
                        remote_path: { type: 'string', description: 'Remote destination path' }
                    },
                    required: ['local_path', 'remote_path']
                }
            },
            {
                name: 'remote_download_file',
                description: 'Download a file from the remote destination',
                inputSchema: {
                    type: 'object',
                    properties: {
                        remote_path: { type: 'string', description: 'Remote file path' },
                        local_path: { type: 'string', description: 'Local destination path' }
                    },
                    required: ['remote_path', 'local_path']
                }
            },
            {
                name: 'remote_setup_dev_environment',
                description: 'Set up development environment on remote destination',
                inputSchema: {
                    type: 'object',
                    properties: {
                        project_path: { type: 'string', description: 'Project directory path' },
                        tools: { type: 'array', items: { type: 'string' }, description: 'Additional tools to install' }
                    }
                }
            },
            {
                name: 'remote_get_current_directory',
                description: 'Get current working directory on remote destination',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'remote_change_directory',
                description: 'Change working directory on remote destination',
                inputSchema: {
                    type: 'object',
                    properties: {
                        path: { type: 'string', description: 'Directory path' }
                    },
                    required: ['path']
                }
            },
            {
                name: 'remote_disconnect',
                description: 'Disconnect from current remote destination',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'remote_get_active_destination',
                description: 'Get information about the currently active remote destination',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            }
        ];
    }

    async handleToolCall(toolName, args) {
        try {
            switch (toolName) {
                case 'remote_list_destinations':
                    const destinations = await this.remoteDestination.getDestinations();
                    return { success: true, content: JSON.stringify(destinations, null, 2) };

                case 'remote_connect':
                    const connectResult = await this.remoteDestination.connect(args.destination_id, {
                        host: args.host,
                        username: args.username,
                        password: args.password,
                        port: args.port
                    });
                    return { success: connectResult.success, content: connectResult.message };

                case 'remote_execute':
                    const executeResult = await this.remoteDestination.execute(args.command);
                    return { success: true, content: executeResult };

                case 'remote_list_files':
                    const fileList = await this.remoteDestination.listFiles(args.path);
                    return { success: true, content: fileList };

                case 'remote_read_file':
                    const fileContent = await this.remoteDestination.readFile(args.path);
                    return { success: true, content: fileContent };

                case 'remote_write_file':
                    await this.remoteDestination.writeFile(args.path, args.content);
                    return { success: true, content: `File written to ${args.path}` };

                case 'remote_upload_file':
                    const uploadResult = await this.remoteDestination.uploadFile(args.local_path, args.remote_path);
                    return { success: true, content: uploadResult };

                case 'remote_download_file':
                    const downloadResult = await this.remoteDestination.downloadFile(args.remote_path, args.local_path);
                    return { success: true, content: downloadResult };

                case 'remote_setup_dev_environment':
                    const setupResult = await this.remoteDestination.setupDevEnvironment(args.project_path, args.tools);
                    return { success: setupResult.success, content: setupResult.message };

                case 'remote_get_current_directory':
                    const currentDir = await this.remoteDestination.getCurrentDirectory();
                    return { success: true, content: currentDir.trim() };

                case 'remote_change_directory':
                    const newDir = await this.remoteDestination.changeDirectory(args.path);
                    return { success: true, content: newDir.trim() };

                case 'remote_disconnect':
                    const disconnectResult = await this.remoteDestination.disconnect();
                    return { success: disconnectResult.success, content: disconnectResult.message };

                case 'remote_get_active_destination':
                    const activeDestination = this.remoteDestination.getActiveDestination();
                    return { 
                        success: true, 
                        content: activeDestination ? JSON.stringify(activeDestination, null, 2) : 'No active destination' 
                    };

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

    // MCP Protocol implementation (same as the main server)
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
                                name: 'kiro-remote-destination-server',
                                version: '1.0.0'
                            }
                        }
                    };
                
                case 'notifications/initialized':
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

    start() {
        console.error('Kiro Remote Destination MCP Server started');
        
        process.stdin.setEncoding('utf8');
        let buffer = '';
        
        process.stdin.on('data', async (chunk) => {
            buffer += chunk;
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';
            
            for (const line of lines) {
                if (line.trim()) {
                    try {
                        const request = JSON.parse(line);
                        const response = await this.handleRequest(request);
                        
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
            console.error('Remote Destination MCP Server: stdin closed');
            process.exit(0);
        });
        
        process.on('SIGINT', () => {
            console.error('Remote Destination MCP Server shutting down');
            process.exit(0);
        });
        
        process.on('SIGTERM', () => {
            console.error('Remote Destination MCP Server terminated');
            process.exit(0);
        });
    }
}

// Start the server if run directly
if (require.main === module) {
    const server = new RemoteDestinationMCPServer();
    server.start();
}

module.exports = { RemoteDestinationMCPServer };