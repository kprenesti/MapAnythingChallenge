export const Co = {
	centerPoint: (max, min) => {
		return (max - min) / 2 + min;
	},
	randomCoordGenerator: (min, max, float) => {
		return (Math.random() * (max - min) + min).toFixed(float) * 1;
	},
	generateCoordObj: (locRange, float) => {
		const centerLat = Co.centerPoint(locRange.maxLat, locRange.minLat);
		const centerLong = Co.centerPoint(locRange.maxLong, locRange.minLong);
		let long = Co.randomCoordGenerator(locRange.minLong, locRange.maxLong, float);
		let lat = Co.randomCoordGenerator(locRange.minLat, locRange.maxLat, float);

		let quadrant;
		if (long > centerLong && lat >= centerLat) quadrant = 'Northeast';
		if (long < centerLong && lat >= centerLat) quadrant = 'Northwest';
		if (long > centerLong && lat <= centerLat) quadrant = 'Southeast';
		if (long < centerLong && lat <= centerLat) quadrant = 'Southwest';

		let coords = {};
		coords.lng = long;
		coords.lat = lat;
		coords.quadrant = quadrant;
		return coords;
	},
	generateCoordsArray: (howMany, locRange, float) => {
		let coordsArray = [];
		for (var i = 0; i < howMany; i++) {
			coordsArray.push(Co.generateCoordObj(locRange, float));
		}
		return coordsArray;
	},
	isViz: (item, checkID) => {
		if (item.quadrant) {
			if (document.getElementById(checkID).checked) return false;
			return true;
		}
	},
	findColor: item => {
		let color;
		switch (item.quadrant) {
			case 'Northwest':
				color = 'blue';
				break;
			case 'Northeast':
				color = 'green';
				break;
			case 'Southwest':
				color = 'yellow';
				break;
			case 'Southeast':
				color = 'red';
				break;
		}
		return color;
	},
};
