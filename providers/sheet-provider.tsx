"use client"

import { EditAccountSheet } from "@/features/accounts/components/edit-account-sheet"
import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet"

 import { useMountedState } from "react-use"

 import { NewCategorySheet } from "@/features/categories/components/new-category-sheet"
 import { EditCategorySheet } from "@/features/categories/components/edit-category-sheet"

 import { NewTransactionSheet } from "@/features/transactions/components/new-Transaction-sheet"
 import { EditTransactionSheet } from "@/features/transactions/components/edit-transaction-sheet"

export const SheetProvider = () =>{

    const isMounted = useMountedState()
//    const [isMounted , setisMounted] = useState(false);

//    useEffect(()=>{
//     setisMounted(true);
//    },[])


    if(!isMounted){
        return null
    }
    return (
        <>
        <NewAccountSheet></NewAccountSheet>
        <EditAccountSheet></EditAccountSheet>
        <NewCategorySheet></NewCategorySheet>
        <EditCategorySheet></EditCategorySheet>
        <NewTransactionSheet></NewTransactionSheet>
        <EditTransactionSheet></EditTransactionSheet>
        </>
    )
}