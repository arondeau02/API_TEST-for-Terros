import Route from '@ioc:Adonis/Core/Route'

/**
 * Users
 */
Route.group(() => {
  Route.group(() => {
    Route.resource('users', 'Admin/UsersController').apiOnly()
    Route.delete('users/:id/avatar', 'Admin/UsersController.destroy_avatar')
  })
    .middleware('admin')
    .prefix('admin')

  Route.get('profile', 'UsersController.index')
  Route.put('profile', 'UsersController.update')
  Route.patch('profile', 'UsersController.update')
  Route.delete('profile/avatar', 'UsersController.destroy_avatar')
}).middleware('auth')
