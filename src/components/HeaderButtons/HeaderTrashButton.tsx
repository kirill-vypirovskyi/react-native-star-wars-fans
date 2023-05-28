import { View, TouchableOpacity, Modal, Button, Text, StyleSheet } from "react-native";
import { useFavouritesContext } from "../../context.ts/favouritesContext";
import { IconTrash } from "../../icons/IconTrash";
import { useState } from "react";

export const HeaderTrashButton = () => {
  const { clearAllFavourites, favourites } = useFavouritesContext();

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAction = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    clearAllFavourites();

    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const buttonDisabled = favourites.length === 0;

  return (
    <>
      <TouchableOpacity onPress={handleAction} disabled={buttonDisabled}>
        <View className="p-2">
          <IconTrash color={ buttonDisabled ? '#f0f0f0' : '#000000'}/>
        </View>
      </TouchableOpacity>

      <Modal visible={showConfirmation} animationType="slide" transparent>
        <View style={styles.container} className="h-1/4 flex justify-between p-5 mx-10 my-auto bg-white rounded">
          <Text className="text-xl">Are you sure you want to clear all your favourites?</Text>
          <View className="flex flex-row justify-between">
            <Button color='#55aa55' title={"Confirm"} onPress={handleConfirm} />
            <Button color='#ee0000' title={"Cancel"} onPress={handleCancel} />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
});