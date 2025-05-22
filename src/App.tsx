import { useEffect, useState } from 'react';
import { useParams} from "react-router-dom"

function App() {
    const [message, setMessage] = useState('');
    const { id } = useParams();

    useEffect(() => {
        fetch('http://localhost:4000/api/hello')
            .then(res => res.json())
            .then(data => setMessage(data.message));
    }, []);

    return (
        <div>
            <h1>REST App</h1>
            <p>{message}</p>
            <p>{id}</p>
        </div>
    );
}

export default App;
