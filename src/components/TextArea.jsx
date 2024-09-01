import React, { useEffect, useRef } from 'react';
import './index.scss';
import ThemeButton from './Button';
import Loading from './Loading';

const TextArea = ({ value, onChange, className }) => {
    const textareaRef = useRef();

    const resizeTextArea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "250px"; // Default height
            if (textareaRef.current.value.length >= 200) {
                textareaRef.current.style.height = textareaRef.current.scrollHeight + 12 + "px";
            }
        }
    };

    useEffect(() => {
        resizeTextArea();
    }, [value]);

    const isLoading = !value; // Boolean to check if loading
    const textValue = value || ''; // Default to an empty string if value is not available

    return (
        <div>
            {isLoading ? (
                <Loading /> // Display loading component when loading
            ) : (
                <textarea
                    placeholder="Type something..."
                    onChange={onChange}
                    className={`text-area ${className}`}
                    value={textValue}
                    ref={textareaRef}
                ></textarea>
            )}
        </div>
    );
};

export default TextArea;
