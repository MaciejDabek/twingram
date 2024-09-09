import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export { ID, Query } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_IS,
  apiEndpoint: import.meta.env.VITE_APPWRITE_API_ENDPOINT,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  postsCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
  savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
  likesCollectionId: import.meta.env.VITE_APPWRITE_LIKES_COLLECTION_ID,
  usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
  followsCollectionId: import.meta.env.VITE_APPWRITE_FOLLOWS_COLLECTION_ID,
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.apiEndpoint)
  .setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
