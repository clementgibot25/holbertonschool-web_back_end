# Python Type Annotations and Type Checking

## Table of Contents
- [Type Annotations in Python 3](#type-annotations-in-python-3)
- [Function Signatures and Variable Types](#function-signatures-and-variable-types)
- [Duck Typing in Python](#duck-typing-in-python)
- [Validating Code with mypy](#validating-code-with-mypy)

## Type Annotations in Python 3

Type annotations in Python 3 allow you to explicitly specify the expected types of variables, function parameters, and return values. These annotations are optional and don't affect runtime behavior but provide several benefits:

- Improved code readability
- Better IDE support with autocompletion
- Early detection of potential type-related bugs
- Better documentation

### Basic Type Annotations

```python
# Variable annotations
name: str = "John"
age: int = 30
height: float = 1.85
is_student: bool = False

# Collections
from typing import List, Dict, Tuple, Set, Optional

names: List[str] = ["Alice", "Bob", "Charlie"]
ages: Dict[str, int] = {"Alice": 25, "Bob": 30}
coordinates: Tuple[float, float] = (40.7128, -74.0060)
unique_numbers: Set[int] = {1, 2, 3, 4, 5}

# Optional type (can be None)
middle_name: Optional[str] = None
```

## Function Signatures and Variable Types

### Function Annotations

```python
def greet(name: str, age: int) -> str:
    return f"Hello {name}, you are {age} years old."

# With default values
def calculate_total(price: float, quantity: int = 1, discount: float = 0.0) -> float:
    return price * quantity * (1 - discount)

# Using type aliases
from typing import List, Tuple

Vector = List[float]
Point = Tuple[float, float]

def scale(scalar: float, vector: Vector) -> Vector:
    return [scalar * num for num in vector]

def distance(p1: Point, p2: Point) -> float:
    return ((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2) ** 0.5
```

## Duck Typing in Python

Duck typing is a programming concept where the type or class of an object is less important than the methods and properties it defines. The name comes from the saying: "If it looks like a duck, swims like a duck, and quacks like a duck, then it probably is a duck."

### Example of Duck Typing

```python
class Duck:
    def quack(self):
        return "Quack!"
    def fly(self):
        return "Flying high!"

class Person:
    def quack(self):
        return "I'm quacking like a duck!"
    def fly(self):
        return "I'm flapping my arms!"

def make_it_quack(duck_like_object):
    print(duck_like_object.quack())

duck = Duck()
person = Person()

make_it_quack(duck)    # Output: Quack!
make_it_quack(person)  # Output: I'm quacking like a duck!
```

### Type Hints with Duck Typing

You can use `typing.Protocol` to define interfaces for duck typing:

```python
from typing import Protocol

class Quackable(Protocol):
    def quack(self) -> str: ...
    def fly(self) -> str: ...

def make_it_quack(duck: Quackable) -> None:
    print(duck.quack())
    print(duck.fly())
```

## Validating Code with mypy

mypy is a static type checker for Python that helps catch type-related errors before runtime.

### Installation

```bash
pip install mypy
```

### Basic Usage

1. Create a Python file (e.g., `example.py`) with type annotations:

```python
# example.py
def add(a: int, b: int) -> int:
    return a + b

result = add(5, "hello")  # This will cause a mypy error
```

2. Run mypy on the file:

```bash
mypy example.py
```

### Common mypy Commands

```bash
# Check a single file
mypy example.py

# Check a directory
mypy my_package/

# Show errors even if imports are missing
mypy --ignore-missing-imports example.py

# Follow imports
mypy --follow-imports=error example.py

# Enable strict mode (more thorough checking)
mypy --strict example.py
```

### mypy Configuration

Create a `mypy.ini` or `.mypy.ini` file in your project root:

```ini
[mypy]
python_version = 3.8
warn_return_any = True
warn_unused_configs = True
disallow_untyped_defs = True
check_untyped_defs = True
no_implicit_optional = True
```

### Common Type Checking Scenarios

```python
from typing import List, Optional, Union, Any, Dict, Tuple

# Optional types
def get_user_name(user_id: int) -> Optional[str]:
    if user_id == 1:
        return "admin"
    return None

# Union types
def process_data(data: Union[str, bytes]) -> None:
    if isinstance(data, str):
        print("Processing string")
    else:
        print("Processing bytes")

# Type variables for generic functions
from typing import TypeVar, Generic, List

T = TypeVar('T')

def first_item(items: List[T]) -> T:
    return items[0]

# Using Any (use sparingly)
def log_data(data: Any) -> None:
    print(f"Logging: {data}")
```

### Adding Type Stubs for External Libraries

For better type checking with third-party libraries, you can use type stubs:

```bash
pip install types-requests  # For the requests library
```

Or create your own stub files (`.pyi` files) for libraries that don't have type hints.

## Conclusion

Type annotations and static type checking with mypy can significantly improve code quality and maintainability. While Python remains a dynamically typed language, these tools help catch potential bugs early and make the code more self-documenting and easier to work with in modern IDEs.