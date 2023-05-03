import { CourseType } from "~/types/dashboard.type"
type Props = {
    description:CourseType["description"]
}

const Description = ({description}: Props) => {
  return ( 
    <div className="mt-2 w-full">
        <h1 className="font-bold text-2xl my-8">
            Description:
        </h1>
    {(description ||[]).map(
      (description,ind) => (
        <div key={ind} className="mb-4 w-full break-words flex flex-col space-y-6">
          <h1 className="font-bold text-xl">{description.h1}</h1>
          <p className="text-md block whitespace-pre-wrap"> {description.paragraph} </p>
        </div>
      )
    )}
  </div>
  )
}

export default Description