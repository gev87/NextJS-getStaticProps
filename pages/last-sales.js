import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  // const [isLoading,setIsLoading]=useState(false);

  const { data, error, isLoading } = useSWR(
    "https://next-js-lastsales-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    const transformedData = [];
    for (let key in data) {
      transformedData.push({
        id: key,
        name: data[key].userName,
        volume: data[key].volume,
      });
    }
    setSales(transformedData);
    console.log("transformedData", transformedData);
  }, [data]);

  // setSales(transformedData);

  // useEffect(() => {
  //   getAllData();
  // }, []);

  // async function getAllData() {
  //   try {
  //       setIsLoading(true);
  //     const response = await fetch(
  //       "https://next-js-lastsales-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
  //     );
  //     const json = await response.json();

  //     const transformedData = [];
  //     for(let key in json){
  //       transformedData.push({id:key,name:json[key].userName,volume:json[key].volume})

  //     }
  //     setSales(transformedData);
  //   } catch (error) {
  //     console.log("error", error);
  //   }finally{
  //       setIsLoading(false);
  //   }
  // }
  if (error) {
    return <p>Something went wrong</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }


  return (
    <ul>
      {sales.map((sale) => {
        return (
          <li key={sale.id}>
            {sale.name} - ${sale.volume}
          </li>
        );
      })}
    </ul>
  );
}


export async function getStaticProps(){

      const response = await fetch(
        "https://next-js-lastsales-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
      );
      const json = await response.json();

      const transformedData = [];
      for(let key in json){
        transformedData.push({id:key,name:json[key].userName,volume:json[key].volume})

      }

      return {
        props:{
          sales:transformedData,
          revalidate:10,
        }
      }
}

export default LastSalesPage;
