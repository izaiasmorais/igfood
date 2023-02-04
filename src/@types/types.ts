export interface IFood {
	id: number;
	name: string;
	description: string;
	price: string;
	available: boolean;
	image: string;
}

export interface BaseFood {
	image: string;
	name: string;
	price: string;
	description: string;
}
