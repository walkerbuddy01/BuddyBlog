import React, { useState } from "react";
import { Container, PostCard } from "../index";
import database_Service from "../../Backend/DataBase_Config";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const [Posts, setPosts] = useState(null);
  database_Service.getAllPost().then((posts) => setPosts(posts.documents));
  const userStatus = useSelector((state) => state.auth.login);

  if (!userStatus) {
    return (
      <Container classname=" w-full h-[70vh] bg-red-600/20 flex justify-center items-center">
        <h1 className="text-red-600 text-3xl font-semibold">
          Please Login First to see posts!
          <Link className="font-bold underline text-blue-600 " to={`/login`}>
            {" "}
            Login
          </Link>
        </h1>
      </Container>
    );
  }

  return Posts ? (
    <Container
      classname=" w-full "
      style={{ backgroundImage: "url(src/assests/home-page.jpg)" }}
    >
      <div className=" bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-40 border border-gray-400 bg-gray-800 w-full h-full">
        <h1 className="text-white text-[9vh] font-semibold text-center">Posts</h1>
        <div className="flex flex-wrap gap-6 justify-center  p-5">
          {Posts.map((post) => (
            
            <div key={post.$id} className="w-[20%]">
               <PostCard post={post}/>
            </div>
            

            
          ))}
        </div>
      </div>
    </Container>
  ) : (
    <h1>Posts Loading.....</h1>
  );
}

export default Home;
