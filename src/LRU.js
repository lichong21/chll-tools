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