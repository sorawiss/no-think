
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { colors } from '../theme/colors';


export default function CustomText({ style, children, ...props }: { style?: StyleProp<TextStyle>, children: React.ReactNode }) {
    return <Text style={[styles.text, style]} {...props} >{children}</Text>;
}

const styles = StyleSheet.create({
    text: {
        color: colors.primary,
    },
});