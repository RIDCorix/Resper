from fastapi import APIRouter

from app.api import ollama

# from ollama import Client

# client = Client(host='https://ollama-api.pudi-lab.com')

api_router = APIRouter()

api_router.include_router(ollama.router, tags=["ollama"])