import { GilClient } from "../GilClient";
import { Listener, ListenerContext } from "../structures/Listener";

export default class ReadyListener extends Listener {
	constructor(gil: GilClient) {
		super(gil, { event: "ready", emitter: "gjs" });
	}

	async execute(ctx: ListenerContext) {
		this.gil.logger.info(`Client is logged in as ${this.gil.client.user?.name}`);
	}
}
