import Route from '@ioc:Adonis/Core/Route'

/**
 * Categories
 */
Route.group(() => {
  Route.resource('categories', 'Admin/CategoriesController').apiOnly()
})
  .middleware(['auth', 'admin'])
  .prefix('admin')
  .as('admin')

Route.resource('categories', 'CategoriesController').apiOnly().only(['index', 'show'])
