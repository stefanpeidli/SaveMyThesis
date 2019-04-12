from flask import Flask, abort, request
import json

app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello World!'

@app.route('/history')
def fetchHistory():
    return 'history'

@app.route('/version/<version_id>')
def fetchVersion(version_id):
    return 'version id, {}'.format(version_id)

@app.route('/version', methods=['POST'])
def postVersion():
    if not request.json:
        abort(400)
    return json.dumps(request.json)

if __name__ == '__main__':
    app.run()