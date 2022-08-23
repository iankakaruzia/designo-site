import { StateUpdater, useState } from 'preact/hooks'
import { z } from 'zod'

type FormData = {
  name: string
  email: string
  message: string
  phone: string
}

const formSchema = z
  .object({
    name: z.string().min(1, "Can't be empty"),
    email: z
      .string()
      .min(1, "Can't be empty")
      .email('Please use a valid email address'),
    message: z.string().min(1, "Can't be empty"),
    phone: z.string().min(1, "Can't be empty").optional()
  })
  .required()

function encode(data: FormData & { [key: string]: string }) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [formErrors, setFormErrors] = useState<Partial<FormData> | undefined>()

  function onInputChange(event: Event, setState: StateUpdater<string>) {
    const target = event.target as HTMLInputElement
    setState(target.value)

    if (formErrors && formErrors[target.name as keyof FormData]) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        [target.name]: undefined
      }))
    }
  }

  function onSubmit(event: Event) {
    event.preventDefault()

    const formParsed = formSchema.safeParse({
      name,
      email,
      phone,
      message
    })

    if (!formParsed.success) {
      const formattedErrors = formParsed.error.format()
      setFormErrors({
        name: formattedErrors.name?._errors[0],
        email: formattedErrors.email?._errors[0],
        message: formattedErrors.message?._errors[0],
        phone: formattedErrors.phone?._errors[0]
      })
      return
    }

    setFormErrors(undefined)
    setIsLoading(true)

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        name,
        email,
        phone,
        message
      })
    })
      .then(() => {
        setName('')
        setEmail('')
        setPhone('')
        setMessage('')
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div>
      <form
        onSubmit={onSubmit}
        name='contact'
        method='POST'
        data-netlify='true'
      >
        <input type='hidden' name='form-name' value='contact' />
        <div>
          <input
            value={name}
            onInput={(e) => onInputChange(e, setName)}
            type='text'
            placeholder='Name'
            name='name'
          />
          {!!formErrors?.name && <span>{formErrors.name}</span>}
        </div>

        <div>
          <input
            type='text'
            value={email}
            onInput={(e) => onInputChange(e, setEmail)}
            placeholder='Email Address'
            name='email'
          />
          {!!formErrors?.email && <span>{formErrors.email}</span>}
        </div>

        <div>
          <input
            type='text'
            value={phone}
            onInput={(e) => onInputChange(e, setPhone)}
            placeholder='Phone'
            name='phone'
          />
          {!!formErrors?.phone && <span>{formErrors.phone}</span>}
        </div>

        <div>
          <textarea
            placeholder='Your Message'
            value={message}
            onInput={(e) => onInputChange(e, setMessage)}
            name='message'
          />
          {!!formErrors?.message && <span>{formErrors.message}</span>}
        </div>

        <button disabled={isLoading} type='submit'>
          Submit
        </button>
      </form>
    </div>
  )
}
