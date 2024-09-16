import { useState, useEffect, useRef} from "react";
import SearchBar from "./Components/SearchBar";
import Gallery from "./Components/Gallery";
import Spinner from './Components/Spinner';
import { DataContext } from "./Context/DataContext";
import { SearchContext } from "./Context/SearchContext";
import { createResource as fetchData } from './helper'

const App = () => {
  let searchInput = useRef('')
  let [data, setData] = useState(null)
  let [message, setMessage] = useState('Search for Music!')


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

      if (data.results.length) {
        setData(data.results)
      } else {
        setMessage('Not Found')
      }
  }
  

  if (term) fetchData()
  }
  const renderGallery = () => {
    if(data) {
      return (
        <Suspense fallback={<Spinner />}>
          <Gallery />
        </Suspense>
      )
    }
  }
  return (
    <div className="App">
    {message}
    <Router>
      <Route exact path={'/'}>
        <SearchContext.Provider value={{term: searchInput, handleSearch: handleSearch}}>
          <SearchBar />
        </SearchContext.Provider>
          <DataContext.Provider value={data}>
            {renderGallery()}
          </DataContext.Provider>
      </Route>
      <Route path="/album/:id">
        <AlbumView />
      </Route>
      <Route path="/artist/:id">
        <ArtistView />
      </Route>
    </Router>
  </div>
);
}

export default App;
