/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChatEmbed } from "../models/ChatEmbed";
import type { ChatMessage } from "../models/ChatMessage";
import type { Mentions } from "../models/Mentions";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class ChatService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a channel message
     * @returns any Success
     * @throws ApiError
     */
    public channelMessageCreate({
        channelId,
        requestBody,
    }: {
        /**
         * Channel ID to create the message in
         */
        channelId: string;
        requestBody: {
            /**
             * If set, this message will only be seen by those mentioned or replied to
             */
            isPrivate?: boolean;
            /**
             * If set, this message will not notify any mentioned users or roles
             */
            isSilent?: boolean;
            /**
             * Message IDs to reply to
             */
            replyMessageIds?: Array<string>;
            /**
             * The content of the message
             */
            content?: string;
            /**
             * At this time, only one embed is supported per message, and attachments are not supported. If you need to send more than one embed or upload attachments, consider creating the message via a webhook.
             */
            embeds?: Array<ChatEmbed>;
        };
    }): CancelablePromise<{
        message: ChatMessage;
    }> {
        return this.httpRequest.request({
            method: "POST",
            url: "/channels/{channelId}/messages",
            path: {
                channelId: channelId,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Get channel messages
     * Results returned will be ordered ascending by the message's `createdAt`. `before` and `after` will filter based on the message's `createdAt`
     * @returns any Success
     * @throws ApiError
     */
    public channelMessageReadMany({
        channelId,
        before,
        after,
        limit = 50,
        includePrivate = false,
    }: {
        /**
         * ID of the channel that the messages exist in
         */
        channelId: string;
        before?: string;
        /**
         * An ISO 8601 timestamp that will be used to filter out results for the current page. Order will be reversed when compared to `before` or when omitting this parameter altogether
         */
        after?: string;
        limit?: number;
        /**
         * Whether to include private messages between all users in response
         */
        includePrivate?: boolean;
    }): CancelablePromise<{
        messages: Array<ChatMessage>;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/channels/{channelId}/messages",
            path: {
                channelId: channelId,
            },
            query: {
                before: before,
                after: after,
                limit: limit,
                includePrivate: includePrivate,
            },
        });
    }

    /**
     * Get a channel message
     * Get details for a specific chat message from a chat channel.
     * @returns any Success
     * @throws ApiError
     */
    public channelMessageRead({
        channelId,
        messageId,
    }: {
        /**
         * ID of the channel that the message exists in
         */
        channelId: string;
        messageId: string;
    }): CancelablePromise<{
        message: ChatMessage;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/channels/{channelId}/messages/{messageId}",
            path: {
                channelId: channelId,
                messageId: messageId,
            },
        });
    }

    /**
     * Update a channel message
     * @returns any Success
     * @throws ApiError
     */
    public channelMessageUpdate({
        channelId,
        messageId,
        requestBody,
    }: {
        /**
         * ID of the channel that the message to be updated exists in
         */
        channelId: string;
        messageId: string;
        requestBody: {
            /**
             * The content of the message
             */
            content?: Record<string, any> | string;
            /**
             * At this time, only one embed is supported per message, and attachments are not supported. If you need to send more than one embed or upload attachments, consider creating the message via a webhook.
             */
            embeds?: Array<ChatEmbed>;
        };
    }): CancelablePromise<{
        message: ChatMessage & {
            /**
             * The ID of the message
             */
            id?: string;
            /**
             * The type of chat message. "system" messages are generated by Guilded, while "default" messages are user or bot-generated.
             */
            type?: "default" | "system";
            /**
             * The ID of the server
             */
            serverId?: string;
            /**
             * The ID of the group
             */
            groupId?: string;
            /**
             * The ID of the channel
             */
            channelId?: string;
            /**
             * The content of the message
             */
            content?: string;
            embeds?: Array<ChatEmbed>;
            /**
             * Message IDs that were replied to
             */
            replyMessageIds?: Array<string>;
            /**
             * If set, this message will only be seen by those mentioned or replied to
             */
            isPrivate?: boolean;
            /**
             * If set, this message did not notify mention or reply recipients
             */
            isSilent?: boolean;
            isPinned?: boolean;
            mentions?: Mentions;
            /**
             * The ISO 8601 timestamp that the message was created at
             */
            createdAt?: string;
            /**
             * The ID of the user who created this message (Note: If this event has `createdByWebhookId` present, this field will still be populated, but can be ignored. In this case, the value of this field will always be Ann6LewA)
             */
            createdBy?: string;
            /**
             * The ID of the webhook who created this message, if it was created by a webhook
             */
            createdByWebhookId?: string;
            /**
             * The ISO 8601 timestamp that the message was updated at, if relevant
             */
            updatedAt: string;
        };
    }> {
        return this.httpRequest.request({
            method: "PUT",
            url: "/channels/{channelId}/messages/{messageId}",
            path: {
                channelId: channelId,
                messageId: messageId,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Delete a channel message
     * @returns void
     * @throws ApiError
     */
    public channelMessageDelete({ channelId, messageId }: { channelId: string; messageId: string }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/channels/{channelId}/messages/{messageId}",
            path: {
                channelId: channelId,
                messageId: messageId,
            },
        });
    }

    /**
     * Pin a message
     * @returns void
     * @throws ApiError
     */
    public channelMessagePinCreate({ channelId, messageId }: { channelId: string; messageId: string }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: "POST",
            url: "/channels/{channelId}/messages/{messageId}/pin",
            path: {
                channelId: channelId,
                messageId: messageId,
            },
        });
    }

    /**
     * Unpin a message
     * @returns void
     * @throws ApiError
     */
    public channelMessagePinDelete({ channelId, messageId }: { channelId: string; messageId: string }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/channels/{channelId}/messages/{messageId}/pin",
            path: {
                channelId: channelId,
                messageId: messageId,
            },
        });
    }
}
