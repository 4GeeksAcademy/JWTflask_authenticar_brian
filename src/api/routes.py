"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import bcrypt
from datetime import timedelta


api = Blueprint('api', __name__, url_prefix='/api')

# Allow CORS requests to this API
CORS(api)


@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "User already exists"}), 400
    
    salt = bcrypt.gensalt(rounds=12)
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)

    user = User.create_user(
        email=email, password=hashed_password.decode('utf-8'))
    if user is None:
        return jsonify({"msg": "Not Found"}), 400
    
    return jsonify(user.serialize()), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400
    
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "Incorrect Credentials"}), 401
    
    if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({"msg": "Incorrect Credentials"}), 401
    
    token = create_access_token(identity=str(
        user.id), expires_delta=timedelta(hours=1))
    return jsonify({"token": token, "user": user.serialize()}), 200




@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200