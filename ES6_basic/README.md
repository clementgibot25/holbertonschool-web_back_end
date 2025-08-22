# ES6 (ECMAScript 2015) - JavaScript Modern Features

## What is ES6?
ES6 (ECMAScript 2015) is a significant update to the JavaScript language, introducing new syntax and features that make JavaScript more powerful and easier to work with. It was officially released in June 2015 and has since become the standard for modern JavaScript development.

## Key Features in ES6

### 1. `let` and `const` Declarations
- `let` and `const` are block-scoped variable declarations
- `const` is used for variables that won't be reassigned
- `let` is used for variables that will be reassigned

### 2. Arrow Functions
```javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;
```
- Shorter syntax
- Lexical `this` binding
- Implicit return for single expressions

### 3. Default Parameters
```javascript
function greet(name = 'Guest') {
  return `Hello, ${name}!`;
}
```

### 4. Template Literals
```javascript
const name = 'John';
const greeting = `Hello, ${name}!
Welcome to our website.`;
```
- Multi-line strings
- String interpolation with `${}`

### 5. Destructuring Assignment
```javascript
// Array destructuring
const [first, second] = [1, 2];

// Object destructuring
const { name, age } = { name: 'John', age: 30 };
```

### 6. Enhanced Object Literals
```javascript
const name = 'John';
const person = {
  name,  // Shorthand for name: name
  greet() {  // Method shorthand
    return `Hello, ${this.name}!`;
  }
};
```

### 7. Rest and Spread Operators
```javascript
// Rest parameters
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]
```

### 8. Classes
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    return `Hello, ${this.name}!`;
  }
}
```

### 9. Modules
```javascript
// Exporting
export const name = 'John';
export function greet() { /* ... */ }

// Importing
import { name, greet } from './module.js';
```

### 10. Promises
```javascript
const fetchData = () => {
  return new Promise((resolve, reject) => {
    // Async operation
    if (success) resolve(data);
    else reject(error);
  });
};
```

### 11. Iterators and for...of Loops
```javascript
const numbers = [1, 2, 3];

// Using for...of
for (const num of numbers) {
  console.log(num);
}

// Custom iterator
const iterable = {
  [Symbol.iterator]() {
    let step = 0;
    return {
      next() {
        step++;
        if (step <= 3) {
          return { value: step, done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};
```

## Constants vs Variables
- Use `const` by default
- Use `let` when you need to reassign values
- `var` is function-scoped and hoisted (avoid in modern JS)
- `const` and `let` are block-scoped and not hoisted

## Block Scoping
- Code blocks `{}` create a new scope for `let` and `const`
- Variables are not accessible outside their block
- Prevents common bugs with variable hoisting

## When to Use Arrow Functions
- For short, single-expression functions
- When you need to preserve the lexical `this` context
- As callbacks and in functional programming patterns

## Best Practices
1. Use `const` by default, `let` when necessary
2. Prefer arrow functions for callbacks and methods
3. Use template literals for string concatenation
4. Utilize destructuring for cleaner code
5. Take advantage of default parameters
6. Use modules to organize code
7. Prefer `for...of` over traditional `for` loops when possible
