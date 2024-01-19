/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnnouncementComment } from "../models/AnnouncementComment";

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";

export class AnnouncementCommentsService {
	constructor(
		public readonly httpRequest: BaseHttpRequest,
	) {}

	/**
	 * Create a comment on an announcement
	 * @returns any Success
	 * @throws ApiError
	 */
	public announcementCommentCreate({
		channelId,
		announcementId,
		requestBody,
	}: {
		channelId: string;
		announcementId: string;
		requestBody: {
			/**
			 * The content of the announcement comment
			 */
			content: string;
		};
	}): CancelablePromise<{
		announcementComment: AnnouncementComment;
	}> {
		return this.httpRequest.request(
			{
				method: "POST",
				url: "/channels/{channelId}/announcements/{announcementId}/comments",
				path: {
					channelId: channelId,
					announcementId: announcementId,
				},
				body: requestBody,
				mediaType: "application/json",
			},
		);
	}

	/**
	 * Get an announcement's comments
	 * @returns any Success
	 * @throws ApiError
	 */
	public announcementCommentReadMany({
		channelId,
		announcementId,
	}: {
		channelId: string;
		announcementId: string;
	}): CancelablePromise<{
		announcementComments: Array<AnnouncementComment>;
	}> {
		return this.httpRequest.request(
			{
				method: "GET",
				url: "/channels/{channelId}/announcements/{announcementId}/comments",
				path: {
					channelId: channelId,
					announcementId: announcementId,
				},
			},
		);
	}

	/**
	 * Get a comment on the announcement
	 * @returns any Success
	 * @throws ApiError
	 */
	public announcementCommentRead({
		channelId,
		announcementId,
		announcementCommentId,
	}: {
		channelId: string;
		announcementId: string;
		announcementCommentId: number;
	}): CancelablePromise<{
		announcementComment: AnnouncementComment;
	}> {
		return this.httpRequest.request(
			{
				method: "GET",
				url: "/channels/{channelId}/announcements/{announcementId}/comments/{announcementCommentId}",
				path: {
					channelId: channelId,
					announcementId: announcementId,
					announcementCommentId: announcementCommentId,
				},
			},
		);
	}

	/**
	 * Update an announcement comment
	 * @returns any Success
	 * @throws ApiError
	 */
	public announcementCommentUpdate({
		channelId,
		announcementId,
		announcementCommentId,
		requestBody,
	}: {
		channelId: string;
		announcementId: string;
		announcementCommentId: number;
		requestBody: {
			/**
			 * The content of the announcement comment
			 */
			content: string;
		};
	}): CancelablePromise<{
		announcementComment: AnnouncementComment;
	}> {
		return this.httpRequest.request(
			{
				method: "PATCH",
				url: "/channels/{channelId}/announcements/{announcementId}/comments/{announcementCommentId}",
				path: {
					channelId: channelId,
					announcementId: announcementId,
					announcementCommentId: announcementCommentId,
				},
				body: requestBody,
				mediaType: "application/json",
			},
		);
	}

	/**
	 * Delete an announcement comment
	 * @returns void
	 * @throws ApiError
	 */
	public announcementCommentDelete({
		channelId,
		announcementId,
		announcementCommentId,
	}: {
		channelId: string;
		announcementId: string;
		announcementCommentId: number;
	}): CancelablePromise<void> {
		return this.httpRequest.request(
			{
				method: "DELETE",
				url: "/channels/{channelId}/announcements/{announcementId}/comments/{announcementCommentId}",
				path: {
					channelId: channelId,
					announcementId: announcementId,
					announcementCommentId: announcementCommentId,
				},
			},
		);
	}
}
