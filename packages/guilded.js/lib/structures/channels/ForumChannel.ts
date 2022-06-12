import Collection from "@discordjs/collection";
import type { ForumTopicPayload } from "@guildedjs/guilded-api-typings";
import { Channel } from "./Channel";

export class ForumChannel extends Channel {
    /** The threads in this channel. */
    readonly threads = new Collection<string, ForumTopicPayload>();

    /** Create a topic in a forum */
    createTopic(title: string, content: string): Promise<ForumTopicPayload> {
        return this.client.forums.createTopic(this.id, { title, content });
    }
}
