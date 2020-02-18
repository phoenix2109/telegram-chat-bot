const userModel = require('../../models/admin/userModel')
const bcrypt = require('bcrypt')
const moment = require('moment')

module.exports = {
  //* Member
  member: async (req, res) => {
    // console.log(req.user)
    const listMember = await userModel.getAllMember(_config('database.collection.users'))
    // console.log(listMember)
    res.render('admin/user/for-admin/member', {
      data: {
        listMember: listMember
      }
    })
  },
  memberProfile: async (req, res) => {
    const memberId = req.params.memberId || req.user._id
    const target = req.query.target || 'overview'
    const member = await userModel.getMember(_config('database.collection.users'), memberId)
    res.render(`admin/user/profile/${target}`, {
      data: {
        member: member,
        target: target
      }
    })
  },
  editMemberProfile: async (req, res) => {
    const memberId = req.params.memberId || req.user._id
    console.log(memberId)
    const target = req.query.target
    const member = await userModel.getMember(_config('database.collection.users'), memberId)
    if (target === 'change-password') {
      const salt = bcrypt.genSaltSync(_config('app.salt'))
      const newPassword = bcrypt.hashSync(req.body.newPassword, salt)
      const data = {
        pass: newPassword
      }
      if (req.user.memberLevel > 1) {
        const oldPassword = await userModel.getOldPassword(_config('database.collection.users'), memberId)
        const checkPassword = bcrypt.compareSync(req.body.currentPassword, oldPassword)
        if (checkPassword) {
          userModel.changePassword(_config('database.collection.users'), memberId, data)
          req.flash('success', 'Change password successfully')
          res.redirect(`/admin/member/profile?target=${target}`)
        } else {
          req.flash('error', 'Your old password is incorect')
          res.redirect(`/admin/member/profile?target=${target}`)
        }
      } else {
        userModel.changePassword(_config('database.collection.users'), memberId, data)
        req.flash('success', 'Change password successfully')
        res.redirect(`/admin/member/profile/${memberId}?target=${target}`)
      }
    } else if (target === 'information') {
      const changeAvatar = uploadAvatar.single('memberAvatar')
      changeAvatar(req, res, (error) => {
        if (error) {
          console.log('errors', error)
          req.flash('error', 'Change avatar unsuccessfully')
          res.redirect(`/admin/member/profile?target=${target}`)
          // res.json({successs: false, error: err})
        } else {
          // Data
          console.log(req.body)
          let data, memberAvatar
          if (req.user.level === 1) {
            const { memberName, memberPhone, memberFacebook, memberAddress, memberLevel } = req.body
            memberAvatar = member[0].avatar || ''
            if (req.file !== undefined && req.file !== null) {
              memberAvatar = req.file.filename
            }
            data = {
              name: memberName,
              avatar: memberAvatar,
              level: parseInt(memberLevel),
              info: {
                phone: memberPhone,
                facebook: memberFacebook,
                address: memberAddress
              }
            }
          } else {
            const { memberName, memberPhone, memberFacebook, memberAddress } = req.body
            memberAvatar = member[0].avatar || ''
            if (req.file !== undefined && req.file !== null) {
              memberAvatar = req.file.filename
            }
            data = {
              name: memberName,
              avatar: memberAvatar,
              info: {
                phone: memberPhone,
                facebook: memberFacebook,
                address: memberAddress
              }
            }
          }

          userModel.editMember(_config('database.collection.users'), memberId, data)
          req.flash('success', 'Change information successfully')
          res.redirect(`/admin/member/profile/${memberId}?target=${target}`)
        }
      })
    }
  },
  editMember: async (req, res) => {
    const memberId = req.params.memberId
    const member = await userModel.getMember(_config('database.collection.users'), memberId)
    // console.log(member);
    res.render('admin/user/for-admin/edit-member', {
      data: {
        member: member
      }
    })
  },
  postEditMember: async (req, res) => {
    const memberId = req.params.memberId || req.user._id
    const { memberName, memberPhone, memberFacebook, memberAddress, memberLevel } = req.body
    const data = {
      name: memberName,
      level: parseInt(memberLevel),
      info: {
        phone: memberPhone,
        facebook: memberFacebook,
        address: memberAddress
      }
    }
    userModel.editMember(_config('database.collection.users'), memberId, data)
    req.flash('success', 'Edit member successfully')
    res.status(201).end()
  },
  addMember: async (req, res) => {
    res.render('admin/user/for-admin/add-member')
  },
  postAddMember: async (req, res) => {
    const { memberName, memberUsername, memberMail, memberPassword, memberPhone, memberFacebook, memberAddress, memberLevel } = req.body
    console.log(req.body)
    const isEmailUnique = await userModel.isEmailUnique(_config('database.collection.users'), memberMail)
    console.log(isEmailUnique)
    const isUsernameUnique = await userModel.isUsernameUnique(_config('database.collection.users'), memberUsername)
    console.log(isUsernameUnique)
    if (isEmailUnique && isUsernameUnique) {
      const salt = bcrypt.genSaltSync(_config('app.salt'))
      const memberPass = bcrypt.hashSync(memberPassword, salt)
      const data = {
        name: memberName,
        email: memberMail,
        username: memberUsername,
        pass: memberPass,
        level: parseInt(memberLevel),
        info: {
          phone: memberPhone,
          facebook: memberFacebook,
          address: memberAddress
        }
      }
      userModel.addMember(_config('database.collection.users'), data)
      req.flash('success', 'Add member `%s` successfully', memberMail)
      res.redirect('/admin/member')
    } else {
      if (!isEmailUnique) {
        req.flash('error', 'Email `%s` is already existed', memberMail)
        res.redirect('/admin/member/add-member')
      } else {
        req.flash('error', 'Username `%s` is already existed', memberUsername)
        res.redirect('/admin/member/add-member')
      }
    }
  },
  deleteMember: async (req, res) => {
    const memberId = req.params.memberId
    if (memberId === undefined || memberId === '') {
      req.flash('error', 'Unknown error. Please try again')
    } else {
      req.flash('success', 'Delete member successfully')
      userModel.deleteMember(_config('database.collection.users'), memberId)
    }
    res.redirect('/admin/member')
  },
  //* Customer
  customer: async (req, res) => {
    console.log(req.user)
    const listCustomer = await userModel.getAllCustomer(_config('database.collection.customer'))
    const momentLocal = req.app.locals.moment
    res.render('admin/user/for-admin/customer', {
      data: {
        listCustomer: listCustomer,
        momentLocal: momentLocal
      }
    })
  },
  editCustomer: async (req, res) => {
    const customerId = req.params.customerId
    const customer = await userModel.getCustomer(_config('database.collection.customer'), customerId)
    // console.log(customer);
    res.render('admin/user/for-admin/edit-customer', {
      data: {
        customer: customer
      }
    })
  },
  postEditCustomer: async (req, res) => {
    // console.log(req.body);
    const customerId = req.params.customerId
    const { deposit, status, note } = req.body
    const data = {
      deposit: +deposit || 0,
      status: parseInt(status),
      note: note,
      modifyAt: new Date(moment(new Date()).utcOffset(420).format('YYYY-MM-DD HH:mm')).toISOString()
    }
    userModel.editCustomer(_config('database.collection.customer'), customerId, data)
    req.flash('success', 'Edit successfully')
    res.status(201).end()
  },
  addCustomer: async (req, res) => {
    res.render('admin/user/for-admin/add-customer')
  },
  postAddCustomer: async (req, res) => {
    const { account, name, email, phone, deposit, status, note } = req.body
    const data = {
      account: account,
      name: name,
      email: email,
      phone: phone,
      deposit: +deposit || 0,
      status: parseInt(status) || 0,
      note: note || '',
      createAt: new Date(moment(new Date()).utcOffset(420).format('YYYY-MM-DD HH:mm')).toISOString(),
      modifyAt: ''
    }
    userModel.addCustomer(_config('database.collection.customer'), data)
    req.flash('success', 'Add customer `%s` successfully', email)
    // res.redirect('/admin/customer')
    res.status(201).end()
  },
  deleteCustomer: async (req, res) => {
    const customerId = req.params.customerId
    userModel.deleteCustomer(_config('database.collection.customer'), customerId)
    res.redirect('/admin/customer')
  }
}
