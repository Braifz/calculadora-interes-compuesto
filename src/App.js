import { useState } from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import Input from './components/Input'
import Button from './components/Button'
import Container from './components/Container';
import Section from './components/Section';
import Balance from './components/Balance';

const compoundInterest = (deposit, contribution, year, rate) => {
  let total = deposit;
  for (let i = 0; i < year; i++){
    total = (total + contribution) * (rate + 1)
  }
  return Math.round(total)
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const App = () => {
  const [balance, setBalance] = useState('')
  const handleSubmit = ({ deposit,contribution,year,rate}) => {
    const val = compoundInterest(Number(deposit), Number(contribution), Number(year), Number(rate))
    setBalance(formatter.format(val))
  }

  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            deposit: "",
            contribution: "",
            year: "",
            rate: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            deposit: Yup
              .number()
              .required('Obligatorio')
              .typeError('Debe ser un número'),
            contribution: Yup
              .number()
              .required('Obligatorio')
              .typeError('Debe ser un número'),
            year: Yup
              .number()
              .required('Obligatorio')
              .typeError('Debe ser un número'),
            rate: Yup
              .number()
              .required('Obligatorio')
              .typeError('Debe ser un número')
              .min(0, 'El valor minimo es 0')
              .max(1, 'El valor maximo es 1'),

          })}
        >
          <Form>
            <Input name="deposit" label="deposito inicial"/>
            <Input name="contribution" label="Contribucion anual"/>
            <Input name="year" label="Años"/>
            <Input name="rate" label="Interes estimado" />
            <Button type="submit">Calcular</Button>
          </Form>
        </Formik>
        {balance !== '' ? <Balance> Balance final:{balance}</Balance> : null}
      </Section>
    </Container>
  )
}

export default App;
