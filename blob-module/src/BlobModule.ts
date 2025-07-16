import { requireNativeModule } from "expo";
import { Blob } from "./BlobModule.types";

const NativeBlobModule: any = requireNativeModule("ExpoBlob");

export class ExpoBlob extends NativeBlobModule.Blob implements Blob {
	constructor(blobParts?: (string | ExpoBlob | ArrayBufferView)[], options?: BlobPropertyBag) {
		super(blobParts, options);
	}

	text = super.text
	bytes = super.bytes
	slice = super.slice

	arrayBuffer(): Promise<ArrayBuffer> {
		return super.bytes().then((bytes: Uint8Array) => bytes.buffer);
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
