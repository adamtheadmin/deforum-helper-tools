import Head from "next/head";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Deforum Helper Tools</title>
            </Head>
            <div className="container mt-4">
                <h1 className="display-4">Welcome to Deforum Helper Tools</h1>
                <h5 className="text-muted">By Adam Fowler</h5>
                <p className="lead">
                    Welcome to the Deforum Helper Tools, your go-to resource for enhancing your AI video creation experience using the Automatic1111 Deforum plugin. Whether you're a seasoned creator or just starting out, our tools are here to assist you in bringing your creative visions to life.
                </p>
                <p>
                    Our suite of tools is designed to streamline various aspects of AI video production. From managing complex camera movements to resuming renders from specific frames, we aim to provide functionalities that simplify your workflow and save you time.
                </p>
                <h2 className="mt-4">Key Features</h2>
                <ul>
                    <li><strong>Camera Movement:</strong> Easily create and control dynamic camera movements to add a professional touch to your videos.</li>
                    <li><strong>Render Resumption:</strong> Resume your renders from any specific frame, ensuring that you can pick up right where you left off without hassle.</li>
                    <li><strong>Beat Synchronization:</strong> Sync your video elements to audio beats seamlessly, creating visually synchronized content effortlessly.</li>
                    <li><strong>Prompts Management:</strong> Organize and manage your prompts effectively to streamline your creative process.</li>
                </ul>
                <h2 className="mt-4">Get Involved</h2>
                <p>
                    We believe in the power of community and collaboration. If you have suggestions, improvements, or new tools you'd like to share, your contributions are more than welcome. Feel free to open a pull request on our GitHub repository. Together, we can make Deforum Helper Tools even better!
                </p>
                <p>
                    Thank you for being a part of our community. We hope these tools help you create amazing AI-driven videos and animations. Happy creating!
                </p>
            </div>
        </div>
    );
}
