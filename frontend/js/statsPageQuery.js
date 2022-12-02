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

export const filterDatas = () => {
  var filterName = document.getElementById("filter-name").value.toUpperCase();
  var filterSelector = document.getElementById("filter-room");
  var filterRoom = filterSelector.options[filterSelector.selectedIndex].text;
  //alert(filterName+', '+filterRoom);


  var statTable = document.getElementById("container");
  var tr = statTable.getElementsByTagName("tr");
  var namePicked, txtValue, roomValue, roomPicked;
  for (var i = 0; i < tr.length; i++) {
    namePicked = tr[i].getElementsByTagName("td")[0];
    roomPicked = tr[i].getElementsByTagName("td")[1];
    if(namePicked && roomPicked) {
      txtValue = namePicked.textContent || namePicked.innerText;
      roomValue = roomPicked.textContent || roomPicked.innerText;
      //console.log(txtValue);
      if (txtValue.toUpperCase().indexOf(filterName) > -1 && roomValue.indexOf(filterRoom) > -1) {
        //alert("van ilyen");
        tr[i].style.display="";
      } else {
        //alert("nincs ilyen");
        tr[i].style.display="none";
      }
    };
  };
  

}
