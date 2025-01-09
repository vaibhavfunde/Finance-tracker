"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {  TransactionForm } from "./transaction-form";
import { insertTransactionSchema } from "@/db/schema";
import { z } from "zod";

import { useOpenTransaction } from "../hooks/use-open-transaction";
import { useGetTransaction } from "../api/use-get-transaction";
import { Loader2 } from "lucide-react";
import { useEditTransaction } from "../api/use-edit-transaction";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { useConfirm } from "@/hooks/use-confirm";

import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

const formSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditTransactionSheet = () => {
  const { isOpen, onClose, id } = useOpenTransaction();

  const TransactionQuery = useGetTransaction(id);
  const editMutation = useEditTransaction(id);
  const deleteMutation = useDeleteTransaction(id);


   const categoryQuery = useGetCategories();
      const categoryMutation = useCreateCategory();
  
      const onCreateCategory = (name: string) => categoryMutation.mutate({ name });
      console.log("categoryQuery.data:", categoryQuery?.data);
  
  
      // const categoryOptions = (categoryQuery?.data ?? []).map((category) => ({
      //     label: category.name,
      //     value: category.id,
      // }));
      const categoryOptions = Array.isArray(categoryQuery?.data)
      ? categoryQuery.data.map((category) => ({
            label: category.name,
            value: category.id,
        }))
      : [];
  
  
      const accountQuery = useGetAccounts();
      const accountMutation = useCreateAccount();
  
      const onCreateAccount = (name: string) => accountMutation.mutate({ name });
  
      // const accountOptions = (accountQuery?.data ?? []).map((account) => ({
      //     label: account.name,
      //     value: account.id,
      // }));
      const accountOptions = Array.isArray(accountQuery?.data)
      ? accountQuery.data.map((account) => ({
            label: account.name,
            value: account.id,
        }))
      : [];


  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction."
  );

  const isPending = 
            editMutation.isPending ||
             deleteMutation.isPending||
             TransactionQuery.isLoading||
             categoryMutation.isPending||
             accountMutation.isPending;

  const isLoading = 
            TransactionQuery.isLoading||
            categoryQuery.isLoading||
            accountQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        console.error("Failed to edit Transaction:", error);
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) return;
    deleteMutation.mutate(undefined, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        console.error("Failed to delete transaction:", error);
      },
    });
  };

  const defaultValues = TransactionQuery.data
    ? { accountId:TransactionQuery.data.accountId,
      categoryId:TransactionQuery.data.categoryId,
      amount:TransactionQuery.data.amount.toString(),
      date:TransactionQuery.data.date?
         new Date(TransactionQuery.data.date):
          new Date(),
      payee:TransactionQuery.data.payee,
      notes:TransactionQuery.data.notes,
     }
    : {
      accountId:"",
      categoryId:"",
      amount:"",
      date:new Date(),
      payee:"",
      notes:"",

     };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Edit an existing Transaction</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <TransactionForm
           
              id={id}
              onSubmit={onSubmit}
              onDelete={onDelete}
              defaultValues={defaultValues}
              disabled={isPending}
              categoryOptions={categoryOptions}
              onCreateCategory={onCreateCategory}
              accountOptions={accountOptions}
              onCreateAccount={onCreateAccount}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
