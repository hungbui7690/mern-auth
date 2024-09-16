import { Check, X } from 'lucide-react'

const PasswordStrengthMeter = ({ password }) => {
  const criteria = [
    { label: 'At least 6 characters', condition: password.length >= 6 },
    {
      label: 'At least one lowercase letter',
      condition: /[a-z]/.test(password),
    },
    {
      label: 'At least one uppercase letter',
      condition: /[A-Z]/.test(password),
    },
    { label: 'At least one digit', condition: /\d/.test(password) },
    {
      label: 'At least one special character',
      condition: /[!@#$%^&*]/.test(password),
    },
  ]

  const length = criteria.filter((criterion) => criterion.condition).length
  let color = 'white'

  if (length === 1) color = 'red'
  if (length === 2) color = 'orange'
  if (length === 3 || length === 4) color = 'yellow'
  if (length === 5) color = 'green'

  return (
    <>
      <div className='flex bg-gray-700 w-full h-1'>
        {Array.from({ length }).map((_, index) => {
          return (
            <div
              key={index}
              className={`w-1/${criteria.length} h-1 bg-${color}-500 rounded-full transition duration-200`}
            ></div>
          )
        })}
      </div>
      <div className='mt-2'>
        {criteria.map(({ label, condition }, index) => (
          <div
            key={index}
            className={`flex items-center text-gray-400 ${
              condition ? 'text-emerald-500' : 'text-gray-500'
            }`}
          >
            {condition ? (
              <Check className='text-emerald-500 size-4' />
            ) : (
              <X className='text-red-500 size-4' />
            )}
            <p className='ml-2 text-sm'>{label}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default PasswordStrengthMeter
