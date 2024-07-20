/**
 * @param {import('vue-router').Router} router
 */
export default async function(router) {
  const authStore = (await import('@/stores/auth')).default();

  /**
   * @param {import('vue-router').RouteLocationNormalizedGeneric} route
   * @returns {boolean}
   */
  const validate = (route) => {
    const guard = route.matched.reduce(
      (previous, current) => {
        switch(current.meta.guard) {
          case undefined: return previous;
          case 'auth':
          case 'guest': return current.meta.guard;
          default: return null;
        }
      }, null
    );

    switch(guard) {
      case 'auth': return authStore.isAuthenticated;
      case 'guest': return !authStore.isAuthenticated;
      default: return true;
    }
  };

  router.beforeEach((to, from) => {
    if(to.matched.length < 1) {
      return true;
    }

    if(validate(to)) {
      return true;
    }

    if(from.matched.length >= 1 && validate(from)) {
      return false;
    }

    return {
      name: authStore.isAuthenticated ? 'home' : 'login',
    };
  });
}
