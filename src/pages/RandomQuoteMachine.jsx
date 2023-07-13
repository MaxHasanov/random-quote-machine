import React, { useEffect, useState } from "react"
import './RandomQuoteMachine.scss'
import axios from 'axios';

function RandomQuoteMachine() {
  const [quote, setQuote] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  
  // Цвета для смены фона
  const colors = ["#14cc8d", "#1481cc", "#cc3114", "#bb14cc", "#14ccbb", "#5f14cc", "#cc8d14"];

  const API = 'https://api.forismatic.com/api/1.0/?method=getQuote&key=random&format=jsonp&lang=ru&jsonp=?';

  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get(API);
    const data = JSON.parse(response.data.match(/({.*})/)[1]);
    setQuote({
      text: data.quoteText,
      author: data.quoteAuthor
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchData()
  }, [])

  const { text, author } = quote;

  return (
    <>
    {colors.map((color, index) => {
      <section 
      key={index}
      style={{backgroundColor: color}}
      className="container container_wrp">
      <h2>Random Quotes!</h2>
      <div>
        {loading ? <p>Loading...</p> : <p>{text + ' - ' + author}</p>}
      </div>
      <button onClick={fetchData} className="btn">New Quote</button>
    </section>
    })}
      {/* <section className="container container_wrp">
        <h2>Random Quotes!</h2>
        <div>
          {loading ? <p>Loading...</p> : <p>{text + ' - ' + author}</p>}
        </div>
        <button onClick={fetchData} className="btn">New Quote</button>
      </section> */}
    </>
  )
}

export default RandomQuoteMachine;