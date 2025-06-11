import { requireNativeView } from 'expo';
import * as React from 'react';

import { BlobModuleViewProps } from './BlobModule.types';

const NativeView: React.ComponentType<BlobModuleViewProps> =
  requireNativeView('BlobModule');

export default function BlobModuleView(props: BlobModuleViewProps) {
  return <NativeView {...props} />;
}
