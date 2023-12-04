'use client'

export default function Home() {
  return (
    <main className="">
      <h1 className="text-3xl font-semibold mb-6">Search for a meal!</h1>
      <form className="bg-gray-200 p-4 rounded-lg shadow-md mb-6 w-full">
        <label className="block mb-4">
          Origin of the recipe?*
          <input
            required
            type="text"
            name="recipe"
            className="block w-full border-gray-300 rounded-md p-2 mt-1"
          />
        </label>
        <label className="block mb-4">
          select type*
          <select
            name="type"
            className="block w-full border-gray-300 rounded-md p-2 mt-1"
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
          </select>
        </label>
        <label className="block mb-4">
          Additional information
          <input
            name="text"
            type="text"
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
    </main>
  )
}

const RecipeCard = () => {
  return (
    <div className="bg-gray-200 p-6 rounded-xl shadow-lg flex flex-col gap-4"></div>
  )
}
