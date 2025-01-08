
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


"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

export const useConfirm = (
  title: string,
  message: string
): [() => JSX.Element, () => Promise<boolean>] => {
  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);

  const confirm = () =>
    new Promise<boolean>((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const confirmationDialog = () => (
    <Dialog open={promise !== null} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-2">
          <Button onClick={handleCancel} variant={"outline"}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [confirmationDialog, confirm];
};
