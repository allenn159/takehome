import type { Film, Person, Planet, Species, Starship, Vehicle } from "@/types/swapi";

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

export const mockFilm: Film = {
  title: "A New Hope",
  episode_id: 4,
  opening_crawl: "It is a period of civil war...",
  director: "George Lucas",
  producer: "Gary Kurtz",
  release_date: "1977-05-25",
  characters: ["https://swapi.info/api/people/1/"],
  planets: ["https://swapi.info/api/planets/1/"],
  starships: ["https://swapi.info/api/starships/10/"],
  vehicles: ["https://swapi.info/api/vehicles/14/"],
  species: ["https://swapi.info/api/species/1/"],
  created: "2014-12-10T14:23:31.880000Z",
  edited: "2014-12-20T19:49:45.256000Z",
  url: "https://swapi.info/api/films/1/",
};

export const mockSpecies: Species = {
  name: "Wookiee",
  classification: "mammal",
  designation: "sentient",
  average_height: "210",
  skin_colors: "gray",
  hair_colors: "black, brown",
  eye_colors: "blue, green",
  average_lifespan: "400",
  homeworld: "https://swapi.info/api/planets/14/",
  language: "Shyriiwook",
  people: ["https://swapi.info/api/people/13/"],
  films: ["https://swapi.info/api/films/1/"],
  created: "2014-12-10T16:44:31.486000Z",
  edited: "2014-12-20T21:36:42.136000Z",
  url: "https://swapi.info/api/species/3/",
};

export const mockVehicle: Vehicle = {
  name: "Sand Crawler",
  model: "Digger Crawler",
  manufacturer: "Corellia Mining Corporation",
  cost_in_credits: "150000",
  length: "36.8",
  max_atmosphering_speed: "30",
  crew: "46",
  passengers: "30",
  cargo_capacity: "50000",
  consumables: "2 months",
  vehicle_class: "wheeled",
  pilots: [],
  films: ["https://swapi.info/api/films/1/"],
  created: "2014-12-10T15:36:25.724000Z",
  edited: "2014-12-20T21:23:49.118000Z",
  url: "https://swapi.info/api/vehicles/4/",
};

export const mockPeople: Person[] = [mockPerson];
export const mockPlanets: Planet[] = [mockPlanet];
export const mockStarships: Starship[] = [mockStarship];
