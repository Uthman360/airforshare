function ThemeButton({ disabled, className, title, saveChanges, onClick }) {
    return (
        <button
            style={{
                borderColor: disabled && "#a1a3a1",
            }}
            onClick={saveChanges}
            disabled={disabled}
            className={`theme-btn`}
              
        >
            {title}
        </button>
    );
}

export default ThemeButton;