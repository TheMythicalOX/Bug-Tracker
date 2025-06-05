import {useEffect, useState} from "react";
import {useUserContext} from "./Context";
import preLogged from "../API/preLogged";
import Dashboard from "./Dashboard";
import Guest from "./Guest";

function App() {
    const [tryLog, setTryLog] = useState(false);
    const user = useUserContext();

    useEffect(() => {
        const handleTryLog = async () => {
            await preLogged.preLoggedIn(user);
            setTryLog(true);
        };
        if (! user.isLoggedIn) {
            handleTryLog();
        }
    }, [user]);

    return (<div className="bg-back text-pritext"> {
        ! user.isLoggedIn && tryLog && <Guest/>
    }
        {
        user.isLoggedIn && <Dashboard/>
    } </div>);
}

export default App;
