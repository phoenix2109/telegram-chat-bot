const todoModel = require('../../models/admin/todoModel')
const userModel = require('../../models/admin/userModel')

module.exports = {
  // Todo
  index: async (req, res) => {
    // console.log(req.user)

    const listTodo = await todoModel.getAllTodo()
    const memberProfile = await userModel.getMemberProfile()
    const listLabel = await todoModel.getAllLabel()
    console.log(listTodo)
    res.render('admin/todo', {
      data: {
        listTodo: listTodo,
        memberProfile: memberProfile,
        listLabel: listLabel
      }
    })
  },
  editTodo: async (req, res) => {
    const id = req.params.todoId
    const todo = await todoModel.getTodo(id)
    // console.log(todo);
    res.render('admin/todo/for-admin/edit-todo', {
      data: {
        todo: todo
      }
    })
  },
  postEditTodo: async (req, res) => {
    // console.log(req.body);
    const id = req.params.todoId
    const data = {
      todoName: req.body.todoName,
      todoPhone: req.body.todoPhone,
      todoFacebook: req.body.todoFacebook,
      todoAddress: req.body.todoAddress,
      todoLevel: req.body.todoLevel
    }
    todoModel.editTodo(id, data)
    res.status(201).end()
  },
  addTodo: async (req, res) => {
    res.render('admin/todo/for-admin/add-todo')
  },
  postAddTodo: async (req, res) => {
    const { todoName, todoMail, todoPassword, todoPhone, todoFacebook, todoAddress, todoLevel } = req.body
    const isTodoEmailUnique = await todoModel.isTodoEmailUnique('todo', todoMail)
    // console.log(isTodoEmailUnique);
  },
  deleteTodo: async (req, res) => {
    const id = req.params.todoId
    todoModel.delTodo(id)
    res.redirect('/admin/todo')
  }
}
