// import {
//     PolarAngleAxis,
//     PolarGrid,
//     PolarRadiusAxis,
//     Radar,
//     RadarChart,
//     ResponsiveContainer
// } from "recharts";

// type Props = {
//     data?: {
//         name: string;
//         value: number;
//     }[];
// };

// // export const RadarVariant = ({ data }: Props) => {
// //     return (
// //         <ResponsiveContainer width="100%" height={350}>
// //             <RadarChart
// //                 cx="50%"
// //                 cy="50%"
// //                 outerRadius="60%"
// //                 data={data}
// //             >
// //                 <PolarGrid>
// //                     <PolarAngleAxis style={{ fontSize: "12px" }} dataKey="name" />
// //                     <PolarRadiusAxis style={{ fontSize: "12px" }} />
// //                     <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
// //                 </PolarGrid>
// //             </RadarChart>
// //         </ResponsiveContainer>
// //     );
// // };

// export const RadarVariant = ({ data = [] }: Props) => {
//     return (
//         <ResponsiveContainer width="100%" height={350}>
//             <RadarChart
//                 cx="50%"
//                 cy="50%"
//                 outerRadius="60%"
//                 data={data}
//             >
//                 <PolarGrid />
//                 <PolarAngleAxis style={{ fontSize: "12px" }} dataKey="name" />
//                 <PolarRadiusAxis style={{ fontSize: "12px" }} />
//                 <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
//             </RadarChart>
//         </ResponsiveContainer>
//     );
// };


import {
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer
} from "recharts";

type Props = {
    data?: {
        name: string;
        value: number;
    }[];
};

export const RadarVariant = ({ data }: Props) => {
    if (!data || data.length === 0) {
        return <p>No data available to display.</p>;
    }

    // Calculate total for percentages
    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <ResponsiveContainer width="100%" height={350}>
            <RadarChart cx="50%" cy="50%" outerRadius="60%" data={data}>
                <PolarGrid />
                <PolarAngleAxis
                    dataKey="name"
                    tickFormatter={(name, index) => {
                        const percentage = ((data[index].value / total) * 100).toFixed(1);
                        return `${name} (${percentage}%)`;
                    }}
                    tick={{ fontSize: "12px" }}
                />
                <PolarRadiusAxis tick={{ fontSize: "12px" }} />
                <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            </RadarChart>
        </ResponsiveContainer>
    );
};
