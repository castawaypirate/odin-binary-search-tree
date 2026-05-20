import Tree from "./binary-search-tree.js";

describe("Binary Search Tree", () => {
  let bst;
  const initialArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

  beforeEach(() => {
    // Reset the tree before every single test
    bst = new Tree(initialArray);
  });

  describe("Initialization", () => {
    it("removes duplicates and builds a balanced tree", () => {
      expect(bst.isBalanced()).toBe(true);
      // In-order traversal of the initial array should be sorted and unique
      const result = [];
      bst.inOrderForEach((val) => result.push(val));
      expect(result).toEqual([1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]);
    });
  });

  describe("Core Operations (Insert, Delete, Includes)", () => {
    it("includes() returns true for existing values", () => {
      expect(bst.includes(67)).toBe(true);
      expect(bst.includes(324)).toBe(true);
    });

    it("includes() returns false for non-existing values", () => {
      expect(bst.includes(9999)).toBe(false);
    });

    it("insert() adds a new value while maintaining binary search property", () => {
      bst.insert(10);
      expect(bst.includes(10)).toBe(true);

      const result = [];
      bst.inOrderForEach((val) => result.push(val));
      expect(result).toEqual([1, 3, 4, 5, 7, 8, 9, 10, 23, 67, 324, 6345]);
    });

    it("insert() ignores duplicate values", () => {
      bst.insert(67); // Already exists
      const result = [];
      bst.inOrderForEach((val) => result.push(val));
      expect(result).toEqual([1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]);
    });

    it("deleteItem() removes a node and maintains order", () => {
      bst.deleteItem(8);
      expect(bst.includes(8)).toBe(false);

      const result = [];
      bst.inOrderForEach((val) => result.push(val));
      expect(result).toEqual([1, 3, 4, 5, 7, 9, 23, 67, 324, 6345]);
    });
  });

  describe("Tree Metrics", () => {
    it("depth() returns 0 for the root node", () => {
      expect(bst.depth(bst.root.data)).toBe(0);
    });

    it("depth() and height() return undefined for values not in the tree", () => {
      expect(bst.depth(9999)).toBeUndefined();
      expect(bst.height(9999)).toBeUndefined();
    });

    it("height() of a leaf node is 0", () => {
      bst.prettyPrint();
      expect(bst.height(3)).toBe(0);
    });
  });

  describe("Traversals", () => {
    it("throws an Error if no callback is provided", () => {
      expect(() => bst.levelOrderForEach()).toThrow();
      expect(() => bst.preOrderForEach()).toThrow();
      expect(() => bst.inOrderForEach()).toThrow();
      expect(() => bst.postOrderForEach()).toThrow();
    });

    it("inOrderForEach() visits nodes in ascending order", () => {
      const result = [];
      bst.inOrderForEach((val) => result.push(val));
      // Checking that the array is strictly sorted
      const isSorted = result.every((val, i, arr) => !i || arr[i - 1] < val);
      expect(isSorted).toBe(true);
    });
  });

  describe("Balancing", () => {
    it("detects an unbalanced tree", () => {
      bst.insert(9000);
      bst.insert(9001);
      bst.insert(9002);
      bst.insert(9003);
      expect(bst.isBalanced()).toBe(false);
    });

    it("rebalance() fixes an unbalanced tree", () => {
      bst.insert(9000);
      bst.insert(9001);
      bst.insert(9002);
      bst.insert(9003);
      expect(bst.isBalanced()).toBe(false);

      bst.rebalance();
      expect(bst.isBalanced()).toBe(true);

      // Ensure no data was lost during rebalance
      expect(bst.includes(9003)).toBe(true);
      expect(bst.includes(1)).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    let emptyTree;

    beforeEach(() => {
      emptyTree = new Tree([]);
    });

    it("handles initialization with an empty array", () => {
      expect(emptyTree.root).toBeNull();
    });

    it("considers an empty tree to be balanced", () => {
      expect(emptyTree.isBalanced()).toBe(true);
    });

    it("handles insertion into an empty tree", () => {
      emptyTree.insert(42);
      expect(emptyTree.root.data).toBe(42);
      expect(emptyTree.includes(42)).toBe(true);
    });

    it("sets root to null when deleting the last node", () => {
      emptyTree.insert(42);
      emptyTree.deleteItem(42);
      expect(emptyTree.root).toBeNull();
    });
  });
});
