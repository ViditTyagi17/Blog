import React from "react";
import service from "../appwrite/config";
import { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Query } from "appwrite";

function Home() {
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.auth);
  useEffect(() => {
    service
      .getPosts([Query.limit(3), Query.orderDesc("$createdAt")])
      .then((posts) => {
        if (posts) {
          // setPosts(posts.documents);
          setPosts(posts?.rows ?? []);
        }
      });
  }, []);

  if (!user) {
    return (
      <div className="py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Plase Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                No posts available
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className=" w-full py-8 ">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
