import Route from '@ioc:Adonis/Core/Route'

/**
 * Auth
 */
Route.post('login', 'AuthController.login').middleware('guest')
Route.delete('logout', 'AuthController.logout').middleware('auth')

Route.post('password/forget', 'AuthController.passwordResetLink').middleware('guest')
Route.post('password/:id/reset', 'AuthController.passwordReset')
  .as('password.reset')
  .middleware('guest')

// Route.post('register', 'AuthController.register').middleware('guest')
