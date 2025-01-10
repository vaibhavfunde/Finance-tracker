import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ImportTable } from "./import-table";

import { convertAmountToMiliunsits } from "@/lib/utils";
import { format, parse } from "date-fns";
import { toast } from "sonner";

const dateFormat = "dd-MM-yyyy HH:mm";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = ["amount", "date", "payee"];

interface SelectedColumnState {
  [key: string]: string | null;
}
type Props = {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: any) => void;
};

export const ImportCard = ({ data, onCancel, onSubmit }: Props) => {
  const [SelectedColumns, setSelectedColumns] = useState<SelectedColumnState>(
    {}
  );
  const headers = data[0];
  const body = data.slice(1);
  const onTableHeadSelectChange = (
    columnIndex :number,
    value:string|null
  )=>{
    setSelectedColumns((prev)=>{
        const newSelectedColumns ={...prev}

        for(const key in newSelectedColumns){
            if(newSelectedColumns[key]===value){
                newSelectedColumns[key] =null
            }
        }
        if(value === "skip"){
            value = null;
        }

        newSelectedColumns[`column_${columnIndex}`] = value;
        return newSelectedColumns;
    })
  }

  const progress = Object.values(SelectedColumns).filter(Boolean).length;
  
  const handleContinue = () => {

    const getColumnIndex = (column: string) => {
        return column.split("_")[1];
    }

    // const mappedData = {
    //     headers: headers.map((_header, index) => {
    //         const columnIndex = getColumnIndex(`column_${index}`);
    //         return SelectedColumns[`column_${columnIndex}`] || null;
    //     }),
    //     body: body.map((row) => {
    //         const transformedRow = row.map((cell, index) => {
    //             const columnIndex = getColumnIndex(`column_${index}`);
    //             return SelectedColumns[`column_${columnIndex}`] ? cell : null;
    //         });

    //         return transformedRow.every((item) => item === null)
    //             ? []
    //             : transformedRow;
    //     }).filter((row) => row.length > 0),
    // };
    // console.log({mappedData})
    const mappedData = {
      headers: headers.map((_header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`);
        return SelectedColumns[`column_${columnIndex}`] || null;
      }),
      body: body
        .map((row) => {
          return row.map((cell, index) => {
            const columnIndex = getColumnIndex(`column_${index}`);
            return SelectedColumns[`column_${columnIndex}`] ? cell : null;
          });
        })
        .filter((row) => row.some((cell) => cell !== null)), // Only keep rows with non-null cells
    };
    
    const arrayOfData = mappedData.body.map((row) => {
        return row.reduce((acc: any, cell, index) => {
            const header = mappedData.headers[index];

            if (header !== null) {
                acc[header] = cell;
            }

            return acc;
        }, {});
    });

   console.log({arrayOfData})

  //  const formattedData = arrayOfData.map((item) => {

  //   const amount = item.amount ? parseFloat(item.amount) : null;
  //   const date = item.date ? parse(item.date, dateFormat, new Date()) : null;
      
  //   if (!date) {
  //     toast.error(" please entre the date in this format dd-MM-yyyy HH:mm ");
  //     return null; // Skip this item
  //   }
  //   if (isNaN(date.getTime())) {
  //     toast.error("Invalid date format  ");
  //     return null; // Skip this item
  //   }
  //   return {
  //     ...item,
  //     amount: amount ? convertAmountToMiliunsits(amount) : 0, // Handle invalid amounts
  //     date: date ? format(date, outputFormat) : "", // Handle invalid dates
  //   };
  // });
  
//   const formattedData = arrayOfData.map((item) => ({
//     ...item,
//     amount: convertAmountToMiliunsits(parseFloat(item.amount)),
//     date: format(parse(item.date, dateFormat, new Date()), outputFormat)
// }));
// const formattedData = arrayOfData.map((item) => {
//   const amount = item.amount ? parseFloat(item.amount) : 0; // Default to 0 if undefined
//   const date = item.date
//     ? parse(item.date, dateFormat, new Date())
//     : null;

//   // Validate parsed date
//   if (date && isNaN(date.getTime())) {
//     toast.error("Invalid date format. Expected dd-MM-yyyy HH:mm");
//     return null; // Skip invalid items
//   }

//   return {
//     ...item,
//     amount: amount ? convertAmountToMiliunsits(amount) : 0, // Handle invalid amounts
//     date: date ? format(date, outputFormat) : "", // Handle invalid dates
//   };
// }).filter(Boolean); // Remove null entries

// const validData = formattedData.filter(
//   (item) => item.payee && item.amount > 0 && item.date
// );

const formattedData = arrayOfData.map((item) => {
  const amount = item.amount ? parseFloat(item.amount) : 0;
  const date = item.date ? parse(item.date, dateFormat, new Date()) : null;

  if (date && isNaN(date.getTime())) {
    toast.error("Invalid date format. Expected dd-MM-yyyy HH:mm");
    return null; // Skip invalid items
  }

  return {
    ...item,
    amount: amount ? convertAmountToMiliunsits(amount) : 0,
    date: date ? format(date, outputFormat) : "", 
  };
})// Remove null entries

console.log("Formatted data before filtering:", formattedData);

const validData = formattedData.filter((item) => {
  const isValid = item.payee && item.amount&& item.date;
  if (!isValid) {
    console.log("Invalid item:", item);
  }
  return isValid;
});

console.log("Valid data:", validData);



  onSubmit(validData);
  console.log({validData})
};




  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Import Transaction
          </CardTitle>
          <div className="flex flex-col lg:flex-row gap-y-2  items-center gap-x-2">
            <Button
             onClick={onCancel} 
             size={"sm"}
             className="w-full lg:w-auto">
              Cancel
            </Button>
            <Button
            size={"sm"}
            disabled={progress < requiredOptions.length}
            onClick={handleContinue}
            className="w-full lg:w-auto">
              Continue ({progress} /{requiredOptions.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={body}
            selectedColumns={SelectedColumns} // Corrected to match the prop name in ImportTable
            onTableHeadSelectChange={onTableHeadSelectChange} // This function should also be implemented if needed
          />
        </CardContent>
      </Card>
    </div>
  );
};
