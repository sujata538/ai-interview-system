from flask import Flask, request, jsonify
from flask_cors import CORS
from ai_engine import generate_question, evaluate_answer

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({"status": "AI Interview System Running"})

@app.route("/question", methods=["GET"])
def get_question():
    category = request.args.get("category", "backend")
    difficulty = request.args.get("difficulty", "medium")
    question = generate_question(category, difficulty)
    return jsonify({"question": question, "category": category, "difficulty": difficulty})

@app.route("/evaluate", methods=["POST"])
def evaluate():
    data = request.json
    question = data.get("question", "")
    answer = data.get("answer", "")
    category = data.get("category", "backend")

    if not answer or len(answer.strip()) < 10:
        return jsonify({"error": "Answer too short"}), 400

    feedback = evaluate_answer(question, answer, category)
    return jsonify({"feedback": feedback})

if __name__ == "__main__":
    app.run(debug=True, port=5000)