import { IDatabaseEngine } from "./backEndDataAccess/iDataBaseEngine";
import { User } from "../utilities/user";
import {
    Role,
    FacilityWithBooster,
    Facility,
    UserData
} from "../apollo/generated/types";
import { STR_CONSTANTS } from "../utilities/stringNamesReference";

const DB_USER_DIR_PATH = STR_CONSTANTS.DB_PATH.USER_DIR_PATH;
const NEW_USER_DEFAULT_ROLE = [Role.User];
const NO_TOKEN_ROLE = [Role.Visitor];

export class UserDataSource {
    constructor(private dbEngine: IDatabaseEngine) {}
    public async getUser(token?: string): Promise<User> {
        if (token) {
            console.log(`getUser called with token: ${token}`);
            const dbLookup = await this.dbEngine.getByPath<DatabaseUserEntry>(
                `${DB_USER_DIR_PATH}/${token}`
            );
            if (dbLookup) {
                return new User(dbLookup.roles, {
                    id: dbLookup.id,
                    facilityBoosters: dbLookup.facilityBoosters,
                    worldHappiness: dbLookup.worldHappiness
                });
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
        return new User(NO_TOKEN_ROLE, {
            facilityBoosters: [],
            id: "defaultUser",
            worldHappiness: 1.0
        });
    }

    public async createUser(token: string): Promise<UserData> {
        const dbLookup = await this.dbEngine.getByPath<DatabaseUserEntry>(
            `${DB_USER_DIR_PATH}/${token}`
        );
        if (dbLookup) {
            throw new Error(
                `User with id ${token} already exists in the database, please consider using a different id. `
            );
        } else {
            const userData: DatabaseUserEntry = {
                id: token,
                roles: NEW_USER_DEFAULT_ROLE,
                facilityBoosters: [],
                worldHappiness: 1.0
            };
            await this.dbEngine.addByPath<DatabaseUserEntry>(
                `${DB_USER_DIR_PATH}/${token}`,
                userData
            );
            return <UserData>{
                id: token,
                worldHappiness: 1.0,
                facilityBoosters: []
            };
        }
    }

    public async addFacilityBooster(
        user: User,
        facility: Facility,
        booster: number
    ): Promise<UserData> {
        const userData = user.getUserData();
        userData.facilityBoosters.push({
            facility: facility,
            booster: booster
        });
        await this.dbEngine.overWriteByPath<DatabaseUserEntry>(
            `${DB_USER_DIR_PATH}/${user.getId()}`,
            { ...userData, roles: user.roles }
        );
        return userData;
    }

    public async updateHappinessBooster(
        user: User,
        newHappinessBooster: number
    ): Promise<UserData> {
        const userData = user.getUserData();
        userData.worldHappiness = newHappinessBooster;
        await this.dbEngine.overWriteByPath<DatabaseUserEntry>(
            `${DB_USER_DIR_PATH}/${user.getId()}`,
            { ...userData, roles: user.roles }
        );
        return userData;
    }
}

interface DatabaseUserEntry {
    roles: Role[];
    id: string;
    worldHappiness: number;
    facilityBoosters: FacilityWithBooster[];
}
