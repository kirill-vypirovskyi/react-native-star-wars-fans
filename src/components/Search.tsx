import React from "react";
import { View, TextInput } from "react-native";
import { IconSearch } from "../icons/IconSearch";

type Props = {
  query: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
}

export const Search = ({ query, onChange, onSubmit }: Props) => {
  return (
    <View className="flex flex-row mb-2">
      <IconSearch size={25} color="#000000" />

      <TextInput
        placeholder="Search for a name"
        className="p-4 text-lg w-11/12"
        onChangeText={onChange}
        value={query}
        onSubmitEditing={onSubmit}
      />
    </View>
  );
};
