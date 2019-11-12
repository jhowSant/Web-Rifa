const Config = use('Config')
const Event = use('Event')
const Mail = use('Mail')

Event.on('users::created', async (users) => {
  await Mail.send('auth.emails.welcome-mail', users, (message) => {
    message.to(users.email)
    message.from('admin@example.com')
  })
})

Event.on('forgot::password', async ({ users, token }) => {
  await Mail.send('auth.emails.password', {
    token,
    users,
    appURL: Config.get('adonis-auth-scaffold.appURL')
  }, (message) => {
    message.to(users.email)
    message.from('admin@example.com')
    .subject('Password reset')
  })
})
