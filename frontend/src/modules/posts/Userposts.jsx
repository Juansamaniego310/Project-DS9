import "../../style/posts.css";
import React, { useEffect, useState } from "react";
import Post from "./Post";

const UserPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/userposts?userId=${userId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Error fetching user posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUserPosts();
  }, [userId]);

  return (
    <div className="posts-container">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            image={post.post_img}
            content={post.content}
            date={post.publish_date}
            userName={post.user_name}
          />
        ))
      ) : (
        <p>No has publicado ningún post.</p>
      )}
    </div>
  );
};

export default UserPosts;
