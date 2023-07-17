import {
  View,
  Text,
  TouchableOpacity,
  Touchable,
  Pressable,
} from "react-native";
import * as Animatable from "react-native-animatable";
import React, { useState } from "react";

const GenerateExtendedOptions = ({ icons }: any) => {
  const [selectedIcon, setSelectedIcon] = useState(-1); // -1 means no icon selected

  return (
    <View style={{ zIndex: -1, gap: 13 }}>
      {icons.map((icon: any, index: number) => {
        return (
          <Pressable
            onPressIn={() => setSelectedIcon(index)} 
            onPressOut={() => setSelectedIcon(-1)} 
            onHoverIn={() => setSelectedIcon(index)} 
            onHoverOut={() => setSelectedIcon(-1)}
            key={index}
          >
            <Animatable.View
              animation={"slideInRight"}
              duration={200}
              delay={(index + 1) * 100}
              style={selectedIcon === index ? { shadowOpacity: 0.1 } : null}
            >
              <Text
                style={
                  selectedIcon === index
                    ? {
                        transform: [{ scale: 1.4 }],
                      }
                    : null
                }
              >
                {icon}
              </Text>
            </Animatable.View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default GenerateExtendedOptions;
