import * as yup from 'yup'

const addplantSchema = yup.object().shape({
    speciesID: yup.string().trim().required('Species is Required !'),
    h2oInterval: yup.string().trim().required('h2oInterval is Required !'),
    h2oAmount: yup.string().trim().required('h2oAmount is Required !'),
    nickname: yup.string().trim(),
    
})

export default addplantSchema