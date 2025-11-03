import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function NewBlog({ error, loading, setError, setLoading }) {

    let newID = 0;
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [blogs, setBlogs] = useState([]);
    

    const handlePost = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch("http://127.0.0.1:5000/add_blog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
                author: author,
                content: content
            })
        }).then(res => res.json())
            .then(() => setBlogs(prev => [...prev, { id: newID++, title: title, author: author, content: content }]))
            .catch(err => setError(err))
            .finally(() => {
                setLoading(false);
                navigate("/blog");
            })
    }

    if(loading) {
        return <h1 className="text-3xl text-center text-white font-bold">Loading...</h1>
    }
    if(error) {
        return <h1 className="text-3xl text-center text-white font-bold">Error: {error.message}</h1>
    }

    return (
        <div className="text-white mt-[100px] my-5">
            <form onSubmit={handlePost}>
                <fieldset className="form-field border-2 border-white p-5 rounded-xl">
                    <label>
                        Title
                        <div>
                            <input
                                className="inputs" 
                              value={title}
                              onChange={(e) => setTitle(e.target.value)} 
                              type="text" required/>
                        </div>
                        
                    </label>
                    <label>
                        Author
                        <div>
                            <input 
                            className="inputs"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)} 
                            type="text" required/>
                        </div>
                    </label>
                    <label>
                        Content
                        <div>
                            <textarea 
                            className="inputs second-input"
                            value={content}
                            onChange={(e) => setContent(e.target.value)} 
                            type="text" required/>
                        </div>
                    </label>

                    <div>
                        <button className="bg-blue-500 my-3 px-3 py-[2px] w-[130px] font-bold rounded-[7px]" type="submit">Post</button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}