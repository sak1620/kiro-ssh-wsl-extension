import { KiroSSHManager, SSHConnection } from './sshManager';

export interface TreeItem {
    label: string;
    collapsibleState: 'None' | 'Collapsed' | 'Expanded';
    connection?: SSHConnection;
    tooltip?: string;
    description?: string;
    contextValue?: string;
}

export class SSHTreeItem implements TreeItem {
    public tooltip?: string;
    public description?: string;
    public contextValue?: string;

    constructor(
        public readonly label: string,
        public readonly collapsibleState: 'None' | 'Collapsed' | 'Expanded',
        public readonly connection?: SSHConnection
    ) {
        this.tooltip = `${this.label}`;
        this.description = connection?.isConnected ? 'Connected' : 'Disconnected';
    }
}

export class SSHTreeProvider {
    private changeListeners: Array<() => void> = [];
    private connections: SSHTreeItem[] = [];

    constructor(private sshManager: KiroSSHManager) { }

    onDidChangeTreeData(listener: () => void): void {
        this.changeListeners.push(listener);
    }

    refresh(): void {
        this.changeListeners.forEach(listener => listener());
    }

    getTreeItem(element: SSHTreeItem): TreeItem {
        return element;
    }

    async getChildren(element?: SSHTreeItem): Promise<SSHTreeItem[]> {
        if (!element) {
            // Root level - show all connections from SSH manager
            const connections = this.sshManager.getConnections();
            return connections.map(conn => {
                const item = new SSHTreeItem(
                    conn.id,
                    'None',
                    conn
                );
                item.contextValue = 'sshConnection';
                return item;
            });
        }

        return [];
    }

    addConnection(host: string, username: string): void {
        const connection = new SSHTreeItem(
            `${username}@${host}`,
            'Collapsed'
        );
        connection.contextValue = 'sshConnection';
        this.connections.push(connection);
        this.refresh();
    }

    removeConnection(label: string): void {
        this.connections = this.connections.filter(conn => conn.label !== label);
        this.refresh();
    }

    private createConnectionItem(connection: SSHConnection): SSHTreeItem {
        const item = new SSHTreeItem(
            connection.id,
            'None',
            connection
        );
        item.contextValue = 'sshConnection';
        return item;
    }
}