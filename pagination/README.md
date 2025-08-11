# REST API Pagination Guide

This guide covers essential concepts and implementations of pagination in REST APIs, including basic pagination, HATEOAS, and deletion-resilient strategies.

## Table of Contents
1. [Introduction to Pagination](#introduction-to-pagination)
2. [Basic Pagination with `page` and `page_size`](#basic-pagination)
3. [HATEOAS and Hypermedia Pagination](#hateoas-and-hypermedia-pagination)
4. [Deletion-Resilient Pagination](#deletion-resilient-pagination)

## Introduction to Pagination

Pagination is a technique used to divide large datasets into smaller, more manageable chunks (pages) that can be requested and processed separately. This is crucial for:
- Improving API performance
- Reducing network load
- Enhancing user experience
- Managing server resources efficiently

## Basic Pagination

### Using `page` and `page_size` Parameters

The simplest form of pagination uses two query parameters:
- `page`: The page number to retrieve (1-based index)
- `page_size`: Number of items per page

**Example Request:**
```
GET /api/items?page=2&page_size=10
```

**Response:**
```json
{
  "items": [
    // Array of items (max: page_size)
  ],
  "total_items": 100,
  "total_pages": 10,
  "current_page": 2,
  "page_size": 10
}
```

### Implementation Considerations
- Always set a reasonable default `page_size` (e.g., 10-100 items)
- Enforce maximum `page_size` limits to prevent performance issues
- Document the default and maximum values in your API documentation
- Consider allowing clients to specify their preferred `page_size`

## HATEOAS and Hypermedia Pagination

HATEOAS (Hypermedia as the Engine of Application State) enhances APIs by including hypermedia links that indicate available actions and related resources.

**Example Response with HATEOAS:**
```json
{
  "items": [
    // Array of items
  ],
  "_links": {
    "self": {
      "href": "/api/items?page=2&page_size=10"
    },
    "first": {
      "href": "/api/items?page=1&page_size=10"
    },
    "prev": {
      "href": "/api/items?page=1&page_size=10"
    },
    "next": {
      "href": "/api/items?page=3&page_size=10"
    },
    "last": {
      "href": "/api/items?page=10&page_size=10"
    }
  },
  "page": {
    "number": 2,
    "size": 10,
    "total_elements": 100,
    "total_pages": 10
  }
}
```

### Benefits of HATEOAS Pagination
- Clients don't need to construct URLs
- Self-documenting API navigation
- Easier API evolution (URLs can change without breaking clients)
- Better discoverability of related resources

## Deletion-Resilient Pagination

Traditional offset-based pagination can miss or duplicate items when data is being modified. Here are two approaches to handle this:

### 1. Cursor-Based Pagination
Use a unique, sequential identifier (cursor) instead of page numbers.

**Request:**
```
GET /api/items?cursor=abc123&limit=10
```

**Response:**
```json
{
  "items": [
    // Array of items
  ],
  "next_cursor": "def456",
  "has_more": true
}
```

### 2. Time-Based Pagination
Use timestamps for time-ordered data.

**Request:**
```
GET /api/items?created_after=2023-01-01T00:00:00Z&limit=10
```

### Benefits of Deletion-Resilient Pagination
- No missing or duplicate items during pagination
- Consistent results even with frequent data modifications
- Better performance for large datasets
- Works well with real-time data

## Best Practices

1. **Consistent Response Format**: Maintain the same structure across all paginated endpoints
2. **Metadata**: Include useful metadata like total counts and page information
3. **Sorting**: Allow clients to specify sort order
4. **Rate Limiting**: Implement rate limiting for paginated endpoints
5. **Caching**: Consider caching strategies for frequently accessed pages
6. **Documentation**: Clearly document your pagination approach and parameters

## Implementation Example (Python/Flask)

```python
from flask import jsonify, request

def get_items():
    page = request.args.get('page', 1, type=int)
    page_size = min(request.args.get('page_size', 10, type=int), 100)
    
    # Calculate pagination
    items = Item.query.order_by(Item.id)
    paginated_items = items.paginate(page=page, per_page=page_size, error_out=False)
    
    return jsonify({
        'items': [item.serialize() for item in paginated_items.items],
        'page': page,
        'page_size': page_size,
        'total_items': paginated_items.total,
        'total_pages': paginated_items.pages,
        'has_next': paginated_items.has_next,
        'has_prev': paginated_items.has_prev
    })
```

## Conclusion

Choosing the right pagination strategy depends on your specific use case. For most applications, a combination of basic pagination with HATEOAS links provides a good balance of simplicity and functionality. For data that changes frequently, consider implementing cursor-based or time-based pagination to ensure consistency.
