import { NativeModule, requireNativeModule } from 'expo';

import { BlobModuleEvents } from './BlobModule.types';

declare class BlobModule extends NativeModule<BlobModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<BlobModule>('BlobModule');
