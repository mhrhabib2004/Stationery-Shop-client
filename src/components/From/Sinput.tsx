import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};

export default function Sinput({ type, name, label }: TInputProps) {
  const methods = useFormContext(); // useFormContext() ব্যবহার করছি
  if (!methods) {
    throw new Error("Sinput must be used within a FormProvider."); // নিশ্চিত করা যে এটি FormProvider এর মধ্যে রয়েছে
  }

  const { control } = methods;

  return (
    <div className="mb-4">
      {label && <label htmlFor={name} className="block mb-2 font-medium">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            id={name}
            className="w-full h-10 border border-gray-800 px-3 rounded-lg"
          />
        )}
      />
    </div>
  );
}
