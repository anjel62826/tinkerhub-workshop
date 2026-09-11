from flask import Flask, render_template, request
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/upload", methods=["POST"])
def upload():

    if "file" not in request.files:
        return "❌ No file selected."

    file = request.files["file"]

    if file.filename == "":
        return "❌ No file selected."

    filename = secure_filename(file.filename)

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    file_path = os.path.join(
        UPLOAD_FOLDER,
        filename
    )

    file.save(file_path)

    # Get file size
    file_size = os.path.getsize(file_path)

    # Calculate Fart Potential Index
    fpi = min(100, (file_size // 50) + 15)

    return (
        f"🐘 NOM NOM! ELEPHANT.EXE ate {filename}! "
        f"💨 Fart Potential: {fpi}/100"
    )


if __name__ == "__main__":
    app.run(debug=True)