import React from 'react'

const Dashboard = React.lazy(() => import('@/views/Dashboard'))
const Doc = React.lazy(() => import('@/views/Doc'))
const Guide = React.lazy(() => import('@/views/Guide'))
const Explanation = React.lazy(() => import('@/views/Permission'))
const AdminPage = React.lazy(() => import('@/views/Permission/adminPage'))
const GuestPage = React.lazy(() => import('@/views/Permission/guestPage'))
const EditorPage = React.lazy(() => import('@/views/Permission/editorPage'))
const RichTextEditor = React.lazy(() => import('@/views/Components-demo/richTextEditor'))
const Markdown = React.lazy(() => import('@/views/Components-demo/Markdown'))
const Draggable = React.lazy(() => import('@/views/Components-demo/draggable'))
const KeyboardChart = React.lazy(() => import('@/views/Charts/keyboard'))
const LineChart = React.lazy(() => import('@/views/Charts/line'))
const MixChart = React.lazy(() => import('@/views/Charts/mixChart'))
const Menu1_1 = React.lazy(() => import('@/views/Nested/Menu1/Menu1-1'))
const Menu1_2_1 = React.lazy(() => import('@/views/Nested/Menu1/Menu1-2/Menu1-2-1'))
const Table = React.lazy(() => import('@/views/Table'))
const ExportExcel = React.lazy(() => import('@/views/Excel/ExportExcel'))
const UploadExcel = React.lazy(() => import('@/views/Excel/UploadExcel'))
const Zip = React.lazy(() => import('@/views/Zip'))
const Clipboard = React.lazy(() => import('@/views/Clipboard'))
const Error404 = React.lazy(() => import('@/views/Error/404'))
const User = React.lazy(() => import('@/views/User'))
const About = React.lazy(() => import('@/views/About'))

const routerConfig = [
  { path: '/dashboard', component: Dashboard, roles: ['admin','editor','guest'] },
  { path: '/doc', component: Doc, roles: ['admin','editor','guest'] },
  { path: '/guide', component: Guide, roles: ['admin','editor'] },
  { path: '/permission/explanation', component: Explanation, roles: ['admin'] },
  { path: '/permission/adminPage', component: AdminPage, roles: ['admin'] },
  { path: '/permission/guestPage', component: GuestPage, roles: ['guest'] },
  { path: '/permission/editorPage', component: EditorPage, roles: ['editor'] },
  { path: '/components/richTextEditor', component: RichTextEditor, roles: ['admin','editor'] },
  { path: '/components/Markdown', component: Markdown, roles: ['admin','editor'] },
  { path: '/components/draggable', component: Draggable, roles: ['admin','editor'] },
  { path: '/charts/keyboard', component: KeyboardChart, roles: ['admin','editor'] },
  { path: '/charts/line', component: LineChart, roles: ['admin','editor'] },
  { path: '/charts/mix-chart', component: MixChart, roles: ['admin','editor'] },
  { path: '/nested/menu1/menu1-1', component: Menu1_1, roles: ['admin','editor'] },
  { path: '/nested/menu1/menu1-2/menu1-2-1', component: Menu1_2_1, roles: ['admin','editor'] },
  { path: '/table', component: Table, roles: ['admin','editor'] },
  { path: '/excel/export', component: ExportExcel, roles: ['admin','editor'] },
  { path: '/excel/upload', component: UploadExcel, roles: ['admin','editor'] },
  { path: '/zip', component: Zip, roles: ['admin','editor'] },
  { path: '/clipboard', component: Clipboard, roles: ['admin','editor'] },
  { path: '/user', component: User, roles: ['admin'] },
  { path: '/about', component: About, roles: ['admin', 'editor', 'guest'] },
  { path: '/error/404', component: Error404 },
]

export default routerConfig
