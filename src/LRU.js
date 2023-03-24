// LRU (Least Recently Used), 最久没有被访问过的，应该优先被移除

class LRUMap {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
    }

    get(key) {
        const value = this.map.get(key);
        if (!value) return null;
        this.map.delete(key);
        this.map.set(key, value);
        return value;
    }

    put(key, value) {
        if (this.map.has(key)) {
            this.map.delete(key);
        }

        if (this.map.size > this.capacity) {
            const delKey = this.map.keys().next().value;
            this.map.delete(delKey);
        }
        this.map.set(key, value);
    }
}

class ListNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

// 使用hash表和双向链表实现
class LRUHsh {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
        this.head = new ListNode();
        this.tail = new ListNode();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key) {
        if (!this.map.has(key)) return null;
        const node = this.map.get(key);
        this.map.delete(key);
        this.map.set(key, node);
        this.moveToHead(node);
        return node;
    }

    put(key, value) {
        if (this.map.has(key)) {
            const node = this.map.get(key);
            node.value = value;
            this.moveToHead(node);
            return;
        }
        const newNode = new ListNode(key, value);;
        this.map.set(key, newNode);
        this.addNodeToHead(node);
        if (this.map.size > this.capacity) {
            const tailNode = this.removeTailNode();
            this.map.delete(tailNode.key);
        }
    }


    moveToHead(node) {
        this.removeNode(node);
        this.addNodeToHead(node);
    }

    removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    addNodeToHead(node) {
       node.prev = this.head;
       node.next = this.head.next;
       this.head.next.prev = node;
       this.head.next = node;
    }

    removeTailNode() {
        const prevNode = this.tail.prev;
        this.removeNode(prevNode);
        return prevNode;
    }
}