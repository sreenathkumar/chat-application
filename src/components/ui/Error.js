export default function Error({ message }) {
    return (
        <div className="flex items-center">
            <div className="relative bg-red-300 max-w-xl px-4 py-2 text-red-900 rounded shadow w-full">
                <span className="block text-sm">{message}</span>
            </div>
        </div>
    );
}
