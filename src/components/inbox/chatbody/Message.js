export default function Message({ justify, message }) {
    return (
        <li className={`flex justify-${justify} my-1`}>
            <div className="relative max-w-xl px-4 py-2 bg-slate-800/[0.6] text-slate-100 rounded shadow">
                <span className="block">{message}</span>
            </div>
        </li>
    );
}
