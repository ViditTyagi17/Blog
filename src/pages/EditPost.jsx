import React from "react";
import { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import service from "../appwrite/config";
import { useParams, useNavigate } from "react-router-dom";
function EditPost() {
  const [editPost, setEditPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    service.getPost(slug).then((post) => {
      if (post) {
        setEditPost(post);
      } else {
        navigate("/");
      }
    });
  }, [slug,navigate]);

  return editPost ? (
    <div className="px-8">
      <Container>
        <PostForm post={editPost} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
