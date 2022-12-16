import { useState } from 'react';
import './App.css';
import Orden from './Orden';

function App() {

  //hooks: funciones que react usa para controlar el ciclo de vida de los componentes
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  //actualizar cuando obtenga el token desde el api /auth/login
  const [jwt,setJwt] = useState(localStorage.getItem('jwt') || null);

  //estado de las ordenes => []
  const [ordenes, setOrdenes] = useState([]);

  const login = async () => {
    console.log(username,password);
    
    //con user y pass consumo el endpoint
    const endpoint = 'http://localhost:8080/ordenrest/auth/login';
    
    //armo json
    const request = {
      password: password,
      username: username
    };

    //convierto un objeto java script a texto
    const body = JSON.stringify(request); 
    console.log(body);

    //usando FETCH API
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
    .then((response) => response.json())
    .then((data) => {
      //ok
      //console.log(data.jwt);
      setJwt(data.jwt);
    })
    .catch((error) => {
      alert(JSON.stringify(error));
    });

    //aca rengo res
  }

  const findOrdenes = async () => {
    const endpoint = 'http://localhost:8080/ordenrest/orden';
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
    })
    .then((response) => response.json())
    .then((data) => {
        setOrdenes(data);
    })
    .catch((error) => {
      alert(JSON.stringify(error));
    });
  }

  return (
    <div>
        <h1>Login</h1>
        <label>Username</label>
        <input value={username}
          onChange={(e) =>setUsername(e.target.value)}/>

        <label>Password</label>
        <input  type="password"
          value={password}
          onChange={(e) =>setPassword(e.target.value)}/>
        
        <button type='submit' onClick={login}>
          Login
        </button>
        
        {jwt &&
          <button onClick={findOrdenes}>
            FindAll Ordenes
          </button>
        }
        { ordenes.length > 0 &&
          <Orden ordenes={ordenes} />
        }
    </div>
  );
}

export default App;
