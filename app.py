import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config["SECRET_KEY"] = "b7f683cb6fda12538732bc135e479501a712f9b18ea9351a9f81bace1df4b084"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
db = SQLAlchemy(app)
Migrate(app, db)
CORS(app)

class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    title = db.Column(db.String, nullable=False)
    author = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Blog({self.id}, title={self.title}, author={self.author}, content={self.content})"


@app.route("/")
def index():
    blogs = Blog.query.all()
    blog_list = list()
    for blog in blogs:
        blog_list.append({
            "id": blog.id,
            "title": blog.title,
            "author": blog.author,
            "content": blog.content,
            "date_posted": blog.date_posted.isoformat()
        })

    return jsonify(blog_list)

@app.route("/add_blog", methods=["POST"])
def add():
    data = request.get_json()
    blog = Blog(title=data["title"], author=data["author"], content=data["content"])
    db.session.add(blog)
    db.session.commit()
    return jsonify({ "message": "Blog added successfully" }), 201

@app.route("/delete_blog/<int:id>", methods=["DELETE"])
def delete(id):
    blog = Blog.query.get_or_404(id)
    db.session.delete(blog)
    db.session.commit()
    return jsonify({ "message": "Blog deleted Successfully" }), 202

@app.route("/blog-post/<int:id>", methods=["GET"])
def blog_post(id):
    blog = Blog.query.get_or_404(id)
    blog_list = list()
    blog_list.append({
        "id": blog.id,
        "title": blog.title,
        "author": blog.author,
        "content": blog.content,
        "date_posted": blog.date_posted.isoformat()
    })
    return jsonify(blog_list)



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)