# Odin Binary Search Tree
A robust, fully iterative Binary Search Tree implementation in JavaScript featuring custom node insertion and deletion, comprehensive tree traversals, and dynamic rebalancing.

## Jest + Babel Setup

**Install Dependencies**

```bash
npm install --save-dev jest babel-jest @babel/core @babel/preset-env
```

**Create babel.config.js**

```javascript
export default {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
};
```

**Update package.json**

```json
"scripts": {
  "test": "jest"
}
```

**Run Tests**

```bash
npm run test
```
