import React, { useRef } from 'react';
import { 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  Dimensions,
  Animated,
  Easing,
  View,
  Modal,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { color } from '../../styles/color';
import ButtonOriginal from '../button/buttonOriginal'

const { width } = Dimensions.get("window")

const CustomModal = ({
  visible, // Controls modal visibility
  setModalVisible, // Function to toggle modal visibility
  modalOpenTitle = "Modalı Aç", // Title for the open modal button
  actionTitle = "Sepeti Onayla", // Title for the action button
  onPress, // Function for action button press
  children, // Content to render inside the modal
  backgroundColor = color.white, // Modal background color
  closeIconColor = color.danger, // Close icon color
  buttonColor = color.apricot, // Action button color
  buttonTextColor = color.white, // Action button text color
  keyboardVerticalOffset = 0, // Vertical offset for the keyboard
}) => {

  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

  const animation = useRef(new Animated.Value(0)).current
  // Modal Actions
  const openModal = () => {
    setModalVisible(true)
    Animated.timing(animation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true, // Use the native driver for better performance
      easing: Easing.out(Easing.ease),  // Easing function to makes more realistic effect
    }).start();
  };

  const closeModal = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true, // Use the native driver for better performance
      easing: Easing.in(Easing.ease) // Easing function to makes more realistic effect
    }).start(() => setModalVisible(false));
  };
  const modalBackgroundStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
  const modalStyle = {
    opacity: 1,
    borderRadius: 20,
    transform: [{ scale: animation }], // Scale effect
    backgroundColor: backgroundColor,
    position: 'absolute',
    top: width >= 500 ? 20 : 15,
    left:  width >= 500 ? 20 : 15,
    right:  width >= 500 ? 20 : 15,
    bottom:  width >= 500 ? 20 : 15,
  };

  return (
    <>
      {/* Button to open the modal */}
      <ButtonOriginal 
        buttonStyle={{ width: "80%", alignSelf: 'center' }}
        title={modalOpenTitle} 
        onPress={openModal} 
      />
      {visible && (
      <View style={modalBackgroundStyle}>
        <Animated.View style={modalStyle}>
            <Modal 
              visible={visible} 
              onDismiss={closeModal}
              transparent={true}
            >
              <KeyboardAvoidingView 
                behavior={behavior} 
                keyboardVerticalOffset={keyboardVerticalOffset}
              >
                {/* Close button */}
                <IconButton
                  icon="close-circle"
                  onPress={closeModal}
                  style={styles.closeButton}
                  iconColor={closeIconColor}
                  size={width >= 500 ? 40 : 35}
                />
                <ScrollView contentContainerStyle={styles.scrollView}>
                  {children} 
                  {/* Action button */}
                  <ButtonOriginal
                    buttonStyle={{ ...styles.addButton, backgroundColor: buttonColor }}
                    title={actionTitle}
                    titleStyle={{ color: buttonTextColor }}
                    onPress={() => onPress(closeModal)}
                  />
                </ScrollView>
              </KeyboardAvoidingView>
            </Modal>
        </Animated.View>
      </View>
       )}
    </>
  );
};

const styles = StyleSheet.create({
  addButton: {
    margin: width >= 500 ? 30 : 20,
    alignSelf: "flex-end",
  },
  scrollView: {
    height: "90%", 
    padding: width >= 500 ? 20 : 10,
  },
  closeButton: {
    marginTop: width >= 500 ? 60 : 80,
    marginRight: width >= 500 ? 30 : 20,
    alignSelf: 'flex-end',
  },
});

export default CustomModal;

