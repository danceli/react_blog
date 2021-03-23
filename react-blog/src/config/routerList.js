import Loadable from 'react-loadable';
import Loading from '@/components/Loading'

const Home = Loadable({ loader: () => import('@/views/Home'), loading: Loading });
// import Home from '@/views/Home'

const Linux = Loadable({ loader: () => import('@/views/Linux'), loading: Loading });
const ComputerNet = Loadable({ loader: () => import('@/views/ComputerNetwork'), loading: Loading });
const Aigorithms = Loadable({ loader: () => import('@/views/Aigorithms'), loading: Loading });
const Chat = Loadable({ loader: () => import('@/views/Chat'), loading: Loading });
const Demo = Loadable({ loader: () => import('@/views/Demo'), loading: Loading });
const About = Loadable({ loader: () => import('@/views/About'), loading: Loading });
const ArticleDetail = Loadable({ loader: () => import('@/views/ArticleDetail'), loading: Loading });

export default [
  { path: '/home', component:Home },
  { path: '/linux', component:Linux },
  { path: '/computer-network', component:ComputerNet },
  { path: '/aigorithms', component:Aigorithms },
  { path: '/chat-room', component:Chat },
  { path: '/about', component:About },
  { path: '/demo', component:Demo },
  { path: '/article/:id', component: ArticleDetail }
]