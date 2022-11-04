import {TreeNode} from 'primeng/api';

export class TreeUtils {
    public static toArray<T>(itens?: TreeNode[]): T[] {
        const result: T[] = [];
        this.convert(result, itens);

        return result;
    }

    public static toList(itens?: TreeNode[]): TreeNode[] {
        const result: TreeNode[] = [];
        this.extract(result, itens);

        return result;
    }

    public static expand(itens?: TreeNode[]): TreeNode[] {
        const treeItens: TreeNode[] = [];
        Object.assign(treeItens, itens);

        this.changeExpanded(true, treeItens);

        return treeItens;
    }

    public static collapse(itens?: TreeNode[]): TreeNode[] {
        const treeItens: TreeNode[] = [];
        Object.assign(treeItens, itens);

        this.changeExpanded(false, itens);

        return treeItens;
    }

    public static load(nodes: TreeNode[], str: string[], selection: TreeNode[]): void {
        nodes.forEach(node => {
            if (str.includes(node.data.claimType)) {
                selection.push(node);
            }

            if (node.children !== undefined && node.children !== null) {
                node.children.forEach(child => {
                    if (str.includes(child.data.claimType) && !str.includes(node.data.claimType)) {
                        node.partialSelected = true;
                        child.parent = node;
                    }

                    if (str.includes(node.data.claimType)) {
                        child.parent = node;
                        str.push(child.data.claimType);
                    }
                });
            } else {
                return;
            }

            this.load(node.children, str, selection);

            if (node.children.every(child => selection.includes(child))) {
                node.partialSelected = false;
                selection.push(node);
            } else {
                node.partialSelected = node.children.some(child => selection.includes(child) || child.partialSelected);
            }
        });
    }

    private static convert<T>(result: T[], itens?: TreeNode[]): void {
        if (itens) {
            itens.forEach(item => {
                result.push(item.data as T);
                this.convert(result, item.children);
            });
        }
    }

    private static extract(result: TreeNode[], itens?: TreeNode[]): void {
        if (itens) {
            itens.forEach(item => {
                const newItem: TreeNode = {};
                Object.assign(newItem, item);

                result.push(newItem);
                this.extract(result, newItem.children);
                newItem.children = [];
            });
        }
    }

    private static changeExpanded(value: boolean, itens?: TreeNode[]): void {
        if (itens) {
            itens.forEach(item => {
                item.expanded = value;
                this.changeExpanded(value, item.children);
            });
        }
    }
}
