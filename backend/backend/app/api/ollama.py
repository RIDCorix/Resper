from typing import Any, List, Optional

from fastapi import APIRouter, HTTPException
from sqlalchemy import func, select
from starlette.responses import Response

from app.schemas.item import Item as ItemSchema
from app.schemas.item import ItemCreate, ItemUpdate

import asyncio
from ollama import AsyncClient

client = AsyncClient(host='https://ollama-api.pudi-lab.com')
router = APIRouter(prefix="/ollama")


@router.get("/a")
async def get_chat(
    input_text: str
) -> Any:
    response = await client.chat(
        model='Llama-3-Taiwan-8B-Instruct-Q8_0',
        messages=[
            { 'role': 'system', 'content': '請使用繁體中文回答 ' },
            { 'role': 'user', 'content': '「'+ input_text +'」請指出校園歧視的觀點並提供相關知識' }
        ])
    # print(response)
    return response['message']['content']

