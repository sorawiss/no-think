
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import colors from '../theme/colors';


export default function CustomText({ style, children, ...props }: { style?: StyleProp<TextStyle>, children: React.ReactNode }) {
    return <Text style={[styles.text, style]} {...props} >{children}</Text>;
}

const styles = StyleSheet.create({
    text: {
        color: colors.primary,
    },
});


export const typography = StyleSheet.create({
    h1: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    h2: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    h3: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    h4: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    h5: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    h6: {
        fontSize: 12,
        fontWeight: 'bold',
    },
})