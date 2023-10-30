import { useEffect } from "react";
import { BackHandler, Alert } from "react-native";

type useBackactionProps = {
  back?: () => void;
  title?: string;
};
export const useBackAction = ({
  back,
  title = "Are you sure you want to go back?",
}: useBackactionProps) => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", title, [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: back },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [back, title]);
};
