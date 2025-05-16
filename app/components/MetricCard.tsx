type Props = {
    title: string;
    value: number;
}

export default function MetricCard({ title, value }: Props) {
    return (
        <div className="bg-white p-4 rounded-2xl shadow-sm border">
            <h2 className="text-sm text-gray-500 mb-l">{title}</h2>
            <p className="text-2xl font-bold font-semibold text-gray-800">${value.toLocaleString()}</p>
        </div>
    )
}