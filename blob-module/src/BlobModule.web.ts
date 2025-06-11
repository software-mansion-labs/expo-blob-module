import { registerWebModule, NativeModule } from 'expo';

import { BlobModuleEvents } from './BlobModule.types';

class BlobModule extends NativeModule<BlobModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(BlobModule, 'BlobModule');
