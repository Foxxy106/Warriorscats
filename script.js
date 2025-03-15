// ✅ Import Firebase funkcí
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
        import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

        // ✅ Firebase konfigurace
        const firebaseConfig = {
            apiKey: "AIzaSyACgG8xZvMHWFJPlo-WJwyMKDOhD4NRZQI",
            authDomain: "warriors-cats-cz.firebaseapp.com",
            projectId: "warriors-cats-cz",
            storageBucket: "warriors-cats-cz.appspot.com",
            messagingSenderId: "103962692564",
            appId: "1:103962692564:web:e72bb5d2a2309a90182441",
            measurementId: "G-6X0J9J8PKC"
        };

        // ✅ Inicializace Firebase a Firestore
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        // ✅ Funkce pro načtení jmen z Firestore
        async function loadNames() {
            const querySnapshot = await getDocs(collection(db, "warriorNames"));
            const names = [];
            querySnapshot.forEach(doc => {
                names.push(doc.data());
            });
            displayNames(names);
        }

        // ✅ Funkce pro zobrazení jmen v tabulce
        function displayNames(names) {
            const table = document.getElementById("nameList");
            table.innerHTML = "";
            names.forEach(cat => {
                table.innerHTML += `<tr><td>${cat.english}</td><td>${cat.czech}</td></tr>`;
            });
        }

        // ✅ Funkce pro přidání nového jména do Firestore
        async function addName() {
            const englishName = document.getElementById("newEnglish").value.trim();
            const czechName = document.getElementById("newCzech").value.trim();

            if (englishName === "" || czechName === "") {
                alert("Vyplň obě jména!");
                return;
            }

            await addDoc(collection(db, "warriorNames"), {
                english: englishName,
                czech: czechName
            });

            document.getElementById("newEnglish").value = "";
            document.getElementById("newCzech").value = "";

            loadNames(); // Znovu načti jména po přidání
        }

        // ✅ Připojení tlačítka k funkci
        document.getElementById("addNameBtn").addEventListener("click", addName);

        // ✅ Načti jména při otevření stránky
        window.onload = () => {
            loadNames();
        };
        window.addName = addName;
