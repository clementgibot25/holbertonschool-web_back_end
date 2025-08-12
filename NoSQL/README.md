# NoSQL Databases

## What is NoSQL?
NoSQL (Not Only SQL) is a database management approach that provides a mechanism for storage and retrieval of data that is modeled in means other than the tabular relations used in relational databases. NoSQL databases are designed to handle large volumes of structured, semi-structured, and unstructured data, and are known for their flexibility, scalability, and performance with large data sets.

## SQL vs NoSQL

### SQL (Relational Databases)
- Uses structured query language (SQL) for defining and manipulating data
- Data is stored in tables with predefined schemas
- Follows ACID properties (Atomicity, Consistency, Isolation, Durability)
- Best for complex queries and transactional applications
- Vertical scaling (adding more power to existing machines)
- Examples: MySQL, PostgreSQL, Oracle

### NoSQL (Non-relational)
- Schema-less data model
- Can handle unstructured and semi-structured data
- Horizontally scalable (adding more servers to handle load)
- High performance for large datasets
- Flexible data models (document, key-value, wide-column, graph)
- Examples: MongoDB, Cassandra, Redis, Neo4j

## What is ACID?
ACID is a set of properties that guarantee database transactions are processed reliably:

- **Atomicity**: Ensures that all operations within a transaction are completed successfully; otherwise, none of them are.
- **Consistency**: Ensures that a transaction brings the database from one valid state to another.
- **Isolation**: Ensures that concurrent transactions don't interfere with each other.
- **Durability**: Ensures that once a transaction has been committed, it remains committed even in the event of a system failure.

## What is Document Storage?
Document storage is a type of NoSQL database that stores data in documents (typically JSON, BSON, or XML) rather than tables with rows and columns. Each document contains key-value pairs or key-array pairs, or even nested documents. Document databases are particularly useful for storing, retrieving, and managing document-oriented information.

## NoSQL Database Types

1. **Document Stores**: Store data in documents (e.g., MongoDB, CouchDB)
2. **Key-Value Stores**: Simple key-value pairs (e.g., Redis, DynamoDB)
3. **Wide-Column Stores**: Store data in columns rather than rows (e.g., Cassandra, HBase)
4. **Graph Databases**: Store data in graph structures (e.g., Neo4j, ArangoDB)

## Benefits of NoSQL Databases

- **Scalability**: Designed to scale out using distributed clusters of hardware
- **Flexibility**: No fixed schema makes it easier to modify data structures
- **Performance**: Optimized for specific data models and access patterns
- **High Availability**: Built-in replication and fault tolerance
- **Handles Large Volumes of Data**: Efficiently manages big data and real-time web applications
- **Developer-Friendly**: Data structures align with modern programming languages

## Querying NoSQL Databases

Querying methods vary by database type:

### MongoDB (Document Store)
```javascript
// Find all documents in a collection
db.collection.find()

// Find with filter
db.collection.find({ status: "active" })

// Find one document
db.collection.findOne({ name: "John" })
```

### Redis (Key-Value Store)
```bash
# Get value by key
GET key

# Get multiple values
MGET key1 key2

# Get all keys matching a pattern
KEYS pattern
```

## CRUD Operations in NoSQL

### MongoDB Examples

#### Create (Insert)
```javascript
db.collection.insertOne({
  name: "John Doe",
  age: 30,
  email: "john@example.com"
})

// Insert multiple documents
db.collection.insertMany([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 35 }
])
```

#### Read (Query)
```javascript
// Find all
db.collection.find({})

// Find with conditions
db.collection.find({ age: { $gt: 21 } })

// Projection (select specific fields)
db.collection.find({}, { name: 1, email: 1 })
```

#### Update
```javascript
// Update one document
db.collection.updateOne(
  { name: "John" },
  { $set: { age: 31 } }
)

// Update multiple documents
db.collection.updateMany(
  { status: "inactive" },
  { $set: { status: "active" } }
)
```

#### Delete
```javascript
// Delete one document
db.collection.deleteOne({ name: "John" })

// Delete multiple documents
db.collection.deleteMany({ status: "inactive" })
```

## How to Use MongoDB

### Installation
1. Download MongoDB Community Server from [MongoDB's official website](https://www.mongodb.com/try/download/community)
2. Follow the installation instructions for your operating system
3. Start the MongoDB service

### Basic Commands

#### Start MongoDB Shell
```bash
mongosh
```

#### Show Databases
```javascript
show dbs
```

#### Use/Create Database
```javascript
use myDatabase
```

#### Create Collection
```javascript
db.createCollection("users")
```

#### Insert Document
```javascript
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  createdAt: new Date()
})
```

#### Find Documents
```javascript
// Find all users
db.users.find()

// Find with query
db.users.find({ name: "John Doe" })
```

#### Update Document
```javascript
db.users.updateOne(
  { name: "John Doe" },
  { $set: { email: "newemail@example.com" } }
)
```

#### Delete Document
```javascript
db.users.deleteOne({ name: "John Doe" })
```

### Indexing
```javascript
// Create an index
db.users.createIndex({ email: 1 })

// Create a unique index
db.users.createIndex({ email: 1 }, { unique: true })
```

### Aggregation
```javascript
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$customer", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } }
])
```

### Best Practices
1. Use appropriate data types
2. Create indexes for frequently queried fields
3. Design your schema according to your application's query patterns
4. Use embedded documents for data that is frequently accessed together
5. Consider read/write patterns when designing your database
6. Implement proper error handling and data validation
7. Regularly back up your data

## Resources
- [MongoDB Documentation](https://docs.mongodb.com/)
- [NoSQL Database Types Explained](https://www.mongodb.com/scale/types-of-nosql-databases)
- [MongoDB University](https://university.mongodb.com/)
- [The Little MongoDB Book](https://github.com/karlseguin/the-little-mongodb-book)
