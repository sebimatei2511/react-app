import React, {useState} from 'react'
import Header from '../../components/header/header'
import Search from '../../components/search/search'
import Popular from '../../components/popular/popular'
import AllArticles from '../../components/allArticles/allArticles';

const home = () => {

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className='home'>
      <Header/>
      <Search setSearchQuery={setSearchQuery}/>
      <Popular searchQuery={searchQuery}/>
      <AllArticles searchQuery={searchQuery}/>
    </div>
  )
}

export default home
