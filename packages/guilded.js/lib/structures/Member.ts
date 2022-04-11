import type Client from "./Client";
import { Base } from "./Base";
import type { UpgradedTeamMemberBanPayload, UpgradedTeamMemberPayload, UpgradedTeamMemberSummaryPayload } from "../typings";
import type { TeamMemberPayload, UserSummaryPayload } from "@guildedjs/guilded-api-typings";
import type { User } from "./User";

export class Member extends Base<UpgradedTeamMemberPayload> {
    /** The ID of the server this role belongs to */
    readonly serverId: string;
    /** The nickname for this member */
    nickname: string | null = null;
    /** Date this member joined */
    joinedAt: Date | null;
    /** Roles this member has by ID (TODO: role object when Guilded API has one) */
    roleIds: number[] = [];

    constructor(client: Client, data: UpgradedTeamMemberPayload) {
        super(client, data);
        this.serverId = data.serverId;
        this.joinedAt = new Date(data.joinedAt);

        this._update(data);
    }

    _update(data: Partial<TeamMemberPayload>): this {
        if ("nickname" in data) {
            this.nickname = data.nickname ?? null;
        }

        if ("roleIds" in data && typeof data.roleIds !== "undefined") {
            this.roleIds = data.roleIds;
        }

        return this;
    }

    /** Get the user associated with this member */
    get user(): User | null {
        return this.client.users.cache.get(this.id) ?? null;
    }

    /** Get a list of the roles assigned to this member. */
    getRoles(): Promise<number[]> {
        return this.client.members.getRoles(this.serverId, this.id);
    }

    /** Update this member's nickname. */
    updateNickname(nickname: string): Promise<string> {
        return this.client.members.updateNickname(this.serverId, this.id, nickname);
    }

    /** Reset this member's nickname */
    resetNickname(): Promise<void> {
        return this.client.members.resetNickname(this.serverId, this.id);
    }

    /** Award XP to this member */
    awardXP(amount: number): Promise<number> {
        return this.client.members.giveXP(this.serverId, this.id, amount);
    }

    /** Add role to this member */
    addRole(roleId: number): Promise<void> {
        return this.client.roles.addRoleToMember(this.id, roleId);
    }

    /** Remove role from this member */
    removeRole(roleId: number): Promise<void> {
        return this.client.roles.removeRoleFromMember(this.id, roleId);
    }

    /** Kick this user */
    kick(): Promise<Member | null> {
        return this.client.members.kick(this.serverId, this.id);
    }
}

/** A partial summary representation of a member. Can fetch this member to get full data */
export class PartialMember extends Base<UpgradedTeamMemberSummaryPayload> {
    /** The ID of the server this role belongs to */
    readonly serverId: string;
    /** The user information of this member */
    readonly user: UserSummaryPayload;
    /** Roles this member has by ID (TODO: role object when Guilded API has one) */
    readonly roleIds: number[] = [];

    constructor(client: Client, data: UpgradedTeamMemberSummaryPayload) {
        super(client, data);
        this.serverId = data.serverId;
        this.user = data.user;
        this.roleIds = data.roleIds;
    }

    /** Fetch the full member object of this partial member */
    fetch(): Promise<Member> {
        return this.client.members.fetch(this.serverId, this.user.id);
    }
}
export class MemberBan extends Base<UpgradedTeamMemberBanPayload> {
    /** Id this ban was created in */
    serverId: string;
    /** Date this ban was created */
    createdAt: Date;
    /** The ID of user who banned this person */
    createdById: string;
    /** The reason this user was banned */
    reason: string | null;
    /** Information about the target user */
    target: UserSummaryPayload;

    constructor(client: Client, data: UpgradedTeamMemberBanPayload) {
        const transformedBanId = `${data.serverId}:${data.user.id}`;
        super(client, { ...data, id: transformedBanId });
        this.serverId = data.serverId;
        this.createdAt = new Date(data.createdAt);
        this.createdById = data.createdBy;
        this.target = data.user;
        this.reason = data.reason ?? null;
    }

    /** The author of the ban */
    get author() {
        return this.client.users.cache.get(this.createdById);
    }

    /** Remove this ban */
    unban(): Promise<MemberBan | null> {
        return this.client.bans.unban(this.serverId, this.target.id);
    }
}
