// "use client";

// import React, { useMemo } from "react";
// import { SingleValue } from "react-select";
// import CreatableSelect from "react-select/creatable";

// type Props = {
//   onChange: (value?: string) => void;
//   onCreate?: (value: string) => void;
//   options?: { label: string; value: string }[];
//   value?: string | null | undefined;
//   disabled?: boolean;
//   placeholder?: string;
// };

// export const Select = ({
//   value,
//   onChange,
//   onCreate,
//   options = [],
//   disabled = false,
//   placeholder ,
// }: Props) => {
//   // Handle the selection change
//   const onSelect = (option: SingleValue<{ label: string; value: string }>) => {
//     onChange(option?.value);
//   };

//   // Format the current value to match the options
//   const formattedValue = useMemo(() => {
//     return options.find((option) => option.value === value);
//   }, [options, value]);

//   return (
//     <CreatableSelect
//       placeholder={placeholder}
//       className="text-sm h-10"
//       styles={{
//         control: (base) => ({
//           ...base,
//           borderColor: "#e2e8f0",
//           ":hover": {
//             borderColor: "#e2e8f0",
//           },
//         }),
//       }}
//       value={formattedValue}
//       onChange={onSelect}
//       options={options}
//       onCreateOption={onCreate}
//       isDisabled={disabled}
//     />
//   );
// };


"use client";

import React, { useMemo } from "react";
import { SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";

type Props = {
    onChange :(value?:string)=>void;
    onCreate?:(value:string)=>void;
    options?:{label:string ;value:string}[];
    value?:string|null|undefined;
    disabled?:boolean;
    placeholder?:string;

};

export const Select =({
    value ,
    onChange,
    onCreate,
    options=[],
    disabled,
    placeholder

}:Props)=>{
    const onSelect =(
        option:SingleValue<{label:string , value:string}>

    )=>{
        onChange(option?.value)
    };

    const formatteddValue = useMemo(()=>{
        return options.find((option)=>option.value === value)
    },[options, value])

    return (
        <CreatableSelect 
         placeholder ={placeholder}
         className="text-sm h-10"
         styles={{
            control:(base)=>({
                ...base,
                borderColor:"#e2e8f0",
                ":hover":{
                    borderColor:"#e2e8f0",
                }
            })
         }}
         value={formatteddValue}
         onChange={onSelect}
         options={options}
         onCreateOption={onCreate}
         isDisabled={disabled}></CreatableSelect>
    )
}
