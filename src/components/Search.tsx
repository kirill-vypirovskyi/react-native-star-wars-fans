import React from "react";
import { View, TextInput } from "react-native";
import { IconSearch } from "../icons/IconSearch";

type Props = {
  query: string;
  onChange: (text: string) => void;
}

export const Search = ({ query, onChange }: Props) => {
  return (
    <View className="flex flex-row mb-2">
      <IconSearch size={25} color="#000000" />
      <TextInput
        placeholder="Search for a name"
        className="p-4 text-lg caret-black"
        onChangeText={onChange}
        value={query}
      />
    </View>
  );
};
