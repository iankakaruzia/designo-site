import { StateUpdater, useState } from 'preact/hooks'
import { z } from 'zod'

import errorIcon from '@/assets/contact/icon-error.svg'
import { classnames } from '@/utils/classnames'

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
    <div class='flex flex-col items-center bg-peach-500 bg-contact-mobile bg-[top_0_right_-418px] bg-no-repeat pt-[72px]'>
      <div class='mb-12 flex flex-col items-center px-6'>
        <h1 class='mb-6 text-[32px] font-medium leading-[36px] text-white'>
          Contact Us
        </h1>
        <p class='text-center text-body text-white'>
          Ready to take it to the next level? Let's talk about your project or
          idea and find out how we can help your business grow. If you are
          looking for unique digital experiences that's relatable to your users,
          drop us a line.
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        name='contact'
        method='POST'
        netlify-honeypot='bot-field'
        data-netlify='true'
        class='flex w-full flex-col items-center gap-3 bg-contact-bottom-mobile bg-right-bottom bg-no-repeat px-6 pb-[72px]'
      >
        <input type='hidden' name='form-name' value='contact' />
        <p class='hidden'>
          <label>
            Don't fill this out if you're human: <input name='bot-field' />
          </label>
        </p>

        <div class='relative w-full'>
          <input
            value={name}
            onInput={(e) => onInputChange(e, setName)}
            type='text'
            placeholder='Name'
            name='name'
            class='w-full border-b bg-transparent p-3 text-body font-medium text-white placeholder:text-white placeholder:text-opacity-50 focus:border-b-[3px] focus:pb-[9px] focus:outline-none'
          />
          {!!formErrors?.name && (
            <div class='absolute right-0 top-[13px] flex items-center'>
              <span class='text-xs italic leading-[26px] text-white'>
                {formErrors.name}
              </span>
              <img
                src={errorIcon}
                alt='Exclamation point'
                class='ml-2 h-5 w-5'
              />
            </div>
          )}
        </div>

        <div class='relative w-full'>
          <input
            value={email}
            onInput={(e) => onInputChange(e, setEmail)}
            type='text'
            placeholder='Email Address'
            name='email'
            class={classnames(
              'w-full border-b bg-transparent p-3 text-body font-medium text-white placeholder:text-white placeholder:text-opacity-50 focus:border-b-[3px] focus:pb-[9px] focus:outline-none',
              formErrors?.email?.includes('Please use a valid email address') &&
                'text-ellipsis pr-[192px]'
            )}
          />
          {!!formErrors?.email && (
            <div class='absolute right-0 top-[13px] flex items-center'>
              <span class='text-xs italic leading-[26px] text-white'>
                {formErrors.email}
              </span>
              <img
                src={errorIcon}
                alt='Exclamation point'
                class='ml-2 h-5 w-5'
              />
            </div>
          )}
        </div>

        <div class='relative w-full'>
          <input
            value={phone}
            onInput={(e) => onInputChange(e, setPhone)}
            type='text'
            placeholder='Phone'
            name='phone'
            class='w-full border-b bg-transparent p-3 text-body font-medium text-white placeholder:text-white placeholder:text-opacity-50 focus:border-b-[3px] focus:pb-[9px] focus:outline-none'
          />
          {!!formErrors?.phone && (
            <div class='absolute right-0 top-[13px] flex items-center'>
              <span class='text-xs italic leading-[26px] text-white'>
                {formErrors.phone}
              </span>
              <img
                src={errorIcon}
                alt='Exclamation point'
                class='ml-2 h-5 w-5'
              />
            </div>
          )}
        </div>

        <div class='relative w-full'>
          <textarea
            placeholder='Your Message'
            value={message}
            onInput={(e) => onInputChange(e, setMessage)}
            name='message'
            class='min-h-[100px] w-full resize-y border-b bg-transparent p-3 text-body font-medium text-white placeholder:text-white placeholder:text-opacity-50 focus:border-b-[3px] focus:outline-none'
          />
          {!!formErrors?.message && (
            <div class='absolute right-0 top-[13px] flex items-center'>
              <span class='text-xs italic leading-[26px] text-white'>
                {formErrors.message}
              </span>
              <img
                src={errorIcon}
                alt='Exclamation point'
                class='ml-2 h-5 w-5'
              />
            </div>
          )}
        </div>

        <button
          class='mt-10 rounded-lg bg-white px-12 py-4 uppercase transition-colors hover:bg-peach-300 hover:text-white'
          disabled={isLoading}
          type='submit'
        >
          Submit
        </button>
      </form>
    </div>
  )
}
