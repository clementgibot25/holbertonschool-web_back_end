# ES6 Classes in JavaScript

This guide covers the fundamentals of ES6 classes in JavaScript, including class definition, methods, inheritance, and metaprogramming with symbols.

## Table of Contents
1. [Defining a Class](#defining-a-class)
2. [Class Methods](#class-methods)
3. [Static Methods](#static-methods)
4. [Class Inheritance](#class-inheritance)
5. [Metaprogramming with Symbols](#metaprogramming-with-symbols)

## Defining a Class

In ES6, classes provide a cleaner syntax for creating objects and dealing with inheritance. Here's how to define a class:

```javascript
class MyClass {
  constructor(parameter1, parameter2) {
    this.property1 = parameter1;
    this.property2 = parameter2;
  }
}

// Creating an instance
const instance = new MyClass('value1', 'value2');
```

## Class Methods

Methods are functions defined within a class that are available to all instances:

```javascript
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  // Method
  calculateArea() {
    return this.height * this.width;
  }
}

const rect = new Rectangle(10, 5);
console.log(rect.calculateArea()); // 50
```

## Static Methods

Static methods are called on the class itself, not on instances. They are often used for utility functions:

```javascript
class MathHelper {
  static add(a, b) {
    return a + b;
  }
  
  static multiply(a, b) {
    return a * b;
  }
}

// Call directly on the class
console.log(MathHelper.add(2, 3)); // 5
console.log(MathHelper.multiply(2, 3)); // 6
```

## Class Inheritance

Classes can inherit from other classes using the `extends` keyword:

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call the parent constructor
    this.breed = breed;
  }

  speak() {
    console.log(`${this.name} barks.`);
  }
}

const dog = new Dog('Rex', 'Labrador');
dog.speak(); // Rex barks.
```

## Metaprogramming with Symbols

Symbols are unique and immutable primitive values that can be used as property keys. They're useful for:
- Creating private object properties
- Adding metadata to objects
- Preventing property name collisions

```javascript
// Creating a unique symbol
const MY_KEY = Symbol('myKey');

class MyClass {
  constructor() {
    this[MY_KEY] = 'private value';
  }

  getSecret() {
    return this[MY_KEY];
  }
}

const instance = new MyClass();
console.log(instance.getSecret()); // 'private value'
console.log(instance[MY_KEY]); // 'private value' (but only if you have the symbol reference)

// Symbol properties are not included in for...in loops
for (let key in instance) {
  console.log(key); // Nothing will be logged
}
```

### Well-known Symbols

JavaScript has built-in symbols that allow you to customize object behavior:

```javascript
class MyArrayLike {
  constructor(...elements) {
    this.elements = elements;
  }

  // Custom iterator
  *[Symbol.iterator]() {
    for (let element of this.elements) {
      yield element;
    }
  }

  // Custom string representation
  [Symbol.toStringTag] = 'MyArrayLike';
}

const myArray = new MyArrayLike(1, 2, 3);
console.log([...myArray]); // [1, 2, 3]
console.log(Object.prototype.toString.call(myArray)); // [object MyArrayLike]
```
