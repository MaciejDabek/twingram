import { IUpdateUser, IUser } from "../../types";
import { ID, Query, appwriteConfig, databases, storage } from "./config";

export async function apiUpdateUser(userId: string, user: IUpdateUser) {
  const updateData = {
    name: user.name,
    username: user.username,
    bio: user.bio,
    imageId: user.imageId,
    imageUrl: user.imageUrl,
  };

  try {
    if (user.file.length) {
      const uploadedFile = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        user.file[0]
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

    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      userId,
      updateData
    );

    if (!updatedUser && updateData.imageId !== user.imageId) {
      await storage.deleteFile(appwriteConfig.storageId, updateData.imageId);
      throw Error;
    }

    if (user.imageId && updateData.imageId !== user.imageId) {
      await storage.deleteFile(appwriteConfig.storageId, user.imageId);
    }

    return updatedUser;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function apiGetUserById(userId: string): Promise<IUser> {
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      userId
    );

    if (!user) throw Error("There is no user with provided id");

    return user as IUser;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function apiGetInfiniteUsers({
  pageParam,
}: {
  pageParam: string;
}): Promise<IUser[]> {
  try {
    const queries = [Query.orderAsc("$createdAt"), Query.limit(6)];

    if (pageParam) queries.push(Query.cursorAfter(pageParam));

    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      queries
    );

    return users.documents as IUser[];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function apiGetRandomUsers(): Promise<IUser[]> {
  try {
    // fake randomization because appwrite do not provide this functionality
    const queries = [
      Query.limit(6),
      Query.offset(Math.floor(Math.random() * 7)),
    ];

    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      queries
    );

    return users.documents as IUser[];
  } catch (err) {
    console.error(err);
    throw err;
  }
}
