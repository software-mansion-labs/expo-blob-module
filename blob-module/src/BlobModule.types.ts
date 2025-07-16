export declare class Blob {
	constructor(blobParts?: any, options?: BlobPropertyBag);

	slice(start?: number, end?: number, contentType?: string): Blob;
	stream(): ReadableStream;
	text(): Promise<string>;
}

export type BlobPart = string | ArrayBuffer | ArrayBufferView | Blob;
