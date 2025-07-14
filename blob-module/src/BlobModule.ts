import { requireNativeModule } from "expo";
import { Blob } from "./BlobModule.types";

export const NativeBlobModule: any = requireNativeModule("ExpoBlob");

function flattenBlobParts(parts: any[]): any[] {
	const result = [];
	for (const part of parts) {
		if (Array.isArray(part)) {
			result.push(...flattenBlobParts(part));
		} else if (typeof part === "string") {
			result.push(part);
		} else if (part instanceof ExpoBlob) {
			result.push(part);
		}
	}
	return result;
}

export class ExpoBlob extends NativeBlobModule.Blob implements Blob {
	constructor(blobParts?: any[], options?: BlobPropertyBag) {
		// const flatParts = blobParts ? flattenBlobParts(blobParts) : [];
		// console.log("flatParts", flatParts);
		// if (blobParts && blobParts[0] instanceof ExpoBlob) {
		// 	super([], options);
		// } else {
		// 	super(flatParts, options);
		// }
		super(blobParts, options);
	}

	slice(start?: number, end?: number, contentType?: string): Blob {
		const slicedBlob = super.slice(start, end, contentType);
		const options: BlobPropertyBag = {
			type: slicedBlob.type,
			endings: slicedBlob.endings,
		};
		return new ExpoBlob(slicedBlob, options);
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
