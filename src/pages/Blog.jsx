import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";

export default function Blog({ data, setData, error, setError, loading, setLoading }) {
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true);
        fetch("http://127.0.0.1:5000/")
            .then(response => response.json())
            .then(data => setData(data))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <h1 className="text-3xl text-center text-white font-bold">Loading...</h1>
    }

    if (error) {
        return <h1 className="text-3xl text-center text-white font-bold">Error: {error.message}</h1>
    }


    return (
        <div className="text-white">
            <button 
            onClick={() => navigate("/new-blog")} 
            type="button" 
            className="bg-blue-500 mt-5
            mb-5 px-3 py-[2px] w-[130px] font-bold rounded-[7px]"
            >Add Blog</button>
            {data.map((info) => (
                <div 
                    className="border-2 border-blue-500 mb-10 p-3 rounded-xl"
                    key={info.id}>
                    <h2 className="text-3xl font-bold my-3">{info.title}</h2>
                    <hr />
                    <h3 className="text-[1.2rem] my-3">Written by <span className="font-bold">{info.author}</span></h3>
                    <hr />
                    <p className="my-3">{info.content}</p>
                </div>
            ))}
        </div>
    )
}