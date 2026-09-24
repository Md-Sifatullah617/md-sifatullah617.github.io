import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { posts } from "../data/posts";
import "../assets/styles/Article.scss";

function BlogPost() {
    const { slug } = useParams();
    const post = posts.find((p) => p.slug === slug);

    useEffect(() => {
        document.title = post ? `${post.title} — Md Sifatullah` : "Post not found — Md Sifatullah";
    }, [post]);

    if (!post) {
        return (
            <div className="container">
                <div className="items-container article">
                    <Link to="/blog" className="back-link">&larr; Back to blog</Link>
                    <h1>Post not found</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="items-container article">
                <Link to="/blog" className="back-link">&larr; Back to blog</Link>
                <h1>{post.title}</h1>
                <p>{post.date}</p>
                {post.content}
            </div>
        </div>
    );
}

export default BlogPost;
