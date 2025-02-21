import LanguageDetector from "./components/LanguageDetection"
import Translation from "./components/Translation"
import { useState } from "react";


function App() {
  const [text, setText] = useState("");
   const [language, setLanguage] = useState("");
  
  return (
    <>
    <div className="container">

    
      <h1>AI powered text processing app </h1>
      <LanguageDetector language={language} setLanguage={setLanguage} text={text} setText={setText}/>
      <Translation language={language} setLanguage={setLanguage} setText={setText} text={text} />
    </div>
    </>
  )
}

export default App
