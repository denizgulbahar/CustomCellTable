import React, { useState, useEffect } from "react";
import { View, Switch, StyleSheet, Text } from 'react-native';
import { color } from "../../styles/color";

const SwitchOriginal = ({ status, changeSwitch }) => {
  const [checked, setChecked] = useState(status);

  useEffect(() => {
    setChecked(status);
  }, [status]);

  return (
    <View style={styles.container}>
      <Switch
        value={checked}
        onValueChange={changeSwitch}
        trackColor={{ true: color.greenSoft, false: color.redSoft }}
        thumbColor={{ true: color.green, false: color.red }}
        ios_backgroundColor={color.white}
        style={styles.switch}
      />
      <Text style={styles.switchStatusText}>
        {checked ? "Aktif" : "Pasif"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  switch: {
    transform: [{ scaleX: 1 }, { scaleY: 1 }],
    borderRadius: 15,
  },
  switchStatusText: {
    fontSize: 11,
    textAlign: "center",
    padding: 3,
  }
});

export default SwitchOriginal;
