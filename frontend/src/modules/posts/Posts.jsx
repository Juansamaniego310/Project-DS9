import "../../style/posts.css";
import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Navbar from "../home/Navbar";
import Modal from "react-modal";
import Post from "./Post";
import { useAuth } from "../auth/authContex";

Modal.setAppElement("#root");

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostContent, setNewPostContent] = useState("");
    const [newPostImage, setNewPostImage] = useState({});
    const [previewImage, setPreviewImage] = useState("");
    const { user } = useAuth();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://localhost:3000/posts/posts`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Error fetching posts");
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewPostImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const imageBase64 = previewImage;

            const response = await fetch(`http://localhost:3000/posts/newposts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user.id,
                    title: newPostTitle,
                    content: newPostContent,
                    post_img: imageBase64,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error creating post");
            }

            const newPost = await response.json();
            setPosts([newPost, ...posts]); // Agregar el nuevo post al inicio de la lista
            setNewPostTitle("");
            setNewPostContent("");
            setPreviewImage("");
            closeModal();

        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="posts-header">
                <button className="create-post-button" onClick={openModal}>Crear Post</button>
            </div>
            <div className="posts-container">
                {posts.map((post) => (
                    <Post
                        key={post.id} // Asegúrate de que esta key sea única para cada post
                        title={post.title}
                        image={post.post_img}
                        content={post.content}
                        date={post.publish_date}
                        userName={post.user_name} // Mostrar el nombre de usuario del post
                    />
                ))}
            </div>

            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                contentLabel="Crear Post"
                className="ReactModal__Content"
                overlayClassName="ReactModal__Overlay"
            >
                <h2>Crear Post</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Título:
                        <input
                            type="text"
                            value={newPostTitle}
                            onChange={(e) => setNewPostTitle(e.target.value)}
                        />
                    </label>
                    <label>
                        Contenido:
                        <textarea value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} />
                    </label>
                    <label>
                        Imagen:
                        <input type="file" onChange={handleFileChange} />
                        {previewImage && (
                            <img
                                src={previewImage}
                                alt="Preview"
                                style={{ width: "100px", height: "100px" }}
                            />
                        )}
                    </label>
                    <div className="modal-buttons">
                        <button type="submit" className="save-button">Guardar</button>                       
                        <button type="button" className="cancel-button" onClick={closeModal}>Cancelar</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Posts;
