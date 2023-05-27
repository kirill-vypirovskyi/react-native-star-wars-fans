import axios from "axios";
import { Planet } from "../types/planet";
import { Person } from "../types/person";
import { requestResult } from "../types/requestResult";
import { Specie } from "../types/specie";
import { Vehicle } from "../types/Vehicle";
import { Starship } from "../types/Starship";
import { Film } from "../types/Film";

const BASE_URL = "https://swapi.dev/api";

const get = async <T>(path: string): Promise<T> => {
  const { data } = await axios.get<T>(path);

  return data;
};

export const getPeople = (page: number, query = "") => {
  // console.log("sending request getPeople");

  return get<requestResult<Person>>(
    `${BASE_URL}/people?search=${query}&page=${page}`
  );
};

export const getPlanet = (url: string) => {
  // console.log("sending request getPlanet");

  return get<Planet>(url);
};

export const getSpecie = (url: string) => {
  // console.log("sending request getSpecie");

  return get<Specie>(url);
};

export const getSpeciesNames = async (urls: string[]) => {
  return Promise.all(
    urls.map(async (url) => {
      const specie = await getSpecie(url);

      return specie.name;
    })
  );
};

export const getVehicle = async (url: string) => {
  return get<Vehicle>(url);
};

export const getVehicles = async (urls: string[]) => {
  const vehicles = await Promise.all(
    urls.map((url) => getVehicle(url))
  );

  return vehicles;
};

export const getStarship = async (url: string) => {
  return get<Starship>(url);
};

export const getStarships = async (urls: string[]) => {
  const starships = await Promise.all(
    urls.map((url) => getStarship(url))
  );

  return starships;
};

export const getFilm = async (url: string) => {
  return get<Film>(url);
};

export const getFilms = async (urls: string[]) => {
  const films = await Promise.all(
    urls.map((url) => getFilm(url))
  );

  return films.map(film => ({...film, name: film.title}));
};