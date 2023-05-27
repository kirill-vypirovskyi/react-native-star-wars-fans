import React from "react";
import RoundedButton from "./RoundedButton";
import { IconHeart } from "../icons/IconHeart";
import { TouchableNativeFeedback, View } from "react-native";
import Svg, { G, Path } from "react-native-svg";

type Props = {
  size: number;
  color: string;
  fill: boolean;
  onClick: () => void;
};

export const HearthButton = ({ size, color, fill, onClick }: Props) => {
  return (
    <View className={`rounded-full overflow-hidden w-9`}>
      <TouchableNativeFeedback
        onPress={onClick}
      >
        <View className="flex items-center justify-center p-2">
          <Svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            className="transition"
          >
            <G
              id="Glyphs"
              stroke="none"
              stroke-width="1"
              fill={color}
              fill-rule="evenodd"
            >
              <G
                id={`Glyphs/Regular/heart/16`}
                fill={color}
                fill-rule="nonzero"
              >
                <Path
                  fill={color}
                  d={
                    fill
                      ? "M2.20101013,2.80101013 C3.7538313,1.24818895 6.24221552,1.20113377 7.85173748,2.65984457 L8,2.80101013 L8.14826252,2.65984457 C9.75778448,1.20113377 12.2461687,1.24818895 13.7989899,2.80101013 C15.351811,4.3538313 15.3988662,6.84221552 13.9401554,8.45173748 L13.7989899,8.6 L8,14.3989899 L2.20101013,8.6 L2.05984457,8.45173748 C0.601133766,6.84221552 0.648188953,4.3538313 2.20101013,2.80101013 Z"
                      : "M13.7989899,2.80101013 C15.351811,4.3538313 15.3988662,6.84221552 13.9401554,8.45173748 L13.7989899,8.6 L8,14.3989899 L2.20101013,8.6 L2.05984457,8.45173748 C0.601133766,6.84221552 0.648188953,4.3538313 2.20101013,2.80101013 C3.7538313,1.24818895 6.24221552,1.20113377 7.85173748,2.65984457 L8,2.80101013 L8.14826252,2.65984457 C9.75778448,1.20113377 12.2461687,1.24818895 13.7989899,2.80101013 Z M12.7383297,3.8616703 C11.8016952,2.92503576 10.3210574,2.84920558 9.32194731,3.62897133 L9.18260373,3.74618626 L8,4.87218167 L6.84442743,3.77129698 C5.82118929,2.84393559 4.24290648,2.88043412 3.2616703,3.8616703 C2.32503576,4.79830484 2.24920558,6.27894261 3.02897133,7.27805269 L3.14618626,7.41739627 L3.2616703,7.53933983 L8,12.278 L12.7126482,7.56565879 L12.828703,7.44442743 C13.7157443,6.46567791 13.7209176,4.97909923 12.8609578,3.99294883 L12.7383297,3.8616703 Z"
                  }
                  id="Path"
                />
              </G>
            </G>
          </Svg>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};
