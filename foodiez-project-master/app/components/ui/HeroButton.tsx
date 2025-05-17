export default function HeroButton({ title }: { title: string }) {
    return <div className="w-fit px-8 py-3 rounded-full bg-green-500">
        <button><h3 className="text-xl font-semibold">{title}</h3></button>
    </div>
}