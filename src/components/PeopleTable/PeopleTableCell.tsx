import { ReactNode } from "react";
import { View, Text } from "react-native";

type Props = {
  children: ReactNode;
  width: number;
};

export const PeopleTableCell = ({ children, width }: Props) => {
  return (
    <View className={`w-[${width}px] flex justify-center p-2`}>
      <Text className="whitespace-nowrap">{children}</Text>
    </View>
  );
};
