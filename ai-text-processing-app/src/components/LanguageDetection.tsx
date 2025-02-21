import { useState } from "react";
import { PropType } from "./Types";

interface languageObj{
  code: string;
  name: string;
}


const languageObj:languageObj[]= [
  {
    code: "en",
    name: "English",
  },
  {
    code: "fr",
    name: "French",
  },
  {
    code: "es",
    name: "Spanish",
  },
  {
    code: "po",
    name: "Portuguese",
  },
  {
    code: "ru",
    name: "russian",
  },
  {
    code: "tr",
    name: "Turkish",
  },
];

const LanguageDetector = ({language,setText,text,setLanguage}:PropType) => {
  const detectLanguage = async () => {
    if (window.ai && window.ai.languageDetector) {
      try {
        const languageDetectorCapabilities =
          await window.ai.languageDetector.capabilities();
        console.log(languageDetectorCapabilities.languageAvailable("es"));
        const canDetect = languageDetectorCapabilities.capabilities;
        let detector;
        if (canDetect === "no") {
          return;
        }
        if (canDetect === "readily") {
          detector = await window.ai.languageDetector.create();
        } else {
          detector = await window.ai.languageDetector.create({
            monitor(m) {
              m.addEventListener("downloadprogress", (e) => {
                // console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
              });
            },
          });
          await detector.ready;
        }
        // const someUserText = 'Hallo und herzlich willkommen!';
        const results = await detector.detect(text);
        languageObj.map((item)=>{    
          if(item.code === results[0].detectedLanguage ){
            setLanguage(item.name)
          }else{
            console.log("Not in language dictionary")
          }
        }
        )
        
      } catch (error) {
        console.error("Error detecting language:", error);
        alert("Failed to detect language.");
      }
    } else {
      alert("Language Detection API is not available.");
    }
  };

  return (
    <div>
      <h2>Language Detector And Translator</h2>
      <textarea
        placeholder="Type text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={detectLanguage}>Detect Language</button>
      {language && <p>Detected Language: {language}</p>}
    </div>
  );
};

export default LanguageDetector;
