import React,{useState,useEffect} from 'react'
import Axios from 'axios'

function CreateUserTest({newUserCallBack}) {
    const [userName, setUserName] = useState("");

    const CreateUser = (uname) => {
        Axios.post("http://localhost:3001/user/create", {username: uname}).then((response) => {
            console.log(response.data);
            newUserCallBack({"id":response.data.insertId, "name":uname});
        });
    };

    return (
        <div>
            <input type="text" onChange={(e)=> {
                    setUserName(e.target.value)
                }}
            />

            <button onClick={() => {CreateUser(userName); }}>Create user</button>

        </div>
    )
}

function TestPage(){

    const [usersList, setUsersList]=useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/user").then((data) => {
            setUsersList(data.data)
        });
    }, []);

    const newUser = (user) =>{
        let users = [...usersList];
        console.log(user);
        users.push(user);
        setUsersList(users);
    }

    return (
        <div>
            <h2>Users:</h2>
            <ol>
                {usersList.map((val, key) => {
                        return (
                            <li key={key}>{val.name}</li>
                        )
                    })
                }
            </ol>
            <hr/>
            <CreateUserTest newUserCallBack={newUser} ></CreateUserTest>
        </div>
    )
}

export default TestPage;
