import fetch from "node-fetch";
import { RestOptions, RequestMethods, MessageContent, MessagePayload, GetChannelMessagesOptions, UpdateChannelMessageOptions } from "./typings";

export class RestManager {
    /** The bot token to be used for making requests. */
    token: string;
    /** The version of the API to be used for making requests. By default, this will use the latest version that the library supports. */
    version: number;
    /** The base of the URL that this will send this request to. By default, this will use guilded's api URL. */
    baseURL: string;
    /** The proxy url if it was set. */
    proxyURL: string;

    constructor(options: RestOptions) {
        this.token = options.token;
        this.version = options.version || 1;
        this.baseURL = "https://www.guilded.gg/api";
        this.proxyURL = options.proxyURL || "";
    }

    /** Combine the base url and the query to get the final url to send to. */
    getFinalURL(query: string) {
        return `${this.url}/${query}`;
    }

    /** The full url to send the request to. */
    get url() {
        return this.proxyURL || `${this.baseURL}/v${this.version}`;
    }

    /** Make a POST request to the API. */
    async post<T>(url: string, body: Record<string, unknown>): Promise<T> {
        return this.sendRequest("POST", url, body);
    }

    /** Make a GET request to the API. */
    async get<T>(url: string, body?: Record<string, string>): Promise<T> {
        return this.sendRequest("GET", `${url}/${new URLSearchParams(body).toString()}`, {});
    }

    /** Make a PUT request to the API. */
    async put<T>(url: string, body: Record<string, unknown>): Promise<T> {
        return this.sendRequest("PUT", url, body);
    }

    /** Make a DELETE request to the API. */
    async delete<T>(url: string, body?: Record<string, unknown>): Promise<T> {
        return this.sendRequest("DELETE", url, body || {});
    }

    /** Make a PATCH request to the API. */
    async patch<T>(url: string, body: Record<string, unknown>): Promise<T> {
        return this.sendRequest("PATCH", url, body);
    }

    /** Send a request to the api with all the data provided. */
    async sendRequest<T>(method: RequestMethods, url: string, body: Record<string, unknown>): Promise<T> {
        return fetch(url, {
            method,
            body: JSON.stringify(body),
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        })
            .then((r) => r.json())
            .catch(this.handleError);
    }

    /** Handle the error when a request is made. By default this simply logs it to the console. Useful if you want to implement Sentry or some custom handling of Rest errors. */
    handleError(error: Error) {
        console.error(error);
    }

    /** Send a message to a channel */
    createChannelMessage(channelId: string, content: MessageContent | string) {
        if (typeof content === "string") content = { content };

        // @ts-ignore ts odd error fix TODO:
        return this.post<MessagePayload>(this.getFinalURL(ENDPOINTS.channelMessages(channelId)), content);
    }

    /** Get a list of the latest 50 messages from a channel. */
    getChannelMessages(channelId: string, options: GetChannelMessagesOptions) {
        // @ts-ignore ts odd error fix TODO:
        return this.get<MessagePayload[]>(this.getFinalURL(ENDPOINTS.channelMessages(channelId)), options);
    }

    /** Get details for a specific chat message from a chat channel. */
    getChannelMessage(channelId: string, messageId: string) {
        return this.get<MessagePayload>(this.getFinalURL(ENDPOINTS.channelMessage(channelId, messageId)));
    }

    /** Update a channel message. */
    updateChannelMessage(channelId: string, messageId: string, options: UpdateChannelMessageOptions) {
        // @ts-ignore ts odd error fix TODO:
        return this.put<MessagePayload>(this.getFinalURL(ENDPOINTS.channelMessage(channelId, messageId)), options);
    }

    /** Delete a channel message. */
    deleteChannelMessage(channelId: string, messageId: string) {
        return this.delete(this.getFinalURL(ENDPOINTS.channelMessage(channelId, messageId)));
    }

    /** Get a list of the roles assigned to a member using the id of the member. */
    getMemberRoles(userId: string) {
        return this.get<number[]>(this.getFinalURL(ENDPOINTS.memberRoles(userId)));
    }

    /** Update a member's nickname. */
    updateMemberNickname(userId: string, nickname: string) {
        return this.put<string>(this.getFinalURL(ENDPOINTS.memberNickname(userId)), { nickname });
    }

    /** Delete a member's nickname */
    deleteMemberNickname(userId: string) {
        return this.delete(this.getFinalURL(ENDPOINTS.memberNickname(userId)));
    }
}

export const ENDPOINTS = {
    // Channel Endpoints
    channelMessages: (channelId: string) => `/channels/${channelId}/messages`,
    channelMessage: (channelId: string, messageId: string) => `/channels/${channelId}/messages/${messageId}`,

    // Member Endpoints
    memberNickname: (userId: string) => `/members/${userId}/nickname`,
    memberRoles: (userId: string) => `/members/${userId}/roles`,
};
