import type { Person, Planet, Starship } from "@/types/swapi";

export const mockPerson: Person = {
  name: "Luke Skywalker",
  height: "172",
  mass: "77",
  hair_color: "blond",
  skin_color: "fair",
  eye_color: "blue",
  birth_year: "19BBY",
  gender: "male",
  homeworld: "https://swapi.info/api/planets/1/",
  films: ["https://swapi.info/api/films/1/", "https://swapi.info/api/films/2/"],
  species: [],
  vehicles: ["https://swapi.info/api/vehicles/14/"],
  starships: ["https://swapi.info/api/starships/12/"],
  created: "2014-12-09T13:50:51.644000Z",
  edited: "2014-12-20T21:17:56.891000Z",
  url: "https://swapi.info/api/people/1/",
};

export const mockPlanet: Planet = {
  name: "Tatooine",
  rotation_period: "23",
  orbital_period: "304",
  diameter: "10465",
  climate: "arid",
  gravity: "1 standard",
  terrain: "desert",
  surface_water: "1",
  population: "200000",
  residents: ["https://swapi.info/api/people/1/"],
  films: ["https://swapi.info/api/films/1/"],
  created: "2014-12-09T13:50:49.641000Z",
  edited: "2014-12-20T20:58:18.411000Z",
  url: "https://swapi.info/api/planets/1/",
};

export const mockStarship: Starship = {
  name: "Millennium Falcon",
  model: "YT-1300 light freighter",
  manufacturer: "Corellian Engineering Corporation",
  cost_in_credits: "100000",
  length: "34.37",
  max_atmosphering_speed: "1050",
  crew: "4",
  passengers: "6",
  cargo_capacity: "100000",
  consumables: "2 months",
  hyperdrive_rating: "0.5",
  MGLT: "75",
  starship_class: "Light freighter",
  pilots: ["https://swapi.info/api/people/13/"],
  films: ["https://swapi.info/api/films/1/"],
  created: "2014-12-10T16:59:45.094000Z",
  edited: "2014-12-20T21:23:49.880000Z",
  url: "https://swapi.info/api/starships/10/",
};

export const mockPeople: Person[] = [mockPerson];
export const mockPlanets: Planet[] = [mockPlanet];
export const mockStarships: Starship[] = [mockStarship];
