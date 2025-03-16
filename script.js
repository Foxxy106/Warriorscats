import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"
import {
  getDatabase,
  ref,
  get,
  set,
  push,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"
// Firebase konfigurace
const firebaseConfig = {
  apiKey: "TVŮJ_API_KEY",
  authDomain: "warriors-cats-cz.firebaseapp.com",
  databaseURL:
    "https://warriors-cats-cz-default-rtdb.europe-west1.firebasedatabase.app", // 🔹 OPRAVA: Správná URL
  projectId: "warriors-cats-cz",
  storageBucket: "warriors-cats-cz.appspot.com",
  messagingSenderId: "TVŮJ_SENDER_ID",
  appId: "TVŮJ_APP_ID",
}

// 3. Inicializace Firebase aplikace
const app = initializeApp(firebaseConfig)

// 4. Inicializace databáze
const db = getDatabase(app)

// 5. Vytvoření reference na databázový uzel (KOČKY)
const namesRef = ref(db, "names")
// 6. Použití `namesRef` až po inicializaci!
function searchNames() {
  const queryEnglish = document
    .getElementById("searchEnglish")
    .value.toLowerCase()
  const queryCzech = document.getElementById("searchCzech").value.toLowerCase()

  const filtered = names.filter(
    (cat) =>
      (cat.kittenEN.toLowerCase().includes(queryEnglish) ||
        cat.apprenticeEN.toLowerCase().includes(queryEnglish) ||
        cat.warriorEN.toLowerCase().includes(queryEnglish) ||
        cat.leaderEN.toLowerCase().includes(queryEnglish) ||
        queryEnglish === "") &&
      (cat.kittenCZ.toLowerCase().includes(queryCzech) ||
        cat.apprenticeCZ.toLowerCase().includes(queryCzech) ||
        cat.warriorCZ.toLowerCase().includes(queryCzech) ||
        cat.leaderCZ.toLowerCase().includes(queryCzech) ||
        queryCzech === ""),
  )

  displayNames(filtered)
}
import {
  remove,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"

get(namesRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      console.log("Data načtena:", snapshot.val())
    } else {
      console.log("Žádná data v databázi")
    }
  })
  .catch((error) => {
    console.error("Chyba při načítání dat:", error)
  })
const auth = getAuth(app) // Tohle chybělo!
const database = getDatabase(app)
// Registrace uživatele
window.register = function () {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Účet vytvořen!")
    })
    .catch((error) => {
      alert(error.message)
    })
}

window.login = function () {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Úspěšně přihlášen!")
    })
    .catch((error) => {
      alert(error.message)
    })
}

window.logout = function () {
  signOut(auth)
    .then(() => {
      alert("Odhlášeno!")
    })
    .catch((error) => {
      alert(error.message)
    })
}

// Seznam jmen
const names = [
  {
    kittenEN: "Firekit",
    apprenticeEN: "Firepaw",
    warriorEN: "Fireheart",
    leaderEN: "Firestar",
    kittenCZ: "Ohniváček",
    apprenticeCZ: "Ohnivý tlapka",
    warriorCZ: "Ohnivé srdce",
    leaderCZ: "Ohnivous",
  },

  {
    kittenEN: "Graykit",
    apprenticeEN: "Graypaw",
    warriorEN: "Graystripe",
    leaderEN: "Graystar",
    kittenCZ: "Šedáček",
    apprenticeCZ: "Šedý tlapka",
    warriorCZ: "Šedý proužek",
    leaderCZ: "Šedočar",
  },

  {
    kittenEN: "Bluekit",
    apprenticeEN: "Bluepaw",
    warriorEN: "Bluestar",
    leaderEN: "Bluestar",
    kittenCZ: "Modráček",
    apprenticeCZ: "Modrý tlapka",
    warriorCZ: "Modrá hvězda",
    leaderCZ: "Modrohvezda",
  },

  {
    kittenEN: "Tigerkit",
    apprenticeEN: "Tigerpaw",
    warriorEN: "Tigerclaw",
    leaderEN: "Tigerstar",
    kittenCZ: "Tygříček",
    apprenticeCZ: "Tygří tlapka",
    warriorCZ: "Tygří dráp",
    leaderCZ: "Tygrohvězda",
  },
]

// Zobrazení jmen v tabulce
function displayNames(filteredNames = names) {
  const table = document.getElementById("nameList")
  table.innerHTML = ""
  filteredNames.forEach((cat) => {
    table.innerHTML += `
      <tr class="double-row">
        <td>${cat.kittenEN}</td>
        <td>${cat.apprenticeEN}</td>
        <td>${cat.warriorEN}</td>
        <td>${cat.leaderEN}</td>
      </tr>
      <tr>
        <td>${cat.kittenCZ}</td>
        <td>${cat.apprenticeCZ}</td>
        <td>${cat.warriorCZ}</td>
        <td>${cat.leaderCZ}</td>
      </tr>
    `
  })
}

get(namesRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      names = Object.values(snapshot.val())
    } else {
      console.log("Žádná data v databázi")
    }
  })
  .catch((error) => console.error(error))

// Hledání jmen

// Odkaz na seznam válečníků v databázi
const warriorsRef = ref(db, "warriors")

// Načítání dat při přihlášení
function loadWarriors() {
  onValue(warriorsRef, (snapshot) => {
    if (snapshot.exists()) {
      const warriors = snapshot.val()
      const warriorList = document.getElementById("warriorList")
      warriorList.innerHTML = "" // Vyčistit seznam

      Object.entries(warriors).forEach(([key, warrior]) => {
        const li = document.createElement("li")
        li.textContent = `${warrior.kittenEN} - ${warrior.warriorEN}`

        // Tlačítko na odstranění
        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "❌"
        deleteBtn.onclick = () => removeWarrior(key)

        li.appendChild(deleteBtn)
        warriorList.appendChild(li)
      })
    }
  })
}

// Přidání válečníka
// 🔹 Odeslání dat do Firebase
document.getElementById("addCatForm").addEventListener("submit", function (e) {
  e.preventDefault()

  const newCat = {
    kittenEN: document.getElementById("kittenEN").value,
    apprenticeEN: document.getElementById("apprenticeEN").value,
    warriorEN: document.getElementById("warriorEN").value,
    leaderEN: document.getElementById("leaderEN").value,
    kittenCZ: document.getElementById("kittenCZ").value,
    apprenticeCZ: document.getElementById("apprenticeCZ").value,
    warriorCZ: document.getElementById("warriorCZ").value,
    leaderCZ: document.getElementById("leaderCZ").value,
  }

  push(ref(db, "cats"), newCat)
    .then(() => {
      alert("Kočka úspěšně přidána!")
      document.getElementById("addCatForm").reset()
      displayNames()
    })
    .catch((error) => {
      console.error("Chyba při přidávání kočky:", error)
    })
})

displayNames()
