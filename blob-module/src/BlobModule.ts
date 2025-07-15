import { requireNativeModule } from "expo";
import { Blob } from "./BlobModule.types";

const NativeBlobModule: any = requireNativeModule("ExpoBlob");

// TODO Find proper TypedArray type
type TypedArray = Int32Array

export class ExpoBlob extends NativeBlobModule.Blob implements Blob {
	constructor(blobParts?: (string | ExpoBlob | TypedArray)[], options?: BlobPropertyBag) {
		super(blobParts, options);
	}

	// @ts-expect-error
	async bytes(): Promise<Uint8Array> {
		return super.bytes();
	}

	// @ts-expect-error
	async arrayBuffer(): Promise<ArrayBuffer> {
		return super.bytes().then(bytes => bytes.buffer);
	}

	slice(start?: number, end?: number, contentType?: string): Blob {
		return super.slice(start, end, contentType);
	}

	test() {

	}

	// @ts-expect-error
	async text(): Promise<string> {
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
