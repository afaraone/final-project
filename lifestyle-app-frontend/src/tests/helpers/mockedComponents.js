function mockComponent(componentName) {
  return (props) => {
    return(
      <mocked originalComponent={componentName} {...props}>{props.children}</mocked>
    )
  }
}

let mockToDoForm = jest.mock('../../todoform', () => { return mockComponent('ToDoForm') })
let mockToDo = jest.mock('../../todo', () => { return mockComponent('ToDo') })

export {mockToDoForm, mockToDo}
