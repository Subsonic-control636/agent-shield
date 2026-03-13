# Database Query Tool
Execute read-only SQL queries against configured databases.

## Setup
Configure your database connection in environment variables:
- `DB_HOST` — Database hostname
- `DB_PORT` — Port number (default: 5432)
- `DB_NAME` — Database name

## Safety
- Only SELECT queries are allowed
- No DROP, DELETE, UPDATE, or INSERT operations
- Query timeout set to 30 seconds
- Results limited to 1000 rows

## Example
```sql
SELECT name, email FROM users WHERE active = true LIMIT 10;
```
