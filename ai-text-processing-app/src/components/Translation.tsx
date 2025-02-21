import { PropType } from "./Types";
import { useState } from "react";



const Translation = ({language,setLanguage,setText,text}:PropType) => {
    const [targetLang, setTargetLang] = useState(""); 
    const [result,setResult] = useState("")


    const translateLanguage = async ()=>{
        const translatorCapabilities = await window.ai.translator.capabilities();
        const translator = await window.ai.translator.create({
            sourceLanguage: 'en',
            targetLanguage: targetLang,
            monitor(m) {
              m.addEventListener('downloadprogress', (e) => {
                console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
              });
            },
          });
         const result =  await translator.translate(text);
          setResult(result)
    }
  
  return (
    <div>
        <select name="laanguages" title="languages" id="" value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="ru">Russian</option>
            <option value="po">Portuguese</option>
            <option value="tr">Turkish</option>
            <option value="fr">French</option>
        </select>
        <button onClick={translateLanguage}>Translate</button>

        {result && <p> the translated language : {result}</p>}
    </div>
  )
}

export default Translation