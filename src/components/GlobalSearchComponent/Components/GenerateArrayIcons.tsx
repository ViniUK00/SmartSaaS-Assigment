import { View, Text, Pressable, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../../../../stylesheet";
import searchStyles from "../StyleSheet";
import { Ionicons } from "@expo/vector-icons";
import GenerateExtendedOptions from "./GenerateExtendedOptions";
import * as Animatable from "react-native-animatable";

// This component generates the icons array for the search component. In addition,
// it finds breakpoints to decide when to output the burger component.
// Whenever the breakpoint condition is true, the burger component is displayed.
const GenerateArrayIcons = ({ icons }: any) => {
  const [breakpoint, setBreakpoint] = useState(0);
  const [breakpointAchieved, setBreakpointAchieved] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(-1); // -1 means no icon selected

  // Get width of the window
  const sizeOfWindow = useWindowDimensions().width;

  // Calculate size of array of icons
  const sizeOfArray = icons.length * 50 + 50;

  // On every change of sizeOfArray, update the breakpoint
  useEffect(() => {
    setBreakpoint(sizeOfArray);
  }, [sizeOfArray]);

  // On every change of breakpoint or sizeOfWindow, call breakPointHandler
  useEffect(() => {
    breakPointHandler();
  }, [breakpoint, sizeOfWindow]);

  // This function handles logic for checking if breakpoint is achieved
  const breakPointHandler = () => {
    if (breakpoint < 100 || sizeOfWindow < 400) {
      setBreakpointAchieved(true);
    } else {
      setBreakpointAchieved(false);
    }
  };

  return (
    <>
      {!breakpointAchieved ? (
        // If breakpoint is not achieved, map and render each icon in the array of icons
        <Animatable.View
          animation="bounceInDown"
          duration={1000}
          style={searchStyles.iconArrayStyle}
        >
          {icons.map((icon: any, index: number) => {
            return (
              <Pressable
                onPressIn={() => setSelectedIcon(index)}
                onPressOut={() => setSelectedIcon(-1)}
                onHoverIn={() => setSelectedIcon(index)}
                onHoverOut={() => setSelectedIcon(-1)}
                key={index}
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
              </Pressable>
            );
          })}
        </Animatable.View>
      ) : (
        // If breakpoint is achieved, render a dropdown menu
        <>
          <Pressable onPress={() => setOpenMenu(!openMenu)}>
            <Animatable.View
              animation="bounceInDown"
              duration={1000}
              style={{ overflow: "hidden" }}
            >
              <Ionicons
                name="menu-sharp"
                size={24}
                color={"black"}
                style={{ marginLeft: 5, overflow: "hidden" }}
              />
            </Animatable.View>
          </Pressable>

          {openMenu && (
            <View style={{ shadowRadius: 20, shadowOpacity: 0.4 }}>
              <View pointerEvents="none" style={searchStyles.arrowStyle} />
              <View style={searchStyles.extendedMenuContainer}>
                <Pressable style={searchStyles.iconStyle}>
                  <GenerateExtendedOptions icons={icons} />
                </Pressable>
              </View>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default GenerateArrayIcons;
