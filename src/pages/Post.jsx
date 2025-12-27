import  { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
function Post() {
  const [post, setPost] = useState();
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.auth.userData);
  const {slug} = useParams();

  const isAuthor = post && userdata ? userdata.$id === post.userID : false;

  useEffect(() => {
    if (slug) {
       service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          console.log("userdata:", userdata);
console.log("post:", post);

        }
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = async () => {
    try {
      const status = await service.deletePost(post.$id);
      if (status) {
        await service.deletFile(post.featuredImage);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };




return post ? (
  <div className="py-10">
    <Container>
      {/* BLOG WRAPPER */}
      <div className="max-w-3xl mx-auto  px-4 sm:px-6 md:px-8 rounded-xl shadow-md dark:bg-neutral-800 dark:text-gray-100 bg-white">

        {/* FEATURED IMAGE */}
        <div className="w-full p-5  flex justify-center bg-white dark:bg-neutral-800 rounded-xl overflow-hidden">
          <img
            src={service.getFileView(post.featuredImage)}
            alt={post.title}
           className="rounded-xl   object-contain max-h-[300px] sm:max-h-[400px] md:max-h-[500px]"

          />
        </div>

      

        {/* EDIT / DELETE BUTTONS */}
        {isAuthor && (
          <div className="flex justify-end mb-6 gap-3">
            <Link to={`/edit-post/${post.$id}`}>
              <Button className=" bg-green-400 hover:bg-green-600 text-sm font-medium">
                Edit
              </Button>
            </Link>
            <Button onClick={deletePost} className=" bg-red-400 hover:bg-red-600 text-sm font-medium">
              Delete
            </Button>
          </div>
        )}

        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-snug">
          {post.title}
        </h1>

        {/* CONTENT */}
        <div className="p-4 prose prose-lg max-w-none dark:prose-invert prose-p:mb-6 prose-headings:mb-4">
  {parse(post.content)}
</div>

      </div>
    </Container>
  </div>
) : null;
}
export default Post;


/*
Post Component Summary:

1. Reads the post ID (slug) from the URL using useParams().
2. Uses this ID to fetch the post data from the backend and stores it in state.
3. Once the post is loaded, it displays the post’s image, title, and HTML content.
4. Checks if the logged-in user is the author of the post.
   - If yes, shows Edit and Delete buttons.
   - Edit button navigates to the edit-post page.
   - Delete button deletes the post and its file from the backend, then redirects to home.
*/
