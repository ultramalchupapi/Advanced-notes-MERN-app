import { Edit, Trash } from "lucide-react"

const Card = () => {
  return (
    <div className='card card-md bg-base-100 w-96 shadow-sm bg-info-content p-6 hover:translate-y-[-2px] hover:shadow-gray-900 ease-in duration-300 hover:ease-in-out'>
      <h1 className="card-title text-secondary-content">First note</h1>
      <p className="card-body text-neutral-content">Hello this is my first card, i like to code</p>
      <div className="flex gap-2 justify-end">
        <Edit className="text-neutral-content hover:translate-y-[-2px] hover:ease-in-out duration-150"/>
        <Trash className="text-error hover:translate-y-[-2px] hover:ease-in-out duration-150"/>
      </div>
    </div>
  )
}

export default Card
