import { requireNativeModule } from "expo";
import { Blob, BlobPart } from "./BlobModule.types";

const NativeBlobModule: any = requireNativeModule("BlobModule");

export class BlobModule implements Blob {
	private _blob: Blob;
	public blobParts: BlobPart[];
	public options: BlobPropertyBag;

	constructor(blobParts?: BlobPart[], options?: BlobPropertyBag) {
		this._blob = new NativeBlobModule.Blob(blobParts, options);
		this.blobParts = blobParts || [];
		this.options = options || {};
	}

	get size(): number {
		return this._blob.size;
	}

	get type(): string {
		return this._blob.type;
	}

	slice(start?: number, end?: number, contentType?: string): Blob {
		const slicedBlob = this._blob.slice(start, end, contentType);
		const blobParts = slicedBlob.blobParts || [];
		const options = slicedBlob.options || {};
		return new BlobModule(blobParts, options);
	}

	text(): string {
		return this._blob.text();
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
