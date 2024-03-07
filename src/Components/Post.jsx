import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "./index";
import { useSelector } from "react-redux";
import database_Service from "../Backend/DataBase_Config";
import parse from "html-react-parser";

function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  let postData = null;
  useEffect(() => {
    const dataFetching = async () => {
      if (slug) {
        postData = await database_Service.getPost(slug);
        if (postData) {
          setPost(postData);
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };

    dataFetching();
  }, [slug, navigate]);
  const user = useSelector((state) => state.auth.userData);

  const isAuthor = post && user ? post.userId === user.$id : false;

  const deletePost = async () => {
    const imageDelete = database_Service.deleteImage(post.featuredImage);
    if (imageDelete) {
      const postDelete = database_Service.deletePost(post.$id);
      if (postDelete) {
        navigate("/");
      }
    }
  };

  return post ? (
    <div className="p-4 py-8 bg-slate-300 ">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2  h-1/2">
          <img
            src={database_Service.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute top-4 right-12 flex justify-between items-center  w-[15vw] h-[7vh] gap-3">
              <Link
                to={`/Edit-post/${slug}`}
                className="rounded-xl h-full bg-blue-600 w-1/2 flex justify-center text-white font-semibold"
              >
                <Button>Edit</Button>
              </Link>
              <Button
                onClick={deletePost}
                className="bg-yellow-600 h-full p-1 px-3 rounded-xl w-1/2 text-white font-semibold"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full ">
          <h2 className="text-2xl font-semibold ">
            <span className="font-bold text-3xl">Title:</span> {post.title}
          </h2>
          <p className="text-xl font-medium">{parse(post.content)}</p>
        </div>
      </Container>
    </div>
  ) : (
    <h1>post loading...</h1>
  );
}

export default Post;
