import { NativeModule, requireNativeModule } from "expo";

import { BlobModuleEvents } from "./BlobModule.types";

export declare class BlobModule extends NativeModule<BlobModuleEvents> {
	size: Number;
	type: String;
}

export default requireNativeModule<BlobModule>("BlobModule");
