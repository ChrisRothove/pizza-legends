class MapNode {
  constructor(config, rowIndex, colIndex) {
    this.name = config?.name || "untitled";
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;

    this.top = config?.top;
    this.left = config?.left;
    this.right = config?.right;
    this.bottom = config?.bottom;
  }
}

class DungeonMap {
  constructor(config) {
    this.mapNodes = []; // array to populate with nodes
    this.targetNumber = config?.targetNumber || 10; // minimum number of rooms
    this.baseRooms = config?.baseRooms || DungeonRooms;
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

  getRandomType(prev, row, col) {
    const findRoom = (row, col) =>
      this.dungeonLayout[row] ? this.dungeonLayout[row][col] : undefined;

    const getEndpoint = () => {
      if (prev === "top") return "z";
      if (prev === "bottom") return "za";
      if (prev === "left") return "zc";
      if (prev === "right") return "zb";
    };

    //check to see if the target room has required rooms
    const required = [];
    if (findRoom(row - 1, col)?.bottom === null) required.push("top");
    if (findRoom(row + 1, col)?.top === null) required.push("bottom");
    if (findRoom(row, col - 1)?.right === null) required.push("left");
    if (findRoom(row, col + 1)?.left === null) required.push("right");

    //check to see if the target room has unavailable rooms
    const unavailable = [];
    if (findRoom(row - 1, col)?.bottom === false) unavailable.push("top");
    if (findRoom(row + 1, col)?.top === false) unavailable.push("bottom");
    if (findRoom(row, col - 1)?.right === false) unavailable.push("left");
    if (findRoom(row, col + 1)?.left === false) unavailable.push("right");

    //check to see if target room has bounds
    const bounds = [];
    if (row === 0) bounds.push("top");
    if (row === 4) bounds.push("bottom");
    if (col === 0) bounds.push("left");
    if (col === 4) bounds.push("right");

    //check to see if targetNumber is reached
    const targetReached = this.mapNodes.length >= this.targetNumber;

    //filter out illegal rooms
    let roomTypes = [...Object.values(DungeonRooms)];
    if (targetReached && this.endNode === null) {
      roomTypes = roomTypes.filter((room) => room.uniqueId === getEndpoint());
    }
    if (bounds.length) {
      bounds.forEach((boundary) => {
        roomTypes = roomTypes.filter((room) => room[boundary] !== null);
      });
    }
    if (required.length) {
      required.forEach((side) => {
        roomTypes = roomTypes.filter((room) => room[side] === null);
      });
    }
    if (unavailable.length) {
      unavailable.forEach((side) => {
        roomTypes = roomTypes.filter((room) => room[side] !== null);
      });
    }
    if (!targetReached) {
      roomTypes = roomTypes.filter((room) => !room.name.includes("dead"));
    }
    console.log(roomTypes);
    if (roomTypes.length < 1) return getEndpoint();
    return utils.randomFromArray(roomTypes).uniqueId;
  }

  getAllUnfinishedRooms() {
    return this.mapNodes.filter((node) => {
      const { top, right, left, bottom } = node;
      return top === null || right === null || left === null || bottom === null;
    });
  }

  getRandomDeadEnd(dir) {
    return utils.randomFromArray([
      ...Object.values(DungeonRooms).filter((room) => {
        const yes =
          !room.name.includes("End") &&
          room.name.includes("dead") &&
          room.name.includes(dir);
        return yes;
      }),
    ]);
  }

  seed() {
    // seed the start room
    let startRoom = null;
    while (startRoom === null) {
      const row = utils.randomFromArray(this.dungeonLayout);
      const column = utils.randomFromArray(row);
      if (column === null && row !== this.dungeonLayout[0]) {
        const rowIndex = this.dungeonLayout.indexOf(row);
        const colIndex = utils.randomFromArray([0, 1, 2, 3, 4]);
        startRoom = new MapNode({ ...DungeonRooms.a }, rowIndex, colIndex);
        this.dungeonLayout[rowIndex][colIndex] = startRoom;
      }
    }
    this.mapNodes.push(startRoom);
    this.startNode = startRoom;

    // place rooms until targetNumber is reached
    let previousNode;
    let currentNode = startRoom;
    let breakpoint = false;
    for (let i = 2; i <= this.targetNumber; i++) {
      console.log("current", i, { ...currentNode });
      // TOP ROOM
      if (currentNode?.top === null) {
        // set targets from current
        const targetRow = currentNode.rowIndex - 1;
        const targetCol = currentNode.colIndex;
        // set random type for new room
        const randomType = this.getRandomType("top", targetRow, targetCol);
        // reassign targetRoom
        const targetRoom = new MapNode(
          { ...DungeonRooms[randomType] },
          targetRow,
          targetCol
        );
        this.mapNodes.push(targetRoom);
        this.dungeonLayout[targetRow][targetCol] = targetRoom;
        console.log(this.dungeonLayout, targetRoom);
        // set current Node to new Node
        currentNode.top = targetRoom;
        targetRoom.bottom = currentNode;

        //break loop if endpoint is returned
        if (randomType.includes("z")) break;
      }
      // RIGHT ROOM
      if (currentNode?.right === null) {
        // set targets from current
        const targetRow = currentNode.rowIndex;
        const targetCol = currentNode.colIndex + 1;
        // set random type for new room
        const randomType = this.getRandomType("right", targetRow, targetCol);
        // reassign targetRoom
        const targetRoom = new MapNode(
          { ...DungeonRooms[randomType] },
          targetRow,
          targetCol
        );
        this.mapNodes.push(targetRoom);
        this.dungeonLayout[targetRow][targetCol] = targetRoom;
        // set current Node to new Node
        currentNode.right = targetRoom;
        targetRoom.left = currentNode;

        //break loop if endpoint is returned
        if (randomType.includes("z")) break;
      }
      //BOTTOM ROOM
      if (currentNode?.bottom === null) {
        // set targets from current
        const targetRow = currentNode.rowIndex + 1;
        const targetCol = currentNode.colIndex;
        // set random type for new room
        const randomType = this.getRandomType("bottom", targetRow, targetCol);
        // reassign targetRoom
        const targetRoom = new MapNode(
          { ...DungeonRooms[randomType] },
          targetRow,
          targetCol
        );
        this.mapNodes.push(targetRoom);
        this.dungeonLayout[targetRow][targetCol] = targetRoom;
        // set current Node to new Node
        currentNode.bottom = targetRoom;
        targetRoom.top = currentNode;

        //break loop if endpoint is returned
        if (randomType.includes("z")) break;
      }
      //LEFT ROOM
      if (currentNode?.left === null) {
        // set targets from current
        const targetRow = currentNode.rowIndex;
        const targetCol = currentNode.colIndex - 1;
        // set random type for new room
        const randomType = this.getRandomType("left", targetRow, targetCol);
        // reassign targetRoom
        const targetRoom = new MapNode(
          { ...DungeonRooms[randomType] },
          targetRow,
          targetCol
        );
        this.mapNodes.push(targetRoom);
        this.dungeonLayout[targetRow][targetCol] = targetRoom;
        // set current Node to new Node
        currentNode.left = targetRoom;
        targetRoom.right = currentNode;

        //break loop if endpoint is returned
        if (randomType.includes("z")) break;
      }
      previousNode = currentNode;
      currentNode = utils.randomFromArray(this.getAllUnfinishedRooms());
    }

    // fill remaining rooms with dead ends
    this.mapNodes.forEach((node) => {
      const directions = ["right", "top", "left", "bottom"];
      const { rowIndex, colIndex } = node;
      directions.forEach((dir) => {
        if (node[dir] === null) {
          let targetX = colIndex;
          let targetY = rowIndex;
          switch (dir) {
            case "right":
              targetX += 1;
            case "left":
              targetX -= 1;
            case "top":
              targetY -= 1;
            case "bottom":
              targetY += 1;
            default:
              break;
          }
          node[dir] = new MapNode(
            { ...DungeonRooms[this.getRandomDeadEnd(dir).uniqueId] },
            targetY,
            targetX
          );
        }
      });
    });
  }
}

const testMap = new DungeonMap();
testMap.seed();
console.log(testMap, testMap.dungeonLayout);
