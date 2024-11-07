import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

function App() {
  const [data, setData] = useState('');

  const fetchApi = async() => {
    const response = await fetch("/api/v1/products/1");
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
