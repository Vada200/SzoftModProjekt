const createTable = (actions) => {
  const table = document.createElement("table");
  table.classList.add("table", "table-hover", "tablee");
  const tableHead = createTableHead();
  const tableBody = createTableBody(actions);
  table.append(tableHead, tableBody);
  return table;
};

const createTableHead = () => {
  const tableHead = document.createElement("thead");
  tableHead.setAttribute("id", "filter_table");
  tableHead.innerHTML = `
    <tr>
        <th scope="col">Name</th>
        <th scope="col">Key</th>
        <th scope="col">Taken at</th>
        <th scope="col">First comment</th>
        <th scope="col">Given back at</th>
        <th scope="col">Last comment</th>
    </tr>
    `;
  return tableHead;
};

const createTableBody = (actions) => {
  const tableBody = document.createElement("tbody");
  tableBody.innerHTML = actions.map(createTableRow).join("\n");
  return tableBody;
};

const createTableRow = (actions) => {
  return `
    <tr>
        <td>${actions.name}</td>
        <td>${actions.key_id}</td>
        <td>${actions.taken_timestamp}</td>
        <td>${actions.taken_comment}</td>
        <td>${
          actions.given_timestamp !== null ? actions.given_timestamp : ""
        }</td>
        <td>${actions.given_comment !== null ? actions.given_comment : ""}</td>
    </tr>
    `;
};

const fetchActions = async () => {
  const actionResult = await fetch("api/actions");
  return actionResult.json();
};

export const generateStatsTable = () => {
  fetchActions().then((actions) => {
    const container = document.getElementById("container");
    container.append(createTable(actions));
  });
};

const addFiltering = () => {
  const valamidiv = document.createElement("div");
  const valamiszoveg = document.createTextNode("Ez itt valami szöveg");
  valamidiv.appendChild(valamiszoveg);

const holvantable = document.getElementById("filter_table");
document.body.insertBefore(valamidiv,holvantable);
};
