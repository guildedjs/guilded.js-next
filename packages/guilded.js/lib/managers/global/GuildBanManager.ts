import { Collection } from "@discordjs/collection";
import { MemberBan } from "../../structures/Member";
import { CacheableStructManager } from "./CacheableStructManager";
import { buildMemberKey } from "../../util";

/**
 * Manages guild bans in all servers.
 */
export class GlobalGuildBanManager extends CacheableStructManager<
  string,
  MemberBan
> {
  /**
   * Returns whether bans should be cached.
   */
  get shouldCacheBan() {
    return this.client.options.cache?.cacheMemberBans !== false;
  }

  /**
   * Fetches a member ban in a server.
   * @param serverId The ID of the server.
   * @param userId The ID of the user.
   * @param force Whether to force fetch the ban even if it's cached.
   * @returns A Promise that resolves with the fetched member ban.
   */
  fetch(serverId: string, userId: string, force?: boolean): Promise<MemberBan> {
    if (!force) {
      const existingMemberBan = this.client.bans.cache.get(
        buildMemberKey(serverId, userId)
      );
      if (existingMemberBan) return Promise.resolve(existingMemberBan);
    }
    return this.client.rest.router.memberBans
      .serverMemberBanRead({ serverId, userId })
      .then((data) => {
        const newMemberBan = new MemberBan(this.client, {
          ...data.serverMemberBan,
          serverId,
        });
        if (this.shouldCacheBan)
          this.client.bans.cache.set(newMemberBan.id, newMemberBan);
        return newMemberBan;
      });
  }

  /**
   * Fetches all bans in a server.
   * @param serverId The ID of the server.
   * @returns A Promise that resolves with a collection of the fetched member bans.
   */
  fetchMany(serverId: string): Promise<Collection<string, MemberBan>> {
    return this.client.rest.router.memberBans
      .serverMemberBanReadMany({ serverId })
      .then((data) => {
        const newMemberBans = new Collection<string, MemberBan>();
        for (const ban of data.serverMemberBans) {
          const newMemberBan = new MemberBan(this.client, { serverId, ...ban });
          newMemberBans.set(newMemberBan.id, newMemberBan);
          if (this.shouldCacheBan)
            this.client.bans.cache.set(newMemberBan.id, newMemberBan);
        }
        return newMemberBans;
      });
  }

  /**
   * Bans a user from a server.
   * @param serverId The ID of the server.
   * @param userId The ID of the user.
   * @returns A Promise that resolves with the newly created member ban.
   */
  ban(serverId: string, userId: string): Promise<MemberBan> {
    return this.client.rest.router.memberBans
      .serverMemberBanCreate({ serverId, userId })
      .then((data) => {
        const newMemberBan = new MemberBan(this.client, {
          serverId,
          ...data.serverMemberBan,
        });
        if (this.shouldCacheBan)
          this.client.bans.cache.set(newMemberBan.id, newMemberBan);
        return newMemberBan;
      });
  }

  /**
   * Unbans a user from a server.
   * @param serverId The ID of the server.
   * @param userId The ID of the user.
   * @param removeBanIfCached Whether to remove the ban from the cache if it exists.
   * @returns A Promise that resolves with the unbanned member ban or `null` if it isn't cached.
   */
  unban(
    serverId: string,
    userId: string,
    removeBanIfCached = false
  ): Promise<MemberBan | null> {
    return this.client.rest.router.memberBans
      .serverMemberBanDelete({ serverId, userId })
      .then(() => {
        const memberKey = buildMemberKey(serverId, userId);
        const existingBan = this.client.bans.cache.get(memberKey);
        if (
          this.client.options.cache?.removeMemberBanOnUnban ||
          removeBanIfCached
        )
          this.client.bans.cache.delete(memberKey);
        return existingBan ?? null;
      });
  }
}
