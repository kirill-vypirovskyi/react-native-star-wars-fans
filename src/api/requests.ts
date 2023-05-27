import axios from "axios";
import { Planet } from "../types/planet";
import { Person } from "../types/person";
import { requestResult } from "../types/requestResult";
import { Specie } from "../types/specie";

const BASE_URL = "https://swapi.dev/api";

const get = async <T>(path: string): Promise<T> => {
  const { data } = await axios.get<T>(path);

  return data;
};

export const getPeople = (page: number, query = "") => {
  console.log("sending request getPeople");

  return get<requestResult<Person>>(
    `${BASE_URL}/people?search=${query}&page=${page}`
  );
};

export const getPlanet = (url: string) => {
  console.log("sending request getPlanet");

  return get<Planet>(url);
};

export const getSpecie = (url: string) => {
  console.log("sending request getSpecie");
  
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
