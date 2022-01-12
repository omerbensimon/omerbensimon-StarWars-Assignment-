import axios from "axios";
const getData = async (data) => {
	return await axios.get(`https://swapi.dev/api/${data}`);
}
export const requestPopulationList = async () => {
	var planets = await getData('planets');
	planets = planets.data.results;
	const planetList = new Map();
	planetList.set('Tatooine', 0);
	planetList.set('Alderaan', 0);
	planetList.set('Naboo', 0);
	planetList.set('Bespin', 0);
	planetList.set('Endor', 0);
	for (var planet of planets) {
		if (planetList.has(planet.name))
			planetList.set(planet.name, planet.population);
	}
	return planetList;
}
export const requestVehiclePopulationPilot = async () => {
	var vehicles = await getData('vehicles');
	var pilot = [];
	var homeworld = '';
	var populationSum = 0, maxPopulationSum = 0;
	vehicles = vehicles.data.results;
	var largestPopSumVehicleData = { populationPerPlanet: 0 };
	var vehicleData = { vehicleName: '', vehiclePilotNames: [], pilotsHomePlanets: [], populationPerPlanet: [] };
	for (var vehicle of vehicles) {
		largestPopSumVehicleData.vehicleName = vehicle.name;
		if (vehicle.pilots.length !== 0) {
			vehicleData.vehicleName = vehicle.name;
			for (var pilotURL of vehicle.pilots) {
				pilotURL = pilotURL.replace('https://swapi.dev/api/', '');
				pilot = await getData(pilotURL);
				vehicleData.vehiclePilotNames.push(pilot.data.name);
				let homeworldURL = pilot.data.homeworld.replace('https://swapi.dev/api/', '');
				homeworld = await getData(homeworldURL);
				vehicleData.pilotsHomePlanets.push(homeworld.data.name);
				vehicleData.populationPerPlanet.push([homeworld.data.name, homeworld.data.population]);
				populationSum += parseInt(homeworld.data.population);

			}
			if (populationSum > maxPopulationSum) {
				largestPopSumVehicleData = vehicleData;
				maxPopulationSum = populationSum;
			}
			populationSum = 0;
			vehicleData = { vehicleName: '', vehiclePilotNames: [], pilotsHomePlanets: [], populationPerPlanet: [] };
		}
	}
	return largestPopSumVehicleData;
}