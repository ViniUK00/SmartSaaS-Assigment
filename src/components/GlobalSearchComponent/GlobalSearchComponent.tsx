import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import searchStyles from "./StyleSheet";
import AnimatedIcon from "./Components/AnimatedIcon";
import GenerateArray from "./Components/GenerateArrayIcons";
import { SearchComponentTypes } from "./Types";

const GlobalSearchComponent = ({
  theme,
  icons,
  placeHolder,
  search,
  setSearch,
}: SearchComponentTypes) => {
  const [hasText, setHasText] = useState(false);

  useEffect(() => {
    setHasText(false);
    if (search != "") {
      setHasText(true);
    }
  }, [search]);

  return (
    <>
      <View
        style={[
          searchStyles.containerStyle,
          { backgroundColor: theme === "dark" ? "#666666" : "#ececec" },
        ]}
      >
        <AnimatedIcon hasText={hasText} />
        <TextInput
          style={searchStyles.inputStyle}
          value={search}
          onChangeText={(text) => setSearch(text)}
          placeholder={placeHolder}
        />
        <View style={{ zIndex: 10 }}>
          <GenerateArray icons={icons} />
        </View>
      </View>
    </>
  );
};

export default GlobalSearchComponent;
