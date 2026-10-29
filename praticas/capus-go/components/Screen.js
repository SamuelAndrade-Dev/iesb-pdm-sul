import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export function Screen({ children, style }) {
  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
}

export function PageHeading({ eyebrow, title, description, children }) {
  return (
    <View style={styles.heading}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
      {children}
    </View>
  );
}

export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function ActionButton({ label, onPress, icon, variant = 'primary', disabled = false }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' && styles.buttonSecondary,
        variant === 'quiet' && styles.buttonQuiet,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.buttonPressed,
      ]}
    >
      <Text style={[
        styles.buttonLabel,
        variant === 'secondary' && styles.buttonLabelSecondary,
        variant === 'quiet' && styles.buttonLabelQuiet,
      ]}>
        {icon ? `${icon}  ` : ''}{label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heading: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 18,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    color: colors.ink,
    fontSize: 29,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  description: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 7,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
  },
  button: {
    alignItems: 'center',
    borderRadius: 13,
    backgroundColor: colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  buttonLabel: { color: '#FFFFFF', fontSize: 14, fontWeight: '700', textAlign: 'center' },
  buttonSecondary: {
    backgroundColor: colors.accent,
  },
  buttonLabelSecondary: { color: colors.primaryDark },
  buttonQuiet: {
    backgroundColor: 'transparent',
    borderColor: colors.border,
    borderWidth: 1,
  },
  buttonLabelQuiet: { color: colors.ink },
  buttonDisabled: {
    opacity: 0.55,
  },
  buttonPressed: { opacity: 0.78 },
});
