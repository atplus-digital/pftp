
function Input({Type, Name, PlaceHolder,  Value , defaultValue, MinValue,  handleOnChange, Condition , ...rest}){



    const OutputClassInputDTO = {
        size: rest.Size || "w-full px-10 py-2",
        resetCssNative: "appearance-none",
        textSize: rest.TextSize || "text-sm",
        textColor: rest.TextColor || "",
        border: "border",
        borderColor: rest.BorderColor || "border-transparent",
        rounded: rest.Rounded || "rounded-md",
        focus: "focus:ring",
        focusOpacity: rest.FocusOpacity || "focus:ring-opacity-40",
        focusRingColor: rest.FocusRingColor || "focus:ring-indigo-500",
        focusBorderColor: rest.FocusBorderColor || "focus:border-indigo-600",
        customClass: rest.customClass || ""
    }

    const defaultClass = Object.values(OutputClassInputDTO).join(' ')
    return(
        <input
            id={Name}  
            type={Type}
            name={Name}
            placeholder={PlaceHolder}
            className={defaultClass}
            onChange={handleOnChange}
            value={Value}
            required={Condition}
            defaultValue={defaultValue}
            min={MinValue}
        />
    )
}

export default Input