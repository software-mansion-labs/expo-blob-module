import * as React from 'react';

import { BlobModuleViewProps } from './BlobModule.types';

export default function BlobModuleView(props: BlobModuleViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
