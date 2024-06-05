import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copyButtonColor, setCopyButtonColor] = useState("blue");
  const [copyButtonTitle, setCopyButtonTitle] = useState("Selection");


  // useCallback hook function ko cache ma store krny k lia use hota hai or code optimization k lia use hota hai 
  // or jasey hi kesi dependency ma koie change aa gie tu useCallback function call ho ga 
  const passwordGenerator = useCallback(()=> {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$%^&*()_+-=[]{}|;:',.<>?/`~\ ";
    
    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length) // custom characters selection from index to index
    window.navigator.clipboard.writeText(password); // copy current password

    setCopyButtonColor((prevColor)=> prevColor === "blue"? "green" : "blue");
    setCopyButtonTitle((prevTitle)=> prevTitle === "Selection"? "Selected Password" : "Selection");

  }, [password])


  // useEffect function on load per call hota hai or useEffect dependency k change per b use hota hai 
  useEffect(() => {
    passwordGenerator(); // 
  } ,[length, numberAllowed, charAllowed, passwordGenerator])


  // kesi b cheez ka reference lany k lia useRef hook use hota hai
  let passwordRef = useRef(null);

  


  return (
    <>
      <div className='w-full max-x-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
        />
        <button 
          onClick={copyPasswordToClipBoard}
          className='outline-none text-white px-3 py-0.5 shrink-0' 
          style={{backgroundColor:copyButtonColor}}
          title={copyButtonTitle}> 
          Copy
        </button>
        </div>
        <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
                <input 
                type="range"
                min={6}
                max={100}
                value={length}
                className='cursor-pointer'
                onChange={(e) => {setLength(e.target.value)}}
                />
                <label>length: {length}</label>
            </div>

            <div className='flex items-center gap-x-1'>
                <input 
                type="checkbox"
                defaultChecked={numberAllowed}
                id='numberInput'
                onChange={() => {setNumberAllowed((prev)=>!prev)}}
                />
                <label htmlFor='numberInput'>Numbers</label>
            </div>

            <div className='flex items-center gap-x-1'>
                <input 
                type="checkbox"
                defaultChecked={numberAllowed}
                id='charInput'
                onChange={() => {setCharAllowed((prev)=>!prev)}}
                />
                <label htmlFor='charInput'>Charactes</label>
            </div>
 
        </div>
      </div>
    </>
  )
}

export default App
