import React from 'react'
import useAuthStore from '../context/store'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout()
  }

  return (
    <>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
        <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
          <div className="flex items-center justify-between">
            <Link className="flex-none text-3xl font-extrabold dark:text-white" to='/'>Quaerere</Link>
            <div className="sm:hidden">
              <button type="button" className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
                <svg className="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
                <svg className="hs-collapse-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </div>
          </div>
          <div id="navbar-collapse-with-animation" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block text-xl">
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
              <Link to='/'><div className="font-medium text-blue-400 hover:underline hover:text-blue-300" href="#" aria-current="page">Home</div></Link>
              <Link to='/search'><div className="font-medium hover:underline text-blue-400 hover:text-blue-300" href="#">Search</div></Link>
              <Link to='/image-search'><div className="font-medium hover:underline text-blue-400 hover:text-blue-300" href="#">Search Image</div></Link>
              <Link to='/saved-history'><div className="font-medium hover:underline text-blue-400 hover:text-blue-300" href="#">Saved Links</div></Link>
              <Link to='/search-link'><div className="font-medium hover:underline text-blue-400 hover:text-blue-300" href="#">Search by Link</div></Link>
              <button onClick={handleLogout} className="font-medium hover:underline bg-yellow-200 p-2 px-3 rounded-lg" href="#">{
                user ? "Logout" : "Login"
              }</button>
            </div>
          </div>
        </nav>
      </header>

    </>
  )
}

export default Navbar