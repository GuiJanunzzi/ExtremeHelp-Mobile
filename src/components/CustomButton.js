import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../theme/theme';

export default function CustomButton({ title, onPress, style, textStyle, disabled }) {
  return (
    <TouchableOpacity style={[styles.button, style, disabled && styles.disabled]} onPress={onPress} disabled={disabled}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {
    color: COLORS.white,
    ...FONTS.h3,
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor: COLORS.secondary,
  }
});