import React, { useEffect, useState } from "react";
import PostForm from "../PostForm";
import { useParams } from "react-router-dom";
import database_Service from "../../Backend/DataBase_Config";

function EditPost() {
  const [post, setPost] = useState("");
  const { slug } = useParams();

  useEffect(() => {
    database_Service.getPost(slug).then((postData) => setPost(postData));
  }, []);


  return post?(
    <div className="w-full ">
      <PostForm post={post} />
    </div>
  ) : <h1>
    Post Loading.....
  </h1>
}

export default EditPost;
