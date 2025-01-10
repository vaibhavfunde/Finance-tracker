// "use client"

// import { Button } from "@/components/ui/button"
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogFooter,
//   } from "@/components/ui/dialog"
// import { useState } from "react"

//   export const useConfirm =(
//     title:string,
//     message:string,
//   ):[()=>JSX.Element ,()=>Promise<unknown>]=>{
//     const [promise ,setpromise]= useState<{resolve:(value:boolean)=>void}|null>(null)

//     const confirm =()=>new Promise((resolve,reject)=>{
//         setpromise({resolve})
//     })

//     const handleClose =()=>{
//         setpromise(null);
//     }
//     const handleConfirm = ()=>{
//         promise?.resolve(true);
//         handleClose();
//     }
//     const handleCancel =()=>{
//         promise?.resolve(false);
//         handleClose();
//     };

//     const confirmationDialog=()=>(
//         <Dialog open={promise!==null}>
//            <DialogContent>
//              <DialogHeader>
//                 <DialogTitle>
//                     {title}
//                 </DialogTitle>
//                 <DialogDescription>{message}</DialogDescription>
//              </DialogHeader>
//              <DialogFooter className="pt-2">
//                     <Button
//                     onClick={handleCancel}
//                     variant={"outline"}>
//                         Cancel
//                     </Button>

//                     <Button
//                     onClick={handleConfirm}
//                     >
//                         Confirm
//                     </Button>
//              </DialogFooter>
//            </DialogContent>
//         </Dialog>
//     )

//     return [confirmationDialog,confirm]
//   }

// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { useRef, useState } from "react";
// import { useGetAccounts } from "../api/use-get-accounts";
// import { useCreateAccount } from "../api/use-create-account";
// import { Select } from "@/components/select";

// export const useSelectAccount = (): [() => JSX.Element, () => Promise<boolean>] => {

// const accountquery = useGetAccounts();
// const accountMutation = useCreateAccount();
// const onCreateAccount = (name:string) =>accountMutation.mutate({
//   name
// })

// const accountOptions = (accountquery.data??[]).map((account)=>({
//   label:account.name,
//   value:account.id,
// }))

//   const [promise, setPromise] = useState<{
//     resolve: (value: string|undefined) => void } | null>(null);

//   const selectValue = useRef<string>();

//   const confirm = () =>
//     new Promise<boolean>((resolve) => {
//       setPromise({ resolve });
//     });

//   const handleClose = () => {
//     setPromise(null);
//   };

//   const handleConfirm = () => {
//     promise?.resolve(selectValue.current);
//     handleClose();
//   };

//   const handleCancel = () => {
//     promise?.resolve(undefined);
//     handleClose();
//   };

//   const confirmationDialog = () => (
//     <Dialog open={promise !== null} onOpenChange={handleClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>
//             Select Account
//           </DialogTitle>
//           <DialogDescription>
//             Please select an account to continue.
//           </DialogDescription>
//         </DialogHeader>
//         <Select
//         placeholder="Select an account"
//         options={accountOptions}
//         onCreate={onCreateAccount}
//         onChange={(value)=>selectValue.current = value}
//         disabled={accountquery.isLoading || accountMutation.isPending}
//         ></Select>
//         <DialogFooter className="pt-2">
//           <Button onClick={handleCancel} variant={"outline"}>
//             Cancel
//           </Button>
//           <Button onClick={handleConfirm}>Confirm</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );

//   return [confirmationDialog, confirm];
// };

// "use client"
// import { useRef, useState } from "react";

// import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
// import { useCreateAccount } from "@/features/accounts/api/use-create-account";
// import { Select } from "@/components/select";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// export const useSelectAccout = (): [
//   () => JSX.Element,
//   () => Promise<unknown>
// ] => {
//   const accountQuery = useGetAccounts();
//   const accountMutation = useCreateAccount();
//   const onCreateAccount = (name: string) =>
//     accountMutation.mutate({
//       name,
//     });
//   const accountOptions = (accountQuery.data ?? []).map((account) => ({
//     label: account.name,
//     value: account.id,
//   }));

//   const [promise, setPromise] = useState<{
//     resolve: (value: string | undefined) => void;
//   } | null>(null);
//   const selectValue = useRef<string>();

//   const confirm = () =>
//     new Promise((resolve, reject) => {
//       setPromise({ resolve });
//     });

//   const handleClose = () => {
//     setPromise(null);
//   };

//   const handleConfirm = () => {
//     promise?.resolve(selectValue.current);
//     handleClose();
//   };

//   const handleCancel = () => {
//     promise?.resolve(undefined);
//     handleClose();
//   };

//   const ConfirmationDialog = () => (
//     <Dialog open={promise !== null}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Select Acount</DialogTitle>
//           <DialogDescription>
//             Please select an account to continue
//           </DialogDescription>
//         </DialogHeader>
//         <Select
//           placeholder="Select an account"
//           options={accountOptions}
//           onCreate={onCreateAccount}
//           onChange={(value) => {
//             if (value) selectValue.current = value; // Ensure value is valid
//           }}
//           disabled={accountQuery.isLoading || accountMutation.isPending}
//         />
//         <DialogFooter className="pt-2">
//           <Button onClick={handleCancel} variant="outline">
//             Cancel
//           </Button>
//           <Button onClick={handleConfirm}>Confirm</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );

//   return [ConfirmationDialog, confirm];
// };



"use client";
import { useRef, useState } from "react";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { Select } from "@/components/select";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const useSelectAccount = (): [
  () => JSX.Element,
  () => Promise<string | undefined>
] => {
  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();

  const onCreateAccount = (name: string) =>
    accountMutation.mutate({
      name,
    });

  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const [promise, setPromise] = useState<{
    resolve: (value: string | undefined) => void;
    reject: (reason?: any) => void;
  } | null>(null);
  const selectValue = useRef<string | undefined>(undefined);

  const confirm = () =>
    new Promise<string | undefined>((resolve, reject) => {
      setPromise({ resolve, reject });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    if (selectValue.current) {
      promise?.resolve(selectValue.current);
    } else {
      promise?.resolve(undefined);
    }
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(undefined);
    handleClose();
  };

  const ConfirmationDialog: React.FC = () => (
    <Dialog open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Account</DialogTitle>
          <DialogDescription>
            Please select an account to continue.
          </DialogDescription>
        </DialogHeader>
        <Select
          placeholder="Select an account"
          options={accountOptions}
          onCreate={onCreateAccount}
          onChange={(value) => {
            if (value) selectValue.current = value; // Ensure value is valid
          }}
          disabled={accountQuery.isLoading || accountMutation.isPending}
        />
        <DialogFooter className="pt-2">
          <Button onClick={handleCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmationDialog, confirm];
};

