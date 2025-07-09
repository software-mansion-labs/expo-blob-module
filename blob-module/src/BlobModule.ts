import { requireNativeModule } from "expo";
import { Blob } from "./BlobModule.types";

const NativeBlobModule: any = requireNativeModule("BlobModule");

export class BlobModule extends NativeBlobModule.Blob {
	constructor(blobParts?: any, options?: BlobPropertyBag) {
		super(blobParts, options);
	}

	get size(): number {
		return super.size;
	}

	get type(): string {
		return super.type;
	}

	slice(start?: number, end?: number, contentType?: string): Blob {
		const slicedBlob = super.slice(start, end, contentType);
		const type = slicedBlob.type;
		const endings = slicedBlob.endings;
		return new BlobModule(slicedBlob, { type, endings });
	}

	text(): string {
		return super.text();
	}

	stream(): ReadableStream {
		const blobParts = this.blobParts;
		return new ReadableStream<Uint8Array>({
			async pull(controller) {
				try {
					for (const part of blobParts) {
						if (typeof part === "string") {
							const encoder = new TextEncoder();
							controller.enqueue(encoder.encode(part));
						} else if (part instanceof ArrayBuffer) {
							controller.enqueue(new Uint8Array(part));
						} else if (ArrayBuffer.isView(part)) {
							controller.enqueue(
								new Uint8Array(part.buffer, part.byteOffset, part.byteLength)
							);
						} else if (part && typeof part.stream === "function") {
							const reader = part.stream().getReader();
							while (true) {
								const { value, done } = await reader.read();
								if (done) break;
								controller.enqueue(value);
							}
						} else {
							throw new TypeError("Unsupported BlobPart type");
						}
					}
					controller.close();
				} catch (err) {
					controller.error(err);
				}
			},
		});
	}
}
