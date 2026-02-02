document.querySelectorAll(".clear-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;
    clearSection(target);
  });
});
function clearSection(type) {
  switch (type) {
    case "stack":
      stack = [];
      document.getElementById("stackContainer").innerHTML = "";
      break;
    case "queue":
      queue = [];
      document.getElementById("queueContainer").innerHTML = "";
      break;
    case "linkedlist":
      linkedList = [];
      document.getElementById("linkedListContainer").innerHTML = "";
      break;
    case "bst":
      root = null;
      document.getElementById("treeContainer").innerHTML = "";
      break;
  }
}




/*  ================================== 
            STACK & QUEUE 
========================================== */
const pushBtn = document.getElementById("pushBtn");
const popBtn = document.getElementById("popBtn");
const peekBtn = document.getElementById("peekBtn");
const enqueueBtn = document.getElementById("enqueueBtn");
const dequeueBtn = document.getElementById("dequeueBtn");
/*---------------------STACK FUNCTIONALITY--------------------------*/
pushBtn.addEventListener("click", () => {
  const input = document.getElementById("stackInput");
  const value = input.value;
  pushStack(value);
  input.value = ""; // clear input after push
});
popBtn.addEventListener("click", () => {
    popStack();
});
peekBtn.addEventListener("click", () => {
    peekStack();
});
/*---------------------QUEUE FUNCTIONALITY------------------------*/
enqueueBtn.addEventListener("click", () => {
    const input = document.getElementById("queueInput");
    const value = input.value;
    enqueue(value);
    input.value = "";
});
dequeueBtn.addEventListener("click", () => {
    dequeue();
});
/*-----------------MESSAGE FUNCTIONS---------------------*/
function showStackMessage(msg){
    const message = document.getElementById("stackMessage");
    message.textContent = msg;
    setTimeout(() => {message.textContent = ""}, 3000);
}
function showQueueMessage(msg){
    const message = document.getElementById("queueMessage");
    message.textContent = msg;
    setTimeout(() => {message.textContent = ""}, 3000);
}
/*---------------------------STACK LOGIC-------------------------*/
let stack = [];
function pushStack(value){
    if (value === ""){  
        showStackMessage("No input value!");
        return;
    }
    stack.push(value);
    renderStack();
    showStackMessage(`Pushed ${value}`);
}
function popStack(){
    if (stack.length === 0){
        showStackMessage("Stack Underflow")
        return;
    }
    const container = document.getElementById("stackContainer");
    const top = container.lastElementChild;
    top.classList.add("removing");
    setTimeout(() => {
        const poppedValue = stack.pop();
        renderStack();
        showStackMessage(`Pop ${poppedValue}`);
    }, 350);
}
function peekStack(){
    if (stack.length === 0){
        showStackMessage("Stack Underflow");
        return;
    }
    const top = stack[stack.length-1];
    showStackMessage(`Top element is: ${top}`);
}
function renderStack(){
    const stackContainer = document.getElementById("stackContainer");
    stackContainer.innerHTML = "";
    stack.forEach(item => {
        const stackElement = document.createElement("div");
        stackElement.className = "stack-item";
        stackElement.textContent = item;
        stackContainer.appendChild(stackElement);
    });
}
/*-------------------------------QUEUE LOGIC---------------------------*/
let queue = [];
function enqueue(value){
    if (value === ""){  
        showQueueMessage("No input value!");
        return;
    }
    queue.push(value);      //adds the element at the end (rear)
    renderQueue();  
    showQueueMessage(`Enqueued ${value} at the rear-end`);
}
function dequeue(){
    if (queue.length === 0){
        showQueueMessage("Queue Underflow");
        return;
    }
    const container = document.getElementById("queueContainer");
    const top = container.lastElementChild;
    top.classList.add("removing");
    setTimeout(() => {
        const removedValue = queue.shift();      //removes the element at the first (first)
    renderQueue();
    showQueueMessage(`Dequeued ${removedValue} at the front-end`);
    }, 350);
}
function renderQueue(){
    const queueContainer = document.getElementById("queueContainer");
    queueContainer.innerHTML = "";
    queue.forEach(item => {
        const queueElement = document.createElement("div");
        queueElement.className = "queue-item";
        queueElement.textContent = item;
        queueContainer.appendChild(queueElement);
    });
}




/*  ======================================== 
                LINKED LISTS 
=========================================== */
let linkedList = [];
const insertH = document.getElementById("insertHead");
const insertT = document.getElementById("insertTail");
const insertP = document.getElementById("insertPos");
const deleteH = document.getElementById("deleteHead");
const deleteT = document.getElementById("deleteTail");
const deleteP = document.getElementById("deletePos");
const traverseBtn = document.getElementById("traverse");
let llvalue = document.getElementById("llValue");
let llpos = document.getElementById("llPosition");

