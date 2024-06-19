"use client"
import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const examplePrompt = `{
    "0": "clear blue sky with fluffy clouds, the character looking joyful, bright sunlight",
    "30": "colors begin to swirl around the character, sky turning into a whirlpool of pastel hues",
    "60": "sky transitions into an underwater scene, bubbles floating around, character now with a mermaid tail",
    "90": "underwater realm morphs into outer space, nebulae and stars around, character in an astronaut suit",
    "120": "space scene transforms into a lush, alien jungle with bioluminescent plants and exotic creatures",
    "150": "jungle slowly warps into a bustling neon city from the future, character in cyberpunk attire",
    "180": "cityscape blurs into an abstract painting, bold splashes of colors, character fading into brush strokes",
    "210": "painting evolves into a stained glass window, light filtering through in vibrant, sacred patterns",
    "240": "stained glass shatters into thousands of butterflies, character reappearing surrounded by them in mid-flight",
    "270": "butterflies dissolve into digital pixels, character in a virtual reality world, code and data streams",
    "300": "digital world crashes into a surreal Dali-like landscape, melting clocks, disjointed planes",
    "330": "landscape swirls into a vortex, pulling the character into a psychedelic tunnel of shifting shapes",
    "360": "tunnel opens into a grand ballroom with infinite mirrors, character in elegant, flowing robes",
    "390": "mirrors fracture into a kaleidoscope of geometric patterns, character multiplying into fractal forms",
    "420": "fractals simplify into a minimalistic art gallery, character as a monochrome silhouette against stark white",
    "450": "gallery fades into a foggy mountain scene, character in a traditional eastern monk robe meditating",
    "480": "mountains melt away into a sandy desert at sunset, character as a sand sculpture, grains blowing away",
    "510": "sand whirls up into a stormy tornado, character at the eye, calm amidst the chaos",
    "540": "tornado disperses into a serene starry night sky, character reclining on the moon, looking at Earth",
    "570": "scene zooms out to reveal this has been a painting in an alien child’s room, character smiling from the canvas"
}`;

const ResumeTool = () => {
    const [prompts, setPrompts] = useState<string>(examplePrompt);
    const [inputSchedule, setInputSchedule] = useState<string>("0: (0), 30: (0) , 71: (0) , 128: (0) , 183: (0) , 218: (0) , 272: (0) , 307: (0) , 342: (0) , 367: (0) , 394: (0) , 432: (0) , 476: (0) , 503: (0) , 531: (0) , 557: (0) , 581: (0) , 610: (0) , 634: (0) , 662: (0) , 687: (0) , 716: (0) , 732: (0) , 747: (0) , 795: (0), 835: (-1.2) , 887: (1.2) , 942: (-1.2) , 995: (1.2) , 1050: (-1.2) , 1103: (1.2) , 1158: (-1.2) , 1213: (1.2) , 1267: (-1.2) , 1321: (1.2) , 1377: (-1.2) , 1432: (1.2) , 1487: (-1.2) , 1543: (1.2) , 1596: (-1.2) , 1651: (1.2) , 1701: (-1.2)");
    const [resumeFromFrame, setResumeFromFrome] = useState<number>(325);
    const [totalFrames, setTotalFrames] = useState<number>(570);

    const [outputSchedule, setOutputSchedule] = useState<null|string>(null);
    const [outputPrompts, setOutputPrompts] = useState<null|string>(null);
    const [error, setError] = useState<null|string>(null);

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

            let rebuiltPairs = [
                {
                    frame: 0,
                    value: parsedArray.filter(p => p.frame < resumeFromFrame).sort((a, b) => b.frame - a.frame)?.[0]?.value
                },
                ...parsedArray.filter(p => p.frame > resumeFromFrame).map(({frame, value}) => {
                    const newFrame = frame - resumeFromFrame;
                    return {
                        frame: newFrame,
                        value
                    };
                })
            ]

            const reJoinedString = rebuiltPairs.map(({ frame, value }) => {
                return `${frame}: (${value})`;
            }).join(', ');

            setOutputSchedule(reJoinedString);

            //    Handle Prompts
            const parsedPrompts = Object.entries(JSON.parse(prompts));
            console.log(parsedPrompts);
            const adjustedPrompts = [
                {
                    frame: 0,
                    prompt: parsedPrompts.filter(([frame, prompt]) => +frame < resumeFromFrame).sort((a, b) => +b[0] - +a[0])?.[0]?.[1]
                },
                ...parsedPrompts.map(([frame, prompt]) => {
                    const adjustedFrame = parseInt(frame, 10) - resumeFromFrame;
                    return {
                        frame: adjustedFrame,
                        prompt: prompt
                    };
                }).filter(({frame}) => frame >= 0)
            ];

            const adjustedPromptsObject = adjustedPrompts.reduce((acc, {frame, prompt}) => {
                acc[frame] = prompt;
                return acc;
            }, {});

            setOutputPrompts(JSON.stringify(adjustedPromptsObject, null, 4));

        } catch(e) {
            console.error(e);
            setError(e.toString());
            alert(`Could not process: ${e.toString()}`);
        }
    }

    return (
        <div className="container mt-4">
            <h1>Resume Tool</h1>
            <div className="mb-3">
                <label htmlFor="inputSchedule" className="form-label">Input Schedule</label>
                <input id="inputSchedule" className="form-control" type="text" value={inputSchedule} onChange={e => setInputSchedule(e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="resumeFromFrame" className="form-label">Resume from frame</label>
                <input id="resumeFromFrame" className="form-control" type="number" value={resumeFromFrame} onChange={e => setResumeFromFrome(+e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="totalFrames" className="form-label">Total number of frames</label>
                <input id="totalFrames" className="form-control" type="number" value={totalFrames} onChange={e => setTotalFrames(+e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="prompts" className="form-label">Deforum Prompts</label>
                <textarea id="prompts" className="form-control" style={{height: 500}} value={prompts} onChange={e => setPrompts(e.target.value)}></textarea>
            </div>

            <button className="btn btn-primary" onClick={process}>Process</button>
            <div className="mt-4">
                <h2>Remaining Frames:</h2>
                <pre>{totalFrames - resumeFromFrame}</pre>
            </div>
            {outputPrompts && (
                <div className="mt-4">
                    <h2>Output Schedule:</h2>
                    <pre>{outputSchedule}</pre>

                    <h2>Output Prompts:</h2>
                    <pre>{outputPrompts}</pre>
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

export default ResumeTool;
