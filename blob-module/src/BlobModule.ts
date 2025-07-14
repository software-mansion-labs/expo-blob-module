import { requireNativeModule } from "expo";
import { Blob } from "./BlobModule.types";

const NativeBlobModule: any = requireNativeModule("ExpoBlob");

export class ExpoBlob extends NativeBlobModule.Blob implements Blob {
	test(): string {
		return super.test()
	}

	opt(options : BlobPropertyBag) {
		return super.opt(options)
	}

	constructor(blobParts?: (string | Blob)[], options?: BlobPropertyBag) {
		super(blobParts, options);
	}

	me(): Blob {
		return super.me()
	}

	slice(start?: number, end?: number, contentType?: string): Blob {
		return super.slice(start, end, contentType);
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
