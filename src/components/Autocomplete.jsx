import styles from './Autocomplete.module.css';
import {useEffect, useState} from 'react';

const AutoComplete = () => {

    const[input,setInput] = useState("");
    const[suggestion,setSuggestion]=useState([]);

    useEffect(()=>{
        const debouncedSearch = setTimeout(()=>{
            if(input.length > 1){
            fetch(`https://api.datamuse.com/sug?s=${input}`)
            .then((res)=>res.json())
            .then((data)=>setSuggestion(data));
        }else{
            setSuggestion([]);
        }
        },300);
        return() => clearTimeout(debouncedSearch);
    },[input]);

    useEffect(()=>{
        const handleClickOutside = (e) => {
            if(!e.target.closest('#autocomplete')) {
                setSuggestion([]);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    },[]);
    

    return(
        <>
          <input 
          id="autocomplete"
          type="text"
          className={styles.input}
          placeholder="Search..."
          onChange={(e)=>setInput(e.target.value)}
         />
         {
            suggestion.length > 0 ? (
               <div className={styles.suggestionContainer}>
                 <ul className={styles.ul}>
                    {suggestion.map((item, index)=>
                    <>
                    <li className={styles.li}>{item?.word}</li>
                    {
                        suggestion.length - 1 !== index && <hr />
                    }
                    </>
                    )}
                </ul>
               </div>
            ) : (
               input && (
                <div>No suggestions</div>
               )
            )
         }
        </>
    )
};
export default AutoComplete;