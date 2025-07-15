import { requireNativeModule } from "expo";
import { Blob, BlobPart } from "./BlobModule.types";

const NativeBlobModule: any = requireNativeModule("ExpoBlob");

function flattenBlobParts(parts: any[]): BlobPart[] {
	const result: BlobPart[] = [];
	for (const part of parts) {
		if (Array.isArray(part)) {
			result.push(...flattenBlobParts(part));
		} else {
			result.push(part);
		}
	}
	return result;
}

export class ExpoBlob extends NativeBlobModule.Blob implements Blob {
	constructor(blobParts?: any[], options?: BlobPropertyBag) {
		const flatParts = blobParts ? flattenBlobParts(blobParts) : [];
		super(flatParts, options);
	}

	slice(start?: number, end?: number, contentType?: string): Blob {
		const slicedBlob = super.slice(start, end, contentType);
		const options: BlobPropertyBag = {
			type: slicedBlob.type,
			endings: slicedBlob.endings,
		};
		return new ExpoBlob([slicedBlob], options);
	}

	async text(): Promise<string> {
		return Promise.resolve(super.text());
	}

	stream(): ReadableStream {
		const text = super.text();
		const encoder = new TextEncoder();
		const uint8 = encoder.encode(text);
		let offset = 0;
		return new ReadableStream<Uint8Array>({
			pull(controller) {
				if (offset < uint8.length) {
					controller.enqueue(uint8.subarray(offset));
					offset = uint8.length;
				} else {
					controller.close();
				}
			},
		});
	}
}
