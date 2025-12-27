 import React, { useState, useEffect } from "react";
 import service from "../appwrite/config";

import { PostCard, Container } from "../components";

// function AllPost() {
//   const [posts, setPosts] = useState([]);
//   useEffect(() => {
//     service.getPosts([]).then((posts) => {
//       if (posts) {
//         setPosts(posts.documents);
//       }
//     });
//   }, []);
   
//   return (
//     <div className="py-8">
//       <Container>
//         <div className="flex flex-wrap">
//           {posts.map((post) => {
//             return (
//               <div key={post.$id} className="p-2 w-1/4">
//                 <PostCard {...post} />
//               </div>
//             );
//           })}
//         </div>
//       </Container>
//     </div>
//   );
// }

// export default AllPost;


function AllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getPosts([]).then((response) => {
      console.log("Get posts response:", response);
      if (response && response.rows) {
        setPosts(response.rows);
      } else {
        setPosts([]); // fallback to empty array
      }
    }).catch((err) => {
      console.error("Error fetching posts:", err);
      setPosts([]);
    });
  }, []);

  return (
    <div className="py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </Container>
    </div>
  );
}
export default AllPost;