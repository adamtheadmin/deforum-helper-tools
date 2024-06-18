"use client"
import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const KeyRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [startTime, setStartTime] = useState(null);
    let defaultData = '[]'
    if (typeof window !== "undefined") {
        defaultData = window?.localStorage.getItem('recorder') || '[]';
    }
    const [keyPresses, setKeyPresses] = useState(JSON.parse(defaultData));
    const [audioFile, setAudioFile] = useState(null);
    const audioRef = useRef(null);

    const toggleRecording = () => {
        if (!isRecording) {
            setStartTime(Date.now());
            setKeyPresses([]);
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            localStorage.setItem("recorder", JSON?.stringify(keyPresses))
        }
        setIsRecording(prevState => !prevState);
    };

    const handleFileUpload = (event) => {
        setAudioFile(URL.createObjectURL(event.target.files[0]));
    };

    useEffect(() => {
        const recordKeyPress = () => {
            if (isRecording && startTime) {
                const offset = Date.now() - startTime;
                setKeyPresses(prevPresses => [...prevPresses, offset]);
            }
        };

        window.addEventListener('keydown', recordKeyPress);

        return () => {
            window.removeEventListener('keydown', recordKeyPress);
        };
    }, [isRecording, startTime]);

    return (
        <div className="container mt-4">
            <h1>Beat Recorder</h1>
            <div className="mb-3">
                <label htmlFor="audioFile" className="form-label">(optional) MP3 file</label>
                <input type="file" className="form-control" id="audioFile" accept="audio/*" onChange={handleFileUpload} />
            </div>
            {audioFile && <audio ref={audioRef} src={audioFile} className="w-100 mt-3" controls />}
            <button className={`btn ${isRecording ? 'btn-danger' : 'btn-primary'} mt-3`} onClick={toggleRecording}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            <div className="mt-3">
                <h2>Recorded Key Presses (in ms)</h2>
                <pre className="bg-light p-3 rounded">{JSON.stringify(keyPresses)}</pre>
            </div>
        </div>
    );
}

export default KeyRecorder;
