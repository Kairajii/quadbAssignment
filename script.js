

        fetch('http://localhost:5000/cryptoData')
        .then(response => response.json())
        .then(data => {
            console.log({data})
            const tableBody = document.getElementById('table-body');

            // Iterate through the data and create table rows
            data.forEach((item, index) => {
                
                const row = tableBody.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                const cell4 = row.insertCell(3);
                const cell5 = row.insertCell(4);
                const cell6 = row.insertCell(5);
                const cell7 = row.insertCell(6)

                cell1.textContent = index + 1;
                cell2.textContent = item.name;
                cell3.textContent = item.last;
                cell4.textContent = item.buy;
                cell5.textContent = item.sell;
                cell6.textContent = item.volume;
                cell7.textContent = item.base_unit;
        
            });
        })
        .catch(error => console.error('Error fetching data:', error));