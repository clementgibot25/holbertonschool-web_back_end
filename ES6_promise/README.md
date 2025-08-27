# JavaScript Promises: A Comprehensive Guide

## Table of Contents
1. [What are Promises?](#what-are-promises)
2. [Creating Promises](#creating-promises)
3. [Promise Methods](#promise-methods)
   - [then()](#then-method)
   - [catch()](#catch-method)
   - [finally()](#finally-method)
4. [Promise Static Methods](#promise-static-methods)
   - [Promise.all()](#promiseall)
   - [Promise.race()](#promiserace)
   - [Promise.allSettled()](#promiseallsettled)
   - [Promise.any()](#promiseany)
   - [Promise.resolve()](#promiseresolve)
   - [Promise.reject()](#promisereject)
5. [Error Handling](#error-handling)
   - [try/catch with async/await](#trycatch-with-asyncawait)
   - [Error Propagation](#error-propagation)
6. [Async/Await](#asyncawait)
   - [Async Functions](#async-functions)
   - [The await Operator](#the-await-operator)
7. [Common Patterns](#common-patterns)

## What are Promises?
A Promise is an object representing the eventual completion or failure of an asynchronous operation. It's a way to handle asynchronous operations more elegantly than callbacks.

### Why use Promises?
- Avoid callback hell (nested callbacks)
- Better error handling
- Chain asynchronous operations
- More readable and maintainable code

### States of a Promise
- **Pending**: Initial state, neither fulfilled nor rejected
- **Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed

## Creating Promises

```javascript
const myPromise = new Promise((resolve, reject) => {
  // Asynchronous operation here
  const success = true; // Simulating operation result
  
  if (success) {
    resolve('Operation succeeded!');
  } else {
    reject(new Error('Operation failed!'));
  }
});
```

## Promise Methods

### then() Method
Used to handle a fulfilled promise.

```javascript
myPromise
  .then((result) => {
    console.log(result); // 'Operation succeeded!'
  });
```

### catch() Method
Used to handle a rejected promise.

```javascript
myPromise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });
```

### finally() Method
Runs regardless of the promise's outcome.

```javascript
myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => {
    console.log('Operation completed (success or failure)');
  });
```

## Promise Static Methods

### Promise.all()
Waits for all promises to resolve or any to reject.

```javascript
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log(values); // [3, 42, 'foo']
  });
```

### Promise.race()
Returns a promise that fulfills or rejects as soon as one of the promises fulfills or rejects.

```javascript
const promise1 = new Promise((resolve) => 
  setTimeout(resolve, 500, 'one'));
const promise2 = new Promise((resolve) => 
  setTimeout(resolve, 100, 'two'));

Promise.race([promise1, promise2]).then((value) => {
  console.log(value); // 'two' (faster)
});
```

### Promise.allSettled()
Waits until all promises have settled (each may fulfill or reject).

```javascript
const promise1 = Promise.resolve(3);
const promise2 = new Promise((_, reject) => 
  setTimeout(reject, 100, 'foo'));

Promise.allSettled([promise1, promise2])
  .then((results) => {
    results.forEach((result) => console.log(result.status));
    // 'fulfilled', 'rejected'
  });
```

### Promise.any()
Resolves when any of the promises fulfill, or rejects if all promises reject.

```javascript
const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => 
  setTimeout(resolve, 100, 'quick'));
const promise3 = new Promise((resolve) => 
  setTimeout(resolve, 500, 'slow'));

Promise.any([promise1, promise2, promise3])
  .then((value) => {
    console.log(value); // 'quick'
  });
```

### Promise.resolve()
Returns a resolved promise with the given value.

```javascript
const resolvedPromise = Promise.resolve('Resolved value');
resolvedPromise.then(value => console.log(value)); // 'Resolved value'
```

### Promise.reject()
Returns a rejected promise with the given reason.

```javascript
const rejectedPromise = Promise.reject(new Error('Failed'));
rejectedPromise.catch(error => console.error(error)); // Error: Failed
```

## Error Handling

### try/catch with async/await

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    console.log('Fetch attempt finished');
  }
}
```

### Error Propagation
Errors in promises automatically propagate down the chain.

```javascript
doSomething()
  .then(result => doSomethingElse(result))
  .then(newResult => doThirdThing(newResult))
  .catch(error => console.error('Something went wrong:', error));
```

## Async/Await

### Async Functions
An async function always returns a promise.

```javascript
async function myAsyncFunction() {
  return 'Hello, World!';
}

// Equivalent to:
function myAsyncFunction() {
  return Promise.resolve('Hello, World!');
}
```

### The await Operator
Can only be used inside async functions.

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-throw if needed
  }
}
```

## Common Patterns

### Sequential Execution

```javascript
async function processInSequence() {
  const result1 = await asyncOperation1();
  const result2 = await asyncOperation2(result1);
  return result2;
}
```

### Parallel Execution

```javascript
async function processInParallel() {
  const [result1, result2] = await Promise.all([
    asyncOperation1(),
    asyncOperation2()
  ]);
  return { result1, result2 };
}
```

### Error Handling in Parallel

```javascript
async function handleMultipleOperations() {
  try {
    const [result1, result2] = await Promise.all([
      asyncOperation1().catch(error => ({
        error: error.message,
        from: 'operation1'
      })),
      asyncOperation2().catch(error => ({
        error: error.message,
        from: 'operation2'
      }))
    ]);
    
    // Process results
    console.log(result1, result2);
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}
```

This guide covers the fundamentals of Promises and async/await in JavaScript. Practice these concepts to master asynchronous programming in JavaScript!
