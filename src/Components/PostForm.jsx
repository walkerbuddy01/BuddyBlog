import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, InputBox, RTE } from "./index";
import { useForm } from "react-hook-form";
import database_Service from "../Backend/DataBase_Config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { data } from "autoprefixer";

function PostForm({ post }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { register, handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      Status: post?.Status || "",
    },
  });

  const userData = useSelector((state) => state.auth.userData);

  const slugTransform = useCallback((value = "") => {
    if (value && typeof value === "string") {
      const transformedValue = value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, "-");
      return transformedValue;
    } else {
      return value;
    }
  }, []);

  async function submitPost(data) {
    if (post) {
      const featuredImage = data.image[0]
        ? await database_Service.uploadImage(data.image[0])
        : null;
      // TODO fix this from after 500 appwrite issue solve const oldDeleted = await database_Service.deleteImage(post.featuredImage);
      if (featuredImage) {
        const updatedPost = await database_Service.updatePost(post.$id, {
          ...data,
          featuredImage: featuredImage.$id,
        });
        if (updatedPost) {
          const redirect = `/post/${updatedPost.$id}`;
          navigate(redirect);
        }
      }
    } else {
      const imageFile = await database_Service.uploadImage(data.image[0]);
      const featuredImage = imageFile.$id;
      const newPost = await database_Service.createPost({
        ...data,
        featuredImage,
        userId: userData.$id,
      });
      if (newPost) {
        const redirect = `/post/${newPost.$id}`;
        navigate(redirect);
      }
    }
  }

  const CancelHandler = () => {
    post ? navigate(`/post/${post.$id}`) : navigate("/");
  };

  return (
    <Container
      classname="w-full h-screen bg-slate-400 "
      style={{ backgroundImage: "url(src/assests/Add-post-edit.jpg)" }}
    >
      <form
        className=" flex bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border bg-gray-100/10"
        onSubmit={handleSubmit(submitPost)}
      >
        <div className="px-4 py-3 flex flex-col gap-3">
          <InputBox
            label="Title: "
            labelclass="text-xl font-semibold text-white"
            type="text"
            className={` rounded-md px-2 py-2 focus:outline-none text-sm w-full text-white bg-gray-700 focus:bg-sky-700/80 focus:border-sky-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-400 `}
            placeholder="Enter your blog title"
            {...register("title", {
              required: true,
            })}
          />
          <div className=" flex justify-around gap-6">
            <InputBox
              label="Slug: "
              labelclass="text-xl font-semibold text-white"
              type="text"
              className={` rounded-md px-2 py-2 focus:outline-none text-sm w-full text-white bg-gray-700 focus:bg-sky-700/80 focus:border-sky-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-400 `}
              placeholder="Enter your blog Slug"
              {...register("slug", {
                required: true,
              })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value));
              }}
            />
            <div className="flex flex-col w-1/2">
              <label className="font-semibold text-xl text-white">
                Status:
              </label>
              <select
                id=""
                className="w-full h-3/4 rounded-lg px-2 focus:outline-none font-medium"
                defaultValue="active"
                {...register("Status", {
                  required: true,
                })}
              >
                <option
                  value="active"
                  className="bg-green-700 font-medium text-white "
                >
                  Active
                </option>

                <option
                  value="inactive"
                  className="bg-red-700 font-medium text-white "
                >
                  In Active
                </option>
              </select>
            </div>
          </div>

          <RTE
            label={"Content : "}
            name={"content"}
            control={control}
            defaultvalue={getValues("content")}
          />
        </div>

        <div className="px-4 py-3 flex flex-col gap-3">
          <InputBox
            label="Image :"
            type="file"
            labelclass="text-xl font-semibold text-white"
            className="text-white"
            {...register("image", {
              required: true,
            })}
          />
          {post ? (
            <div>
              <img
                src={database_Service.getFilePreview(post.featuredImage, 250)}
                alt={post.title}
              />
            </div>
          ) : (
            <></>
          )}
          <Button
            type="submit"
            className={
              post
                ? `transition-all ease-linear border-2 border-orange-500 bg-orange-500/40 hover:bg-orange-500 p-2 text-lg font-semibold text-white rounded-xl active:border-orange-800 active:bg-orange-800 hover:shadow-xl hover:shadow-orange-300`
                : `transition-all ease-linear border-2 border-blue-500 bg-blue-500/20 hover:bg-blue-500 p-2 text-lg font-semibold text-white rounded-xl active:border-sky-800 active:bg-sky-800 hover:shadow-xl hover:shadow-sky-500`
            }
          >
            {post ? "Update Post" : "Post"}
          </Button>
          <Button
            onClick={CancelHandler}
            className={
              post
                ? `transition-all ease-linear border-2 border-orange-500 bg-orange-500/40 hover:bg-orange-500 p-2 text-lg font-semibold text-white rounded-xl active:border-orange-800 active:bg-orange-800 hover:shadow-xl hover:shadow-orange-300`
                : `transition-all ease-linear border-2 border-blue-500 bg-blue-500/20 hover:bg-blue-500 p-2 text-lg font-semibold text-white rounded-xl active:border-sky-800 active:bg-sky-800 hover:shadow-xl hover:shadow-sky-500`
            }
          >
            Cancel
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default PostForm;
