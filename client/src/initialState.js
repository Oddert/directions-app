const initialState = {
  items: [
    {
      title: 'Put up shelving units',
      crossed: false,
      tags: ['Priority Task'],
      description: '[Sample Task, not saved to database] Move boxes from that place, assemble the unit and then move the stuff in place.',
      created: new Date(),
      deadline: new Date().setDate(new Date().getDate() + 7)
    },
    {
      title: 'Walk the dog',
      crossed: true,
      tags: ['Ongoing', 'Health'],
      description: '[Sample Task, not saved to database] Take the dog out for a walk around the park.',
      created: new Date(),
      deadline: new Date().setDate(new Date().getDate() + 3)
    },
    {
      title: 'Find a way to cycle',
      crossed: false,
      tags: ['Health', 'Fun'],
      description: '[Sample Task, not saved to database] There must be a way to cycle this city as to not be in peril by the Funcitonless Metal Boxes (cars).',
      created: new Date(),
      deadline: new Date().setDate(new Date().getDate() + 14)
    },
    {
      title: 'Sign up for freeCodeCamp',
      crossed: false,
      tags: ['Ongoing', 'Social'],
      description: '[Sample Task, not saved to database] I\'m legally obliged to put something like this in all my projects.',
      created: new Date(),
      deadline: null
    }
  ],
  counter: 0,
  edit: {
    open: false,
    index: 0
  },
  filters: [
    {name: 'Priority Task', active: false},
    {name: 'Ongoing', active: false},
    {name: 'Fun', active: false},
    {name: 'Health', active: false},
    {name: 'Social', active: false}
  ],
  auth: {
    loggedIn: false,
    lastCheck: null,
    timeLoggedIn: null,
    user: {}
  }
}

export default initialState
