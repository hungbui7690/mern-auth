import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const EmailVerificationPage = () => {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const inputRef = useRef([])

  const readClipboard = async () => {
    navigator.clipboard.readText().then((copiedText) => {
      return copiedText
    })
  }

  const handleChange = (e, index) => {
    const keycode = e.which || e.keyCode
    let charCode = String.fromCharCode(keycode).toLowerCase()
    if ((e.ctrlKey || e.metaKey) && charCode === 'v') {
      console.log('abc')
      const clipboard = readClipboard().split('')
      console.log(clipboard)
      setCode(clipboard)
      console.log(code)
      inputRef.current[5].focus()
    }

    // Prevent entering non-numeric values
    if (isNaN(e.target.value) && e.key !== 'Ctrl' && e.key !== 'v') {
      e.target.value = ''
      return
    }

    const newCode = [...code]
    newCode[index] = e.target.value
    setCode(newCode)

    // Focus on the previous input
    if (index > 0 && e.key === 'Backspace') inputRef.current[index - 1].focus()

    // Focus on the next input
    if (index < code.length - 1 && e.target.value)
      inputRef.current[index + 1].focus()
    else handleSubmit(e) // Submit the form if the last input is filled

    readClipboard()

    // Paste the codes to the input
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(code)
  }

  useEffect(() => {
    inputRef?.current[0]?.focus()
  }, [])

  return (
    <div className='bg-opacity-20 shadow-xl backdrop-blur-xl backdrop-filter rounded-2xl w-full max-w-md overflow-hidden'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-gray-800 bg-opacity-50 shadow-2xl backdrop-blur-xl backdrop-filter p-8 rounded-2xl w-full max-w-md'
      >
        <h2 className='mb-6 font-bold text-3xl text-center text-gray-300'>
          Verify Your Email
        </h2>
        <p className='mb-6 text-center text-gray-300'>
          Enter the 6-digits code that was sent to your email address.
        </p>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='flex justify-between'>
            {code.map((_, index) => (
              <input
                key={index}
                type='text'
                maxLength='1'
                className='border-2 border-gray-600 bg-transparent rounded-lg w-8 sm:w-12 h-8 sm:h-12 font-bold text-2xl text-center text-white focus:outline-none'
                ref={(el) => inputRef.current.push(el)}
                onChange={(e) => handleChange(e, index)}
                value={code[index]}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type='submit'
            className='border-slate-500 bg-pink-600 shadow-lg px-4 py-3 border rounded-lg w-full font-bold text-white focus:outline-none'
          >
            Verify Email
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default EmailVerificationPage
