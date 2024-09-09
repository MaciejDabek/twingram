import { appwriteConfig, databases, ID } from "./config";

export async function apiAddFollow(followerId: string, followedId: string) {
  try {
    const newFollow = databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.followsCollectionId,
      ID.unique(),
      {
        follower: followerId,
        followed: followedId,
      }
    );

    if (!newFollow) {
      throw Error;
    }

    return newFollow;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function apiRemoveFollow(followId: string) {
  try {
    const data = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.followsCollectionId,
      followId
    );

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
