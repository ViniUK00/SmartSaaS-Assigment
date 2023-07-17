import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import DropdownPicker from "../components/DropdownPicker";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";
import { selectSelectedItem } from "../redux/dropdownPickerValue";

// These are hardcoded labels and values for the dropdowns that are passed as props
const itemsForAccurrancy = [
  { label: "Today to Next Week", value: "tnw" },
  { label: "Next Month 1 Week", value: "nmw" },
  { label: "Next Year 1 Week", value: "nyw" },
];

const itemsForWhatToPredict = [{ label: "Temperatures", value: "temp" }];

const itemsForWhenToPredict = [
  { label: "Tommorrow", value: "tommorrow" },
  { label: "Next Week", value: "nextweek" },
  { label: "Next Month", value: "nextmonth" },
];

const PredictionsInitialScreen = () => {
  // selectedItem represents the item that is saved in the state and will be used to filter the backend.
  const selectedItem = useSelector(selectSelectedItem);

  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <LinearGradient
      colors={["#C33764", "#1D2671"]}
      style={[{ flex: 1 }, styles.container]}
    >
      <View style={styles.containerText}>
        <Text style={styles.text}>
          This screen is a weather prediction model for the future. We will
          train the model using TensorFlow and display the prediction in a
          chart.
        </Text>
        <LottieView
          autoPlay
          style={{
            height: 150,
            alignSelf: "center",
          }}
          source={require("../../assets/75705-welcome-animation.json")}
        />
      </View>
      <DropdownPicker
        zIndex={3}
        label="What to predict?"
        itemsDropdown={itemsForWhatToPredict}
        key={3}
      />
      <DropdownPicker
        zIndex={2}
        label="When to predict?"
        itemsDropdown={itemsForWhenToPredict}
        key={2}
      />
      <DropdownPicker
        zIndex={1}
        label="Accurancy?"
        itemsDropdown={itemsForAccurrancy}
        key={1}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, isPressed && styles.buttonPressed]}
          onPress={() => {}}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={styles.textStyle}>Let's go!</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 15,
  },
  containerText: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    padding: 4,
    color: "white",
    fontWeight: "600",
  },
  textArea: {
    height: 120,
    width: "100%",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    alignContent: "flex-end",
  },
  button: {
    backgroundColor: "#C33764",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
    minWidth: "100%",
    minHeight: "5%",
  },
  textStyle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    backgroundColor: "#C22164",
  },
});

export default PredictionsInitialScreen;
