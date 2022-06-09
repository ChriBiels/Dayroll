//import { collection, addDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react"; 
//import {db} from '../services/firebase'

// Se crea función global
function Fonetica() {
    const [word, setWord] = useState(""); 
    const [phonetic, setPhonetic] = useState(""); 
    const [phonetics, setPhonetics] = useState(""); 
    const [audio, setAudio] = useState("")

    const [find, setFind] = useState(false); 


    //Parte firebase
   // const usersCollectionRef = collection(db, "palabras"); 

    //Añadir palabra
   /* const createUser = async () => {
        await addDoc(usersCollectionRef, { nombre: word});
      };*/

      //Fin parte firebase


      //Parte mongo
      const [fonetica, setPalabras] = useState([]);

    useEffect(() => {
        async function llamadaAPI(){
            const req = await fetch('http://localhost:5300/fonetica/')
            const data = await req.json()
            console.log(data)
            setPalabras(data.datos[0])
        }
        llamadaAPI()
    }, [])

    //fin parte mongo
   
    //función con parámetro para extraer la info de la API.
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}` 
            const request = await fetch(url)
            const datoss = await request.json() 
            console.log(datoss)
            setPhonetic(datoss[0].phonetics[1].text) 
            console.log(datoss[0].phonetics[1].text)
            setPhonetics(datoss[0].phonetics[2].text) 
            console.log(datoss[0].phonetics[2].text)
            setAudio(datoss[0].phonetics[1].audio)
            console.log(datoss[0].phonetics[1].audio)
            setFind(true) 
            //createUser()
        }catch(e){
            setFind(false) 
        }

    }
    
    const handleChange = (e) => { 

        setWord(e.target.value)
        
    }
    return <>
        <img src="https://previews.123rf.com/images/grgroup/grgroup1611/grgroup161105280/65346426-cartoon-mouth-with-teeths-with-happy-expression-over-white-background-vector-illustration.jpg" alt="fonetica" width="250" height="250"></img>
        <h2>Transcripción fonética</h2>
        <form onSubmit={handleSubmit}>
            <label>Inserta la palabra a buscar:
                <input type="text" name="valu" value={word} onChange={handleChange}  />
            </label> 
            <input type="submit" value="Buscar transcripción"/>
        </form>
        <br/>
        {find && <span>{phonetic}</span> }
        <br/>
        {find && <audio controls muted> <source src={audio}></source> </audio> }
        <br/>
        {find && <span>{phonetics}</span>}
        <br/>
        {find && <audio controls muted> <source src={audio}></source> </audio> }
        {!find && <span>No se encontró la transcripción</span> }
        <br></br>
        <h3>Listado de puntuaciones</h3>
        <ul>
        {fonetica._id}
        </ul>
        <ul>
            
        </ul>
    </>;
}

export default Fonetica;