import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};

export default function Sinput({ type, name, label }: TInputProps) {
  const { control } = useFormContext();

  return (
    <div>
      {label && <label htmlFor={name} className="block mb-2 font-medium">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            id={name}
            className="border rounded-md p-2 w-full"
          />
        )}
      />
    </div>
  );
}
