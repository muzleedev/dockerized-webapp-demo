import axios from 'axios'
import { useEffect } from 'react'

function App() {
    useEffect(() => {
        axios
            .get('/api/test')
            .then(({ data }) => console.log(data))
            .catch((e) => console.error(e))
    }, [])

    return <div className="App">Hello from webapp frontend</div>
}

export default App
