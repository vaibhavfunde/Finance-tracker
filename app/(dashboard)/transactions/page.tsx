"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transactions";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";

import { transactions as TransactionSchema } from "@/db/schema";

import { DataTable } from "@/components/data-table";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { Skeleton } from "@/components/ui/skeleton";

import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { useState } from "react";
import { UploadButton } from "./upload-button";

import { ImportCard } from "./import-card";
import { useSelectAccount } from "@/features/accounts/hooks/use-select-account";
import { toast } from "sonner";
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions";

enum VARIANTS{
  LIST ="LIST",
  IMPORT="IMPORT",
}

const INITIAL_IMPORT_RESULTS= {
  data:[],
  errors:[],
  meta:{},
}

// const TransactionsPage = () => {
//   const newTransaction = useNewTransaction();
//   const deleteTransactions = useBulkDeleteTransactions()
//   const TransactionQuery = useGetTransactions();
//   const transactions = TransactionQuery.data || []; // Adjusted to destructure `data`

//   const isDisabled = 
//   TransactionQuery.isLoading||
//   deleteTransactions.isPending;

//   if(TransactionQuery.isLoading){
//     return(
//       <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
//            <Card className="border-none drop-shadow-sm">
//            <CardHeader >
//              <Skeleton className="h-8 w-48"></Skeleton>
//             </CardHeader>
//             <CardContent>
//               <div className="h-[500px] w-full flex items-center justify-center">
//                  <Loader2 className="size-6 text-slate-300 animate-spin"></Loader2>
//               </div>
//             </CardContent>

//            </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
//       <Card className="border-none drop-shadow-sm">
//         <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
//           <CardTitle className="text-xl line-clamp-1">Transaction History</CardTitle>
//           <Button onClick={newTransaction.onOpen} size={"sm"}>
//             <Plus className="size-4 mr-2" />
//             Add new
//           </Button>
//         </CardHeader>
//         <CardContent>
//           <DataTable
//             filterKey="name"
//             columns={columns}
//             data={transactions} // Now correctly typed
//             onDelete={(row) => {
//               const ids= row.map((r)=>r.original.id);
//               deleteTransactions.mutate({ids})
//             }}
//             disabled={isDisabled}
//           />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

const TransactionsPage = () => {
  const [AccountDialog , confirm] = useSelectAccount();
  const [variant , setvariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults , setImportResults] =useState(INITIAL_IMPORT_RESULTS);


  const onUpload =(results:typeof INITIAL_IMPORT_RESULTS)=>{
    console.log({results})
    setImportResults(results)
    setvariant(VARIANTS.IMPORT);
  }

  const onCancelImport = ()=>{
    setImportResults(INITIAL_IMPORT_RESULTS)
    setvariant(VARIANTS.LIST)
  }

  const newTransaction = useNewTransaction();
  const createTransactions= useBulkCreateTransactions();
  const deleteTransactions = useBulkDeleteTransactions();
  const TransactionQuery = useGetTransactions();
  
  // Corrected line
  const transactions = TransactionQuery.data || []; // Access the correct data

  const isDisabled =
    TransactionQuery.isLoading ||
    deleteTransactions.isPending;

  // const onSubmitImport = async(
  //   values : typeof TransactionSchema.$inferInsert[],
  // )=>{
  //   const accountId = await confirm();
  //   if(!accountId){
  //     return toast.error("Please select an account to continue")
  //   }
  //   const data = values.map((value)=>({
  //     ...value,
  //     accountId:accountId as string ,
  //   }))

  //   createTransactions.mutate(data ,{
  //     onSuccess:()=>{
  //       onCancelImport();
  //     }
  //   }

  //   )
  // }

  const onSubmitImport = async (
    values: typeof TransactionSchema.$inferInsert[],
) => {
    const accountId = await confirm();

    if (!accountId) {
        return toast.error("Please select an account to continue.");
    }

    const data = values.map((value) => ({
        ...value,
        accountId: accountId as string,
    }));

    createTransactions.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      },
      onError: (error) => {
        toast.error(`Import failed: ${error.message || "Unknown error"}`);
      },
    })
};
 

  if (TransactionQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48"></Skeleton>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin"></Loader2>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if(variant === VARIANTS.IMPORT){
    return(
      <>
      <AccountDialog></AccountDialog>
       <ImportCard
        data={importResults.data}
        onCancel={onCancelImport}
        onSubmit={onSubmitImport}></ImportCard>
      </>
    )
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Transaction History</CardTitle>
          <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">  
          <Button 
           onClick={newTransaction.onOpen} 
           size={"sm"} 
           disabled={isDisabled}
           className="w-full lg:w-auto">

            <Plus className="size-4 mr-2" />
            Add new
          </Button>
          <UploadButton onUpload={onUpload}></UploadButton>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="payee"
            columns={columns}
            data={transactions} // Now correctly typed
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteTransactions.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};



export default TransactionsPage;
