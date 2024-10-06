import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { color } from "../../../../../styles/color";
import InputOriginal from "../../../../input/inputOriginal";
import Loading from "../../../../loading/loading";

const width = Dimensions.get('window').width;

const EditableCellInput = ({ onChange, value, isLoading }) => {
  
  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading loadingSize="20" textStyle={{ fontSize: 10 }} />
      ) : (
        <InputOriginal
          value={value}
          onChangeText={onChange}
          multiline
          viewStyle={styles.inputComponent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    alignSelf: "center",
  },
  inputComponent: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: color.grey,
    backgroundColor: color.white,
  },
});

export default EditableCellInput;
