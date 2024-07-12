import { Link, useNavigate } from 'react-router-dom'
import { getDocs, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { Database } from '../config/firebase/firebase.config.js';
import { useEffect,useState } from 'react';
import DeleteIcon from '../assets/delete.svg'
import EditIcon from '../assets/pen.png'

// styles
import '../css/home.css'

export default function HomePage () {

    const [articles, setArticles] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const ref = collection(Database, 'articles');

        onSnapshot(ref, (snapshot)=>{
            console.log(snapshot);
            let results = []
            snapshot.docs.forEach(doc => {results.push({id: doc.id, ...doc.data()});
            });
            setArticles(results);
        })

        getDocs(ref)
            .then((snapshot)=>{
                let results = []
                console.log(snapshot)
                snapshot.docs.forEach(doc => {
                    results.push({id: doc.id, ...doc.data()});
                });
                setArticles(results);
            })

    },[]);

    const handleDelete = async (id) => {
        const ref = doc(Database, 'articles', id)
        await deleteDoc(ref);
    }


    return (
        <div className="home">
            <h2>Articles</h2>
            {articles && articles.map(article => (
                <div key={article.id} className="card">
                    <h3>{article.title}</h3>
                    <p>Written by {article.author}</p>
                    <Link to={`/articles/${article.id}`}>Read More...</Link>
                    <img
                        className="icon"
                        onClick={() => navigate(`/articles/edit/${article.id}`)}
                        src={EditIcon} alt="edit icon"
                    />
                    <img
                        className="icon"
                        onClick={() => handleDelete(article.id)}
                        src={DeleteIcon} alt="delete icon"
                    />
                </div>
            ))}
        </div>
    )
}