/*-------------------LINKED LIST FUNCTIONALITY---------------*/
insertH.addEventListener("click", () => {
    insertHead(llvalue.value);
    llvalue.value = "";
});
insertT.addEventListener("click", () =>{
    insertTail(llvalue.value);
    llvalue.value = "";
});
insertP.addEventListener("click", () => {
    insertPos(llvalue.value, llpos.value);
    llvalue.value = "";
    llpos.value = "";
});
deleteH.addEventListener("click", () => {
    deleteHead();
});
deleteT.addEventListener("click", () => {
    deleteTail();
});
deleteP.addEventListener("click", () => {
    deletePos(llpos.value);
    llvalue.value = "";
    llpos.value = "";
});
traverseBtn.addEventListener("click", () => {
    traversalLinkedList();
})
/*---------------------MESSAGE FUNCTION-----------------------*/
function showLLMessage(msg){
    const llMessage = document.getElementById("llMessage");
    llMessage.textContent = msg;
    setTimeout(() => {llMessage.textContent = ""}, 3000);
}
/*------------------------INSERTION FUNCTIONS-------------------*/
function insertHead(value){
    if (value === ""){
        showLLMessage("No input value");
        return;
    }
    linkedList.unshift(value);
    renderLinkedList();
    showLLMessage(`Inserted ${value} at head`);
}
function insertTail(value){
    if (value === ""){
        showLLMessage("No input value");
        return;
    }
    linkedList.push(value);
    renderLinkedList();
    showLLMessage(`Inserted ${value} at tail`);
}
function insertPos(value, index){
    const pos = Number(index);
    if (value === "" || isNaN(pos)) {
        showLLMessage("Missing input!");
        return;
    }
    if (pos < 0 || pos > linkedList.length){
        showLLMessage("Invalid position value!");
        return;
    }
    linkedList.splice(pos, 0, value);
    renderLinkedList();
    showLLMessage(`Inserted ${value} at ${pos}`);
}
/*------------------------DELETION FUNCTIONS-------------------*/
function deleteHead(){
    if (linkedList.length === 0){
        showLLMessage("Empty Linked List!");
        return;
    }
    const container = document.getElementById("linkedListContainer");
    const nodes = container.querySelectorAll(".ll-node");
    const nodeToRemove = nodes[0];
    nodeToRemove.classList.add("removing");
    setTimeout(() => {
        const removed = linkedList.shift();
        renderLinkedList();
        showLLMessage(`Deleted ${removed} from head`);
    }, 350);
}
function deleteTail(){
    if (linkedList.length === 0){
        showLLMessage("Empty Linked List!");
        return;
    }
    const container = document.getElementById("linkedListContainer");
    const nodes = container.querySelectorAll(".ll-node");
    const nodeToRemove = nodes[nodes.length - 1];
    nodeToRemove.classList.add("removing");
    setTimeout(() => {
        const removed = linkedList.pop();
        renderLinkedList();
        showLLMessage(`Deleted ${removed} from tail`); 
    }, 350);
}
function deletePos(index){
    const pos = Number (index);
    if (linkedList.length === 0){
        showLLMessage("Empty Linked List!");
        return;
    }
    if (isNaN(pos) || pos < 0 || pos >= linkedList.length) {
        showLLMessage("Invalid position value!!");
        return;
    }
    const container = document.getElementById("linkedListContainer");
    const nodes = container.querySelectorAll(".ll-node");
    const nodeToRemove = nodes[pos];
    if (!nodeToRemove){return;}     //for safety, to avoid any errors
    nodeToRemove.classList.add("removing");
    setTimeout(() => {
        const removed = linkedList.splice(pos, 1);
        renderLinkedList();
        showLLMessage(`Deleted ${removed} from ${pos}`);
    }, 350);
}
/*----------------------------TRAVERSAL FUNCTION---------------------*/
function setLLControl(disabled) {
  document.querySelectorAll("button").forEach(btn => {
    btn.disabled = disabled;
    btn.style.opacity = disabled ? "0.5" : "1";
  });
}
async function traversalLinkedList() {      //async/await allows to pause JS without freezing the UI
    if (linkedList.length === 0){
        showLLMessage("Linked List is Empty");
        return;
    }
    setLLControl(true);
    const container = document.getElementById("linkedListContainer");
    const nodes = container.querySelectorAll(".ll-node");
    let pointer = document.createElement("div");
    pointer.className = "ll-pointer";
    pointer.textContent = "PTR";
    for (let i = 0; i<nodes.length; i++){
    const node = nodes[i];
    node.style.position = "relative";
    node.appendChild(pointer);
    node.classList.add("active");
    node.scrollIntoView({ behavior: "smooth", inline: "center" });
    showLLMessage(`Visiting node ${i}`);
    await sleep(1000);
    node.classList.remove("active");
  }
  pointer.remove();               // clean up once
  setLLControl(false);
  showLLMessage("Traversal completed");
}
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
/*-----------------------LINKED LIST LOGIC-------------------------*/
function renderLinkedList(){
    const container = document.getElementById("linkedListContainer");
    container.innerHTML = "";
    if (linkedList.length === 0){
        const nullNode = document.createElement("div");
        nullNode.className = "ll-null";
        nullNode.textContent = "NULL";
        container.appendChild(nullNode);
        return;
    }
    //Head
    const head = document.createElement("div");
    head.className = "ll-head";
    head.textContent = "HEAD";
    container.appendChild(head);
    linkedList.forEach((value, index) => {
        //node 
        const node = document.createElement("div");
        node.className = "ll-node";
        const data = document.createElement("div");
        data.classList = "ll-data";
        data.textContent = value;
        const next = document.createElement("div");
        next.className = "ll-next";
        next.textContent = "Next";
        //adding all of these
        node.appendChild(data);
        node.appendChild(next);
        container.appendChild(node);
        //arrow for all, except last node
        if (index !== linkedList.length-1){
            const arrow = document.createElement("div");
            arrow.className = "ll-arrow";
            arrow.textContent = "→";
            container.appendChild(arrow);
        }
    });
    //Null
    const nullNode = document.createElement("div");
    nullNode.className = "ll-null";
    nullNode.textContent = "NULL";
    container.appendChild(nullNode);
}




