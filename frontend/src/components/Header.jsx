import { Link, useNavigate } from "react-router-dom"

import toast from "react-hot-toast";
import { PlusIcon } from 'lucide-react'

const Header = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('authUser');
        toast.success("Logged out successfully");
        navigate("/")
    }

    return (
        <header className='bg-base-300 border-b border-base-content/10'>
            <div className='mx-auto max-w-6xl p-4'>
                <div className="flex items-center justify-between">
                    <h1 className='text-3xl font-bold text-primary font-mono tracking-tighter'>IdeaBoard</h1>
                    <div className='flex items-center gap-4'>
                        <Link to={"/create"} className="btn btn-primary">
                            <PlusIcon className="size-5" />
                            <span>New Note</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="btn btn-primary"
                        >
                            Logout
                        </button>

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header