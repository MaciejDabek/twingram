import { INewPost, IPost, IUpdatePost } from "../../types";
import { convertTagsToArray } from "../utils";
import { appwriteConfig, databases, ID, Query, storage } from "./config";

export async function apiCreatePost(post: INewPost) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      post.file[0]
    );

    if (!uploadedFile) {
      throw Error;
    }

    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      uploadedFile.$id
    );

    if (!fileUrl) {
      await storage.deleteFile(appwriteConfig.storageId, uploadedFile.$id);
      throw Error;
    }

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        creator: post.creatorId,
        caption: post.caption,
        imageUrl: fileUrl.href,
        imageId: uploadedFile.$id,
        location: post.location,
        tags: convertTagsToArray(post.tags),
      }
    );

    if (!newPost) {
      await storage.deleteFile(appwriteConfig.storageId, uploadedFile.$id);
      throw Error;
    }

    return newPost;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function apiUpdatePost(postId: string, post: IUpdatePost) {
  const updateData = {
    caption: post.caption,
    location: post.location,
    tags: convertTagsToArray(post.tags),
    imageId: post.imageId,
    imageUrl: post.imageUrl,
  };

  try {
    if (post.file.length) {
      const uploadedFile = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        post.file[0]
      );

      if (!uploadedFile) {
        throw Error;
      }

      const fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        uploadedFile.$id
      );

      if (!fileUrl) {
        await storage.deleteFile(appwriteConfig.storageId, uploadedFile.$id);
        throw Error;
      }

      updateData.imageId = uploadedFile.$id;
      updateData.imageUrl = fileUrl.href;
    }

    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
      updateData
    );

    if (!updatedPost && updateData.imageId !== post.imageId) {
      await storage.deleteFile(appwriteConfig.storageId, updateData.imageId);
      throw Error;
    }

    if (updateData.imageId !== post.imageId) {
      await storage.deleteFile(appwriteConfig.storageId, post.imageId);
    }

    return updatedPost;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function apiDeletePost(postId: string, imageId: string) {
  try {
    const res = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    );

    if (!res) {
      throw Error;
    }

    await storage.deleteFile(appwriteConfig.storageId, imageId);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function apiGetPostById(postId: string): Promise<IPost> {
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    );

    return post as IPost;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function apiGetRecentPosts(): Promise<IPost[]> {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );

    return posts.documents as IPost[];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function apiGetInfiniteRecentPosts({
  pageParam,
}: {
  pageParam: string;
}): Promise<IPost[]> {
  try {
    const queries = [Query.orderDesc("$createdAt"), Query.limit(10)];

    if (pageParam) queries.push(Query.cursorAfter(pageParam));

    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      queries
    );

    return posts.documents as IPost[];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function apiGetInfiniteExplorePosts({
  pageParam,
}: {
  pageParam: string;
}): Promise<IPost[]> {
  try {
    const queries = [Query.orderAsc("$createdAt"), Query.limit(12)];

    if (pageParam) queries.push(Query.cursorAfter(pageParam));

    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      queries
    );

    return posts.documents as IPost[];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function apiGetInfiniteSearchPosts({
  searchQuery,
  pageParam,
}: {
  searchQuery: string;
  pageParam: string;
}): Promise<IPost[]> {
  if (searchQuery.replace(/\s/g, "").length < 3) return [];

  try {
    const searchWords = searchQuery
      .split(" ")
      .map((word) => word.replace(/\s/g, ""));

    const queries = [
      Query.or([
        Query.search("caption", searchQuery),
        Query.contains("tags", searchWords),
      ]),
      Query.limit(12),
    ];

    if (pageParam) queries.push(Query.cursorAfter(pageParam));

    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      queries
    );

    return posts.documents as IPost[];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function apiGetPostsByUserId(userId: string): Promise<IPost[]> {
  try {
    const userPosts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.orderDesc("$createdAt"), Query.equal("creator", userId)]
    );

    return userPosts.documents as IPost[];
  } catch (err) {
    console.error(err);
    throw err;
  }
}
