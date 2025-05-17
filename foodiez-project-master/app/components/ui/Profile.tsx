export default function Profile({ email, name }: { email: string, name: string }) {
    return <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Profile</h2>
        <div className="flex flex-col gap-2">
            <h3 className="text-lg">Name: {name}</h3>
            <h3 className="text-lg">Email: {email}</h3>
        </div>
        <div>
            <button className="bg-red-500 text-white py-2 px-4 rounded-xl">Logout</button>
        </div>
    </div>
}