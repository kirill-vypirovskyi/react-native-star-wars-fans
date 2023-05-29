import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { IconSearch } from "../icons/IconSearch";
import RoundedButton from "./RoundedButton";

type Props = {
  query: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
};

export const Search = ({ query, onChange, onSubmit }: Props) => {
  return (
    <View className="flex flex-row mb-2 items-center justify-between">
      <View className="p-2">
        <IconSearch size={25} color="#000000" />
      </View>

      <TextInput
        placeholder="Search for a name"
        className="p-4 text-lg w-3/4"
        onChangeText={onChange}
        value={query}
        onSubmitEditing={onSubmit}
      />

      <RoundedButton disabled={query === ""} onClick={() => onChange("")}>
        <View className={`p-2 ${query === "" ? 'opacity-0' : ''}`}>
          <Text className="">❌</Text>
        </View>
      </RoundedButton>
    </View>
  );
};
