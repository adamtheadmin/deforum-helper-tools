"use client"
import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Zerofill = () => {
    const [inputSchedule, setInputSchedule] = useState<string>("835: (-1.2) , 887: (1.2) , 942: (-1.2) , 995: (1.2) , 1050: (-1.2) , 1103: (1.2) , 1158: (-1.2) , 1213: (1.2) , 1267: (-1.2) , 1321: (1.2) , 1377: (-1.2) , 1432: (1.2) , 1487: (-1.2) , 1543: (1.2) , 1596: (-1.2) , 1651: (1.2) , 1701: (-1.2)");
    const [start, setStart] = useState<number>(0);
    const [end, setEnd] = useState<number>(835);
    const [interval, setStateInterval] = useState<number>(10);
    const [outputSchedule, setOutputSchedule] = useState<null | string>(null);
    const [error, setError] = useState<null | string>(null);

    function process() {
        try {
            const pairs = inputSchedule.split(',').map(pair => pair.trim());

            const parsedArray = pairs.map(pair => {
                const spl = pair.split(':');
                const frame = +spl[0];
                const value = +spl[1].replace('(', '').replace(')', '').trim();

                return {
                    frame,
                    value
                };
            });

            let rebuiltPairs = [];

            for (let frame = start; frame < end; frame += interval) {
                rebuiltPairs.push({
                    frame,
                    value: "0"
                });
            }

            rebuiltPairs = [
                ...rebuiltPairs,
                ...parsedArray
            ];

            const reJoinedString = rebuiltPairs.map(({ frame, value }) => {
                return `${frame}: (${value})`;
            }).join(', ');

            setOutputSchedule(reJoinedString);

        } catch (e) {
            console.error(e);
            setError(e.toString());
            alert(`Could not process: ${e.toString()}`);
        }
    }

    return (
        <div className="container mt-4">
            <h1>Zerofill Tool</h1>
            <div className="mb-3">
                <label htmlFor="inputSchedule" className="form-label">Input Schedule</label>
                <input id="inputSchedule" className="form-control" type="text" value={inputSchedule} onChange={e => setInputSchedule(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="start" className="form-label">Start Frame</label>
                <input id="start" className="form-control" type="number" value={start} onChange={e => setStart(Number(e.target.value))} />
            </div>
            <div className="mb-3">
                <label htmlFor="end" className="form-label">End Frame</label>
                <input id="end" className="form-control" type="number" value={end} onChange={e => setEnd(Number(e.target.value))} />
            </div>
            <div className="mb-3">
                <label htmlFor="interval" className="form-label">Interval</label>
                <input id="interval" className="form-control" type="number" value={interval} onChange={e => setStateInterval(Number(e.target.value))} />
            </div>
            <button className="btn btn-primary" onClick={process}>Process</button>
            {outputSchedule && (
                <div className="mt-4">
                    <h2>Output Schedule:</h2>
                    <textarea className="form-control w-100" readOnly={true}>{outputSchedule}</textarea>
                </div>
            )}
            {error && (
                <div className="alert alert-danger mt-4" role="alert">
                    {error}
                </div>
            )}
        </div>
    );
}

export default Zerofill;
