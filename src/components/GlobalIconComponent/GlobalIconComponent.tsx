import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { IconTypes } from "./Types";
import { iconStyles } from "./Stylesheet";

// This is an icon component that accepts icon, text, onPress funtion, and a dark theme as props,
// the component will render a spinner whenever is pressed and loading, it accepts asychronous functions
const GlobalIconComponent = ({
  text,
  icon,
  iconColor,
  onPress,
  onSuccess,
  onError,
  darkTheme,
  backgroundColor,
  onHoverColor,
  fontSize,
}: IconTypes) => {
  const [loading, setLoading] = useState(false);
  const [buttonColorState, setButtonColorState] = useState(backgroundColor);

  const iconContainerStyles = [
    iconStyles.container,
    Platform.OS === "web" ? iconStyles.webIcon : iconStyles.mobileIcon,
    { backgroundColor: buttonColorState },
    { opacity: loading ? 0.8 : 1 },
  ];

  // this function handle clicks on the icon when clicked the loading state is set to true, in addition i passed
  // on press prop, if the promise is true it will return and setloading to false, if promise failes still it
  // will set loading to false
  const handleClick = () => {
    setLoading(true);
    onPress()
      .then(() => {
        setLoading(false);
        if (onSuccess) onSuccess();
      })
      .catch(() => {
        setLoading(false);
        if (onError) onError();
      });
  };

  // function below will handle the hoverIn and hoverOut effect to make the icon more interaction
  const handleHoverIn = () => {
    setButtonColorState(onHoverColor);
  };

  const handleHoverOut = () => {
    setButtonColorState(buttonColorState);
  };

  return (
    <View style={iconStyles.parentContainer}>
      <Pressable
        style={iconContainerStyles}
        onPress={handleClick}
        disabled={loading}
        onHoverIn={handleHoverIn}
        onHoverOut={handleHoverOut}
      >
        {loading ? (
          <>
            <ActivityIndicator size="small" color="#FFFFFF" />
            {text && (
              <Text style={[iconStyles.text, { fontSize: fontSize }]}>
                {text}
              </Text>
            )}
          </>
        ) : (
          <>
            {icon && <Text style={{ color: iconColor }}>{icon}</Text>}
            {text && (
              <Text style={[iconStyles.text, { fontSize: fontSize }]}>
                {text}
              </Text>
            )}
          </>
        )}
      </Pressable>
    </View>
  );
};

export default GlobalIconComponent;
