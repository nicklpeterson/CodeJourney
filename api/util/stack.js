class Stack {
    constructor() {
        this.stack = []
    }

    push(obj) {
        this.stack.push(obj);
    }

    pop() {
        let lastVal = null;
        if (this.stack.length > 0) {
            lastVal = this.stack.pop();
        }
        return lastVal;
    }

    peek() {
        const len = this.stack.length;
        let lastVal = null;
        if (len > 0) {
            lastVal = this.stack[len - 1];
        }
        return lastVal;
    }

    length() {
        return this.stack.length;
    }
}

export default Stack;