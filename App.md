App
- user

RegisterForm
- users
- < onSubmit(newUser)

LoginForm
- < onConnect(user)

Site
- page
- users
- posts
- currentUser

Users
- > users
- < onDelete(user)

UserDetail
- > id
- > user

UserEditForm
- > user
- < onSubmit(user, newUser)

Posts
- > posts
- < onUpdate(post , newPost)
- < onDelete(post)
- < onCreate(post)

PostDetail
- > id
- > post
