import {BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function DynamicPage() {
    const { resource, id } = useParams();
    const [data, setData] = useState<{ resource: string; id: string } | null>(null);

    useEffect(() => {
        if (resource && id) {
            fetch(`http://localhost:4000/api/${resource}/${id}`)
                .then(res => res.json())
                .then(setData)
                .catch(err => console.error('Fetch error:', err));
        }
    }, [resource, id]);

    return (
        <>
            <div style={{padding: '2rem'}}>
                <h1>Ścieżka: /{resource}/{id}</h1>
                <p><strong>Parametr 1:</strong> {resource}</p>
                <p><strong>Parametr 2:</strong> {id}</p>
                {data && (
                    <div style={{marginTop: '1rem'}}>
                        <h2>Dane z backendu:</h2>
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    </div>
                )}
            </div>
        </>

    );
    }

function XmlPage() {
    const [xml, setXml] = useState<string>('');

    useEffect(() => {
        fetch('http://localhost:4000/api/xml')
            .then(res => res.text()) // XML = zwykły tekst
            .then(setXml)
            .catch(console.error);
    }, []);

    return (
        <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', padding: '1rem' }}>
            <h1>Dane XML</h1>
            <code>{xml}</code>
        </div>
    );
}

    function App() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/xml" element={<XmlPage />} />
                    <Route path="/:resource/:id" element={<DynamicPage/>}/>
                    <Route path="/" element={<h1>Strona główna</h1>}/>
                </Routes>
            </BrowserRouter>
        );
    }

    export default App;
