import { appwriteConfig, databases, ID } from "./config";

export async function apiAddSave(userId: string, postId: string) {
  try {
    const newSave = databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      }
    );

    if (!newSave) {
      throw Error;
    }

    return newSave;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function apiRemoveSave(saveId: string) {
  try {
    const data = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      saveId
    );

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
