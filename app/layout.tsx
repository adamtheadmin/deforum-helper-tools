import { FC, ReactNode } from 'react';
import './globals.css';
import tools from './tools.json';
import Link from 'next/link';
import Head from "next/head";

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <html lang="en">
        <Head>
            <title>Defourm Helper Tools</title>
        </Head>
        <body>
        <div className="container">
            <div className="sidebar">
                <h2>Tools and Functions</h2>
                <ul>
                    {tools.map((tool) => (
                        <li key={tool.name} title={tool.description}>
                            <Link href={tool.url}>{tool.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="main">
                {children}
            </div>
        </div>
        </body>
        </html>
    );
};

export default RootLayout;
