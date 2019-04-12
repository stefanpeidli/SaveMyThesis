from flask import Flask, abort, request, Response
from flask_cors import CORS
from datetime import datetime
import json
import pymongo

import db

mongo_client = pymongo.MongoClient("mongodb://localhost:27017")
save_my_thesis_db = mongo_client["savemythesisdb"]
version_collection = save_my_thesis_db["versions"]

app = Flask(__name__)
CORS(app)

def data_to_response(response_data):
    json_response = json.dumps(response_data)
    response = Response(json_response, content_type = "application/json; charset=utf-8")
    response.headers.add("content-length", len(json_response))
    return response

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/history")
def fetchHistory():
    history = db.get_history(version_collection)
    response = data_to_response(history)
    response.status_code = 200
    return response

@app.route("/version/<version_id>")
def fetchVersion(version_id):
    version = db.get_version_by_id(version_collection, version_id)
    if version is None:
        response = data_to_response({})
        return response
    response = data_to_response(version)
    response.status_code = 200
    return response

@app.route("/version", methods=["POST"])
def postVersion():
    if not request.json:
        abort(400)
    request_json = request.get_json()
    version_dict = {
        "_id": datetime.now().strftime("%s"),
        "timestamp": datetime.now().strftime("%s"),
        "text": request_json["text"],
        "author": request_json["author"]
    }
    db.insert_version(version_collection, version_dict)
    response = data_to_response(version_dict)
    response.status_code = 200
    return response

if __name__ == "__main__":
    app.run()