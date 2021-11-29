import React from "react"

function CheckboxGroup({
    className = "",
    label = "",
    name = "",
    defaultChecked = false,
    onChange = () => { },
    ...newProps
}) {
    const finalClass = `${className} appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400`
    return (
        <div className="w-full flex items-center">
            <input
                type="checkbox"
                name={name}
                defaultChecked={defaultChecked}
                onChange={e => onChange(e.currentTarget.checked)}
                className={finalClass}
                {...newProps}
            />
            <label className="ml-2 text-sm" htmlFor={name}>
                {label}
            </label>
        </div>
    )
}

export default CheckboxGroup