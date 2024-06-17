import { FC, ReactNode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import './globals.css';
import tools from './tools.json';
import Link from 'next/link';
import Head from 'next/head';

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <html lang="en">
        <Head>
            <title>Defourm Helper Tools</title>
        </Head>
        <body>
        <div className="container-fluid">
            <div className="row vh-100">
                <nav className="col-3 bg-dark text-white p-4">
                    <h2 className="text-center">Tools and Functions</h2>
                    <ul className="nav flex-column">
                        {tools.map((tool) => (
                            <li key={tool.name} className="nav-item">
                                <Link href={tool.url} className="nav-link text-white" title={tool.description}>
                                    {tool.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <main className="col-9 p-4">
                    {children}
                </main>
            </div>
        </div>
        </body>
        </html>
    );
};

export default RootLayout;
