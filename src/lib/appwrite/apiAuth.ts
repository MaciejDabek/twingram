import { INewUser, IUser } from "../../types";
import {
  ID,
  Query,
  account,
  appwriteConfig,
  avatars,
  databases,
} from "./config";

export async function apiGetAccount() {
  try {
    const accountData = account.get();

    return accountData;
  } catch (err) {
    return null;
  }
}

export async function apiGetAccountUser(accountId: string) {
  try {
    const accountData = await account.get();

    if (!accountData) throw Error("There is no authenticated account.");

    const userList = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", accountId)]
    );

    if (!userList) throw Error("There is no user for authenticated account");

    return userList.documents.at(0) as IUser;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function apiCreateAccountUser(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    const initialsAvatarUrl = avatars.getInitials(user.name);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        name: newAccount.name,
        email: newAccount.email,
        username: user.username,
        imageUrl: initialsAvatarUrl,
      }
    );

    if (!newUser) throw Error;

    return newUser;
  } catch (err) {
    console.error("apiCreateAccountUser", err);
    return err;
  }
}

export async function apiSignInAccount(user: {
  email: string;
  password: string;
}) {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );

    return session;
  } catch (err) {
    console.error("apiSignInAccount", err);
    // throw err;
  }
}

export async function apiSignOutAccount() {
  try {
    await account.deleteSession("current");
  } catch (err) {
    console.error("apiSignOutAccount", err);
    // throw err;
  }
}
