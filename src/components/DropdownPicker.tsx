import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {
  selectSelectedItem,
  setSelectedItem,
} from "../redux/dropdownPickerValue";
import { useDispatch, useSelector } from "react-redux";
import dropdownPickerValueSlice from '../redux/dropdownPickerValue';


interface DropDownPickerProps {
  zIndex?: number;
  label?: string;
  itemsDropdown: { label: string; value: string }[];
  key?: number;
}

const DropdownPicker: React.FC<DropDownPickerProps> = ({
  zIndex,
  label,
  itemsDropdown,
  key,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([{ label: value, value: value }]);

  const item = useSelector(selectSelectedItem);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setSelectedItem({
        item: value,
      })
    );
  }, [value]);

  

  return (
    <View style={{ zIndex: zIndex }}>
      <Text style={styles.dropdownLabel}>{label}</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={itemsDropdown}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        containerStyle={{}}
        dropDownContainerStyle={{}}
        key={key}
      />
    </View>
  );
};

export default DropdownPicker;

const styles = StyleSheet.create({
  dropdownLabel: {
    color: "white",
    paddingVertical: 5,
  },
});
