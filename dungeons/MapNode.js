class MapNode {
  constructor(config, rowIndex, colIndex) {
    this.name = config.name || "untitled";
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;

    this.top = config.top || undefined;
    this.left = config.left || undefined;
    this.right = config.right || undefined;
    this.bottom = config.bottom || undefined;
  }
}

class DungeonMap {
  constructor(config) {
    this.mapNodes = []; // array to populate with nodes
    this.targetNumber = config.targetNumber; // minimum number of rooms
    this.baseRooms = config.baseRooms || DungeonRooms;
    this.dungeonLayout = [
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ];
    this.startNode = null;
    this.endNode = null;
  }

  getRandomType(row, col) {
    //check to see if target room has bounds
    const bounds = [];
    if (row === 0) bounds.push("top");
    if (row === 5) bounds.push("bottom");
    if (col === 0) bounds.push("right");
    if (col === 5) bounds.push("right");

    //check to see if targetNumber is reached
    const targetReached = this.mapNodes.length >= this.targetNumber;

    //filter out illegal rooms
    let roomTypes = [...DungeonRooms];
    if (targetReached && this.endNode === null) {
      return this.endNode;
    } else if (!targetReached) {
      roomTypes = roomTypes.filter((room) => room.name.includes("end"));
    }
    if (bounds.length) {
      bounds.forEach((boundary) => {
        roomTypes = roomTypes.filter((room) => room[boundary] !== null);
      });
    }
    return utils.randomFromArray(roomTypes).uniqueId;
  }

  seed() {
    // seed the start room
    let startRoom;
    while (!startRoom) {
      const row = utils.randomFromArray(this.dungeonLayout);
      const column = utils.randomFromArray(row);
      if (column === null && row !== this.dungeonLayout[0]) {
        const rowIndex = this.dungeonLayout.indexOf(row);
        const colIndex = row.indexOf(column);
        startRoom = new MapNode(DungeonRooms["st01"], rowIndex, colIndex);
      }
    }
    this.mapNodes.push(startRoom);
    this.startNode = startRoom;

    // place rooms until targetNumber is reached
    let previousNode;
    let currentNode = startRoom;
    const findRoom = (row, col) => this.dungeonLayout[row][col];
    for (let i = 2; i <= this.targetNumber; i++) {
      if (currentNode.top === null) {
        // set targets from current
        targetRow = currentNode.rowIndex - 1;
        targetCol = currentNode.colIndex;
        const targetRoom = findRoom(targetRow, targetCol);
        // set random type for new room
        const randomType = this.getRandomType(targetRoom, targetRow, targetCol);
        // reassign targetRoom
        targetRoom = new MapNode(
          DungeonRooms[randomType],
          targetRow,
          targetCol
        );
        // set current Node to new Node
        currentNode.top = targetRoom;
      }
    }
  }
}
