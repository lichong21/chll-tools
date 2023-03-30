// LFU (least Frequently Used) 最少被使用

// cacheMap: 存放key和node的映射
// freqMap: 存放freq和双向链接的映射
// 双向链表：存放同一freq的node链
// minFreq: 访问频率最小的次数

// 思路
// 1、通过cacheMap存放key和node的映射，
// 2、每次访问的时候，会通过key找到对应的node，根据该节点的freq从freqMap中找到对应的双向链表，
// 3、然后将该节点从双向链表中删除，
// 4、然后将该节点的freq加1，再将该节点添加到freq+1的双向链表中

// 5、每次put的时候，如果当前节点已经在 cacheMap中了，就直接调用get方法，将该节点移动到freq+1的双向链表中
// 6、如果当前节点不在 cacheMap中，就需要判断当前cacheMap的size是否已经达到了capacity，
// 7、如果已经达到了capacity，就需要将freqMap中minFreq最小的双向链表中的最后一个节点删除，
// 8、然后将新的节点添加到freq为1的双向链表中

class ListNode {
    constructor(key, value, freq) {
        this.key = key;
        this.value = value;
        this.freq = freq;
        this.next = null;
        this.prev = null;
    }
}

class DoubleLinkedList {
    constructor() {
        this.head = new ListNode();
        this.tail = new ListNode();
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.size = 0;
    }

    addNodeToHead(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
        this.size++;
    }

    removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        node.next = null;
        node.prev = null;
        this.size--;
    }
}

class LFUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cacheMap = new Map();
        this.freqMap = new Map();
        this.minFreq = 0;
    }


    get(key) {
       const node = this.cacheMap.get(key);
       if (!node) return -1;
       const freqList = this.freqMap.get(node.freq);
       freqList.removeNode(node);
       if (freqList.size === 0) {
            this.freqMap.delete(node.freq);
       }
       node.freq++;
       let newFreqList = this.freqMap.get(node.freq);
        if (!newFreqList) {
            newFreqList = new DoubleLinkedList();
            this.freqMap.set(node.freq, newFreqList);
        } 
        newFreqList.addNodeToHead(node);
        this.minFreq = this.findMinFreq();
        return node;
    }

    put(key, value) {
        if (this.capacity === 0) return;
        const node = this.cacheMap.get(key);
        if (node) {
            node.value = value;
            this.get(key);
            return;
        }

        if (this.cacheMap.size === this.capacity) {
            const minFreqList = this.freqMap.get(this.minFreq);
            const leastNode = minFreqList.tail.prev;
            minFreqList.removeNode(leastNode);
        }

        const newNode = new ListNode(key, value, 1);
        let newFreqList = this.freqMap.get(1);
        if (!newFreqList) {
            newFreqList = new DoubleLinkedList();
            this.freqMap.set(1, newFreqList);
        }
        newFreqList.addNodeToHead(newNode);
        this.cacheMap.set(key, newNode);
        this.minFreq = this.findMinFreq();
    }

    findMinFreq() {
        const freqs = [...this.freqMap.keys()];
        return Math.min(...freqs);
    }
}

