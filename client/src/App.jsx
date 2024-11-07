import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

function App() {
  const [data, setData] = useState('');

  const fetchApi = async() => {
    const response = await fetch("/api");
    const text = await response.text();
    setData(text);
  };

  useEffect(() => {
      fetchApi();
    }, []);

  return (
    <>
        <Button>hi {data}</Button>
    </>
  )
}

export default App
