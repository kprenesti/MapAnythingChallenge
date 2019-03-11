import { Co } from './utils.js';
// Uses approximate coordinates of the continental USA.
const range = { minLat: 25.02314, maxLat: 50.23658, minLong: -120.365, maxLong: -80.9099 };
const CoordArray = Co.generateCoordsArray(200, range, 4);

export let map;
export function initMap() {
	map = new window.google.maps.Map(document.getElementById('map'), {
		center: {
			lat: Co.centerPoint(range.maxLat, range.minLat),
			lng: Co.centerPoint(range.maxLong, range.minLong),
		},
		zoom: 5, // 5 = landmass/continent, 1 = world, 10 = city
	});

	// Used for counts in index.  Must be outside forEach.
	let SECount = 0;
	let SWCount = 0;
	let NECount = 0;
	let NWCount = 0;
	const SEdiv = document.getElementById('SoutheastCount');
	const SWdiv = document.getElementById('SouthwestCount');
	const NWdiv = document.getElementById('NorthwestCount');
	const NEdiv = document.getElementById('NortheastCount');

	CoordArray.forEach(item => {
		let checkID = `${item.quadrant}Toggle`;

		// Check for valid lat and lng
		if (item.lat < range.minLat || !item.lat) item.lat = range.minLat;
		if (item.lat > range.maxLat) item.lat = range.maxLat;
		if (item.lng < range.minLong || !item.lng) item.lng = range.minLong;
		if (item.lng > range.maxLong) item.lng = range.maxLong;

		// Set Color for Icons
		let color = Co.findColor(item);

		// Set Counts on Index
		if (item.quadrant) {
			if (item.quadrant === 'Southwest') SWCount += 1;
			if (item.quadrant === 'Southeast') SECount += 1;
			if (item.quadrant === 'Northeast') NECount += 1;
			if (item.quadrant === 'Northwest') NWCount += 1;
		}

		let latLng = new window.google.maps.LatLng(item.lat, item.lng);
		new window.google.maps.Marker({
			position: latLng,
			map: map,
			visible: Co.isViz(item, checkID),
			icon: `http://maps.google.com/mapfiles/ms/micons/${color}.png`,
		});
	}); //end forEach
	SEdiv.innerHTML = SECount;
	NEdiv.innerHTML = NECount;
	SWdiv.innerHTML = SWCount;
	NWdiv.innerHTML = NWCount;
} //end initMap
