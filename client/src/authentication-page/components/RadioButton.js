/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const genders = ['Male', 'Female'];

export default function RadioButton() {
    return (
        <div>
            <label htmlFor='country' className='block text-sm font-medium text-gray-700'>
                Gender
            </label>
            <fieldset className='mt-4'>
                <div className='space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                    {genders.map((g) => (
                        <div key={g} className='flex items-center'>
                            <input
                                id={g}
                                name='notification-method'
                                type='radio'
                                defaultChecked={g === 'male'}
                                className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300'
                            />
                            <label htmlFor={g} className='ml-3 block text-sm font-medium text-gray-700'>
                                {g}
                            </label>
                        </div>
                    ))}
                </div>
            </fieldset>
        </div>
    );
}
