import { Client, Databases, ID, Query, Storage } from "appwrite";
import config from "../Config/config";

class Database_Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client.setEndpoint(config.appwriteURL);
    this.client.setProject(config.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  //   create post
  async createPost({ title, slug, content, featuredImage, userId, Status }) {
    try {
      const postData = await this.databases.createDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          userId,
          Status,
        }
      );
      return postData;
    } catch (error) {
      throw error;
    }
  }

  // update post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      const updatedPostData = await this.databases.updateDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
      return updatedPostData;
    } catch (error) {
      throw error;
    }
  }

  //delete post
  async deletePost(fileID) {
    try {
      const deletePostData = await this.databases.deleteDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        fileID
      );
      return deletePostData;
    } catch (error) {
      throw deletePostData;
    }
  }

  //Get Post
  async getPost(fileID) {
    try {
      const postData = await this.databases.getDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        fileID
      );
      return postData;
    } catch (error) {
      throw error;
    }
  }

  async getAllPost() {
    try {
      const postsData = await this.databases.listDocuments(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
      
      );
      return postsData;
    } catch (error) {
      throw error;
    }
  }
  // Buckets
  async uploadImage(File) {
    const imageID = ID.unique();
    try {
      const featuredImageData = await this.storage.createFile(
        config.appwriteBucketID,
        imageID,
        File
      );
      return featuredImageData;
    } catch (error) {
      throw error;
    }
  }

  async updateImage(fileID,name) {
    try {
      const updateImageData = await this.storage.updateFile(
        config.appwriteBucketID,
        fileID,
        name
      );
      return updateImageData;
    } catch (error) {
      throw error;
    }
  }

  async deleteImage(FileID) {
    try {
      const deleteImageData = await this.storage.deleteFile(
        config.appwriteBucketID,
        FileID
      );
      return deleteImageData;
    } catch (error) {
      throw error;
    }
  }

  async getImage(FileID) {
    try {
      const featuredImageData = await this.storage.getFile(
        config.appwriteBucketID,
        FileID
      );
      return featuredImageData;
    } catch (error) {
      throw error;
    }
  }

   getFilePreview(fileId,quality) {
    try {
      const featuredImage = this.storage.getFilePreview(
        config.appwriteBucketID,
        fileId,
        quality
      );
      return featuredImage;
    } catch (error) {
      throw error;
    }
  }
}

const database_Service = new Database_Service();
export default database_Service;
