import type { ChatMessagePayload, RESTPostChannelMessagesBody } from "@guildedjs/guilded-api-typings";
import type { Client } from "./Client";
import { Base } from "./Base";
import type { User } from "./User";
import type { Member } from "./Member";
import { buildMemberKey } from "../util";

export enum MessageType {
    Default,
    System,
}

export class Message extends Base<ChatMessagePayload> {
    /** The id of the message. */
    readonly id: string;
    /** The ID of the channel */
    readonly channelId: string;
    /** The ID of the server this message belongs to */
    readonly serverId: string | null;
    /** The type of chat message. "system" messages are generated by Guilded, while "default" messages are user or bot-generated. */
    readonly type: MessageType;
    /** The content of the message */
    content: string;
    /** The ID of the messages that this is replying to. */
    readonly replyMessageIds: string[] = [];
    /** If set, this message will only be seen by those mentioned or replied to. */
    readonly isPrivate: boolean;
    /** The ID of the user who created this message (Note: If this event has createdByBotId or createdByWebhookId present, this field will still be populated, but can be ignored. In these cases, the value of this field will always be Ann6LewA) */
    readonly createdById: string;
    /** The ID of the bot who created this message, if it was created by a bot */
    readonly createdByBotId: string | null;
    /** The ID of the webhook who created this message, if it was created by a webhook */
    readonly createdByWebhookId: string | null;
    /** The timestamp that the message was created at. */
    readonly createdAt: Date;
    /** The timestamp that the message was updated at, if relevant */
    updatedAt: Date | null;
    /** Whether the message has been deleted */
    deleted = false;
    /** When the message was deleted, if it was */
    deletedAt: Date | null = null;

    constructor(client: Client, data: ChatMessagePayload) {
        super(client, data);

        this.id = data.id;
        this.channelId = data.channelId;
        this.content = data.content ?? "";
        this.serverId = data.serverId ?? null;
        this.replyMessageIds = data.replyMessageIds ?? [];
        this.createdById = data.createdBy;
        this.createdByBotId = data.createdByBotId ?? null;
        this.createdByWebhookId = data.createdByWebhookId ?? null;
        this.createdAt = new Date(data.createdAt);
        this.updatedAt = null;
        this.isPrivate = data.isPrivate ?? false;
        this.type = data.type === "system" ? MessageType.System : MessageType.Default;

        this._update(data);
    }

    /** Update details of this structure */
    _update(data: Partial<ChatMessagePayload> | { deletedAt: string }): this {
        if ("content" in data && typeof data.content !== "undefined") {
            this.content = data.content;
        }

        if ("updatedAt" in data) {
            this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
        }

        if ("deletedAt" in data) {
            this.deleted = true;
            this.deletedAt = new Date(data.deletedAt);
        }

        return this;
    }

    /** Get the author of this message */
    get author(): User | null {
        return this.client.users.cache.get(this.createdById) ?? null;
    }

    /** The author id of the user who sent this message. */
    get authorId(): string {
        return this.createdByBotId ?? this.createdByWebhookId ?? this.createdById;
    }

    /** Get the member of this message (if in server) */
    get member(): Member | null {
        return this.serverId ? this.client.members.cache.get(buildMemberKey(this.serverId, this.authorId)) ?? null : null;
    }

    /* Edit message content */
    edit(newContent: RESTPostChannelMessagesBody | Embed | string): Promise<Message> {
        return this.client.messages.update(this.channelId, this.id, newContent).then(() => this);
    }

    /** Send a message in the same channel as this message. */
    send(content: RESTPostChannelMessagesBody | string) {
        return this.client.messages.send(this.channelId, content);
    }

    /** Send a message that replies to this message. It mentions the user who sent this message. */
    reply(content: RESTPostChannelMessagesBody | string) {
        return this.client.messages.send(
            this.channelId,
            typeof content !== "string"
                ? {
                      ...content,
                      replyMessageIds: content.replyMessageIds ? [this.id, ...content.replyMessageIds] : [this.id],
                  }
                : content,
        );
    }
}
