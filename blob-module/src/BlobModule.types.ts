export type BlobModuleEvents = {
	onChange: (params: ChangeEventPayload) => void;
};

export type ChangeEventPayload = {
	value: string;
};
