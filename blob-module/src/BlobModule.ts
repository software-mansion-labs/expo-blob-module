import { requireNativeModule } from "expo";
import { Blob } from "./BlobModule.types";

const NativeBlobModule: any = requireNativeModule("ExpoBlob");

export class ExpoBlob extends NativeBlobModule.Blob implements Blob {
	constructor(blobParts?: (string | ExpoBlob | ArrayBufferView)[], options?: BlobPropertyBag) {
		super(blobParts, options);
	}

	bytes(): Promise<Uint8Array> {
		return super.bytes();
	}

	arrayBuffer(): Promise<ArrayBuffer> {
		return super.bytes().then((bytes: Uint8Array) => bytes.buffer);
	}

	slice(start?: number, end?: number, contentType?: string): ExpoBlob {
		return super.slice(start, end, contentType);
	}

	text(): Promise<string> {
		return (super.text());
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
