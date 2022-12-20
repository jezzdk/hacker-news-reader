export enum TypeEnum {
	Story = "story",
	Comment = "comment",
	Job = "job",
	Poll = "poll",
	Pollopt = "pollopt",
}

export interface StoryInterface {
	id: number;
	deleted?: boolean;
	type?: TypeEnum;
	by?: string;
	time?: number;
	text?: string;
	dead?: boolean;
	parent?: number;
	poll?: number;
	kids?: number[];
	url?: string;
	score?: number;
	title?: string;
	parts?: number[];
	descendants?: number;
}

export interface UserInterface {
	id: number;
	created: number;
	karma: number;
	about?: string;
	submitted?: number[];
}
