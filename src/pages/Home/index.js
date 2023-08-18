import { useState } from 'react';
import {Link} from 'react-router-dom'
import './style.css'
import {auth} from '../../firebaseConnection'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'


function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

async  function handleLogin(e){
e.preventDefault();

if(email !== '' && password !== ''){
await signInWithEmailAndPassword(auth, email, password)
.then(()=>{
navigate('/admin', { replace: true})
})
.catch(()=>{
console.log("erro ao logar")

})

}else{
  alert("digite aldo")
}

  }

    return (
      <div className="home-container">
        <h1>Lista Supermercado</h1>
        <span>Gerencie suas compras com facilidade</span>

        <form className='form' onSubmit={handleLogin}>
          <input type='text' placeholder='digite sem email....' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input  type='password' placeholder='****' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button type='submit'>Acessar</button>
        </form>

        <Link className='button-link'  to='/register'>
        Não possui uma conta? Cadastre-se
        </Link>
          </div>
    );
  }
  
  export default Home;