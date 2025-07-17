import { requireNativeModule } from "expo";
import { Blob } from "./BlobModule.types";
import { normalizedContentType } from "./utils";

const NativeBlobModule: any = requireNativeModule("ExpoBlob");

export class ExpoBlob extends NativeBlobModule.Blob implements Blob {
	constructor(blobParts?: any[], options?: BlobPropertyBag) {
		super(blobParts?.flat(Infinity), options);
	}

	slice(start?: number, end?: number, contentType?: string): ExpoBlob {
		const normalizedType = contentType ?? normalizedContentType(contentType);
		const slicedBlob = super.slice(start, end, normalizedType);
		Object.setPrototypeOf(slicedBlob, ExpoBlob.prototype);
		return slicedBlob;
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

	async text(): Promise<string> {
		return Promise.resolve(super.text());
	}

	async arrayBuffer(): Promise<ArrayBuffer> {
		return super.bytes().then((bytes: Uint8Array) => bytes.buffer);
	}
}
