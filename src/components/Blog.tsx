import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { posts } from "../data/posts";
import "../assets/styles/Article.scss";

function Blog() {
    useEffect(() => {
        document.title = "Blog — Md Sifatullah";
    }, []);

    return (
        <div className="container">
            <div className="items-container article">
                <h1>Blog</h1>
                {posts.length === 0 && <p>No posts yet — check back soon.</p>}
                {posts.map((post) => (
                    <div key={post.slug} style={{ marginBottom: "2em" }}>
                        <h2><Link to={`/blog/${post.slug}`}>{post.title}</Link></h2>
                        <p>{post.date}</p>
                        <p>{post.excerpt}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Blog;
