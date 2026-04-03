import { useState } from 'react'
import './App.css'
import.meta.env

function App() { //adding states to make our form functional
  const [name, setName] = useState("")
  const [datetime,setDatetime]=useState("")
  const[description,setDescription]=useState("")

  function addNewTransaction(e){ //this should take all the states and send it to the backend
    e.preventDefault(); //default is to refresh thus we add this so that the page doesnot refresh onclick always
  const URL=import.meta.env.VITE_API_URL + '/transaction';
  // console.log(URL) //to see if it works
  const price =name.split("")[0];
  fetch(URL, {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      price,
      name:name.substring(price.length +1),
      description,
      datetime

    }),
  }).then(response=>{
    response.json().then((json)=>{
      setName("")
      setDatetime("")
      setDescription("")
      console.log('result',json)
    })
  })

  }
  return (
    <>
      <main>
        <h1>$400<span>.00</span></h1>
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
        <div className='transactions'>
          <div className='transaction'>
            <div className="left">
              <div className="name">new tv</div>
              <div className="description">it was time for new tv</div>
            </div>
            <div className="right">
              <div className="price red">-$500</div>
              <div className="datetime">2026-04-02 13:25</div>

            </div>

          </div>
        </div>
         <div className='transactions'>
          <div className='transaction'>
            <div className="left">
              <div className="name">freelance</div>
              <div className="description">it was time for new tv</div>
            </div>
            <div className="right">
              <div className="price green">+$1000</div>
              <div className="datetime">2026-04-02 13:25</div>

            </div>

          </div>
        </div>
         <div className='transactions'>
          <div className='transaction'>
            <div className="left">
              <div className="name">iphone</div>
              <div className="description">it was time for new tv</div>
            </div>
            <div className="right">
              <div className="price red">-$900</div>
              <div className="datetime">2026-04-02 13:25</div>

            </div>

          </div>
        </div>
      </main>
    </>
  )
}

export default App
