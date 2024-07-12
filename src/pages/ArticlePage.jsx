import { useParams } from "react-router-dom"
import { getDoc, doc } from 'firebase/firestore';
import { Database } from '../config/firebase/firebase.config.js'
import { useEffect,useState } from 'react';

export default function ArticlePage() {
    const { articleId } = useParams()
    console.log("id: " + articleId);

    const [article, setArticle] = useState(null);

    useEffect(() => {
        const ref = doc(Database, 'articles', articleId);
        getDoc(ref)
            .then((snapshot)=>{
                setArticle(snapshot.data());
            })

    },[])


    // if (!article) {
    //   setTimeout(() => {
    //     navigate('/')
    //   }, 2000)
    // }

    return (
        <div>
            {!article && <p>No records found!</p>}
            {article && (
                <div key={article.id}>
                    <h2>{article.title}</h2>
                    <p>By {article.author}</p>
                    <p>{article.content}</p>
                </div>
            )}
        </div>
    )
}