import Head from "next/head";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Deforum Helper Tools</title>
            </Head>
            <h1>Welcome to Defourm Helper Tools</h1>
            <h5>By Adam Fowler</h5>
            <p>
                These tools are designed to help AI video creators that use the Automatic1111 Deforum plugin. These can help with many things,
                like camera movement, and resuming a render from a certain frame.
            </p>
            <p>
                If you have contributions to make to this repo, pull requests are much appreciated.
            </p>
        </div>
    );
}
