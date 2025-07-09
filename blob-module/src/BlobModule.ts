import { requireNativeModule } from "expo";
import { Blob } from "./BlobModule.types";

const NativeBlobModule: any = requireNativeModule("ExpoBlob");

export class ExpoBlob extends NativeBlobModule.Blob implements Blob {
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
		// todo: finish implementation
		return new ReadableStream();
	}
}
