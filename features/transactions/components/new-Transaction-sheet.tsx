import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
 
  } from "@/components/ui/sheet"
import { useNewTransaction } from "../hooks/use-new-transactions";

import { insertTransactionSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateTransaction } from "../api/use-create-transaction";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { TransactionForm } from "./transaction-form";
import { Loader2 } from "lucide-react";

const formSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;




 export const NewTransactionSheet = () => {
    const { isOpen, onClose } = useNewTransaction();
    const createmutation = useCreateTransaction();

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

    const isPending =
        createmutation.isPending ||
        categoryMutation.isPending ||
        accountMutation.isPending;

    const isLoading = categoryQuery.isLoading || accountQuery.isLoading;

    const onSubmit = (values: FormValues) => {
        createmutation.mutate(values, {
            onSuccess: () => {
                onClose();
            },
            onError: (error) => {
                console.error("Error creating transaction:", error);
            },
        });
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>New Transaction</SheetTitle>
                    <SheetDescription>Add a new transaction.</SheetDescription>
                </SheetHeader>

                {isLoading ? (
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        aria-busy="true"
                    >
                        <Loader2
                            className="size-4 text-muted-foreground animate-spin"
                            aria-hidden="true"
                        />
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <TransactionForm
                        onSubmit={onSubmit}
                        disabled={isPending}
                        categoryOptions={categoryOptions}
                        onCreateCategory={onCreateCategory}
                        accountOptions={accountOptions}
                        onCreateAccount={onCreateAccount}
                    />
                )}
            </SheetContent>
        </Sheet>
    );
};
