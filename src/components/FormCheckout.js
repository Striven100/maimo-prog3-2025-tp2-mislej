import React from 'react';
import { Formik, Form, Field } from 'formik';

const handleSubmit = async (e) => {
  e.preventDefault()

  // Obtener los datos del formulario
  const firstName = e.target.firstName.value
  const lastName = e.target.lastName.value
  const card = e.target.card.value

  // Validar campos obligatorios
  if (!firstName || !lastName || !card) {
    alert('Por favor completá todos los campos.')
    return
  }

  // Armar payload con la info de compra
  const onlyDigits = card.replace(/[^\d]/g, '')
  const payload = {
    buyer: {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      cardLast4: onlyDigits.slice(-4)
    },
    items: Carrito.map(n => ({
      productId: n._id,
      name: n.name,
      price: n.price || 'undefined',
      quantity: n.cantidad || 1
    })),
    total: Carrito.reduce((acc, n) => acc + (parseFloat(n.price) || 0) * (n.cantidad || 1), 0)
  }

  try {
    const res = await fetch('http://localhost:4000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (res.ok) {
      alert('Compra registrada correctamente 🎉')
    } else {
      alert('Hubo un error al registrar la compra.')
    }
  } catch (err) {
    console.error(err)
    alert('Error de conexión con la API.')
  }
}


function validateEmail(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}

function validateUsername(value) {
  let error;
  if (value === 'admin') {
    error = 'Nice try!';
  }
  return error;
}
function validateEmptyText(value) {
  let error;
  if (value === '') {
    error = 'Required!';
  }
  return error;
}

export const CheckoutForm = ({handleAddOrder}) => (
      <div className="flex items-center justify-center ">
      <div className="w-full max-w-md rounded-2xl bg-gray p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Place Order
        </h2>

        <Formik
          initialValues={{
            username: "",
            company:"",
            email: "",
          }}
          onSubmit={(values) => {
            handleAddOrder(values)
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  validate={validateEmail}
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="you@example.com"
                />
                {errors.email && touched.email && (
                  <div className="mt-1 text-sm text-red-600">
                    {errors.email}
                  </div>
                )}
              </div>  
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700"
                >
                  Empresa
                </label>
                <Field
                  name="company"
                  validate={validateEmptyText}
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter username"
                />
                {errors.company && touched.company && (
                  <div className="mt-1 text-sm text-red-600">
                    {errors.company}
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <Field
                  name="username"
                  validate={validateUsername}
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter username"
                />
                {errors.username && touched.username && (
                  <div className="mt-1 text-sm text-red-600">
                    {errors.username}
                  </div>
                )}
              </div>

              <button
  type="submit"
  onClick={handleSubmit}
  className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
>
  Submit
</button>



            </Form>
          )}
        </Formik>
      </div>
    </div>
);