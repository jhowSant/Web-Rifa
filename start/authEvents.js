const Config = use('Config')
const Event = use('Event')
const Mail = use('Mail')

Event.on('usuarios::created', async (usuarios) => {
  await Mail.send('auth.emails.welcome-mail', usuarios, (message) => {
    message.to(usuarios.email)
    message.from('admin@example.com')
  })
})

Event.on('forgot::password', async ({ usuarios, token }) => {
  await Mail.send('auth.emails.password', {
    token,
    usuarios,
    appURL: Config.get('adonis-auth-scaffold.appURL')
  }, (message) => {
    message.to(usuarios.email)
    message.from('admin@example.com')
    .subject('Password reset')
  })
})
