import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Button, TextField } from '@mui/material';


const formValidation = yup.object().shape({
  firstName: yup.string().required('First Name is  required'),
  lastName: yup.string().required('Last Name is required'),
  city: yup.string().required('City is required'),
  userName: yup.array().of(yup.object().shape({ userName: yup.string().required('User Name is required') }))
})

const DefaultValues = { firstName: '', lastName: '', city: '', users: [{ userName: '' }] }
function App() {
  const { register, control, handleSubmit, formState: { errors }, trigger } = useForm({
    resolver: yupResolver(formValidation), defaultValues: DefaultValues
  });
  console.log(errors)
  const { fields, append, remove } = useFieldArray({ control, name: 'users' })
  console.log(fields)
  const onSubmit = async (data: any) => {
    // trigger will check form validation for every field or we can also specify
    await trigger()
    console.log(data)

  }
  return (
    <div >
      <DevTool control={control} />
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <TextField error={!!errors?.firstName} helperText={errors?.firstName?.message as string} label="First Name" {...register('firstName')} />
        <TextField error={!!errors?.lastName} helperText={errors?.lastName?.message as string} label="Last Name" {...register('lastName')} />
        <Controller control={control} name="city" render={({ field: { onChange } }) => <Autocomplete onChange={(event, value) => onChange(value)} options={["Surat", "Ahmedabad", "Baroda"]} renderInput={(props) => <TextField {...props} />} />} />
        <button type='submit'>submit</button>
      </form>
      <p>ARRAY FIELD FOR USERS</p>
      {
        fields.map((field, index) => (
          <div key={index}>
            <TextField label="User Name" {...register(`users[${index}].userName` as any)} />
            <Button onClick={() => remove(index)}>delete</Button>
          </div>
        ))
      }
      < Button onClick={() => append({} as any)
      }> ADD USER</Button >
    </div >
  )
}

export default App
