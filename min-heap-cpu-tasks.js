class MinHeap {
    constructor(comparator, length) {
        this.heap = [];
        this.comparator =  comparator
    }
    parent (index) {
        return Math.floor(index-1 / 2);
    }
    leftChild(index) {
        return 2*index + 1;
    }
    rightChild(index) {
        return 2*index + 2;
    }
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
      }
    heapifyUp () {
        let index = this.heap.length - 1;
        while(index > 0 && this.comparator(this.heap[index], this.heap[this.parent(index)]) < 0) {
            this.swap(this.parent(index), index)
            index = this.parent(index);
        } 
    }
    heapifyDown () {
       let index  = 0;
       while(this.leftChild(index) < this.heap.length) {
        let smallerChildIndex =this.leftChild(index);
        if(this.rightChild(index) < this.heap.length && this.comparator(this.heap[this.rightChild(index)], this.heap[smallerChildIndex]) < 0) {
            smallerChildIndex = this.rightChild(index);
        }
        if (this.comparator(this.heap[index], this.heap[smallerChildIndex]) <= 0) break;
        this.swap(index, smallerChildIndex);
        index = smallerChildIndex;
       }
    }
    push (element) {
        this.heap.push(element);
        this.heapifyUp();
    }
    pop () {
        if(this.heap.length === 0) return undefined;
        this.swap(0, this.heap.length - 1);
        let poppedElement = this.heap.pop();
        this.heapifyDown();
        return poppedElement;
    }
    peek () {
       return this.heap[0];
    }
    isEmpty () {
        return this.heap.length === 0;
    }
}

const cpuTaskExecution = (tasks) => {
    const taskArray = tasks.map((task) => [task.id, task.queued_time, task.exec_time]);
    taskArray.sort((a,b) => a[1] - b[1] || a[0] || b[0]);
    let i=0;
    let currentTime = 0;
    const heap = new MinHeap((a,b) => a[2] - b[2] || a[0]- b[0]);
    // Follow up: If there is a priority for each tasks then what will be the order of execution.
    // const heap = new MinHeap((a, b) => {
    //     if (a[3] !== b[3]) return b[3] - a[3]; // Priority
    //     if (a[2] !== b[2]) return a[2] - b[2]; // Exec time
    //     if (a[1] !== b[1]) return a[1] - b[1]; // Queued time
    //     return a[0] - b[0]; // ID
    //   });
    let result = [];
    while(i < taskArray.length || !heap.isEmpty()) {
        if(heap.isEmpty()) {
            currentTime = Math.max(currentTime, taskArray[i][1]);
        }
        while(i < taskArray.length && taskArray[i][1]  <= currentTime) {
            heap.push(taskArray[i]);
            i++;
        }
        let currentTask  = heap.pop();
        currentTime += currentTask[2];
        result.push(currentTask[0]);
    }
    return result; 
 }
// Example usage
const tasks = [
    { id: 1, queued_time: 2, exec_time: 2 },
    { id: 2, queued_time: 5, exec_time: 15 },
    { id: 3, queued_time: 5, exec_time: 10 },
    { id: 4, queued_time: 18, exec_time: 2 },
  ];
  
//   console.log(cpuTaskExecution(tasks)); // Output: [1, 3, 2]


//Interviewer asked how you will handle input in editor which has width w means it can fit w words in it so when the text length increases it should come to next line. lets say you have editor with some given width, create a function which should written a new splitted string joined with /nif string with increase more then given wdth you should break the line and some more edge cases are there which you need to handle.
function formatString(str, width) {
    if (width < 1) {
      throw new Error("Width must be at least 1");
    }
  
    const words = str.split(" ");
    let result = [];
    let currentLine = [];
  
    for (const word of words) {
      if (currentLine.length === 0) {
        currentLine.push(word); // Start a new line
      } else {
        // Check if adding this word would exceed the specified width, including "/n"
        const lineLength = currentLine.join(" ").length;
        const prospectiveLineLength = lineLength + word.length + 1; // 1 for space
  
        if (prospectiveLineLength + 2 > width) { // +2 for "/n"
          result.push(currentLine.join(" ")); // Break the line
          currentLine = [word]; // Start a new line
        } else {
          currentLine.push(word); // Add to the current line
        }
      }
    }
    // Add any remaining words to the result
    if (currentLine.length > 0) {
      result.push(currentLine.join(" "));
    }
  
    // Join with /n instead of newline character
    return result.join("/n");
  }
  
  // Test example
  const str = "This is a simple example that requires handling word wrapping.";
  const width = 10;
  
  console.log(formatString(str, width));
  // Output: "This is a /n simple /n example /n that /n requires /n handling /n word wrapping."
  
// let result  = formateString("abc defg hi jkl mnop", 12);
// console.log(result);