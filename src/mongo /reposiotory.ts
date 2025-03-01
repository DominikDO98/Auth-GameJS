import { MongoConnection } from "./connection";
import { userSchema } from "./schmas";

export class MongoRepository {
  private _database = new MongoConnection();

  private init() {
    return this._database.init();
  }

  private disconnect() {
    return this._database.disconnect();
  }

  createUser(username: string) {
    this.init()
      .then(() => {
        if (!this._database.connection)
          throw new Error("Something went wrong!");
        return this._database.connection
          .model("User", userSchema, "users")
          .create({ username: username });
      })
      .then(async (data) => {
        await this.disconnect();
        if (!data) throw new Error("Something wnet wrong!");
        return data._id;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
