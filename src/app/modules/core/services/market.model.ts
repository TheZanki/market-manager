export interface ISearch {
	searchShop: number;
	search: string;
	orderByPrice: boolean;
}

export interface ISearchResult {
	atbResult: ItemModel[],
	metroResult: ItemModel[],
	novusResult: ItemModel[],
	silpoResult: ItemModel[]
}

export interface ItemModel {
	bundle: number;
	customDescription: string;
	id: string;
	itemName: string;
	oldPrice: number;
	photo: string;
	price: number;
	shopName: string;
}

