import "../../style/posts.css";
import React from "react";

const Post = ({ title, image, content, date, userName }) => {
    return (
        <div className="post">
            <img src={image} alt="Post Image" className="post-image" />
            <div className="post-content">
                <h3 className="post-title">{title}</h3>
                <p className="post-description">{content}</p>
                <div className="post-footer">
                    <span className="post-date">{new Date(date).toLocaleDateString()}</span>
                    <span className="post-user">{userName}</span>
                </div>
            </div>
        </div>
    );
};

export default Post;
