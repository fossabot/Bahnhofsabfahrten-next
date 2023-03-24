import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Departures.module.css'
import Header from '../../../components/Header/header'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
var _ = require('lodash')
const inter = Inter({ subsets: ['latin'] })
export const getServerSideProps = async ({params}) => {
  const getparams = {params}
  const getstation = params['departures']
  const res  = await fetch("http://127.0.0.1:3000/api/departures/" + getstation)
  const data = await res.json()
  const departuredata = data['result']
  const delaycolor = data['delaycolorresult']
  const creationdate = data['createdon']
  const stationname = data['stationname']
  const timecurrent = data['time']
  return{
    props: {
      departuredataresponse : departuredata,
      delayColorResult: delaycolor,
      createdon: creationdate,
      station: stationname,
      currenttime: timecurrent
    }
    }
}


const Page = ({departuredataresponse, delayColorResult, departuresdelayed, station, currenttime}) =>{0
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  }

  useEffect(() => {
    const interval = setInterval(refreshData, 30000);

    return () => clearInterval(interval);
  }, []);
  
return(
  <>
  <Head>
  <title>Abfahrten in {station}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</Head>
<main className={inter.className}>
  <Header></Header>
   <h1 className={styles.headline}>aktuelle Abfahrten in {station} </h1>
   </main>
   <div className={inter.className}>
    <div className={styles.departures}>
    <table>
    <thead className={styles.tableheader}>
  <tr>
    <th>Linie</th>
    <th>Ziel</th>
    <th>Abfahrt</th>
    <th>Gleis</th>
    <th>Verspätung</th>
  </tr>
  </thead>
  <tbody>
  {Object.values(departuredataresponse).map((row, rowIndex) => (
  <tr key={rowIndex}>
    {row.map((item, itemIndex) => {
      if (itemIndex === 3) {
        return null;
      }
      return (
        <td
          key={`${rowIndex}-${itemIndex}`}
          style={{
            color:
              itemIndex === row.length - 1 ? delayColorResult[rowIndex] : undefined,
          }}
        >
          {item}
          {currenttime === row[3] && itemIndex <3 && <div className={styles.animation} />}
        </td>
      );
    })}
  </tr>
))}
</tbody>
</table> 

      </div>
    <div className={styles.footer}>
      <footer>
      </footer>
    </div>
   </div>
</>
)
}
export default Page;