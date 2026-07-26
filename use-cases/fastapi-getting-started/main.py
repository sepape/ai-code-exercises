from fastapi import FastAPI

# Create a FastAPI instance - this is the core of your application
app = FastAPI(
    title="My First FastAPI App",
    description="A simple API built with FastAPI",
    version="0.1.0"
)

# Define a route using a decorator
# The @app.get("/") decorator tells FastAPI that the function below handles GET requests to the root path "/"
@app.get("/")
async def root():
    """
    Root endpoint that returns a simple greeting message
    Returns a JSON object with a welcome message
    """
    return {"message": "Hello World from FastAPI!"}

# Define another route with a path parameter
# Path parameters are variables in the path that are captured and passed to the function
@app.get("/items/{item_id}")
async def read_item(item_id: int):
    """
    Endpoint that returns information about a specific item

    Args:
        item_id (int): The ID of the item to retrieve

    Returns:
        JSON object with the item ID and a message
    """
    return {"item_id": item_id, "message": f"You requested item {item_id}"}

# Define a route with query parameters
# Query parameters are optional and are specified after the ? in the URL
@app.get("/search/")
async def search_items(q: str = None, skip: int = 0, limit: int = 10):
    """
    Endpoint that searches for items based on query parameters

    Args:
        q (str, optional): Search query
        skip (int, optional): Number of items to skip
        limit (int, optional): Maximum number of items to return

    Returns:
        JSON object with the search parameters and results
    """
    return {
        "query": q,
        "skip": skip,
        "limit": limit,
        "message": f"Searching for '{q}' (skipping {skip}, limiting to {limit})"
    }

# To run this app, use the command:
# uvicorn main:app --reload
#
# Then you can access:
# - http://127.0.0.1:8000/ for the root endpoint
# - http://127.0.0.1:8000/items/42 to get information about item 42
# - http://127.0.0.1:8000/search?q=test to search for "test"
# - http://127.0.0.1:8000/docs for the automatic interactive API documentation