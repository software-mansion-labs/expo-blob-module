import { BlobModule } from "./BlobModule";

export type BlobModuleEvents = {
	slice(props: SlicePayload): Promise<BlobModule>;
};

export type SlicePayload = {
	start: Number;
	end?: Number;
	contentType?: String;
};
