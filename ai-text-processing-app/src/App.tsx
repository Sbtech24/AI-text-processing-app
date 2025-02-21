import LanguageDetector from "./components/LanguageDetection"
import Translation from "./components/Translation"
import { useState } from "react";


function App() {
  const [text, setText] = useState("");
   const [language, setLanguage] = useState("");
  
  return (
    <>
      <h1>Hi</h1>
      <LanguageDetector language={language} setLanguage={setLanguage} text={text} setText={setText}/>
      <Translation language={language} setLanguage={setLanguage} setText={setText} text={text} />
    </>
  )
}

export default App
