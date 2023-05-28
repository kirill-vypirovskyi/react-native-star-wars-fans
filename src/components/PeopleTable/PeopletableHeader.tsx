import { HearthButton } from "../HearthButton";
import { View, Text } from "react-native";
import { PeopleTableCell } from "./PeopleTableCell";
import RoundedButton from "../RoundedButton";
import { IconArrowLeft } from "../../icons/IconArrowLeft";
import { SortOrder } from "../../types/SortOrder";

type Props = {
  sortOrder: SortOrder;
  onOrderChange: (order: SortOrder) => void;
};

export const PeopleTableHeader = ({ sortOrder, onOrderChange }: Props) => {
  const handleSortChange = () => {
    switch (sortOrder) {
      case SortOrder.NONE:
        onOrderChange(SortOrder.ASC);
        break;

      case SortOrder.ASC:
        onOrderChange(SortOrder.DESC);
        break;

      default:
        onOrderChange(SortOrder.NONE)
    }
  };

  return (
    <View className="flex flex-row bg-gray-100 border-b border-b-gray-300">
      <View>
        <PeopleTableCell>
          <HearthButton
            fill={true}
            color="#000000"
            size={20}
            onClick={() => {}}
          />
        </PeopleTableCell>
      </View>

      <View style={{ width: 324 }} className="flex justify-center">
        <PeopleTableCell>
          <View>
            <Text className=" leading-9 font-bold ">Name</Text>
          </View>

          <RoundedButton disabled={false} onClick={handleSortChange}>
            <View className={`p-2 ${sortOrder === SortOrder.DESC ? 'rotate-90' : '-rotate-90'}`}>
              <IconArrowLeft size={20} color={sortOrder === SortOrder.NONE ? "#989898" : "#000000"}/>
            </View>
          </RoundedButton>
        </PeopleTableCell>
      </View>

      <View style={{ width: 150 }} className="flex justify-center">
        <PeopleTableCell>Birth year</PeopleTableCell>
      </View>

      <View style={{ width: 150 }} className="flex justify-center">
        <PeopleTableCell>Gender</PeopleTableCell>
      </View>

      <View style={{ width: 150 }} className="flex justify-center">
        <PeopleTableCell>Home world</PeopleTableCell>
      </View>

      <View style={{ width: 150 }} className="flex justify-center">
        <PeopleTableCell>Species</PeopleTableCell>
      </View>
    </View>
  );
};
