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

const SyncTool = () => {
    const [prompts, setPrompts] = useState<string>(examplePrompt);
    const [framerate, setFramerate] = useState<number>(15);
    const [beats, setBeats] = useState<string>('[703,974,1485,1990,2331,4224,4266]');
    const [scheduleValueA, setScheduleValueA] = useState<string>('-2');
    const [scheduleValueB, setScheduleValueB] = useState<string>('2');
    const [outputFrames, setOutputFrames] = useState<null|string>(null);
    const [outputPrompts, setOutputPrompts] = useState<null|string>(null);
    const [outputSchedule, setOutputSchedule] = useState<null|string>(null);
    const [error, setError] = useState<null|string>(null);

    useEffect(() => {
        const lsBeats = window.localStorage?.getItem('recorder') || beats;
        setBeats(lsBeats);
    }, []);

    function millisecondsToFrames(millisecondsArray: number[], frameRate: number):number[] {
        return millisecondsArray.map(ms => Math.round(ms * frameRate / 1000));
    }

    function process() {
        try {
            const promptData = JSON.parse(prompts);
            const beatData = JSON.parse(beats);
            const frames = millisecondsToFrames(beatData, framerate);

            setOutputFrames(JSON.stringify(frames));

            //build new prompt
            const newPrompt:Record<string, string> = {};
            const useFrames = [0, ...frames];
            let promptCount = 0;
            Object.values(promptData).forEach((prompt, index) => {
                newPrompt[useFrames[index]] = `${prompt}`;
                promptCount++;
            });

            if (promptCount !== beatData.length) {
                alert(`Warning, prompt count does not match beats count:\r\nPrompts: ${promptCount}\r\nBeats:${beatData.length}`);
            }

            setOutputPrompts(JSON.stringify(newPrompt, null, 4));

            //Scheduling
            let schedule = "0: (0)";
            let left = true;
            frames.forEach((frameNumber: number) => {
                schedule += `, ${frameNumber}: (${left ? scheduleValueA : scheduleValueB}) `;
                left = !left;
            });

            setOutputSchedule(schedule);

        } catch(e) {
            setError(e.toString());
            alert(`Could not process: ${e.toString()}`);
        }
    }

    return (
        <div className="container mt-4">
            <h1>Sync Tool</h1>
            <div className="mb-3">
                <label htmlFor="prompts" className="form-label">Deforum Prompts</label>
                <textarea id="prompts" className="form-control" style={{height: 500}} value={prompts} onChange={e => setPrompts(e.target.value)}></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="beats" className="form-label">Beats Array (from recorder tool)</label>
                <input id="beats" className="form-control" type="text" value={beats} onChange={e => setBeats(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="framerate" className="form-label">Framerate (frames per second)</label>
                <input id="framerate" className="form-control" type="number" value={framerate} onChange={e => setFramerate(Number(e.target.value))} />
            </div>
            <div className="mb-3">
                <label className="form-label">Schedule Values (for camera animations/optional)</label>
                <div className="input-group">
                    <span className="input-group-text">A</span>
                    <input type="number" className="form-control" value={scheduleValueA} onChange={e => setScheduleValueA(e.target.value)} />
                    <span className="input-group-text">B</span>
                    <input type="number" className="form-control" value={scheduleValueB} onChange={e => setScheduleValueB(e.target.value)} />
                </div>
            </div>
            <button className="btn btn-primary" onClick={process}>Process</button>
            {outputPrompts && (
                <div className="mt-4">
                    <h2>Output Frames:</h2>
                    <pre>{outputFrames}</pre>

                    <h2>Output Prompts:</h2>
                    <pre>{outputPrompts}</pre>

                    <h2>Output Schedule:</h2>
                    <pre>{outputSchedule}</pre>
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

export default SyncTool;
