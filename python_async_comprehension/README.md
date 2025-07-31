# Python Asynchronous Generators and Comprehensions

This guide covers asynchronous generators, async comprehensions, and type annotations for generators in Python.

## Table of Contents
- [What is an Asynchronous Generator?](#what-is-an-asynchronous-generator)
- [How to Write an Asynchronous Generator](#how-to-write-an-asynchronous-generator)
- [How to Use Async Comprehensions](#how-to-use-async-comprehensions)
- [How to Type-Annotate Generators](#how-to-type-annotate-generators)

## What is an Asynchronous Generator?

An asynchronous generator is a special kind of Python function that generates a sequence of values asynchronously. It's defined using `async def` and contains one or more `yield` expressions. Unlike regular generators, asynchronous generators can `await` other coroutines during iteration.

Key characteristics:
- Defined with `async def` and contains `yield`
- Returns an asynchronous iterator
- Can use `async for` and `await`
- Memory efficient for large datasets
- Ideal for I/O-bound operations

## How to Write an Asynchronous Generator

Here's how to create and use an asynchronous generator:

```python
import asyncio

async def async_counter(limit):
    """Simple async generator that counts up to limit."""
    for i in range(limit):
        # Simulate I/O operation
        await asyncio.sleep(0.1)
        yield i

async def main():
    # Using the async generator
    async for number in async_counter(5):
        print(f"Got: {number}")

# Run the event loop
asyncio.run(main())
```

Key points:
1. Use `async def` to define the generator
2. Use `yield` to produce values
3. Can use `await` inside the generator
4. Must be iterated with `async for`

## How to Use Async Comprehensions

Python 3.6+ supports asynchronous comprehensions, which are list/dict/set comprehensions that can contain `async for` and `await` expressions.

### Basic Async List Comprehension

```python
import asyncio

async def fetch_data(x):
    await asyncio.sleep(0.1)  # Simulate I/O
    return x * 2

async def main():
    # Async list comprehension
    results = [await fetch_data(x) for x in range(5)]
    print(f"Results: {results}")
    # Output: Results: [0, 2, 4, 6, 8]

asyncio.run(main())
```

### Async Generator Expression

```python
import asyncio

async def async_gen():
    async for i in (x async for x in range(5)):
        yield i * 2

async def main():
    # Using async generator expression
    async for num in async_gen():
        print(f"Got: {num}")
        # Output: Got: 0, Got: 2, Got: 4, Got: 6, Got: 8

asyncio.run(main())
```

## How to Type-Annotate Generators

Python's typing module provides special types for type hinting generators and async generators.

### Regular Generator Type Hints

```python
from typing import Generator, AsyncGenerator, Iterator, AsyncIterator

def counter(n: int) -> Generator[int, None, None]:
    """
    A regular generator function.
    Generator[YieldType, SendType, ReturnType]
    """
    for i in range(n):
        yield i

# For Python 3.9+ you can use the simpler syntax
def counter_simple(n: int) -> Iterator[int]:
    for i in range(n):
        yield i
```

### Async Generator Type Hints

```python
from typing import AsyncGenerator, AsyncIterator

async def async_counter(n: int) -> AsyncGenerator[int, None]:
    """
    An async generator function.
    AsyncGenerator[YieldType, SendType]
    """
    for i in range(n):
        await asyncio.sleep(0.1)
        yield i

# For Python 3.9+ you can use the simpler syntax
async def async_counter_simple(n: int) -> AsyncIterator[int]:
    for i in range(n):
        await asyncio.sleep(0.1)
        yield i
```

### Type Checking with Mypy

To ensure your type hints are correct, you can use a type checker like mypy. Create a `mypy.ini` file:

```ini
[mypy]
python_version = 3.9
warn_return_any = True
disallow_untyped_defs = True
check_untyped_defs = True
no_implicit_optional = True
```

Then run:
```bash
mypy your_script.py
```

## Best Practices

1. **Use `async for`** to iterate over async generators
2. **Handle exceptions** properly in async generators
3. **Close generators** explicitly when done using `aclose()`
4. **Use type hints** for better code maintainability
5. **Document** your async generators with docstrings

## Resources
- [Python Documentation: Async/Await](https://docs.python.org/3/library/asyncio-task.html)
- [PEP 525 -- Asynchronous Generators](https://www.python.org/dev/peps/pep-0525/)
- [PEP 530 -- Asynchronous Comprehensions](https://www.python.org/dev/peps/pep-0530/)
- [Python Typing Documentation](https://docs.python.org/3/library/typing.html)
