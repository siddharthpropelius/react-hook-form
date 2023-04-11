import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// import { useForm, FormProvider } from 'react-hook-form'

// const methods = useForm();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <FormProvider {...methods}> */}
    <App />
    {/* </FormProvider> */}
  </React.StrictMode>,
)
