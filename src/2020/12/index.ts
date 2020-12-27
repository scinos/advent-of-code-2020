import { Solver } from "../../runner";

export const part1: Solver = (input) => {
  let x = 0;
  let y = 0;
  let dir = "E";

  for (const instruction of input) {
    const action = instruction[0];
    const num = Number(instruction.substr(1));
    switch (action) {
      case "N":
        y += num;
        break;
      case "S":
        y -= num;
        break;
      case "E":
        x += num;
        break;
      case "W":
        x -= num;
        break;
      case "L":
        for (let i = 0; i < num; i += 90) {
          if (dir === "E") dir = "N";
          else if (dir === "N") dir = "W";
          else if (dir === "W") dir = "S";
          else if (dir === "S") dir = "E";
        }
        break;
      case "R":
        for (let i = 0; i < num; i += 90) {
          if (dir === "E") dir = "S";
          else if (dir === "S") dir = "W";
          else if (dir === "W") dir = "N";
          else if (dir === "N") dir = "E";
        }
        break;
      case "F":
        if (dir === "E") x += num;
        else if (dir === "N") y += num;
        else if (dir === "W") x -= num;
        else if (dir === "S") y -= num;
        break;
    }
  }
  return String(Math.abs(x) + Math.abs(y));
};

export const part2: Solver = (input) => {
  let shipX = 0;
  let shipY = 0;
  let waypointX = 10;
  let waypointY = 1;
  let temp;

  for (const instruction of input) {
    const action = instruction[0];
    const num = Number(instruction.substr(1));
    switch (action) {
      case "N":
        waypointY += num;
        break;
      case "S":
        waypointY -= num;
        break;
      case "E":
        waypointX += num;
        break;
      case "W":
        waypointX -= num;
        break;
      case "L":
        for (let i = 0; i < num; i += 90) {
          temp = -waypointY;
          waypointY = waypointX;
          waypointX = temp;
        }
        break;
      case "R":
        for (let i = 0; i < num; i += 90) {
          temp = waypointY;
          waypointY = -waypointX;
          waypointX = temp;
        }
        break;
      case "F":
        shipX += waypointX * num;
        shipY += waypointY * num;
        break;
    }
  }
  return String(Math.abs(shipX) + Math.abs(shipY));
};
