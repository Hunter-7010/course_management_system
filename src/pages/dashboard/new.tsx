import { NextPage } from "next";
import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
import Link from "next/link";

import UpArrow from "~/components/svgs/upArrow.svg";
import { courseFormSchema } from "~/schema/course.schema";

const AddCourse: NextPage = () => {
  type courseFormSchemaType = z.infer<typeof courseFormSchema>;
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<courseFormSchemaType>({
    resolver: zodResolver(courseFormSchema),
  });
  const {
    fields: descriptionFields,
    append: descriptionAppend,
    remove: descriptionRemove,
    swap: descriptionSwap,
  } = useFieldArray({
    control,
    name: "descriptions",
  });

  const {
    fields: thingToLearnFields,
    append: thingToLearnAppend,
    remove: thingToLearnRemove,
    swap: thingToLearnSwap,
  } = useFieldArray({
    control,
    name: "thingToLearn",
  });

  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const { mutateAsync: createCourse } = api.dashboard.createCourse.useMutation({
    onSuccess: () => {
      void router.push("/dashboard");
    },
  });

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [uploadData, setUploadData] = useState<string>();

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */
  function handleOnChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    const file = changeEvent.target.files![0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = function (onLoadEvent: ProgressEvent<FileReader>) {
      if (onLoadEvent.target) {
        const result = onLoadEvent.target.result;
        if (typeof result === "string") {
          setImageSrc(result);
          setUploadData(undefined);
        }
      }
    };

    reader.readAsDataURL(file);
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  const formSubmitHandler: SubmitHandler<courseFormSchemaType> = (
    dataToSend
  ) => {
    const form = formRef.current!;
    const fileInput = Array.from(
      form.elements as unknown as HTMLInputElement[]
    ).find((el) => el.name === "file") as HTMLInputElement;

    const formData = new FormData();

    const file = Array.from(fileInput.files!)[0];
    formData.append("file", file!);

    formData.append("upload_preset", "my-uploads");

    const data = fetch(
      "https://api.cloudinary.com/v1_1/dddvtrxcz/image/upload",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((r) => r.json())
      .then((data: { secure_url: string }) => {
        return {
          secure_url: data.secure_url,
        };
      });
    void toast.promise(
      data,
      {
        loading: "...Saving Image",
        success: "Image saved successfully!",
        error: "Cant upload image!",
      },
      {
        style: {
          minWidth: "250px",
        },
        success: {
          duration: 2000,
        },
      }
    );
    data
      .then((data) => {
        const payload = { ...dataToSend, image: data.secure_url };
        // setValue("image", data.secure_url);
        setImageSrc(data.secure_url);
        setUploadData(data.secure_url);
        console.log(payload);
        void toast.promise(
          createCourse(payload),
          {
            loading: "...Saving Course",
            success: "Course saved successfully!",
            error: "Something went wrong!",
          },
          {
            style: {
              minWidth: "250px",
            },
            success: {
              duration: 2000,
            },
          }
        );
      })
      .catch(() => {
        void toast.error("Something went wrong");
      });
  };

  //react hook form
  const addDescription = () => {
    descriptionAppend({ h1: "", paragraph: "" });
  };
  const moveUpDescription = (index: number) => {
    if (index === 0) return;
    descriptionSwap(index, index - 1);
  };

  const moveDownDescription = (index: number) => {
    if (index === descriptionFields.length - 1) return;
    descriptionSwap(index, index + 1);
  };
  const addThingToLearn = () => {
    thingToLearnAppend({ str: "" });
  };
  const moveUpThingToLearn = (index: number) => {
    if (index === 0) return;
    thingToLearnSwap(index, index - 1);
  };

  const moveDownThingToLearn = (index: number) => {
    if (index === thingToLearnFields.length - 1) return;
    thingToLearnSwap(index, index + 1);
  };

  //animation
  const [descriptionAnimationParent] = useAutoAnimate<HTMLDivElement>();
  const [thingToLearnanimationParent] = useAutoAnimate<HTMLDivElement>();
  return (
    <div className="p-4 dark:bg-gray-900">
      <Link href="/dashboard">
        <div className="mx-24 flex w-20 cursor-pointer space-x-1 pt-4 font-medium text-blue-600 hover:text-blue-800">
          <UpArrow className="-rotate-90 hover:scale-100" />
          <span>Back</span>
        </div>
      </Link>
      <form
        className="flex flex-col-reverse "
        ref={formRef}
        //   eslint-disable-next-line
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <div className="w-full ">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Course Title
              </label>
              <input
                type="text"
                {...register("title")}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                placeholder="Type Course Title"
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-600">
                  {" "}
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Header
              </label>
              <input
                type="text"
                {...register("header")}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                placeholder="Product header"
              />
              {errors.header && (
                <p className="mt-1 text-xs text-red-600">
                  {" "}
                  {errors.header.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Price
              </label>
              <input
                type="text"
                {...register("price", {
                  valueAsNumber: true,
                })}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                placeholder="$2999"
              />
              {errors.price && (
                <p className="mt-1 text-xs text-red-600">
                  {" "}
                  {errors.price.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Category
              </label>

              <input
                type="text"
                {...register("categories")}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                placeholder="Categories..."
              />
              {errors.categories && (
                <p className="mt-1 text-xs text-red-600">
                  {" "}
                  {errors.categories.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Type
              </label>
              <input
                type="text"
                {...register("type")}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                placeholder="Course Type"
              />
              {errors.type && (
                <p className="mt-1 text-xs text-red-600">
                  {" "}
                  {errors.type.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
               Language
              </label>
              <input
                type="text"
                {...register("language")}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                placeholder="Course language"
              />
              {errors.language && (
                <p className="mt-1 text-xs text-red-600">
                  {" "}
                  {errors.language.message}
                </p>
              )}
            </div>
            <div className="group relative mt-4 flex h-10 w-44 cursor-pointer items-center justify-center">
              <input className="hidden" {...register("image")} />
              <label className="mb-4 mt-4 flex h-full w-full cursor-pointer items-center justify-center rounded-md border border-gray-700 bg-gray-500 px-6 text-lg text-gray-200 duration-300 group-hover:bg-gray-200 group-hover:text-gray-900">
                Insert An Image
              </label>
              <input
                type="file"
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={handleOnChange}
                name="file"
              />
            </div>
            <div
              ref={descriptionAnimationParent}
              className="space-y-6 sm:col-span-2"
            >
              <h1 className="text-md mb-2 block px-4 font-bold text-gray-900 dark:text-white">
                Description:
              </h1>
              {descriptionFields.map((desc, ind) => (
                <div
                  key={desc.id}
                  className="flex w-full flex-col overflow-auto rounded-2xl p-3 shadow-md"
                >
                  <div className="flex w-full justify-between">
                    <span className="mb-3 w-8 px-2 font-bold">{ind + 1}.</span>
                    <div className="flex flex-col space-y-1">
                      <div
                        onClick={() => moveUpDescription(ind)}
                        title="Move up by one"
                      >
                        <UpArrow className="" />
                      </div>
                      <div
                        onClick={() => moveDownDescription(ind)}
                        title="Move down by one"
                      >
                        <UpArrow className="rotate-180" />
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full flex-col px-6">
                    <div className="mb-6">
                      <label
                        htmlFor="h1"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="h1"
                        {...register(`descriptions.${ind}.h1`)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Section Title"
                      />
                      {errors.descriptions &&
                        errors.descriptions[ind] &&
                        errors.descriptions[ind]?.h1 && (
                          <p className="test-xs mt-1 text-xs text-red-600">
                            {errors.descriptions[ind]?.h1?.message}
                          </p>
                        )}
                    </div>
                    <div className="mb-6 w-auto">
                      <label
                        htmlFor="paragraph"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Paragraph
                      </label>
                      <textarea
                        rows={5}
                        id="paragraph"
                        placeholder="Section Paragraph"
                        {...register(`descriptions.${ind}.paragraph`)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      />
                      {errors.descriptions &&
                        errors.descriptions[ind] &&
                        errors.descriptions[ind]?.paragraph && (
                          <p className="test-xs mt-1 text-xs text-red-600">
                            {errors.descriptions[ind]?.paragraph?.message}
                          </p>
                        )}
                    </div>
                  </div>
                  <div className="flex w-full justify-end">
                    <button
                      type="button"
                      onClick={() => descriptionRemove(ind)}
                      className="mx-5 flex items-center justify-center  rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 shadow-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addDescription}
                className="mb-2 mr-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-blue-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:shadow-lg dark:shadow-blue-800/80 dark:focus:ring-blue-800 "
              >
                Add description
              </button>
            </div>
            <div
              ref={thingToLearnanimationParent}
              className="space-y-6 sm:col-span-2"
            >
              <h1 className="text-md mb-2 block px-4 font-bold text-gray-900 dark:text-white">
                Things To Learn:
              </h1>
              {thingToLearnFields.map((thing, ind) => (
                <div
                  key={thing.id}
                  className="flex w-full flex-col overflow-auto rounded-2xl p-3 shadow-md"
                >
                  <div className="flex w-full justify-between">
                    <span className="mb-3 w-8 px-2 font-bold">{ind + 1}.</span>
                    <div className="flex flex-col space-y-1">
                      <div
                        onClick={() => moveUpThingToLearn(ind)}
                        title="Move up by one"
                      >
                        <UpArrow className="" />
                      </div>
                      <div
                        onClick={() => moveDownThingToLearn(ind)}
                        title="Move down by one"
                      >
                        <UpArrow className="rotate-180" />
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full flex-col px-6">
                    <div className="mb-6">
                      <label
                        htmlFor="Thing"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="Thing"
                        {...register(`thingToLearn.${ind}.str`)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Title"
                      />
                      {errors.thingToLearn &&
                        errors.thingToLearn[ind] &&
                        errors.thingToLearn[ind]?.str && (
                          <p className="test-xs mt-1 text-xs text-red-600">
                            {errors.thingToLearn[ind]?.str?.message}
                          </p>
                        )}
                    </div>
                  </div>
                  <div className="flex w-full justify-end">
                    <button
                      type="button"
                      onClick={() => thingToLearnRemove(ind)}
                      className="mx-5 flex items-center justify-center  rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 shadow-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addThingToLearn}
                className="mb-2 mr-2 rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 transition hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
              >
                Add Things To Learn
              </button>
            </div>
          </div>
          <div className="flex w-full justify-end">
            <button
              type="submit"
              className={`mt-4 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-indigo-200 disabled:opacity-50 dark:focus:ring-blue-900 sm:mt-6 ${isSubmitSuccessful?"cursor-wait":""}`}
              disabled={isSubmitSuccessful}
            >
              Add Course
            </button>
          </div>
        </div>
        <div className=" mb-6 flex items-center justify-center">
          <img
            className="min-h-[14rem] w-96 rounded-2xl border-2 shadow-lg"
            src={imageSrc ? imageSrc : ""}
          />
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
