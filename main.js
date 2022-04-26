class Stack {
  ///Add a constructor to specify the size, the top(limit) and the array of a Stack
  constructor(size) {
    this.stackSize = size;
    this.top = 0;
    this.stackArray = new Array(size);
  }
}

function isFull(stack) {
  return stack.top === stack.stackSize;
}

function isEmpty(stack) {
  return stack.top === 0;
}

function push(stack, item) {
  if (isFull(stack)) {
    return;
  }

  stack.stackArray[++stack.top] = item;
}

function pop(stack) {
  if (isEmpty(stack)) {
    return 0;
  }
  return stack.stackArray[stack.top--];
}

/// FIXME: Needs refinement when it comes to taking disks out of starting pole
function moveDiskToPole(startPole, endPole, diskStart, diskEnd) {
  let poleStartTopDisk = pop(startPole);
  let poleDestTopDisk = pop(endPole);

  if (poleStartTopDisk == 0) {
    push(startPole, poleDestTopDisk);
    move(diskEnd, diskStart, poleDestTopDisk);
  } else if (poleDestTopDisk == 0) {
    push(endPole, poleStartTopDisk);
    move(diskStart, diskEnd, poleStartTopDisk);
  } else if (poleStartTopDisk > poleDestTopDisk) {
    push(startPole, poleStartTopDisk);
    push(startPole, poleDestTopDisk);
    move(diskEnd, diskStart, poleDestTopDisk);
  } else {
    push(endPole, poleDestTopDisk);
    push(endPole, poleStartTopDisk);
    move(diskStart, diskEnd, poleStartTopDisk);
  }
  //console.log("Start move pole: " + startPole.stackArray + "\n");
  //console.log("End move pole: " + endPole.stackArray + "\n");
}

let amountMoves = 0;

function move(startDisk, endDisk, disk) {
  console.log(
    "Move disk " + disk + " from " + startDisk + " to " + endDisk + "\n"
  );
  amountMoves++;

  if (amountMoves == 1) {
    console.log("There is " + amountMoves + " move made \n");
  } else {
    console.log("There are " + amountMoves + " moves made \n");
  }
}

/// Algorithm of the tower of hanoi
function towerOfHanoi(diskAmount, startPole, inBetweenPole, endPole) {
  let totalMoves = Math.pow(2, diskAmount) - 1;
  let start = "A",
    between = "B",
    end = "C";
  let amountPoles = 3;

  if (diskAmount % 2 == 0) {
    let temp = end;
    end = between;
    between = temp;
  }

  for (let i = diskAmount; i >= 1; i--) {
    push(startPole, i);
  }

  //console.log("Start pole: " + startPole.stackArray + "\n");
  //console.log("Between pole: " + inBetweenPole.stackArray + "\n");
  //console.log("End pole: " + endPole.stackArray + "\n");

  for (let i = 1; i <= totalMoves; i++) {
    if (i % amountPoles == 1) {
      moveDiskToPole(startPole, endPole, start, end);
    } else if (i % amountPoles == 2) {
      moveDiskToPole(startPole, inBetweenPole, start, between);
    } else if (i % amountPoles == 0) {
      moveDiskToPole(inBetweenPole, endPole, between, end);
    }
  }
}

let amountDisks = 3;

let poleStart = new Stack(amountDisks);
let poleBetween = new Stack(amountDisks);
let poleEnd = new Stack(amountDisks);

towerOfHanoi(amountDisks, poleStart, poleBetween, poleEnd);
