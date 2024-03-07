import React from "react";
import {Container} from "./index";
import database_Service from "../Backend/DataBase_Config";
import { Link } from "react-router-dom";

function PostCard({post}) {
  return (
    <Link to={`/post/${post.$id}`}>
    <Container>
      <div className="w-full bg-purple-600  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-purple-400 p-3 rounded-lg">
        <div>
          <img src={database_Service.getFilePreview(post.featuredImage,240)} alt={post.title} />
        </div>
        <h5 className="text-white font-semibold">
            Title : {post.title}
        </h5>
      </div>
    </Container>
    </Link>
  );
}

export default PostCard;
