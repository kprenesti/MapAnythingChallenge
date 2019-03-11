import { initMap } from './js/googleMap.js';
if (window.google) initMap();
window.reset = () => {
	return initMap();
};
