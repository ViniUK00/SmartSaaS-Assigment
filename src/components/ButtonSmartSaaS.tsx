import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

interface ButtonProps {
  onPress: () => void;
  buttonText: string;
  disabled?: boolean;
  icon?: JSX.Element | string;
  defaultColor?: string;
  onPressColor?: string;
  onHoverColor?: string;
  portrait?: boolean;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  buttonText,
  disabled = false,
  icon,
  defaultColor = '#58BFEA',
  onPressColor = '#99DBF7',
  portrait = false,
  outline = false,
}) => {
  const [buttonColorState, setButtonColorState] = useState(defaultColor);

  const buttonStyles = [
    styles.button,
    outline ? styles.outlineButton : null,
    { backgroundColor: buttonColorState },
    disabled ? styles.disabledButton : null,
    Platform.OS === 'web' ? styles.webButton : styles.mobileButton,
  ];

  const handlePressIn = () => {
      setButtonColorState(onPressColor);
  };

  const handlePressOut = () => {
      setButtonColorState(defaultColor);
  };

  const handleHoverIn = () => {
    setButtonColorState(onPressColor);
  };

  const handleHoverOut = () => {
    setButtonColorState(defaultColor);
  };

  return (
    <Animatable.View transition={'backgroundColor'} style={[buttonStyles, {maxHeight: portrait?80:40}]}>
        <Pressable
        style={{flexDirection:portrait?'column':'row', minWidth:'100%',minHeight:'100%',justifyContent:'center',alignItems:'center', gap:15}}
      onPress={onPress}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
    >
      {icon && (
        <View style={styles.iconContainer}>
           {typeof icon === 'string' ? (
            <Text>{<AntDesign name={icon} size={24} color="black" />}</Text>
          ) : (
            icon
          )}
        </View>
      )}
      <Text style={styles.buttonText}>{buttonText}</Text>
    </Pressable>
    </Animatable.View>
    
  );
};
const {width} = Dimensions.get('window')
console.log(width);

const mobileWidth = width * 0.8

const styles = StyleSheet.create({
  button: {
    maxWidth: 300,
    maxHeight: 40,
    width: '100%',
    borderRadius: 17,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#58BFEA',
  },
  disabledButton: {

    backgroundColor:'#848484',
  },
  outlineButton:{
    backgroundColor: 'white',
    borderWidth:1
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  iconContainer: {
    marginRight: 5,
  },
  portraitButton: {
    flexDirection: 'column',
  },
  webButton: {
    maxWidth: 300,
    width: '300px',
    padding: '10px',
  },
  mobileButton: {
    minWidth: mobileWidth
  },
  rotateButton: {
    flexDirection:'column',
    maxHeight:80,
  },
});

export default Button;
