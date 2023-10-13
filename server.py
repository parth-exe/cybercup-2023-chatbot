# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import ask_bot  # Import your chatbot logic here

app = Flask(__name__)
CORS(app)

@app.route('/answer', methods=['POST'])
def post_question():
    try:
        data = request.get_json()
        print(data)
        query = data.get('question')
        answer = ask_bot(query=query)
        return jsonify({'status': 'success', 'answer': answer})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
