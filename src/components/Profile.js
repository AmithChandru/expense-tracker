import { useContext, useState } from 'react';
import './Profile.css';
import LoginContext from './Store/LoginContext';

const Profile = () => {

  const [name, setName] = useState(null);
  const [url, setUrl] = useState(null);
  const loginCtx = useContext(LoginContext);

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
          <input type='text' onChange={(e) => setName(e.target.value)}/>
          <label>Profile Photo URL:</label>
          <input type='text' onChange={(e) => setUrl(e.target.value)}/>
        </form>
        <button className='UpdateButton' onClick={handleUpdateClick}>Update</button>
      </div>
    </div>
  )
}

export default Profile;