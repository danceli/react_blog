// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// const PrivateRoute = ({ component: Comp, ...rest}) => {
//   const isLogin = true;

//   return (
//     <Route {...rest} render={ props => (isLogin ? <Comp /> : <Redirect to={{pathname:'/login',state:{redirect:props.location.pathname}}} />) } />
//   )
// }
// export default PrivateRoute;