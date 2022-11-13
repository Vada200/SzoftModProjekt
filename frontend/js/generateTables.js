function createTable(floor) {
  const table = document.createElement("table");
  table.classList.add("table", "table-hover", "tablee");
  const tableHead = createTableHeader();
  const tableBody = createTableBody(floor);
  table.append(tableHead, tableBody);
  return table;
}

function createTableHeader() {
  const tableHead = document.createElement("thead");
  tableHead.innerHTML = `
  <tr>
    <th scope="col">Floor</th>
    <th scope="col">Key Number</th>
    <th scope="col">Available</th>
    <th scope="col">Proj. ctrl</th>
  </tr>
  `;
  return tableHead;
}

function createTableBody(floor) {
  const tableBody = document.createElement("tbody");
  tableBody.innerHTML = floor.rooms.map(createTableRow).join("\n");
  return tableBody;
}

function createTableRow(room) {
  const available = "&#x2716";
  const unavailable = "&#x2714";
  const availabilitySymbol = room.key_availability ? available : unavailable;
  return `
  <tr class="clickable" >
    <td>${room.floor}</td>
    <td>${room.key_id}</td>
    <td>${availabilitySymbol}</td>
    <td><input type="checkbox"></td>
    <tr>
      <td colspan="4" class="comment" >
          Megjegyzés:  <input type="text" size="50">
      </td>
    </tr>
  </tr>
  `;
}

async function fetchKeys() {
  const keysResult = await fetch("/api/keys");
  return keysResult.json();
}

export async function generateTables() {
  await fetchKeys().then((floors) => {
    const tableContainer = document.getElementById("table-box");
    let newDiv;
    floors.forEach((floor, index) => {
      const table = createTable(floor);
      if (index % 2 === 0) {
        newDiv = document.createElement("div");
        newDiv.classList.add("table-wrapper");
        tableContainer.append(newDiv);
      }
      newDiv.append(table);
    });
  });
}
