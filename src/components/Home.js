import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import LoginContext from './Store/LoginContext';

const Home = () => {

  const navigate = useNavigate();
  const loginCtx = useContext(LoginContext);
  const [items, setItems] = useState([]);
  const [money, setMoney] = useState(null);
  const [desc, setDesc] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetch('https://react-movies-8029a-default-rtdb.asia-southeast1.firebasedatabase.app/expense.json')
      .then((res) => {
        let temp = [];
        res.json().then((data) => {
          for (const key in data) {
            temp.push({
              money: data[key].money,
              desc: data[key].desc,
              category: data[key].category
            })
          }
        })
        setItems(temp);
      })
  })

  const handleClick = () => {
    navigate('/Profile');
  }

  const handleVerifyEmail = async () => {
    await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCszasJf5BQUdZzWYKXbjjvKo5BlnvW79Q', {
      method: 'POST',
      body: JSON.stringify({
        requestType: 'VERIFY_EMAIL',
        idToken: loginCtx.token.idToken
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          loginCtx.handleIsVerified();
          console.log(data)
        })
      } else {
        res.json().then((data) => {
          console.log(data);
        })
      }
    })
  }

  const handleAddExpense = async () => {
    await fetch('https://react-movies-8029a-default-rtdb.asia-southeast1.firebasedatabase.app/expense.json', {
      method: 'POST',
      body: JSON.stringify({
        money: money,
        desc: desc,
        category: category
      }),
      headers: {
        'Content-Type': 'application/json'
      }
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log(data);
          })
        } else {
          res.json().then((data) => {
            console.log(res.error.message);
          })
        }
    })
    setItems((state) => [
      ...state,
      {
        money: money,
        desc: desc,
        category: category
      }
    ]);
  }

  return (
    <div className='HomeContainer'>
      <div className="HomeHeader">
        <span>Welcome to Expense Tracker!!!</span>
        {!loginCtx.isVerified && <button style={{ cursor: 'pointer' }} onClick={handleVerifyEmail}>Verify email</button>}
        <section className='TextDecoration'>
          <span>Your profile is incomplete. </span>
          <span className='ClickableText' onClick={handleClick}>Complete now</span>
        </section>
      </div>
      <div className='ExpensesContainer'>
        <section className='InputContainer'>
          <input placeholder='Money Spent' onChange={(e) => setMoney(e.target.value)} />
          <input placeholder='Description' onChange={(e) => setDesc(e.target.value)} />
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="food">Food</option>
            <option value="fuel">Fuel</option>
            <option value="others">Others</option>
          </select>
        </section>
        <button onClick={handleAddExpense}>Add Expense</button>
        {items.map((item) => {
          return (
            <div>
              <span>{item.money}</span>
              <span>{item.desc}</span>
              <span>{item.category}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home;