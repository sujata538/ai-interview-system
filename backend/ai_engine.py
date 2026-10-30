from groq import Groq
from dotenv import load_dotenv
import os
import json

load_dotenv()
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

CATEGORIES = {
    "dsa": "Data Structures & Algorithms",
    "system_design": "System Design",
    "backend": "Backend Development",
    "frontend": "Frontend Development",
    "behavioral": "Behavioral & HR"
}

def generate_question(category="backend", difficulty="medium"):
    category_name = CATEGORIES.get(category, "Software Engineering")

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        max_tokens=300,
        messages=[
            {
                "role": "user",
                "content": f"Generate exactly one {difficulty} level technical interview question for {category_name}. Return ONLY the question, no numbering, no explanation, no extra text."
            }
        ]
    )
    return response.choices[0].message.content.strip()

def evaluate_answer(question, answer, category="backend"):
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        max_tokens=600,
        messages=[
            {
                "role": "user",
                "content": f"""You are an expert technical interviewer. Evaluate this interview answer strictly and professionally.

Question: {question}
Answer: {answer}
Category: {CATEGORIES.get(category, "Software Engineering")}

Respond ONLY with a valid JSON object in this exact format, no markdown, no explanation:
{{
  "score": <number 1-10>,
  "verdict": "<Excellent|Good|Average|Poor>",
  "strengths": "<one sentence about what was good>",
  "improvements": "<one sentence about what to improve>",
  "ideal_points": "<2-3 key points the answer should have covered>"
}}"""
            }
        ]
    )

    raw = response.choices[0].message.content.strip()
    return json.loads(raw)