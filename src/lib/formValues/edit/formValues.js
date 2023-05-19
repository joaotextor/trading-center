import * as yup from 'yup'

const validationSchema = yup.object().shape({
    title: yup.string()
        .min(6, 'Write a longer title')
        .max(100, 'Title too large')
        .required('Mandatory field'),
    category: yup.string().required('Mandatory field'),
    description: yup.string()
        .min(50, "Write a description with at least 50 characters")
        .required('Mandatory field'),
    price: yup.number()
        .required("Mandatory field"),
    contactName: yup.string().required('Mandatory field'),
    contactEmail: yup.string()
        .email('Insert a valid email address')
        .required('Mandatory field'),
    contactPhone: yup.number('Phone must contain only numbers.').required('Mandatory field'),
    files: yup.array()
        .min(1, "Submit at least one image")
        .required('Mandatory field'),
    location: yup.string()
        .required('Mandatory field')
})

export {
    validationSchema,
}