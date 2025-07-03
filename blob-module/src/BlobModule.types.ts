export declare class Blob {
	constructor(blobParts?: any, options?: BlobPropertyBag);

	readonly size: number;
	readonly type: string;

	slice(start?: number, end?: number, contentType?: string): Blob;
	text(): string;
}
