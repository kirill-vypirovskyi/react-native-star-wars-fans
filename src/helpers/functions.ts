import { ToastAndroid } from "react-native";
import { ErrorMessage } from "../types/ErrorMessage";
import { SortOrder } from "../types/SortOrder";
import { Person } from "../types/Person";

export const showToast = (message: ErrorMessage) => {
  ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.TOP);
};

export const formatDate = (date: string): string => {
  return date.split('-').reverse().join('.');
};

export const sortPeople = (
  people: Person[],
  sortOrder: SortOrder
): Person[] => {
  let sortedPeople = [...people];

  if (sortOrder === SortOrder.ASC) {
    return sortedPeople.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortOrder === SortOrder.DESC) {
    return sortedPeople.sort((a, b) => b.name.localeCompare(a.name));
  }

  return people;
};

export const filterPeople = (people: Person[], query: string) => {
  return people.filter((person) =>
    person.name.toLowerCase().includes(query.toLowerCase())
  );
};

export const getGenderIcon = (gender: string) => {
  switch (gender) {
    case 'male':
      return '♂️';
    case 'female':
      return '♀️'
    case 'n/a':
      return '🤖'
    default:
      return '🤷‍♂️';
  }
}

export const emptyFunction = () => {};
