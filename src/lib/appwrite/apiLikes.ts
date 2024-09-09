import { appwriteConfig, databases, ID, Query } from "./config";

export async function apiAddLike(userId: string, postId: string) {
  try {
    const newLike = databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.likesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      }
    );

    if (!newLike) {
      throw Error;
    }

    return newLike;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function apiRemoveLike(
  likeId: string | null,
  userId: string,
  postId: string
) {
  try {
    if (likeId) {
      const data = await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.likesCollectionId,
        likeId
      );

      return data;
    }

    const likesData = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.likesCollectionId,
      [Query.equal("post", postId), Query.equal("user", userId)]
    );

    if (!likesData.documents.length) return null;

    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.likesCollectionId,
      likesData.documents.at(0)?.$id || ""
    );

    return null;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
