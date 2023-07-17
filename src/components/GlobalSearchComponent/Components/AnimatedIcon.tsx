import { View, Text } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import searchStyles from "../StyleSheet";
import * as Animatable from "react-native-animatable";

const AnimatedIcon = ({ hasText }: { hasText: boolean }) => {
  // Icon is component that is depended on hasText It returns an animated view of icons

  const Icon = () => {
    switch (hasText) {
      case true:
        // If hasText is true, render a ellipsis-h icon.
        return (
          <Animatable.View
            animation={"fadeInDown"}
            duration={250}
            style={searchStyles.searchIconStyle}
          >
            <FontAwesome5
              name="ellipsis-h"
              size={24}
              color={"rgba(0,0,0,0.25)"}
            />
          </Animatable.View>
        );
      case false:
        // If hasText is false, render a search icon.
        return (
          <Animatable.View
            animation={"fadeInDown"}
            duration={250}
            style={searchStyles.searchIconStyle}
          >
            <FontAwesome5
              name={"search"}
              size={20}
              color={"rgba(0,0,0,0.25)"}
            />
          </Animatable.View>
        );
    }
  };

  return (
    <View style={{  }}>
      <Icon />
    </View>
  );
};

export default AnimatedIcon;
