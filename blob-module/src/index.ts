// Reexport the native module. On web, it will be resolved to BlobModule.web.ts
// and on native platforms to BlobModule.ts
export { default } from './BlobModule';
export { default as BlobModuleView } from './BlobModuleView';
export * from  './BlobModule.types';
