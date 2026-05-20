class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }

  hasChildren() {
    return this.left || this.right;
  }

  hasBothChildren() {
    return this.left && this.right;
  }

  theOnlyChild() {
    if (this.hasBothChildren()) {
      return false;
    }
    if (!this.left) {
      return this.right;
    }
    if (!this.right) {
      return this.left;
    }
    return false;
  }
}

export default class Tree {
  constructor(arr) {
    this.root = this.#buildTree(this.#dedupeAndSort(arr));
    this.size = 0;
  }

  #buildTree(arr) {
    if (arr.length === 0) {
      return null;
    }

    this.size = arr.length;

    if (arr.length === 1) {
      return new Node(arr[0]);
    }

    let mid = Math.floor((arr.length - 1) / 2);

    return new Node(
      arr[mid],
      this.#buildTree(arr.slice(0, mid)),
      this.#buildTree(arr.slice(mid + 1, arr.length)),
    );
  }

  #dedupeAndSort(arr) {
    let mod = arr.filter((item, index) => arr.indexOf(item) === index);
    return mod.sort((a, b) => a - b);
  }

  includes(value) {
    let current = this.root;
    while (current) {
      if (current.data === value) {
        return true;
      } else if (current.data > value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  insert(value) {
    let current = this.root;
    if (!current) {
      this.size++;
      this.root = new Node(value);
      return;
    }
    do {
      if (current.data === value) {
        return;
      } else if (current.data > value) {
        if (!current.left) {
          this.size++;
          current.left = new Node(value);
          break;
        }
        current = current.left;
      } else {
        if (!current.right) {
          this.size++;
          current.right = new Node(value);
          break;
        }
        current = current.right;
      }
    } while (current);
  }

  deleteItem(value) {
    if (!this.root) {
      return;
    }

    if (this.root.data === value && this.size === 1) {
      this.root = null;
      return;
    }

    let parent = null;
    let current = this.root;
    while (current) {
      if (current.data === value) {
        this.size--;
        break;
      } else if (current.data > value) {
        parent = current;
        current = current.left;
      } else {
        parent = current;
        current = current.right;
      }
    }

    if (!current) {
      return;
    }

    if (parent.left === current) {
      if (current.hasChildren()) {
        let onlyChild = current.theOnlyChild();
        if (onlyChild) {
          parent.left = onlyChild;
        } else {
          parent.left.data = this.#deleteSuccessor(current.right);
        }
      } else {
        parent.left = null;
      }
    } else {
      if (current.hasChildren()) {
        let onlyChild = current.theOnlyChild();
        if (onlyChild) {
          parent.right = onlyChild;
        } else {
          parent.right.data = this.#deleteSuccessor(current.right);
        }
      } else {
        parent.right = null;
      }
    }
  }

  #deleteSuccessor(node) {
    let parent = null;
    while (node.left) {
      parent = node;
      node = node.left;
    }
    let data = node.data;
    parent.left = null;
    return data;
  }

  leverOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback should be a function");
    }
    if (!this.root) {
      return;
    }
    let que = [];
    que.push(this.root);
    while (que.length > 0) {
      let first = que.shift();
      callback(first.data);
      if (first.left) {
        que.push(first.left);
      }
      if (first.right) {
        que.push(first.right);
      }
    }
  }

  preOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback should be a function");
    }
    if (!this.root) {
      return;
    }
    let que = [];
    que.unshift(this.root);
    while (que.length > 0) {
      let first = que.shift();
      callback(first.data);
      if (first.right) {
        que.unshift(first.right);
      }
      if (first.left) {
        que.unshift(first.left);
      }
    }
  }

  inOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback should be a function");
    }

    if (!this.root) {
      return;
    }

    let que = [];
    let euq = [];
    que.unshift(this.root);

    while (que.length > 0) {
      let first = que.shift();
      if (!first.left) {
        euq.push(first);
        callback(first.data);
        if (first.right) {
          que.unshift(first.right);
        }
      } else {
        if (
          first.right &&
          !que.includes(first.right) &&
          !euq.includes(first.right)
        ) {
          que.unshift(first.right);
        }
        if (!euq.includes(first.left)) {
          que.unshift(first);
        }
        if (first.left) {
          if (euq.includes(first.left)) {
            euq.push(first);
            callback(first.data);
          } else {
            que.unshift(first.left);
          }
        }
      }
    }
  }

  postOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback should be a function");
    }

    if (!this.root) {
      return;
    }

    let que = [];
    let euq = [];
    que.unshift(this.root);

    while (que.length > 0) {
      let first = que.shift();
      if (!first.hasChildren()) {
        callback(first.data);
        euq.push(first);
      } else {
        if (!euq.includes(first.left) && !euq.includes(first.right)) {
          que.unshift(first);
        }

        let onlyChild = first.theOnlyChild();
        if (onlyChild) {
          if (euq.includes(onlyChild)) {
            callback(first.data);
            euq.push(first);
          }
        } else {
          if (
            euq.includes(first.left) &&
            euq.includes(first.right) &&
            !euq.includes(first)
          ) {
            callback(first.data);
            euq.push(first);
          }
        }

        if (
          first.right &&
          !que.includes(first.right) &&
          !euq.includes(first.right)
        ) {
          que.unshift(first.right);
        }

        if (
          first.left &&
          !que.includes(first.left) &&
          !euq.includes(first.left)
        ) {
          que.unshift(first.left);
        }
      }
    }
  }

  height(value) {
    let current = this.root;
    while (current) {
      if (current.data === value) {
        break;
      } else if (current.data > value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    if (!current) {
      return;
    }
    let heights = {};
    let que = [];
    que.unshift(current);
    heights[current.data] = 0;
    while (que.length > 0) {
      let first = que.shift();
      if (first.left) {
        que.unshift(first.left);
        heights[first.left.data] = heights[first.data] + 1;
      }
      if (first.right) {
        que.unshift(first.right);
        heights[first.right.data] = heights[first.data] + 1;
      }
    }
    return Math.max(...Object.values(heights));
  }

  depth(value) {
    let current = this.root;
    let d = 0;
    while (current) {
      if (current.data === value) {
        break;
      } else if (current.data > value) {
        d++;
        current = current.left;
      } else {
        d++;
        current = current.right;
      }
    }
    if (current) {
      return d;
    }
    return;
  }

  isBalanced() {
    let current = this.root;
    if (!current) {
      return true;
    }
    let children = {};
    let que = [];
    que.unshift(current);
    while (que.length > 0) {
      let first = que.shift();
      children[first.data] = [];
      if (first.left) {
        que.unshift(first.left);
        children[first.data].push(first.left.data);
      }
      if (first.right) {
        que.unshift(first.right);
        children[first.data].push(first.right.data);
      }
    }

    for (let v of Object.values(children)) {
      let height0 = this.height(v[0]);
      let height1 = 0;

      let parentHeight0 = height0 + 1;
      let parentHeight1 = 0;

      if (v.length === 2) {
        height1 = this.height(v[1]);
        parentHeight1 = height1 + 1;
      }
      if (
        Math.abs(height1 - height0) > 1 ||
        Math.abs(parentHeight0 - parentHeight1) > 1
      ) {
        return false;
      }
    }
    return true;
  }

  rebalance() {
    let temp = [];
    if (!this.root) {
      return;
    }

    this.inOrderForEach((x) => {
      temp.push(x);
    });

    this.root = this.#buildTree(temp);
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}
