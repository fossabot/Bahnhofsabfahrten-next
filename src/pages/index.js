import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '../../components/Header/header'
import Turnstone from 'turnstone'
import { useRouter } from 'next/router'
const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  const router = useRouter();
  function searchstation(){
    const getsearchvalue = document.getElementById("searchvalue").value
    const getnumberofresults = document.getElementById("numberofresults").value
    if (getsearchvalue != ""){
      const redirecturl = "/departures/" + getsearchvalue + "&results=" + getnumberofresults
      router.push(redirecturl)
      }
      if (getsearchvalue ==""){
        router.push("/departures")
      }
  }
  const listbox  = {
    displayField: 'name',
    data: (query) =>
      fetch(`https://api.phipsiart.at/station/${query}`)
        .then(response => response.json()),
    searchType: 'startsWith', 
  }
  const searchstyles= {
    input:'searchinput',
    typeahead: 'grey',
    listbox:'searchresults',
    item: 'item'
  }



  return (
    <>
      <Head>
        <title>Bahnhofsabfahrten</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header></Header>
      <main className={inter.className}>
        <h1 className={styles.headline}>Bahnhof ausw&auml;hlen</h1>
        <div className={styles.search} id={styles.searchfield}>
        <Turnstone  id='searchvalue'
      name='search'
      styles={searchstyles}
      autoFocus={true}
      typeahead={true}
      debounceWait={250}
      listboxIsImmutable={true}
      maxItems={7}
      listbox={listbox}
      noItemsMessage="Bahnhof nicht gefunden"
      placeholder='Bahnhof suchen'
    /> 
      <input  autoComplete="off" role="presentation" required className={styles.boxanimation2} type="number" id="numberofresults" placeholder="Anzahl der Ergebnisse" defaultValue="10"></input>
       <button onClick={searchstation} className={styles.inputbutton}>Suchen</button>
       </div>
       <div id='footer'>
        <p className={styles.footertext}>Alle Angaben ohne Gew&auml;hr.</p>
       </div>
      </main>
    </>
  )
}
