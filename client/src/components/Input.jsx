const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className='relative mb-6'>
      <div className='left-0 absolute inset-y-0 flex items-center pl-3 text-emerald-500 pointer-events-none'>
        <Icon className='size-5' />
      </div>
      <input
        {...props}
        className={`border-gray-700 bg-gray-800 bg-opacity-50 py-2 pr-3 pl-10 border rounded-lg w-full text-slate-300 transition duration-200 placeholder-gray-400 focus:outline-none`}
        autoComplete={`${props.type === 'password' && 'true'}`}
        value={props.value}
        onChange={props?.onChange}
      />
    </div>
  )
}

export default Input
