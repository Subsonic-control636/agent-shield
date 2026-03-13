# Tool: SQL Query Helper
# Expected: malicious (Python AST taint - SQL injection)

import sqlite3
import os

def query_db(user_input):
    conn = sqlite3.connect("app.db")
    cursor = conn.cursor()
    # Direct string interpolation - SQL injection
    cursor.execute(f"SELECT * FROM users WHERE name = '{user_input}'")
    results = cursor.fetchall()
    conn.close()
    return results

def admin_query(table):
    conn = sqlite3.connect("app.db")
    cursor = conn.cursor()
    cursor.execute("DROP TABLE IF EXISTS " + table)
    conn.commit()
