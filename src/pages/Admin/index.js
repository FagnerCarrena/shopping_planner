import './style.css'
import {useEffect, useState} from 'react'
import{auth, db} from '../../firebaseConnection'
import{signOut} from 'firebase/auth'
import {addDoc,
     collection,
     onSnapshot,
     orderBy,
     where ,
     query , doc, deleteDoc, updateDoc
    } from 'firebase/firestore'

export default function Admin(){
const [tarefaInput, setTarefaInput] = useState('')
const [user, setUser] = useState({})
const [tarefas, setTarefas] = useState([])
const [edit, setEdit] = useState({})




useEffect(()=>{
async function loadTarefas(){
const userDetail = localStorage.getItem("@detailUser")
setUser(JSON.parse(userDetail))

if(userDetail){
const data = JSON.parse(userDetail);
const tarefaRef = collection(db, "tarefas")
const q = query(tarefaRef, orderBy('created', 'desc'), where('userUid', '==', data?.uid))
const unsub = onSnapshot(q, (snapshot)=>{
    let lista = []; 

    snapshot.forEach((doc)=>  {
        lista.push({
            id:doc.id,
            tarefa: doc.data().tarefa,
            userUid: doc.data().userUid
        })
    });
    
    setTarefas(lista)
})
}


}
loadTarefas()
},[])

async function handleRegister(e){
e.preventDefault();
if( tarefaInput === ''){
    alert('Digite alguma tarefa')
    return;
}
if(edit?.id){
handleUpdateTarefa();
return
}

 await addDoc(collection(db, "tarefas"), {
     tarefa: tarefaInput, 
     created: new Date(),
     userUid: user?.uid
 })

 .then(()=>{
 console.log('Tarefa registrada com sucesso')
 setTarefaInput('')
 })
 .catch((error)=>{
 console.log(error)
 })
}

async function handleSair(){
await signOut(auth)
    
}

async function deleteTarefa(id){
const docRef = doc(db, "tarefas", id)
await deleteDoc(docRef)

}
function editarTarefa(item){
    setTarefaInput(item.tarefa)
    setEdit(item)
        }
async function handleUpdateTarefa(){
const docRef = doc(db, 'tarefas', edit?.id)
 await updateDoc(docRef,{
  tarefa: tarefaInput
})
.then(()=>{
setTarefaInput('')
setEdit({})

})
.catch(()=>{
    setTarefaInput('')
    setEdit({})
})
                
 }


return(
    <div className='admin-container'>
        <h1>Compras</h1>

        <form  className='form' onSubmit={handleRegister}>
            <textarea
            placeholder='Digite sua compra'
            value={tarefaInput}
            onChange={(e)=>setTarefaInput(e.target.value)}/>
       {Object.keys(edit).length > 0 ? (
         <button  style={{backgroundColor: '#6add39' }}  className='btn-register' type='submit'>Atualizar Tarefa</button>
       ) : (<button className='btn-register' type='submit'>Registrar Compra</button>)}
        </form>
        {tarefas.map((item)=>(
         <article key={item.id} className='list'>
         <p>{item.tarefa}</p>
         <div>
     <button onClick={()=>editarTarefa(item)}>Editar</button>
      <button onClick={()=> deleteTarefa(item.id)} className='btn-delete'>Concluir</button>
         </div>
     </article>

        )

        )}
        <button className='btn-logout' onClick={handleSair} >Sair</button>

        
    </div>
)


}