/*  ======================================== 
                BINARY TREE 
=========================================== */
class TreeNode{
    constructor(value){
        this.value = value;
        this.left = null;   //one pointer
        this.right = null;  //another pointer
    }
}
let root = null;    //similar to the head of a linked list
const insertBT = document.getElementById("insertTree");
const deleteBT = document.getElementById("deleteTree");
const preorderBT = document.getElementById("preorderBtn");
const inorderBT = document.getElementById("inorderBtn");
const postorderBT = document.getElementById("postorderBtn");

/*----------BINARY TREE FUNCTIONALITY------------*/
insertBT.addEventListener("click", () => {
  const input = document.getElementById("treeValue");
  insertNode(input.value);
  input.value = "";
});
deleteBT.addEventListener("click", () => {
    const input = document.getElementById("treeValue");
    const value = Number(input.value);
    if (isNaN(value)){
        showBTMessage("Enter a valid number");
        input.value = "";
        return;
    }
    root = deleteNode(root, value);
    renderTree();
    setTimeout(() => {
        renderTree();
    }, 400);
    input.value = "";
});
preorderBT.addEventListener("click", async () => {
    if (!root){
        showBTMessage("Tree is empty");
        return;
    }
    document.getElementById("bstOutput").textContent = "";
    setBSTControl(true);
    await preorderVisual(root);
    setBSTControl(false);
    const result = preorderTraversal(root);
    showBTMessage("Pre-Order: " + result.join(" → "));
});
inorderBT.addEventListener("click", async () => {
    if (!root){
        showBTMessage("Tree is empty");
        return;
    }
    document.getElementById("bstOutput").textContent = "";
    setBSTControl(true);
    await inorderVisual(root);
    setBSTControl(false)
    const result = inorderTraversal(root);
    showBTMessage("In-Order: " + result.join(" → "));
});
postorderBT.addEventListener("click", async () => {
    if (!root){
        showBTMessage("Tree is empty");
        return;
    }
    document.getElementById("bstOutput").textContent = "";
    setBSTControl(true);
    await postorderVisual(root);
    setBSTControl(false);
    const result = postorderTraversal(root);
    showBTMessage("Post-Order: " + result.join(" → "));
});
/*------MESSAGE FUNCTION----------*/
function showBTMessage(msg){
    const btmessage = document.getElementById("btMessage");
    btmessage.textContent = msg;
    setTimeout(() => {btmessage.textContent = ""}, 3500);
}
/*----------INSERTION FUNCTION----------*/
function insertNode(value){
    if (value === ""){
        showBTMessage("No input value!");
        return;
    }
    value = Number(value);
    const newNode = new TreeNode(value);    //creating a node for the tree
    if (!root){
        root = newNode;
        renderTree();
        return;
    }
    insertBST(root, newNode);
    renderTree();
}
/*-------------DELETION FUNCTION------------*/
function deleteNode(root, value){
    if (value===""){
        showBTMessage("No input value!");
        return;
    }
    if (!root) return root;
    if (value<root.value){
        root.left = deleteNode(root.left, value);
    }
    else if (value > root.value){
        root.right = deleteNode(root.right, value);
    }
    else{
        //case 1 & 2 -: 0 or 1 child node
        if (!root.left) return root.right;
        if (!root.right) return root.left;
        //case 3 -: 2 children nodes - INORDER SUCCESSOR
        let successorNode = getMin(root.right);
        root.value = successorNode.value;
        root.right = deleteNode(root.right, successorNode.value);
    }
    showBTMessage(`Deleted ${value} using In-order successor`);
    return root;
}
function getMin(node){
    while (node.left) node = node.left;
    return node;
}
/*------------TRAVERSAL FUNCTION--------------*/
function preorderTraversal(node, result=[]){
    //ROOT -> LEFT -> RIGHT
    if (!node) return result;
    setBSTControl(disabled);
    result.push(node.value);
    preorderTraversal(node.left, result);
    preorderTraversal(node.right, result);
    setBSTControl(enabled);
    return result;
}
function inorderTraversal(node, result=[]){
    //LEFT -> ROOT -> RIGHT
    if (!node) return result;
    inorderTraversal(node.left, result);
    result.push(node.value);
    inorderTraversal(node.right, result);
    return result;
}
function postorderTraversal(node, result=[]){
    //LEFT -> RIGHT -> ROOT
    if (!node) return result;
    postorderTraversal(node.left, result);
    postorderTraversal(node.right, result);
    result.push(node.value);
    return result;
}
//=----FOR VISITING NODES ON TRAVERSALS----=//
async function preorderVisual(node){
    if (!node) return;
    await visitNode(node);
    await preorderVisual(node.left);
    await preorderVisual(node.right);
} 
async function inorderVisual(node){
    if (!node) return;
    await inorderVisual(node.left);
    await visitNode(node);
    await inorderVisual(node.right);
}
async function postorderVisual(node){
    if (!node) return;
    await postorderVisual(node.left);
    await postorderVisual(node.right);
    await visitNode(node);
}
/*--------------BINARY TREE LOGIC-----------*/
function renderTree(){
    const container = document.getElementById("treeContainer");
    container.innerHTML = "";
    if (!root){
        showBTMessage("No input");
        return;
    }
    container.appendChild(createTreeNode(root));
}
function createTreeNode(node){
    if (!node) return null;
    const treeWrapper = document.createElement("div");
    treeWrapper.className = "tree-wrapper";
    const nodeDiv = document.createElement("div");
    nodeDiv.className = "tree-node";
    nodeDiv.textContent = node.value;
    treeWrapper.appendChild(nodeDiv);

    if (node.left || node.right){
        const childrenDiv = document.createElement("div");
        childrenDiv.className = "tree-children";
        // if (node.left) {
        //     const leftWrap = document.createElement("div");
        //     leftWrap.className = "tree-child left";
        //     leftWrap.appendChild(createTreeNode(node.left));
        //     childrenDiv.appendChild(leftWrap);
        // }
        // if (node.right) {
        //     const rightWrap = document.createElement("div");
        //     rightWrap.className = "tree-child right";
        //     rightWrap.appendChild(createTreeNode(node.right));
        //     childrenDiv.appendChild(rightWrap);
        // }
        // treeWrapper.appendChild(childrenDiv);

        const leftChild = createTreeNode(node.left);
        const rightChild = createTreeNode(node.right);
        if (leftChild){
            childrenDiv.appendChild(leftChild);
        }
        if (rightChild){
            childrenDiv.appendChild(rightChild);
        }
        treeWrapper.appendChild(childrenDiv);
    }
    return treeWrapper;
}
function insertBST(curr, newNode){
    if (newNode.value < curr.value){
        if (!curr.left){
            curr.left = newNode;
        }else{
            insertBST(curr.left, newNode);
        }
    }
    else if (newNode.value > curr.value){
        if (!curr.right){
            curr.right = newNode;
        }else{
            insertBST(curr.right, newNode);
        }
    }
    else{
        showBTMessage("Duplicate values are not permitted!");
    }
}
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function visitNode(node) {
    const nodes = document.querySelectorAll(".tree-node");
    nodes.forEach(n => {
        if (Number(n.textContent) === node.value){
            n.classList.add("traversing");
            showBTMessage("Traversing the BST");
            n.scrollIntoView({
                behavior: "smooth", block: "center", inline: "center"
            });
        }
    });
    await sleep(700);
    nodes.forEach( n => {
        n.classList.remove("traversing");
    });
}
function setBSTControl(disabled) {
  document.querySelectorAll("button").forEach(btn => {
    btn.disabled = disabled;
    btn.style.opacity = disabled ? "0.5" : "1";
  });
}



/* :-----NOTE-----: 
async -> gives the permission to await for another work/function to be complete in order to proceed
await -> actually waits
promise -> something that finishes later
*/

