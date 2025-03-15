// ✅ Import Firebase funkcí
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js"
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js"
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js"

// ✅ Firebase konfigurace
const firebaseConfig = {
  apiKey: "AIzaSyACgG8xZvMHWFJPlo-WJwyMKDOhD4NRZQI",
  authDomain: "warriors-cats-cz.firebaseapp.com",
  projectId: "warriors-cats-cz",
  storageBucket: "warriors-cats-cz.appspot.com",
  messagingSenderId: "103962692564",
  appId: "1:103962692564:web:e72bb5d2a2309a90182441",
  measurementId: "G-6X0J9J8PKC",
}

// ✅ Inicializace Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
// 🟢 Přihlášení přes Google
async function signIn() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("✅ Přihlášení úspěšné:", user.displayName);
        alert(`Přihlášen jako: ${user.displayName}`);
    } catch (error) {
        console.error("❌ Chyba při přihlášení:", error);
        alert(`Chyba při přihlášení: ${error.message}`);
    }
}

// 🟢 Připojení tlačítka k funkci
document.getElementById("loginBtn").addEventListener("click", signIn);


// ✅ Funkce pro odhlášení
async function logout() {
  try {
    await signOut(auth)
  } catch (error) {
    console.error("Chyba při odhlášení:", error)
  }
}

// ✅ Kontrola, zda je uživatel přihlášen
onAuthStateChanged(auth, (user) => {
  const loginBtn = document.getElementById("loginBtn")
  const logoutBtn = document.getElementById("logoutBtn")
  const addNameBtn = document.getElementById("addNameBtn")

  if (user) {
    console.log("Přihlášený uživatel:", user.displayName)
    loginBtn.style.display = "none"
    logoutBtn.style.display = "inline-block"
    addNameBtn.disabled = false // Povolit přidávání jmen
  } else {
    console.log("Nikdo není přihlášen")
    loginBtn.style.display = "inline-block"
    logoutBtn.style.display = "none"
    addNameBtn.disabled = true // Zakázat přidávání jmen
  }
})

// ✅ Funkce pro přidání nového jména do Firestore (jen pro přihlášené)
async function addName() {
  if (!auth.currentUser) {
    alert("Musíš se přihlásit!")
    return
  }

  const englishName = document.getElementById("newEnglish").value.trim()
  const czechName = document.getElementById("newCzech").value.trim()

  if (englishName === "" || czechName === "") {
    alert("Vyplň obě jména!")
    return
  }

  await addDoc(collection(db, "warriorNames"), {
    english: englishName,
    czech: czechName,
    addedBy: auth.currentUser.uid, // Uložení ID uživatele
  })

  document.getElementById("newEnglish").value = ""
  document.getElementById("newCzech").value = ""

  loadNames()
}

// ✅ Funkce pro načtení jmen z Firestore
async function loadNames() {
  const querySnapshot = await getDocs(collection(db, "warriorNames"))
  const names = []
  querySnapshot.forEach((doc) => {
    names.push(doc.data())
  })
  displayNames(names)
}

// ✅ Funkce pro zobrazení jmen v tabulce
function displayNames(names) {
  const table = document.getElementById("nameList")
  table.innerHTML = ""
  names.forEach((cat) => {
    table.innerHTML += `<tr><td>${cat.english}</td><td>${cat.czech}</td></tr>`
  })
}

// ✅ Připojení tlačítek k funkcím
document.getElementById("loginBtn").addEventListener("click", login)
document.getElementById("logoutBtn").addEventListener("click", logout)
document.getElementById("addNameBtn").addEventListener("click", addName)

// ✅ Načti jména při otevření stránky
window.onload = () => {
  loadNames()
}
