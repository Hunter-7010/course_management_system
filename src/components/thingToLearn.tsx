import { CourseType } from "~/types/dashboard.type";
import Tick from "./svgs/tick.svg";
type Props = {
  thingsToLearn: CourseType["thingToLearn"];
};

const ThingToLearn = ({ thingsToLearn }: Props) => {
  return (
    <div className="mt-8 rounded-2xl border p-8 shadow-lg">
      <h1 className="text-2xl font-bold">What you will learn:</h1>
      <div className="container mt-8 flex flex-wrap">
        {(thingsToLearn || []).map((thingsToLearn, ind) => (
          <div
            key={ind}
            className="mb-4 flex w-full items-center space-x-2 sm:w-1/2"
          >
            <Tick className="h-6 w-6 stroke-green-400" />
            <p className="text-md break-words"> {thingsToLearn.str}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThingToLearn;
