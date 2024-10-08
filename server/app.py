from flask import Flask, request, send_file, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
import os
import io
from flask_cors import CORS
from textClustering import text_clustering
from pdf2image import convert_from_path, convert_from_bytes  # type: ignore
from pdf2image.exceptions import (  # type: ignore
    PDFInfoNotInstalledError,
    PDFPageCountError,
    PDFSyntaxError,
)

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
PROCESSED_FOLDER = "processed"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "vaxtranslate-423905-15fcc3121322.json"

# Load database URL from .env file
# load_dotenv()
# DATABASE_URL = os.getenv("DATABASE_URL")

# Set up SQLAlchemy engine and session
# engine = create_engine(DATABASE_URL)
# db_session = scoped_session(sessionmaker(autocommit=False,
#                                          autoflush=False,
#                                          bind=engine))

# Optional: If you have a base class for your models, bind the engine to it
# Base = declarative_base()
# Base.query = db_session.query_property()

# @app.teardown_appcontext
# def shutdown_session(exception=None):
#     db_session.remove()


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route("/api/data", methods=["GET"])
def get_data():
    data = {"message": "Hello, API!", "status": "success"}
    return jsonify(data)


@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return "No file part", 400
    file = request.files["file"]
    if file.filename == "":
        return "No selected file", 400
    if file and (file.filename.endswith(".png") or file.filename.endswith(".pdf")):
        input_file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        output_file_path = os.path.join(PROCESSED_FOLDER, "processed_" + file.filename)
        file.save(input_file_path)

        # Process the file
        if file.filename.endswith(".png"):
            cis_formatted = text_clustering(input_file_path)
            print(cis_formatted)
            return cis_formatted
        elif file.filename.endswith(".pdf"):
            # Add PDF processing logic here
            # For example, you might convert the PDF to images and then process
            # each image, or extract text directly from the PDF.
            image = convert_from_path(input_file_path, fmt="png")
            image[0].save(f"converted_record.png", "PNG")

            cis_formatting = text_clustering(f"converted_record.png")
            # with open("result.png", "rb") as image_file:
            #     image_blob = image_file.read()
            # return send_file(
            #     io.BytesIO(image_blob),
            #     mimetype="image/png",
            #     as_attachment=True,
            #     download_name="processed_image.png",
            # )
            

        return "File processed successfully", 200
    else:
        return "File is not a PNG or PDF image", 400
    
if __name__ == "__main__":
    app.run(debug=True)
