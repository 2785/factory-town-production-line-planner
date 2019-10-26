import { IDatabaseEngine } from "./backEndDataAccess/iDataBaseEngine";
import { User } from "../utilities/user";
import { Role } from "../apollo/generated/types";
import * as uuid from "uuid/v4";

const DB_USER_DIR_PATH = "userData";
const NEW_USER_DEFAULT_ROLE = [Role.User];

export class UserDataSource {
    constructor(private dbEngine: IDatabaseEngine) {}
    public async getUser(token?: string): Promise<User> {
        if (token) {
            console.log(`getUser called with token: ${token}`);
            const dbLookup = await this.dbEngine.getByPath<UserData>(
                `${DB_USER_DIR_PATH}/${token}`
            );
            if (dbLookup) {
                return new User(dbLookup.roles, dbLookup.id);
            }
        }

        // const newToken = uuid();
        // console.log(`attempting to generated new user with token: ${newToken}`);
        // return this.dbEngine
        //     .overWriteByPath(`${DB_USER_DIR_PATH}/${newToken}`, {
        //         roles: NEW_USER_DEFAULT_ROLE
        //     })
        //     .then(x => {
        //         console.log(`New user write response: ${x.timeStamp}`);
        //         return new User(NEW_USER_DEFAULT_ROLE);
        //     });
        return new User(NEW_USER_DEFAULT_ROLE);
    }
}

interface UserData {
    roles: Role[];
    id?: string;
}
