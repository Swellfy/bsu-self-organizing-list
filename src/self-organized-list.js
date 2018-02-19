class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class SelfOrganizedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    insert(data) {
        var node = new Node(data);
        if(this.length === 0)
        {
            this.head = node;
            this.tail = node;
        }
        else 
        {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.length++;
    }

    size() {
        return this.length;
    }

    at(index) {
        if(this.size() == 0 || index > this.size()){
            return null;
        }
        var node = this.head;
        for(var count = 0; count < index; count++){
            node = node.next;
        }
        return node.data;
    }

    findNode(data) {
        var node = this.head;
        for(var count = 0; count < this.length; count++)
            if(node.data === data)
                return node;
            else
                node = node.next;
            return null;
    }

    toArray() {
        var array = new Array(this.length);
        var node = this.head;
        for(var count = 0; count < this.length; count++)
        {
            array[count] = node.data;
            node = node.next;
        }
        return array;
    }

    removeAt(index) {
        if(this.size() == 0 || this.size() <= index)
            return;
        if(this.size() == 1 && index == 0)
        {
            this.head = null;
            this.tail = null;
            this.length = 0;
            return;
        }
        var node = this.head;
        for(var count = 0; count < index; count++){
            node = node.next;
        }
        if(index!=0){
            node.prev.next = node.next;
        }
        else
        {
            node.next.prev = null;
            this.head = node.next; 
        }
        if(index != this.length-1) {
        node.next.prev = node.prev;
        }
        else {
            node.prev.next = null;
            this.tail = node.prev; 
        }
        this.length--;
    }

    moveToFront(node){
        if(this.size() == 1 || this.size() == 0 || this.head == node)
            return;
        node.prev.next = node.next;
        if(node.next != null) {
            node.next.prev = node.prev;
        }
        else {
            this.tail = node.prev;
        }
        this.head.prev = node;
        node.next = this.head;
        this.head = node;
    }

    reorganize(data) {
        if(this.length==0){
            return false;
        }
        var node = this.findNode(data);
        if(node==null){
            return false;
        }
        else
        {
            this.moveToFront(node);
            return true;
        }
    }

}

module.exports = {
    SelfOrganizedList,
    Node
};