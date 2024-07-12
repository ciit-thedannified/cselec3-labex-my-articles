import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {collection, addDoc, updateDoc, doc, getDoc} from "firebase/firestore";
import {Database} from "../config/firebase/firebase.config.js";

import '../css/create.css';

function ArticleForm({editMode}) {

    const { articleId } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    async function handlePublish(event) {
        event.preventDefault();

        const articleMetadata = {title, author, content};
        const articleCollection = collection(Database, 'articles');

        await addDoc(articleCollection, articleMetadata)
            .then(() => {
                console.log(`Article "${title}" published successfully.`);
                navigate('/');
            })
            .catch(e => {
                console.error(e);
            });

    }

    async function handleUpdate(event) {
        event.preventDefault();

        const articleMetadata = {title, author, content};
        const articleReference = doc(Database, 'articles', articleId);

        await updateDoc(articleReference, articleMetadata)
            .then(() => {
                console.log(`Article "${title}" updated successfully`);
                navigate("/");
            })
            .catch(e => {
                console.error(e);
            })
    }

    function setArticleData() {
        getDoc(doc(Database, 'articles', articleId))
            .then(article => {
                let a = article.data();

                setTitle(a.title);
                setAuthor(a.author);
                setContent(a.content);
            })
            .catch(e => {
                console.error(e);
                navigate('/');
            })
    }

    return (
        <>
            {
                articleId && setArticleData()
            }

            <div className="create">
                <h1> { !editMode ? "Publish New Article" : "Update Article" } </h1>
                <form onSubmit={!editMode ? handlePublish : handleUpdate}>

                    <label>
                        <span>Title:</span>
                        <input
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            required
                        />
                    </label>

                    <label>
                        <span>Author:</span>
                        <input
                            type="text"
                            onChange={(e) => setAuthor(e.target.value)}
                            value={author}
                            required
                        />
                    </label>

                    <label>
                        <span>Content:</span>
                        <textarea
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            rows="10"
                            cols="50"
                            required
                        />
                    </label>

                    <button className="btn"> {!editMode ? "Publish" : "Update"} </button>
                </form>
            </div>

        </>
    );

}

export default ArticleForm;