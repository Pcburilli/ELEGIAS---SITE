from flask import Flask, render_template, request, redirect, session, jsonify
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/wiki')
def wiki():
    return render_template('wiki.html')

if __name__ == '__main__':
    app.run(debug=True, host='::', port=5000)