import { Role, UserData, Facility } from "../apollo/generated/types";

export class User {
    constructor(public roles: Role[], private userData: UserData) {}
    public hasRole(role: Role): boolean {
        return this.roles.includes(role);
    }

    public getHappinessBooster(): number {
        return this.userData.worldHappiness;
    }

    public getUpgradedFacilities(): Map<Facility, number> {
        return this.userData.facilityBoosters.reduce((map, curr) => {
            map.set(curr.facility, curr.booster);
            return map;
        }, new Map<Facility, number>());
    }

    public getId(): string {
        return this.userData.id;
    }

    public getUserData(): UserData {
        return this.userData;
    }
}
