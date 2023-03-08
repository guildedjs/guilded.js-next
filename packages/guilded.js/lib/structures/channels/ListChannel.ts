import { Collection } from "@discordjs/collection";
import type { ListItemPayload, ListItemSummaryPayload } from "@guildedjs/guilded-api-typings";
import { Channel } from "./Channel";

/**
 * Represents a list channel in Guilded.
 * @extends Channel
 */
export class ListChannel extends Channel {
    /**
     * The list items in this channel.
     */
    readonly items = new Collection<string, ListItemPayload | ListItemSummaryPayload>();

    /**
     * Creates a list item in this channel.
     * @param message - The message of the new list item.
     * @param note - Optional note for the new list item.
     * @returns A Promise that resolves with the newly created list item payload.
     */
    createItem(message: string, note?: string): Promise<ListItemPayload> {
        return this.client.lists.create(this.id, { message, note });
    }

    /**
     * Fetches a list item by its ID.
     * @param itemId - The ID of the list item to fetch.
     * @returns A Promise that resolves with the list item payload.
     */
    getItem(itemId: string): Promise<ListItemPayload> {
        return this.client.lists.fetch(this.id, itemId).then((data) => {
            this.items.set(data.id, data);
            return data;
        });
    }

    /**
     * Fetches all list items in this channel.
     * @returns A Promise that resolves with an array of list item summary payloads.
     */
    getItems(): Promise<ListItemSummaryPayload[]> {
        return this.client.lists.fetchMany(this.id).then((data) => {
            for (const item of data) {
                this.items.set(item.id, item);
            }
            return data;
        });
    }

    /**
     * Completes a list item.
     * @param itemId - The ID of the list item to complete.
     * @returns A Promise that resolves when the list item is completed.
     */
    completeItem(itemId: string): Promise<void> {
        return this.client.lists.complete(this.id, itemId).then(() => void 0);
    }

    /**
     * Uncompletes a list item.
     * @param itemId - The ID of the list item to uncomplete.
     * @returns A Promise that resolves when the list item is uncompleted.
     */
    uncompleteItem(itemId: string): Promise<void> {
        return this.client.lists.uncomplete(this.id, itemId).then(() => void 0);
    }
}