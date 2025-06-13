export declare class Blob {
	constructor(blobParts?: BlobPart[], options?: BlobPropertyBag);
	slice(start?: number, end?: number, contentType?: string): Blob;
	readonly size: number;
	readonly type: string;
}
