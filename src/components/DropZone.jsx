import { useDropzone } from "react-dropzone";
import "./index.scss";
import { useSelector } from "react-redux";

function DropZone({ textElement, onDrop, className }) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const isDark = useSelector((state) => state.DarkMode.isDark);

    return (
        <div
            className={`drop-zone ${isDark ? "dark-lighter" : null}`}
            {...getRootProps()}
        >
            <input {...getInputProps()} />
            <div>{textElement}</div>
        </div>
    );
}

export default DropZone;