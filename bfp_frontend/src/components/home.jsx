import NavBar from "./navbar";
import axios from 'axios';

const Home = () => {
    const API_BASE_URL="http://localhost:8080/";
    // const [inputs, setInputs] = useState({});
    // const history = useHistory();

   
        // axios.post(API_BASE_URL + "login", inputs, { headers: { "Content-Type": "application/json" } }).then(function (res) {
        //     console.log(res)
        //     if (res.data == "success") {
        //         console.log(res);

        //         history.push("/login");

        //     }
        // })
        axios.post(API_BASE_URL+"login",{username:"godskandan@gmail.com",password:"$10$96FXl1n1QzV2LDkwpMTVf.H.V9RL.5XuvPciMuc.NXPjLhdchFn0W"}).then(function (res) {
            console.log(res)
        })

    
    return ( 
        <>
        <NavBar></NavBar>
        <div>hello </div>
        </>
     );
}
 
export default Home;
