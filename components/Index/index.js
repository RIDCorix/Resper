import styles from '../../styles/Pages.module.css';
import {Ollama} from 'ollama/browser';

const ollama = new Ollama({host: "https://ollama-api.pudi-lab.com"});

async function o_getResponse(){
  console.log("loading...")
  const response = await ollama.chat({
    model: 'Llama-3-Taiwan-8B-Instruct-Q8_0',
    messages: [
      { role: 'system', content: '請使用繁體中文回答 ' },
      { role: 'user', content: '「你這個番仔」請將這段句子用繁體中文改成不帶歧視意味的句子' }],
  })

  console.log(response)
  return;
}

export default function Index({ navigateToPage }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>NEXT-CHROME-STARTER</h1>
        <p className={styles.description}>
          This is next page of a Browser Extension built with NEXT.JS. Please
          refer to the GitHub repo for running instructions and documentation
        </p>
        <h1 className={styles.code}>Index Page ./components/Index/index.js</h1>
        <p>{"[ - This is Index page content - ]"}</p>
        <p onClick={() => navigateToPage('new')}>{"Go to New Page >"}</p>
        <p onClick={o_getResponse}>{"Test button"}</p>
        <input type="text" placeholder="Type something here" />
      </main>
    </div>
  );
}
