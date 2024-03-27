import { Member, Message } from "guilded.js";
import { StoredServer } from "./adapters/db/DatabaseAdapter";

export interface NonCommandMessageParams {
	message: Message;
	member: Member;
	server: StoredServer;
}

export interface CommandMessageParams {
	message: Message;
	member: Member;
	server: StoredServer;
	prefix: string;
}

export type GilEvents = {
	nonCommandMessage(params: NonCommandMessageParams): unknown;
	commandMessage(params: CommandMessageParams): unknown;
};
