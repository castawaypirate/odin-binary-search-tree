class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

export default class Tree {
  constructor(arr) {
    this.root = this.#buildTree(this.#dedupeAndSort(arr));
  }

  #buildTree(arr) {
    if (arr.length === 0) {
      return null;
    }

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

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}
