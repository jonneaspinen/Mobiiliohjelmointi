import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue } from 'firebase/database';

export default function FirebaseDemo() {

    ref(database, 'items/')

    const [amount, setAmount] = useState('');
    const [product, setProduct] = useState('');
    const [items, setItems] = useState([]);

    const firebaseConfig = {

        apiKey: "AIzaSyC9OiKp8lT0QAAfdTtSqma-iZj-iu8cDWM",

        authDomain: "jonneapp.firebaseapp.com",

        projectId: "jonneapp",

        storageBucket: "jonneapp.appspot.com",

        messagingSenderId: "128868135890",

        appId: "1:128868135890:web:2f1b43dadff0e2002d4e0b"

    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);


    useEffect(() => {
        const itemsRef = ref(database, 'items/');
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            setItems(Object.values(data));
        })
    }, []);

    const saveItem = () => {
        push(
            ref(database, 'items/'),
            { 'product': product, 'amount': amount });
    }


    return (
        <Text></Text>
    )
}