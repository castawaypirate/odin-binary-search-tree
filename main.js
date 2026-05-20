import Tree from "./binary-search-tree.js";

const generateRandomArray = (length, min, max) => {
  let temp = [];
  min = Math.ceil(min);
  max = Math.floor(max);

  for (let i = 0; i < length; i++) {
    temp.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return temp;
};

let arr = generateRandomArray(20, 0, 100);
let bst = new Tree(arr);

console.log("Initial Tree:");
bst.prettyPrint();
console.log("Is balanced: " + bst.isBalanced());

console.log("\n--- Level Order ---");
bst.leverOrderForEach((x) => {
  console.log(x);
});

console.log("\n--- Pre Order ---");
bst.preOrderForEach((x) => {
  console.log(x);
});

console.log("\n--- In Order ---");
bst.inOrderForEach((x) => {
  console.log(x);
});

console.log("\n--- Post Order ---");
bst.postOrderForEach((x) => {
  console.log(x);
});

console.log("\nUnbalancing tree...");
bst.insert(230);
bst.insert(690);
bst.insert(620);
bst.insert(1020);

console.log("Is balanced: " + bst.isBalanced());

console.log("\nRebalancing tree...");
bst.rebalance();

console.log("Is balanced: " + bst.isBalanced());

console.log("\n--- Level Order (After Rebalance) ---");
bst.leverOrderForEach((x) => {
  console.log(x);
});

console.log("\n--- Pre Order (After Rebalance) ---");
bst.preOrderForEach((x) => {
  console.log(x);
});

console.log("\n--- In Order (After Rebalance) ---");
bst.inOrderForEach((x) => {
  console.log(x);
});

console.log("\n--- Post Order (After Rebalance) ---");
bst.postOrderForEach((x) => {
  console.log(x);
});

console.log("\n--- Method Checks ---");
console.log("Includes 690: " + bst.includes(690));
console.log("Includes 9999: " + bst.includes(9999));

console.log("Height of root: " + bst.height(bst.root.data));
console.log("Depth of root: " + bst.depth(bst.root.data));

console.log("Height of 690: " + bst.height(690));
console.log("Depth of 690: " + bst.depth(690));

console.log("\nDeleting 690...");
bst.deleteItem(690);
console.log("Includes 690 after delete: " + bst.includes(690));

console.log("\nFinal Tree:");
bst.prettyPrint();
