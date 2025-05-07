import type {
  IGithubUserDO,
  IGithubUserDTO,
} from "../../../types/githubUser.js";
import { GithubUserDTO } from "./DTO.js";

export class GithubUserDTOMapper {
  private validate(data: IGithubUserDO) {
    if (Object.keys(data).length < 3) throw new Error("Data incompatible");
    if (!data.id || typeof data.id !== "number")
      throw new Error("Data incompatible, id");
    if (!data.login || typeof data.login !== "string")
      throw new Error("Data incompatible, login");
    if (
      !data.avatarUrl ||
      typeof data.avatarUrl !== "string" ||
      !data.avatarUrl.startsWith("https://avatars.githubusercontent.com/u/")
    ) {
      throw new Error("Data incompatible, avatar");
    }
  }

  mapDTO(data: IGithubUserDO): IGithubUserDTO {
    this.validate(data);
    return new GithubUserDTO(data);
  }
}
