'use client'

import { IFood, IInput, useFetchFood } from '@/lib/hook/food'
import { useState } from 'react'

export default function Home() {
  const { loading, food, fetch } = useFetchFood()

  const [input, setInput] = useState<IInput>({
    country: '',
    info: '',
    type: 'breakfast',
  })

  const handleInputChange = ({ target }) => {
    setInput((prev) => {
      return { ...prev, [target.name]: target.value }
    })
  }
  return (
    <main className="">
      <h1 className="text-3xl font-semibold mb-6">Get a random recipe!</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (input) fetch(input)
        }}
        className="bg-gray-200 p-4 rounded-lg shadow-md mb-6 w-full"
      >
        <label className="block mb-4">
          Origin of the recipe?*
          <input
            required
            type="text"
            name="country"
            value={input.country}
            className="block w-full border-gray-300 rounded-md p-2 mt-1"
            onChange={handleInputChange}
          />
        </label>
        <label className="block mb-4">
          select type*
          <select
            onChange={handleInputChange}
            name="type"
            value={input.type}
            className="block w-full border-gray-300 rounded-md p-2 mt-1"
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
          </select>
        </label>
        <label onChange={handleInputChange} className="block mb-4">
          Additional information
          <input
            value={input.info}
            name="info"
            type="text"
            onChange={handleInputChange}
            className="block w-full border-gray-300 rounded-md p-2 mt-1"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Go!
        </button>
      </form>

      <section>
        {loading && <>loading</>}
        {food && <RecipeCard {...food} />}
      </section>
    </main>
  )
}

const RecipeCard = ({ title, description, receipe, steps }: IFood) => {
  return (
    <div className="bg-gray-200 p-6 rounded-xl shadow-lg flex flex-col gap-4">
      <h2 className="font-bold text-xl">{title}</h2>
      <p className="text-red">{description}</p>
      <ul className="flex justify-content gap-4 flex-wrap">
        {receipe.map(({ title, quantity }) => (
          <li className="bg-white rounded-md" key={title + quantity}>
            <div className="flex justify-between p-2">
              <h4>{title}</h4>
              <p className="ml-4">{quantity}</p>
            </div>
          </li>
        ))}
      </ul>

      <ol>
        {steps.map((step, i) => (
          <li key={i}>
            <span>
              <>{i + 1 + '. ' + step}</>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}