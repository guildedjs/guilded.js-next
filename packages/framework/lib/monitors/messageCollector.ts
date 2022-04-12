import type { Message } from "guilded.js";

import { Monitor } from "../structures/Monitor";

export default class MessageCollectorMonitor extends Monitor {
    execute(message: Message): void {
        const collector = this.client.messageCollectors.get(message.createdById);
        // This user has no collectors pending or the message is in a different channel
        if (!collector || message.channelId !== collector.channelId) return;
        // This message is a response to a collector. Now running the filter function.
        if (!collector.filter(message)) return;

        // If the necessary amount has been collected
        if (collector.amount === 1 || collector.amount === collector.messages.length + 1) {
            // Remove the collector
            this.client.messageCollectors.delete(message.createdById);
            // Resolve the collector
            return collector.resolve([...collector.messages, message]);
        }

        // More messages still need to be collected
        collector.messages.push(message);
    }

    init(): void {
        // shut up eslint
    }
}
