import { useContext, useEffect, useState } from 'react';
import './Profile.css';
import LoginContext from './Store/LoginContext';

const Profile = () => {

  const [name, setName] = useState(null);
  const [url, setUrl] = useState(null);
  const loginCtx = useContext(LoginContext);

  useEffect(() => {
    getUserDetails();
  }, [])

  const getUserDetails = async () => {
    await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCszasJf5BQUdZzWYKXbjjvKo5BlnvW79Q', {
      method: 'POST',
      body: JSON.stringify({
        idToken: loginCtx.token.idToken
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          data.users.forEach((item) => {
            setName(item.displayName);
            setUrl(item.photoUrl);
          })
        })
      } else {
        console.log(res);
      }
    })
  }

  const handleUpdateClick = async () => {
    if (name && url) {
      await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCszasJf5BQUdZzWYKXbjjvKo5BlnvW79Q', {
        method: 'POST',
        body: JSON.stringify({
          idToken: loginCtx.token.idToken,
          displayName: name,
          photoUrl: url,
          returnSecureToken: true,
          deleteAttribute: null
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
            alert(data.error.message);
          })
        }
      })
    } else {
      alert('Enter both fields');
    }
  }

  const handleCompleteClick = () => {}

  return (
    <div className="ProfileContainer">
      <div className="HeaderContent">
        <span>Winners never quit, Quitters never win.</span>
        <section className='TextDecoration'>
          <span>Your profile is 64% complete. A complete Profile has higher chances of landing a job. </span>
          <span className='ClickableText' onClick={handleCompleteClick}>Complete now</span>
        </section>
      </div>
      <div className='DetailsContainer'>
        <section className='ContactLine'>
          <span style={{fontWeight: '500'}}>Contact Details</span>
          <button className='CancelButton'>Cancel</button>
        </section>
        <form className='ProfileForm'>
          <label>Full Name:</label>
          <input type='text' onChange={(e) => setName(e.target.value)} value={name} />
          <label>Profile Photo URL:</label>
          <input type='text' onChange={(e) => setUrl(e.target.value)} value={url} />
        </form>
        <button className='UpdateButton' onClick={handleUpdateClick}>Update</button>
      </div>
    </div>
  )
}

export default Profile;