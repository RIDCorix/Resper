from typing import Any

from fastapi import APIRouter


from ollama import AsyncClient

import re
client = AsyncClient(host='https://ollama-api.pudi-lab.com')
router = APIRouter(prefix="/ollama")


@router.get("/a")
async def get_chat(
    input_text: str
) -> Any:
    system = '請使用繁體中文回答。'
    user = '「'+ input_text +'」請指出校園歧視的觀點並提供相關知識'
# 處理input
    excp_words = {"1.35" : "「1.35」是一個對於原住民族群歧視的詞彙。"}
    excp_knowledge = ["「1.35」是一個對於原住民族群歧視的詞彙。"]
    for excp in excp_words:
        index = input_text.find(excp)
        # print(excp)
        if(index != -1):
            system = system + excp_words[excp]
# 輸出
    response = await client.chat(
        model='Llama-3-Taiwan-8B-Instruct-Q8_0',
        messages=[
            { 'role': 'system', 'content': system },
            { 'role': 'user', 'content': user }
        ])
    # print(response)
    return response['message']['content']

@router.get("/b")
async def get_short_long(
    input_text: str
) -> Any:
# 處理input
    # excp_words = {"1.35" : "「1.35」是一個對於原住民族群歧視的詞彙。"}
    # excp_knowledge = ["「1.35」是一個對於原住民族群歧視的詞彙。"]
    # for excp in excp_words:
    #     index = input_text.find(excp)
    #     # print(excp)
    #     if(index != -1){
    #         system = system + 
    #     }
    system = '''臺灣。請使用繁體中文回答。我將會對此句子提出五個問題，請回答這五個問題，並只回傳答案：
1.此句子是否帶有歧視意味? 只回答是或否。
2.此句子造成歧視意味的詞彙，只回答詞段，不要用引號。
3.簡短描述此句子的校園歧視問題，務必在 20 字以內。
4.以校園歧視的觀點提供此句子有關的相關知識，並至少回答60字。
5.將此句改成不帶歧視意味的句子。'''
    user = '「'+ input_text +'」'

# 輸出
    response = await client.chat(
        model='Llama-3-Taiwan-8B-Instruct-Q8_0',
        messages=[
            { 'role': 'system', 'content': system },
            { 'role': 'user', 'content': user }
        ],
        options={
            "raw": True
        })
    # print(response)
# 處理特殊字串
    rt = repr(response['message']['content'])
    rt = re.sub(r"\n|\\n|'|\\", "", rt)
    return rt