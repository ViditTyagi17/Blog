import React, { useState, useEffect } from "react";
import service from "../appwrite/config";

import { PostCard, Container } from "../components";

function AllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service
      .getPosts([])
      .then((response) => {
        console.log("Get posts response:", response);
        if (response && response.rows) {
          setPosts(response.rows);
        } else {
          setPosts([]); // fallback to empty array
        }
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setPosts([]);
      });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.$id} {...post} />)
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </Container>
    </div>
  );
}
export default AllPost;
