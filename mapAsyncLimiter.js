/**
 * Write mapAsyncWithLimit() function that:
 * - Takes an array of inputs (inputs arg)
 * - Calls an asynchronous function with each input (iterateeFn arg)
 * - Can only have a limit number of asynchronous functions running concurrently (limit arg)
 * - Calls callback function after all inputs have been processed (callback arg)
 */
 
function fetchUsernameById(id, callback) {
    // Simulates async request
    const randomRequestTime = Math.floor(Math.random() * 100) + 200;
  
    setTimeout(() => {
      callback(`Username ${id}`);
    }, randomRequestTime);
  }
  
  async function mapAsyncWithLimit (inputs, limit, iterateeFn, callback) {
      const finalArr = [];
      let activeCount = 0;
      let currentIndex = 0;
    function processNext () {
        if(currentIndex>= inputs.length && activeCount === 0) {
            callback(finalArr);
        }
        if(currentIndex < inputs.length && activeCount < limit) {
            activeCount++;
            currentIndex++;
            iterateeFn(inputs[index], (result) => {
                // if we want to save the information on that index only then we can create a const index = currentIndex++ so use that index here it will make closure so will have a index value, finalArr[index] = result it will save the each user on that index only
                finalArr.push(result);
                activeCount--;
                processNext();   
            })
            processNext();   
        }
    }
    processNext();
      // Implement here
      // Hint: Create some intermediate callback fn here to pass to iterateeFn
  }
  
  mapAsyncWithLimit([1, 2, 3, 4, 5], 2, fetchUsernameById, (allResults) => {
    // This callback body runs after all inputs have been successfully processed
    console.log(allResults);
    // Should log: ["Username 2", "Username 1", "Username 3", "Username 4", "Username 5"]
    // Note - order may not be same because of random async callback resolve time
  });