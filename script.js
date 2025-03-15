        const names = [
            { english: "Firestar", czech: "Ohnivous" },
            { english: "Graystripe", czech: "Šedý proužek" },
            { english: "Bluestar", czech: "Modrá hvězda" },
            { english: "Sandstorm", czech: "Písečná bouře" },
            { english: "Tigerclaw", czech: "Tygří dráp" }
        ];

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
