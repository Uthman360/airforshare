import React, { useCallback, useEffect, useState } from 'react'
import "./css/style.scss";
import Navbar from '../../components/Navbar';
import { MdDelete, MdOutlineTextFields } from 'react-icons/md';
import TEXT_COLOR from "../../../public/text.svg"
import FILE_COLOR from "../../../public/files.svg"
import TEXT_GREY from "../../../public/textgray.svg"
import FILE_GREY from "../../../public/filesgray.svg"
import TextArea from '../../components/TextArea';
import DropZone from '../../components/DropZone';
import FilesList from '../../components/FileList';
import { FaDownload } from 'react-icons/fa';
import { db, getDownloadURL, onValue, ref, remove, set, storage, storageRef, uploadBytesResumable } from '../../db';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import ThemeButton from '../../components/Button';
import useScreenWidth from '../../helpers/screenWidth';
import { useSelector } from 'react-redux';


const Home = () => {
    const [type, setType] = useState("text");
    const screenWidth = useScreenWidth();
    const [textValue, setTextValue] = useState("");
    const [isText, setIsText] = useState(false);
    const [files, setFiles] = useState([]);
    const [tempFiles, setTempFiles] = useState([]);
    const onDrop = async (acceptedFiles) => {
        setTempFiles([...tempFiles, ...acceptedFiles]);
        let arr = [];
        for (var i = 0; i < acceptedFiles.length; i++) {
            arr.push(uploadFiles(acceptedFiles[i], files.length + i));
        }
        const allFiles = await Promise.all(arr);
        setFiles([...files, ...allFiles]);
        set(ref(db, "file-sharing"), {
            files: [...files, ...allFiles],
        });
        setTempFiles([]);
    };

    const saveChanges = () => {
        set(ref(db, "/sharing"), {
            text: textValue,
        });
    };

    const uploadFiles = (file, i) => {
        return new Promise((resolve, reject) => {

            const fileRef = storageRef(storage, `files/file-${i}`);
            const uploadTask = uploadBytesResumable(fileRef, file);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    reject(error)
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        resolve({ url: downloadURL, type: file.type, name: file.name })
                    });
                })
        }
        );
    }
    const createZip = () => {
        let filename = "All-Files";
        const zip = new JSZip();
        const folder = zip.folder("files");
        files.forEach((file) => {
            const blobPromise = fetch(file.url).then(function (response) {
                if (response.status === 200 || response.status === 0) {
                    return Promise.resolve(response.blob());
                } else {
                    return Promise.reject(new Error(response.statusText));
                }
            });
            const name = file.name;
            folder.file(name, blobPromise);
        });

        zip
            .generateAsync({ type: "blob" })
            .then((blob) => saveAs(blob, filename))
            .catch((e) => console.log(e));

    };

    const clearText = async () => {
        await remove(ref(db, "/sharing"));
        setTextValue("");
        setIsText(false);
    };

    const deleteAllFiles = async () => {
        await remove(ref(db, "file-sharing"));
        setFiles([]);
    };

    useEffect(() => {
        const textRef = ref(db, "/sharing");
        onValue(textRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data.text) {
                setTextValue(data.text);
                setIsText(true);
            }
        });
        const fileRef = ref(db, "file-sharing");
        onValue(fileRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setFiles(data.files);
            }
        });
    }, []);



    var expression =
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    var regex = new RegExp(expression);
    const links = textValue.match(regex) || [];

    const isDark = useSelector((state) => state.DarkMode.isDark);


    return (
        <div className={`container ${isDark ? "dark" : " "}`}>
            <Navbar />
            <div className="main-card">
                <div className={`card-sidebar ${isDark ? "dark" : " "}`}>
                    {screenWidth.widthScreen <= 768 ? (
                        type === "text" ? (
                            <h1 className={isDark ? "dark-text" : " "}>{"Text"}</h1>
                        ) : (
                            <h1 className={isDark ? "dark-text" : " "}>{"Files"}</h1>
                        )
                    ) : null}
                    <div>
                        <div
                            onClick={() => setType("text")}
                            className={
                                type === "text" ? (isDark ? "dark-light" : "active") : ""
                            }
                        >
                            <img src={type === "text" ? TEXT_COLOR : TEXT_GREY} alt="" />
                        </div>
                        <div
                            onClick={() => setType("files")}
                            className={
                                type === "files" ? (isDark ? "dark-light" : "active") : ""
                            }
                        >
                            <img src={type === "files" ? FILE_COLOR : FILE_GREY} alt="" />
                        </div>
                    </div>
                </div>
                <div className={`card-container ${isDark ? "dark-light" : " "}`}>
                    {type === "text" ? (
                        <div className="text-section">
                            {screenWidth.widthScreen > 768 ? (
                                <h1 className={isDark ? "dark-light" : " "}>{"Text"}</h1>
                            ) : null}
                            <div className="resize-section">

                                <TextArea value={textValue} onChange={(e) => setTextValue(e.target.value)} className={isDark ? "dark-lighter" : " "}
                                />
                            </div>
                            <div className="text-footer">
                                <div className="links">
                                    {links.map((v, i) => (
                                        <div key={i}>
                                            <span>
                                                <a href={v} target="_blank" rel="noopener noreferrer">
                                                    {v}
                                                </a>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="save-btn-section">
                                    <span onClick={clearText}>{"Clear"}</span>
                                    {isText ? (
                                        <ThemeButton
                                            onClick={() => {
                                                navigator.clipboard.writeText(textValue);
                                            }}
                                            title={"Copy"}
                                        />
                                    ) : (
                                        <ThemeButton
                                            onClick={saveChanges}
                                            disabled={textValue ? false : true}
                                            title={"Save"}
                                            className={`${isDark ? "dark-lighter" : " "
                                                }`}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="files-section">
                            <div className="files-header">
                                {screenWidth.widthScreen > 768 ? (
                                    <h1 className={isDark ? "dark-light" : " "}>{"Files"}</h1>

                                ) : null}
                                {/*=============================================================
              add delete files check agar hai to icon dikhao warna hide rakha 
                 ===============================================================*/}
                                {files.length > 0 && (
                                    <div className="files-btn">
                                        <div onClick={createZip} className="download-btn">


                                            <FaDownload />
                                            {"Download All"}
                                        </div>
                                        <div onClick={deleteAllFiles} className="delete-btn">
                                            <MdDelete />
                                            {"Delete All"}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {tempFiles.length || files.length ? (
                                <FilesList
                                    className={
                                        tempFiles.length || files.length ? "fixHight" : " "
                                    }
                                    tempFiles={tempFiles}
                                    files={files}
                                    onDrop={onDrop}
                                />
                            ) : (
                                <DropZone
                                    onDrop={onDrop}
                                    textElement={
                                        <>
                                            {"Drag and drop any files up to 2 files, 5Mbs each or"}
                                            <span>{"Browse Upgrade"}</span>
                                            {"to get more space"}
                                        </>
                                    }
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;

