import { CourseType } from "~/types/dashboard.type";
import Tick from "./svgs/tick.svg";
type Props = {
  thingsToLearn: CourseType["thingToLearn"];
};

const ThingToLearn = ({ thingsToLearn }: Props) => {
  return (
    <div className="mt-8 border p-8 shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold">What you will learn:</h1>
      <div className="container mt-8 flex flex-wrap">
        {(thingsToLearn || []).map((thingsToLearn) => (
          <div className="mb-4 flex items-center w-full space-x-2 sm:w-1/2">
            <Tick className="w-6 h-6 stroke-green-400" />
            <p className="text-md break-words"> {thingsToLearn.str}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThingToLearn;
