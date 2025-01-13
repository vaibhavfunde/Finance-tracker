import { client } from "@/lib/hono";
import { convertAmountFromMiliunits } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";


export const useGetSummary = () =>{

    const params = useSearchParams();
    const from = params.get("from")||"";
    const to = params.get("to")||"";
    const accountId = params.get("accountId")||"";
    const query = useQuery({
        queryKey:["summary",{from , to ,accountId}],
        queryFn:async()=>{
            const response = await client.api.summary.$get({
                query:{
                    from,
                    to,
                    accountId,
                }
            });

            if(!response.ok){
                throw new Error("Failed to Fetch summary")
            }

            const {data} = await response.json()
            console.log({data})
            return {
                ...data,
                incomeAmount:convertAmountFromMiliunits(data.incomeAmount),
                expensesAmount:convertAmountFromMiliunits(data.expensesAmount),
                remainingAmount:convertAmountFromMiliunits(data.remainingAmount),
                categories:data.categories.map((category)=>({
                    ...category,
                    value:convertAmountFromMiliunits(category.value),
                })),

                days:data.days.map((day)=>({
                    ...day,
                    income:convertAmountFromMiliunits(day.income),
                    expenses:convertAmountFromMiliunits(day.expenses),
                }))
            }
        }
    })
    return query
}


// import { useQuery } from "@tanstack/react-query";

// import { client } from "@/lib/hono";
// import { useSearchParams } from "next/navigation";
// import { convertAmountFromMiliunits } from "@/lib/utils";

// /*************  ✨ Codeium Command 🌟  *************/
// /**
//  * Fetches the summary data from the API.
//  *
//  * The summary data contains the total income, expenses, and remaining amount
//  * for the given date range and account. It also contains a breakdown of the
//  * expenses into categories and by day.
//  *
//  * @param {object} [options] The options object.
//  * @param {string} [options.from] The start date of the date range.
//  * @param {string} [options.to] The end date of the date range.
//  * @param {string} [options.accountId] The ID of the account to get the summary for.
//  * @returns {QueryResult} The query result object.
//  */
// export const useGetSummary = (options?: {
//     from?: string;
//     to?: string;
//     accountId?: string;
// }) => {
// export const useGetSummary = () => {
//     const params = useSearchParams();
//     const from = options?.from || params.get("from") || "";
//     const to = options?.to || params.get("to") || "";
//     const accountId = options?.accountId || params.get("accountId") || "";

//     const from = params.get("from") || "";
//     const to = params.get("to") || "";
//     const accountId = params.get("accountId") || "";

//     const query = useQuery({
//         queryKey: ["summary", { from, to, accountId }],
//         queryFn: async () => {
//             const response = await client.api.summary.$get({
//                 query: {
//                     from,
//                     to,
//                     accountId,
//                     accountId
//                 },
//             });

           

//             if (!response.ok) {
//                 throw new Error("Failed to fetch summary");
//             }

//             const { data } = await response.json();
//             console.log({data})
//             return {
//                 ...data,
//                 incomeAmount: convertAmountFromMiliunits(data.incomeAmount),
//                 expensesAmount: convertAmountFromMiliunits(data.expensesAmount),
//                 remainingAmount: convertAmountFromMiliunits(data.remainingAmount),
//                 categories: data.categories.map((category) => ({
//                     ...category,
//                     value: convertAmountFromMiliunits(category.value),
//                 })),
//                 days: data.days.map((day) => ({
//                     ...day,
//                     income: convertAmountFromMiliunits(day.income),
//                     expenses: convertAmountFromMiliunits(day.expenses),
//                 })),
//             }
//         },
//     });

//     return query;
// };
// /******  cab45f95-42b8-4267-9d96-0e01afd5237c  *******/