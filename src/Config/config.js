

const config = {
  appwriteURL: import.meta.env.VITE_APPWRITE_URL,
  appwriteProjectID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  appwriteDatabaseID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  appwriteCollectionID: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
  appwriteBucketID: import.meta.env.VITE_APPWRITE_BUCKET_ID,
  TinyMCEKey: import.meta.env.VITE_TINY_MCE_APIKEY,
};

export default config;
