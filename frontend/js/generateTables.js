const createTable = (floor) => {
  const table = document.createElement("table");
  table.classList.add("table", "table-hover", "tablee");
  const tableHead = createTableHeader();
  const tableBody = createTableBody(floor);
  table.append(tableHead, tableBody);
  return table;
};

const createTableHeader = () => {
  const tableHead = document.createElement("thead");
  tableHead.innerHTML = `
  <tr>
    <th scope="col">Floor</th>
    <th scope="col">Key Number</th>
    <th scope="col">Key Available</th>
    <th scope="col">Remote Available</th>
  </tr>
  `;
  return tableHead;
};

const createTableBody = (floor) => {
  const tableBody = document.createElement("tbody");
  tableBody.innerHTML = floor.rooms.map(createTableRow).join("\n");
  return tableBody;
};

const createTableRow = (room) => {
  const available = "✔";
  const unavailable = "✖";
  const keyAvailabilitySymbol = room.key_availability ? available : unavailable;
  const remoteAvailabilitySymbol = room.remote_availability
    ? available
    : unavailable;
  return `
  <tr class="clickable" >
    <td>${room.floor}</td>
    <td>${room.key_id}</td>
    <td>${keyAvailabilitySymbol}</td>
    <td>${remoteAvailabilitySymbol}</td>
  </tr>
  `;
};

const fetchKeys = async () => {
  const keysResult = await fetch("/api/keys");
  return keysResult.json();
};

export const generateTables = async () => {
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
  return true;
};
