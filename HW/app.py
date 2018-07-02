import json
from flask import (
    Flask,
    render_template,
    jsonify,
    request)




app = Flask(__name__)


@app.route("/")
def home():
    return render_template("INDEX.HTML")

@app.route("/Cloudiness")
def cloud():
    return render_template("cloudiness.HTML")

@app.route("/Humidity")
def humid():
    return render_template("humidity.HTML")

@app.route("/Wind")
def wind():
    return render_template("wind.HTML")

@app.route("/Temp")
def home():
    return render_template("temp.HTML")


    
if __name__ == "__main__":
    app.run(debug=True)

