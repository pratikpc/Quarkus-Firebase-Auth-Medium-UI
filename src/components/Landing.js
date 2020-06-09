import React from 'react'
import { Token, SignOut } from './Utils/AuthCheck';
import './Landing.css';
async function FetchNote() {
    const token = await Token();
    console.log(token);
    const noteResp = await fetch(`${process.env.REACT_APP_SERVER}/api/note`, {
        method: "GET",
        mode: "cors",
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!noteResp.ok) {
        throw new Error("Status " + noteResp.status + await noteResp.text());
    }
    return await noteResp.text();
}

async function UploadNote(note, setNote, setLoading) {
    try {
        if(note.length > 19){
            note = note.substring(0, 19);
            setNote(note);
            return;
        }
        setLoading(true);
        const token = await Token();
        const body = new URLSearchParams({
            note: note
        });

        const noteResp = await fetch(`${process.env.REACT_APP_SERVER}/api/note`, {
            method: "POST",
            mode: "cors",
            body: body,
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        });
        if (!noteResp.ok) {
            throw new Error("Status " + noteResp.status + await noteResp.text());
        }
        setNote(await FetchNote());
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
}

export default function Landing() {
    const [note, setNote] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        async function PerformAsync() {
            try {
                setLoading(true);
                const note = await FetchNote();
                setNote(note);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        PerformAsync();
    }, []);
    return <>
        <div style={{
            justifyContent: "center",
            textAlign: "center",
            width: "50%",
            margin: "0 auto"
        }}>
            <h1>Save A Single Note</h1>
            <br />
            <div>
                <textarea
                    rows={5}
                    cols={50}
                    value={note}
                    placeholder="Store Notes"
                    onChange={event => setNote(event.target.value)} />
                <br />
                <div >
                    <button onClick={_ => UploadNote(note, setNote, setLoading)}>
                        UPDATE
                    </button>
                    <button onClick={async _ => {
                        await SignOut();
                        window.location.reload();
                    }}>LOGOUT</button>
                </div>
                {
                    loading &&
                    <p class="loading">
                        Loading...
                    </p>
                }
            </div>
            <p>
                <a href="https://medium.com/@pratikpc/user-auth-using-quarkus-firebase-fdab11d5a845">Medium Article Link</a>
            </p>
        </div>
    </>;
};

