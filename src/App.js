import { useState, useEffect, useRef} from "react";
import SearchBar from "./Components/SearchBar";
import Gallery from "./Components/Gallery";
import { DataContext } from "./Context/DataContext";
import { SearchContext } from "./Context/SearchContext";

function App() {
  const [search,setSearch] = useState('')
  const [message, setMessage] = useState('Search for Music')
  const [data, setData] =useState([])
let searchInput = useRef('')

  /*useEffect(() => {
    const fetchData = async () => {
        const url = encodeURI(`https://itunes.apple.com/search?term=${search}`)
        console.log(url)
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)

        if (data.results.length) {
          setData(data.results)
        } else {
          setMessage('Not Found')
        }
    }

    if (search) fetchData()
  }, [search]); */

  const handleSearch = async (e, term) => {
    e.preventDefault()
    const fetchData = async () => {
      const url = encodeURI(`https://itunes.apple.com/search?term=${term}`)
      document.title = `${term} Music`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)

      if (data.results.length) {
        setData(data.results)
      } else {
        setMessage('Not Found')
      }
  }

  if (term) fetchData()
  }
  
  return (
    <div>
      <SearchContext.Provider value={ {term: searchInput, handleSearch:handleSearch} }>
      <SearchBar handleSearch={handleSearch} />
      </SearchContext.Provider>
      {message}

      <DataContext.Provider value={data}>
      <Gallery  data={data}/>
      </DataContext.Provider> 
    </div>
  );
}

export default App;
