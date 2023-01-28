import * as yup from 'yup'

const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const validationSchema = yup.object().shape({
    name: yup.string()
        .min(4, "Name must have at least 4 characters")
        .required("Mandatory field."),
    email: yup.string()
        .email("Insert a valid email address")
        .required("Mandatory field."),
    password: yup.string()
        .min(8, "Password must be at least 8 characters long.")
        .required("Mandatory field."),
    confirmPassword: yup.string()
        .required("Mandatory field.")
        .oneOf([yup.ref('password'), null], "Passwords must be a match.")

})

export {
    initialValues,
    validationSchema,
}