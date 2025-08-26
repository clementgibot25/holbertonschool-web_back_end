# ES6 Data Manipulation

This repository explores powerful ES6+ features for data manipulation, including array methods and data structures.

## Array Methods

### 1. `map()`
Transforms each element in an array and returns a new array.

```javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(x => x * 2);
// [2, 4, 6, 8]
```

### 2. `filter()`
Creates a new array with elements that pass a test.

```javascript
const numbers = [1, 2, 3, 4];
const evens = numbers.filter(x => x % 2 === 0);
// [2, 4]
```

### 3. `reduce()`
Reduces an array to a single value by executing a reducer function.

```javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
// 10
```

## Typed Arrays

Typed Arrays provide a way to work with binary data in JavaScript.

```javascript
// Create a buffer of 16 bytes
const buffer = new ArrayBuffer(16);

// Create a view of the buffer as 32-bit signed integers
const int32View = new Int32Array(buffer);

// Set values
int32View[0] = 42;
int32View[1] = 7;
```

## Data Structures

### 1. Set
A collection of unique values.

```javascript
const uniqueNumbers = new Set([1, 2, 2, 3, 3, 3]);
// Set {1, 2, 3}

// Methods
uniqueNumbers.add(4);    // Add value
uniqueNumbers.has(2);    // true
uniqueNumbers.delete(2); // Remove value
```

### 2. Map
A collection of key-value pairs where keys can be any type.

```javascript
const map = new Map();

// Set values
map.set('name', 'John');
map.set(1, 'number one');

// Get values
map.get('name'); // 'John'
map.size;        // 2

// Iterate
for (const [key, value] of map) {
  console.log(key, value);
}
```

### 3. WeakMap and WeakSet
Similar to Map and Set but with weak references, meaning they don't prevent garbage collection.

```javascript
// WeakMap
const weakMap = new WeakMap();
let obj = {};
weakMap.set(obj, 'private data');

// WeakSet
const weakSet = new WeakSet();
weakSet.add(obj);
```

## When to Use Each

- **map**: When you need to transform each element in an array
- **filter**: When you need to select certain elements from an array
- **reduce**: When you need to derive a single value from an array
- **Set**: When you need a collection of unique values
- **Map**: When you need key-value pairs with any key type
- **WeakMap/WeakSet**: When you need memory-efficient collections that don't prevent garbage collection
