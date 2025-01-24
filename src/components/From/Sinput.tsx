import { Controller } from "react-hook-form";
import { Form } from "react-router-dom";

type TInputProps = {
    type: string;
    name: string;
    label?: string;
  };
  
export default function Sinput({ type, name, label }: TInputProps) {
  return (
    <div >
     
      <Controller
        name={name}
        render={({ field }) => <Form.Item label={label}><Input {...field} type={type} id={name} /></Form.Item> }
      />
    </div>
  )
}
