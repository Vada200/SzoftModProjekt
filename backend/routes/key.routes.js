const keyController = require("../controllers/keyController");
const client = require("../configs/database");

module.exports = (app) => {
  // Modify Key
  app.post("/api/modifyKey", async (req, res) => {
    await keyController.modifyKey(req, res);
  });

  // Insert Action
  app.post("/api/insertAction", async (req, res) => {
    await keyController.insertAction(req, res);
  });

  // Insert Action
  app.post("/api/modifyAction", async (req, res) => {
    await keyController.modifyAction(req, res);
  });

  app.get("/api/keys", async (req, res) => {
    let keyData;

    client.query("SELECT * FROM keys ORDER BY key_id").then((keys) => {
      keyData = keys.rows;
      const mappedData = keyData.reduce((floors, currentFloor) => {
        const floorName = currentFloor.floor;

        const rooms = floors.find(
          (definedFloor) => definedFloor.name === floorName
        )?.rooms;
        if (rooms) {
          rooms.push(currentFloor);
        } else {
          floors.push({
            name: floorName,
            rooms: [currentFloor],
          });
        }

        return floors;
      }, []);

      res.json(mappedData);
    });
  });

  app.get("/api/actions", async (req, res) => {
    client.query("SELECT * FROM action ORDER BY id").then((actions) => {
      res.json(actions.rows);
    });
  });
};
