  <script>
        const correctPassword = "warriorcats123"; // Změň si heslo podle sebe

        function loadNames() {
            const storedNames = localStorage.getItem("warriorNames");
            return storedNames ? JSON.parse(storedNames) : [
                { english: "Firestar", czech: "Ohnivous" },
                { english: "Graystripe", czech: "Šedý proužek" },
                { english: "Bluestar", czech: "Modrá hvězda" },
                { english: "Sandstorm", czech: "Písečná bouře" },
                { english: "Tigerclaw", czech: "Tygří dráp" }
            ];
        }

        let names = loadNames();
     function displayNames(filteredNames = names) {
            const table = document.getElementById("nameList");
            table.innerHTML = "";
            filteredNames.forEach(cat => {
                table.innerHTML += `<tr><td>${cat.english}</td><td>${cat.czech}</td></tr>`;
            });
        }

        function searchNames() {
            const queryEnglish = document.getElementById("searchEnglish").value.toLowerCase();
            const queryCzech = document.getElementById("searchCzech").value.toLowerCase();

            const filtered = names.filter(cat => 
                (cat.english.toLowerCase().includes(queryEnglish) || queryEnglish === "") &&
                (cat.czech.toLowerCase().includes(queryCzech) || queryCzech === "")
            );

            displayNames(filtered);
        }



        displayNames();
    
