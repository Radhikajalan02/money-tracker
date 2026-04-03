import { useState,useEffect} from 'react'
import './App.css'
import.meta.env

function App() { //adding states to make our form functional
  const [name, setName] = useState("")
  const [datetime,setDatetime]=useState("")
  const[description,setDescription]=useState("")
  const [transactions,setTransactions]=useState([])

  function addNewTransaction(e){ //this should take all the states and send it to the backend
    e.preventDefault(); //default is to refresh thus we add this so that the page doesnot refresh onclick always
  const URL=import.meta.env.VITE_API_URL + '/transaction';
  // console.log(URL) //to see if it works
  const priceStr = name.split(' ')[0];
  const price = parseFloat(priceStr);
  const nameWithoutPrice = name.substring(priceStr.length + 1);
  fetch(URL, {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      price,
      name: nameWithoutPrice,
      description,
      datetime

    }),
  }).then(response=>{
    response.json().then((json)=>{
      setName("")
      setDatetime("")
      setDescription("")
      console.log('result',json)
      fetchTransactions();
    })
  })

  }
  async function fetchTransactions(){
    try{
      const response=await fetch(import.meta.env.VITE_API_URL + '/transaction');
      if(response.ok){
        const data= await response.json();
        setTransactions(data);
      }else{
        console.error("Failed to fetch transactions",response.status);
      }
    }catch(error){
      console.error("Error fetching transactions:",error);
    }
  }
  useEffect(()=>{
    fetchTransactions();
  },[]);

  const total=transactions.reduce((acc,transactions)=>acc+transactions.price,0)
  return (
    <>
      <main>
        <h1>Rs.{total}</h1>
        <form onSubmit={addNewTransaction}>
          <div className='basic'>
            <input type="text"
                   value={name} 
                   onChange={e=> setName(e.target.value)}
                   placeholder="+200 new tv"/>
           <input type="datetime-local"
                  value={datetime}
                  onChange={e=>setDatetime(e.target.value)}/>
          </div>
           <div className='description'>
            <input type="text" 
                  value={description}
                  onChange={e=>setDescription(e.target.value)}
                   placeholder={'description'}/>
          </div>
          <button type="submit">Add new transaction</button>
        </form>
        {transactions.map((transaction,index)=>(
          <div key={index} className='transactions'>
          <div className='transaction'>
            <div className="left">
              <div className="name">{transaction.name}</div>
              <div className="description">{transaction.description}</div>
            </div>
            <div className="right">
              <div className={`price ${transaction.price < 0 ? 'red' : 'green'}`}>
                {transaction.price < 0 ? '-' : '+'}Rs.{Math.abs(transaction.price)}
              </div>
              <div className="datetime">{transaction.datetime}</div>

            </div>

          </div>
        </div>
          ))}
      </main>
    </>
  )
}

export default App
