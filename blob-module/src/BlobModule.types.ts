export declare class Blob {
	readonly size: number;
	readonly type: string;

	constructor(blobParts?: any, options?: BlobPropertyBag);

	slice(start?: number, end?: number, contentType?: string): Blob;
	text(): Promise<string>;
	stream(): ReadableStream;
}

export type BlobPart = string | ArrayBuffer | ArrayBufferView | Blob;
