import * as Yup from "yup";
import { RegisterData } from "../../views/register";
import { Alert } from "react-native";

export const RegisterSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string().required('Required'),
    passwordRepeat: Yup.string().required('Required'),
});

export function passwordsEquals(data: RegisterData): boolean {
    const result = data.password === data.passwordRepeat;
    if (!result) {
        Alert.alert("Passwords should be equal!");
    }
    return result;
}

export const validate = (touched?: boolean, error?: string): boolean => !!(error && touched);
