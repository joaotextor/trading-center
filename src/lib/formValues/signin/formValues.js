import * as yup from 'yup'

const initialValues = {
    email: '',
    password: '',
}

const validationSchema = yup.object().shape({
    email: yup.string()
        .email("Insert a valid email address")
        .required("Mandatory field."),
    password: yup.string()
        .required("Mandatory field."),
})

export {
    initialValues,
    validationSchema,
}