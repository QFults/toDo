// Initialize All Modals
M.Modal.init(document.querySelectorAll('.modal'), {})

// User Object
let user = {}

// Get Reference to Sign In Modal
const signInModal = M.Modal.getInstance(document.getElementById('signInModal'))

// Function to Open Sign In Modal
const openSignInModal = () => {
  signInModal.open()
}

// Function to Format a Phone Number
const formatPhone = (phone) => {
  let phoneArr = phone.split('')
  phoneArr.splice(0, 0, '(')
  phoneArr.splice(4, 0, ')', ' ')
  phoneArr.splice(9, 0, '-')

  return phoneArr.join('')
}

// Function to show content post sign-in
const postSignIn = () => {
  document.getElementById('signInInstructions').style.display = 'none'
  document.getElementById('profile').style.display = 'block'
  document.getElementById('toDoList').style.display = 'block'
  document.getElementById('profileInfo').innerHTML = `
      <span class="card-title">Welcome ${user.name}!</span>
      <ul class="collection">
        <li class="collection-item">Phone Number: ${user.phone}</li>
        <li class="collection-item">Email: ${user.email}</li>
      </ul>
    `
}

// Function to Sign In User
const signIn = () => {
  const uPass = document.getElementById('uPass').value
  const uPassVer = document.getElementById('uPassVer').value

  if (uPass === uPassVer) {
    document.getElementById('passMatch').style.display = 'none'

    // assign user value from inputs
    user = {
      name: document.getElementById('uName').value,
      phone: formatPhone(document.getElementById('uPhone').value),
      email: document.getElementById('uEmail').value,
      password: uPass,
      list: []
    }

    signInModal.close()

    postSignIn()
  } else {

    // display error message if passwords don't match
    document.getElementById('passMatch').style.display = 'inline'
  }

}

// Display ToDo List Items
const renderListItems = () => {
  document.getElementById('toDoListItems').innerHTML = ''
  user.list.forEach((item, i) => {
    let itemElem = document.createElement('a')
    itemElem.className = 'collection-item lItem'
    itemElem.style.backgroundColor = item.isDone ? 'rgb(150, 255, 150)' : 'white'
    itemElem.innerHTML = `
    ${item.text}
    <a class="secondary-content"><i class="material-icons delItem" data-id="${i}">delete</i></a>
    <a class="secondary-content"><i class="material-icons">${item.isDone ? 'check' : 'trip_origin'}</i></a>
    `
    itemElem.dataset.id = i
    document.getElementById('toDoListItems').append(itemElem)
  })
  document.getElementById('clearList').style.display = user.list.length >= 1 ? 'block' : 'none'
}

// Adds New To Do List Item
const addItem = () => {
  user.list.push({
    text: document.getElementById('newListItem').value,
    isDone: false
  })
  renderListItems()
  document.getElementById('newListItem').value = ''
}

// Toggles Item Between Complete and Incomplete
const changeItemState = id => {
  user.list[id].isDone = !user.list[id].isDone
  renderListItems()
}

// Removes Item From List
const deleteItem = id => {
  user.list.splice(id, 1)
  renderListItems()
}

// Clears All Items in the ToDo List
const clearList = () => {
  user.list = []
  renderListItems()
}

// Click Event Listener for Sign In Button to Trigger Sign In Modal
document.getElementById('openSignInModal').addEventListener('click', openSignInModal)

// Click Event Listener to Sign In User
document.getElementById('signIn').addEventListener('click', signIn)

// Click Event Listener to Create ToDo List Item
document.getElementById('addItem').addEventListener('click', addItem)

// Click Event Listener to Clear the ToDo List
document.getElementById('clearList').addEventListener('click', clearList)

// Click Event Listener For Dynamically Rendered Elements
document.addEventListener('click', event => {
  // If attempting to mark item's completion
  if (event.target.className === 'collection-item lItem') {
    changeItemState(event.target.dataset.id)
    // If attempting to remove item
  } else if (event.target.className === 'material-icons delItem') {
    deleteItem(event.target.dataset.id)
  }
})