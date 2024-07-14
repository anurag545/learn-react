// class LRUCache {
//     constructor(size) {
//         this.size = size;
//         this.cache = new Map();
//     }

//     get(key) {
//         if(this.cache.has(key)) {
//             let value = this.cache.get(key);
//             this.cache.delete(key);
//             this.cache.set(key,value);
//             return value;
//         }else {
//             return null;
//         }
//     }

//     set(key, value) {
//         if(this.cache.size < this.size) {
//             this.cache.set(key,value);
//         }else {
//             let oldKey = this.cache.keys().next().value;
//             this.cache.delete(oldKey);
//             this.cache.set(key,value);
//         }
//     }

//     list_keys() {
//         let keysArray = [];
//          this.cache.forEach((value, key) => {
//             keysArray.push(key);
//         });
//         return keysArray;
//     }

//     clear() {
//         this.cache.clear();
//     }
// }
// var cache = new LRUCache(5);
// cache.set(1, "A");
// cache.set(2, "B");
// cache.set(3, "C");
// cache.set(4, "D");
// cache.set(5, "E");
// console.log((cache.list_keys())) //[1, 2, 3, 4, 5]
// console.log(cache.get(3)); // Output: "C"
// console.log(cache.get(1)); // Output: "A"
// console.log((cache.list_keys())) // [2, 4, 5, 3, 1]
// cache.set(6, "F");
// console.log(cache.get(2)); // Output: null
// console.log((cache.list_keys())) // [4, 5, 3, 1, 6]
// cache.clear()
// console.log((cache.list_keys())) // []

class DomHelper {
    maxLength = 0;
    countAllNodes(root) {  
        console.log(root.children.length);
        return root.children.length;
    }
  
    getDomDepth(root) {
        if(root.childNodes.length === 0) {
            return 0;
        }
        for(let i=0;i<root.childNodes.length;i++) {
            return 1 + Math.max(this.getDomDepth(root.childNodes[i]), this.maxLength);
        }
        return this.maxLength;
    }
  }
  
  // TESTING CODE STARTS HERE
  
  const TEST_DOM = `
  <div id="group1">
      <div  id="group2">
          <div id="group3">
              <div class="group level3"id="group4">
                group 4
              </div>
          </div>
      </div>
      <div id="group_other">
          <div>
             group4
          </div>

      </div>
  </div>`;

  function createElementFromHTML(htmlString) {
    var div = window.document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }
  
  function run() {
    const element = createElementFromHTML(TEST_DOM);
    document.body.appendChild(element);
    const domHelper = new DomHelper();
    const testRoot = document.querySelector('#group1');
    console.log('Total DOM nodes', domHelper.countAllNodes(testRoot)); // should be 6
    console.log('Max DOM depth', domHelper.getDomDepth(testRoot)); // should be 4
  }
  
  run();