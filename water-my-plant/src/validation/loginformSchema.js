import * as yup from 'yup'

const formSchema = yup.object().shape({
    username: yup.string().trim().required('Username is Required !'),
    password: yup.string().trim().required('Password is Required !'),
})

export default formSchema