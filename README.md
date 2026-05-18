# Odin Binary Search Tree

## Jest + Babel Setup

**Install Dependencies**

```bash
npm install --save-dev jest babel-jest @babel/core @babel/preset-env
```

**Create babel.config.js**

```javascript
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
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
