import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '../../components/Header/header'
import Turnstone from 'turnstone'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState,useEffect } from 'react'
const inter = Inter({ subsets: ['latin'] })
const images = ['/0b0dbab875d92bb4a56422df932719.jpg', '/737df7b99aa929093ec4657c1164de.jpg', '/964f53cbd5c49367528be2d62ba546.jpg', '/bc1f36ec8d45b96301420e7d92e0de.jpg', '/e85b5f8274d725a7bafad5178b9304.jpg', '/f5ef6f5a465be97c48efcbee1eda0b.jpg']
export default function Home() {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randomIndex]);
  }, []);
const listbox  = {
    displayField: 'name',
    data: (query) =>
      fetch(`https://api.phipsiart.at/api?station=${query}&results=5`)
        .then(response => response.json()).catch(error=>{
          console.warn("Connection to the API failed")
        }),
    searchType: 'startsWith', 
    
  }
  const searchstyles= {
    input:'searchinput',
    typeahead: 'grey',
    listbox:'searchresults',
    item: 'item'
  }



  const router = useRouter();
  function searchstation(){
    const getsearchvalue = document.getElementById("searchvalue").value
    if (getsearchvalue != ""){
      const redirecturl = "/departures/" + getsearchvalue + "&results=10" 
      router.push(redirecturl)
      }
  }  
  return (
    <>
      <Head>
        <title>Bahnhofsabfahrten</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header></Header>
      <main className={inter.className}>
      <h1 className={styles.headline}>Bahnhofsabfahrten<span className={styles.span}>.</span></h1>
        <div className='flex justify-center pt-8'>
        <Image alt='Image of a train' src={selectedImage} className='rounded-2xl image-container' height={333} width={650}></Image>
       </div>
        <div className={styles.search} id={styles.searchfield}>
        <Turnstone  id='searchvalue'
      name='search'
      autoFocus={true}
      typeahead={true}
      debounceWait={0}
      listboxIsImmutable={true}
      maxItems={5}
      onSelect={searchstation}
      styles={searchstyles}
      listbox={listbox}
      noItemsMessage="Bahnhof nicht gefunden"
      placeholder='Nach einem Bahnhof suchen'
    /> 
       </div>

      </main>
    </>
  )
}
