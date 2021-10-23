export const marketBuilder = [
	{id: 0, name: 'Silpo', result: 'silpoResult'},
	{id: 1, name: 'Novus', result: 'novusResult'},
	{id: 2, name: 'ATB', result: 'atbResult'},
	{id: 3, name: 'Metro', result: 'metroResult'},
];

export const marketList = marketBuilder.map(i => {
	return {
		list: new Array,
		selectedItem: null,
		...i
	}
})

export const controlBuilder = (controls: Array<any>): Object => {
	return controls.reduce((previusValue, {name, value}) => ({[name]:value, ...previusValue}), {})
}

export const marketFormatData = ({bundle, capacity, ...data}: any) => {
	return {bundle: Number(bundle), capacity: Number(bundle), ...data}
}

