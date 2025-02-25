import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
};

export default function Sinput({ type, name, label, placeholder }: TInputProps) {
  const methods = useFormContext();
  if (!methods) {
    throw new Error("Sinput must be used within a FormProvider.");
  }

  const { control } = methods;

  return (
    <div className="mb-6">
      {label && (
        <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <input
              {...field}
              type={type}
              id={name}
              placeholder={placeholder}
              className={`w-full h-12 px-4 border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 ${
                error ? "focus:ring-red-500" : "focus:ring-blue-500"
              } transition duration-200`}
            />
            {error && (
              <p className="mt-1 text-sm text-red-500">{error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
}