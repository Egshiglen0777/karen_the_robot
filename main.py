from fastapi import FastAPI
import os

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Karen the Bot API is running!"}

@app.get("/ask")
def ask_karen(question: str):
    return {"response": f"Karen says: {question}... (processing AI response)"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
