import AutoComplete from './components/Autocomplete'
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.container}>
      <h2>Google Autocomplete</h2>
      <AutoComplete />
    </div>
  )
}

export default App
