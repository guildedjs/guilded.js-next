/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ChannelRolePermission = {
	permissions: Record<string, boolean>;
	/**
	 * The ISO 8601 timestamp that the permission override was created at
	 */
	createdAt: string;
	/**
	 * The ISO 8601 timestamp that the permission override was updated at, if relevant
	 */
	updatedAt?: string;
	/**
	 * The ID of the role
	 */
	roleId: number;
	/**
	 * The ID of the channel
	 */
	channelId: string;
};
