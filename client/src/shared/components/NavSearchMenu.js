import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faQuestion,
    faSearch,
    faTimes,
} from "@fortawesome/free-solid-svg-icons"

import Avatar from "./Avatar"

function NavSearchMenu() {
    return (
        <div>
            <h1 className="text-3xl font-bold p-4 text-center">Search for Service</h1>
            <div className="flex flex-col sm:flex-row sm:h-20 px-6 border-b border-gray-300 bg-white relative z-50">
                <div className="h-20 w-full flex items-center justify-between sm:h-auto">
                    <div className="items-center flex">
                    </div>
                </div>
                <div className="w-full mx-auto mt-2 mb-4 sm:mx-0 sm:mb-0 sm:mt-0 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:w-1/2 sm:h-full justify-center items-center block sm:flex">
                    <form className="relative w-full">
                        <input
                            type="search"
                            className="w-full max-w-full border border-gray-300 rounded-sm pr-4 pl-10 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                            placeholder="Search for something..."
                        />
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="absolute left-0 ml-4 top-1/2 transform -translate-y-1/2 text-gray-300"
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NavSearchMenu