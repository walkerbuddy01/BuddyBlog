import { Client, Account, ID } from "appwrite";
import config from "../Config/config";
class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(config.appwriteURL);
    this.client.setProject(config.appwriteProjectID);
    this.account = new Account(this.client);
  }

  async SignIn({ name, email, password }) {
    console.log(name, email, password);
    try {
      const userdata = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userdata) {
        const loggedUserdata = await this.Login({ email, password });
        return loggedUserdata;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Appwrite SignIn error:", error.message);
      throw (error);
    }
  }

  async Login({ email, password }) {
    try {
      const loginData = await this.account.createEmailSession(
        email,
        password
      );
      return loginData;
    } catch (error) {
      console.log("Appwrite Login error:", error.message);
      throw (error);
    }
  }

  async CurrentUser() {
    try {
      const currentUserData = await this.account.get();
      return currentUserData;
    } catch (error) {
      console.log("appwrite CurrentUser error :", error.message);
      throw error;
    }
  }
  async Logout() {
    try {
      const data = this.account.deleteSessions();
      return data;
    } catch (error) {
      console.log("appwrite Logout error :", error.message);
      throw error;
    }
  }
}

const authservice = new AuthService();

export default authservice;
